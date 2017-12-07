<?php


namespace App\Presentation\Transformers;


use App\Domains\Jakgo\Entity\HotSpot;

class HotSpotTransformer extends MongoRowTransformer
{

    protected function transformDetail($item)
    {
        return $item;
    }

    protected function transformCollection($item)
    {
        $item = $this->transformDetail($item);
        $projectedFields = array(
            'id',
            HotSpot::ATTRIBUTE_NAME,
            Hotspot::ATTRIBUTE_LOCATION,
            Hotspot::ATTRIBUTE_TYPE,
            'origin_id'
        );
        $optionalFields = [];
        $projectedItems = [];
        foreach ($projectedFields as $field) {
            $projectedItems[$field] = $item[$field];
        }

        if (isset($item['geometry'])) {
            $projectedItems['lon'] = $item['geometry']['coordinates'][0];
            $projectedItems['lat'] = $item['geometry']['coordinates'][1];
        }

        foreach ($optionalFields as $field) {
            if (isset($item[$field])) {
                $projectedItems[$field] = $item[$field];
            }
        }

        return $projectedItems;
    }
}