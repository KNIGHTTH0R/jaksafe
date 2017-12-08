<?php

namespace App\Console\Commands;

use App\Domains\Jakgo\Entity\HotSpot;
use Illuminate\Console\Command;

class MergeAllDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'merge:ruang-publik';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Merge All Ruang Publik Data';

    const HYDRANT = 'hydrant';
    const RUMAH_POMPA = 'rumah-pompa';
    const PINTU_AIR = 'pintu-air';
    const TAWURAN = 'tawuran';
    const RAWAN_BENCANA = 'rawan-bencana';

    const ALL_RUANG_PUBLIK = [
        self::HYDRANT => [
            HotSpot::ATTRIBUTE_NAME => ['sektor' => 'sektor :x'],
            HotSpot::ATTRIBUTE_LOCATION => ['alamat' => ':x', 'kecamatan' => ':x', 'kota' => ':x'],
        ],
        self::RUMAH_POMPA => [
            HotSpot::ATTRIBUTE_NAME => ['nama_pompa' => ':x'],
            HotSpot::ATTRIBUTE_LOCATION => ['kota' => ':x'],
        ],
        self::PINTU_AIR => [
            HotSpot::ATTRIBUTE_NAME => ['name' => ':x'],
            HotSpot::ATTRIBUTE_LOCATION => ['wilayah' => ':x'],
        ],
        self::TAWURAN => [
            HotSpot::ATTRIBUTE_NAME => ['unsur' => ':x'],
            HotSpot::ATTRIBUTE_LOCATION => ['lokasi' => ':x'],
        ],
        self::RAWAN_BENCANA => [
            HotSpot::ATTRIBUTE_NAME => ['bencana' => ':x'],
            HotSpot::ATTRIBUTE_LOCATION => ['lokasi' => ':x', 'kecamatan' => ':x', 'kota' => ':x'],
        ]
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $tables = self::ALL_RUANG_PUBLIK;
        foreach ($tables as $table => $fields) {
            $type = $table;
            $data = \DB::table($table)->get();

            foreach (collect($data) as $datum) {
                $toBeInsertedData = [];
                foreach ($fields as $hotspotFieldName => $dataFieldName) {
                    $valueField = [];

                    foreach ($dataFieldName as $field => $replacement) {
                        $valueField[] = str_replace(':x', $datum[$field], $replacement);
                    }
                    $toBeInsertedData[$hotspotFieldName] = implode(' ,', $valueField);
                }
                $toBeInsertedData[HotSpot::ATTRIBUTE_ORIGIN_ID] = $datum['_id'];
                $toBeInsertedData[HotSpot::ATTRIBUTE_GEOMETRY] = $datum['geometry'];
                $toBeInsertedData[HotSpot::ATTRIBUTE_TYPE] = $type;
                HotSpot::create($toBeInsertedData);
            }
        }
    }
}
