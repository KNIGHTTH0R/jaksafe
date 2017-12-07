<?php

namespace App\Domains\Jakgo;

use GuzzleHttp\Client as GuzzleClient;

class Client
{
    /**
     * @var GuzzleClient
     */
    private $httpClient;

    /**
     * Client constructor.
     * @param GuzzleClient $httpClient
     */
    public function __construct(GuzzleClient $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function getHttpClient(){
        return $this->httpClient;
    }
}