<?php

namespace App\Console\Commands;

use App\Domains\Jakgo\Client;
use Illuminate\Console\Command;

class ImportDataHackjakCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:jakgo {--truncate}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import Data from Jakgo API';
    /**
     * @var Client
     */
    private $client;

    //http://dev.smartcity.jakarta.go.id/jakgo/ruang-publik-api--review-master/api-docs/#/api-jakgo/rw

    const RAWAN_TIBUM = 'ruang-publik/rawan-tibum';
    const HYDRANT = 'ruang-publik/hydrant';
    const RUMAH_POMPA = 'ruang-publik/rumah-pompa';
    const PINTU_AIR = 'ruang-publik/pintu-air';
    const TAWURAN = 'ruang-publik/tawuran';
    const RAWAN_BENCANA = 'ruang-publik/rawan-bencana';
    const KOTA = 'v1/kota';
    const KECAMATAN = 'v1/kecamatan';
    const KELURAHAN = 'v1/kelurahan';
    const RW = 'v1/rw';

    const ALL_ENDPOINTS = [
        self::RAWAN_TIBUM,
        self::HYDRANT,
        self::RUMAH_POMPA,
        self::PINTU_AIR,
        self::TAWURAN,
        self::RAWAN_BENCANA,
        self::KOTA,
        self::KECAMATAN,
        self::KELURAHAN,
        self::RW
    ];

    /**
     * Create a new command instance.
     *
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        parent::__construct();
        $this->client = $client;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $endpoints = self::ALL_ENDPOINTS;

        if ($this->option('truncate')) {
            $this->info('truncating');
            foreach ($endpoints as $endpoint) {
                $this->info("truncate $endpoint");
                $tableName = $this->getTableName($endpoint);
                \DB::table($tableName)->truncate();
                $tableName = $this->getRawTableName($endpoint);
                \DB::table($tableName)->truncate();
            }
        }

        foreach ($endpoints as $endpoint) {
            $this->info("extract $endpoint as geojson");
            $this->extractEndpointAsGeoJson($endpoint);
            $this->info("extract $endpoint as raw");
            $this->extractEndpoint($endpoint);
        }

    }

    /**
     * @param $endpoint
     */
    protected function extractEndpoint($endpoint)
    {
        $tableName = $this->getRawTableName($endpoint);
        // no meta means no pagination
        $page = 1;
        $allData = false;
        while (!$allData) {
            $responseBodyAsString = $this->client->getHttpClient()
                ->get($endpoint,
                    ['query' => ['page' => $page]])->getBody()->getContents();
            $responseBodyAsArray = \json_decode($responseBodyAsString, true);

            $data = $responseBodyAsArray['data'];

            foreach ($data as $datum) {
                \DB::table($tableName)->insert($datum);
            }
            $page++;

            if (isset($responseBodyAsArray['meta']) && isset($responseBodyAsArray['meta']['pagination']['total_pages']) && $page <= $responseBodyAsArray['meta']['pagination']['total_pages']) {
                $this->info("retrieving page " . ($page - 1) . " from $endpoint");
                sleep(60);
                continue;
            } else {
                $this->info('all data raw retrieved ');
                break;
            }
        }
    }

    protected function extractEndpointAsGeoJson($endpoint)
    {
        $tableName = $this->getTableName($endpoint);
        // no meta means no pagination
        $page = 1;
        $allData = false;
        while (!$allData) {
            $responseBodyAsString = $this->client->getHttpClient()
                ->get($endpoint,
                    ['query' => ['format' => 'geojson', 'page' => $page]])->getBody()->getContents();
            $responseBodyAsArray = \json_decode($responseBodyAsString, true);

            $data = $responseBodyAsArray['features'];
            if (!isset($responseBodyAsArray['features'])) {
                $this->error('data not found');
                dd($data);
            }

            foreach ($data as $datum) {
                $toBeInsert = [];
                $toBeInsert = array_merge($toBeInsert, $datum['properties']);
                $toBeInsert['geometry'] = $datum['geometry'];
                \DB::table($tableName)->insert($toBeInsert);
            }
            $page++;

            if (isset($responseBodyAsArray['meta']) && isset($responseBodyAsArray['meta']['pagination']['total_pages']) && $page <= $responseBodyAsArray['meta']['pagination']['total_pages']) {
                $this->info("retrieving page " . ($page - 1) . " from $endpoint");
                sleep(60);
                continue;
            } else {
                $this->info('all data geojson retrieved ');
                break;
            }
        }


    }

    /**
     * @param $endpoint
     * @return string
     */
    protected function getRawTableName($endpoint)
    {
        $tableName = array_last(explode('/', $endpoint)) . '_raw';
        return $tableName;
    }

    /**
     * @param $endpoint
     * @return mixed
     */
    protected function getTableName($endpoint)
    {
        $tableName = array_last(explode('/', $endpoint));
        return $tableName;
    }
}
