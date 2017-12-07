<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateIndexGeoSpatial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $endpoints = array_merge([],
            [\App\Domains\Jakgo\Entity\HotSpot::TABLE]);
        foreach ($endpoints as $endpoint) {
            $tableName = $this->getTableName($endpoint);
            Schema::table($tableName, function (Blueprint $table) {
                $table->geospatial('geometry', '2dsphere');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }

    protected function getTableName($endpoint)
    {
        $tableName = array_last(explode('/', $endpoint));
        return $tableName;
    }

}
