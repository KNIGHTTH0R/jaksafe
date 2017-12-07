<?php


namespace App\Domains\Jakgo\Entity;

use Jenssegers\Mongodb\Eloquent\Model;

class HotSpot extends Model
{
    const TABLE = 'hotspots';

    const ATTRIBUTE_ID = '_id';
    const ATTRIBUTE_NAME = 'name';
    const ATTRIBUTE_LOCATION = 'location';
    const ATTRIBUTE_TYPE = 'type';
    const ATTRIBUTE_ORIGIN_ID = 'origin_id';
    const ATTRIBUTE_GEOMETRY = 'geometry';

    protected $table = self::TABLE;

    protected $fillable = [
        self::ATTRIBUTE_ID,
        self::ATTRIBUTE_NAME,
        self::ATTRIBUTE_LOCATION,
        self::ATTRIBUTE_TYPE,
        self::ATTRIBUTE_ORIGIN_ID,
        self::ATTRIBUTE_GEOMETRY,
    ];

}