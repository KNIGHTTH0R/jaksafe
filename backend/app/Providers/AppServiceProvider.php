<?php

namespace App\Providers;

use App\Domains\Jakgo\Client;
use App\Presentation\JaksafeSerializer;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\HandlerStack;
use Illuminate\Support\ServiceProvider;
use League\Fractal\Manager;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Client::class, function () {

            $stack = new HandlerStack();
            $stack->setHandler(new CurlHandler());
            $stack->push(\add_guzzle_header('Authorization', config('jakgo.api_key')));
            $httpClient = new \GuzzleHttp\Client(
                [
                    'base_uri' => 'http://api.jakarta.go.id',
                    'handler' => $stack
                ]
            );
            return new Client($httpClient);
        });

        $this->app->singleton('League\Fractal\Manager', function () {
            $manager = new Manager();
            $manager->setSerializer(new JaksafeSerializer());

            return $manager;
        });
    }
}
