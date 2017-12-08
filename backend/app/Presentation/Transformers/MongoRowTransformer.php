<?php


namespace App\Presentation\Transformers;


abstract class MongoRowTransformer extends BaseTransformer
{
    public function transform($item)
    {
        $item = $item->toArray();
        $item = $this->insertBeforeKey($item, '_id', array('id' => $item['_id']));
        unset($item['_id']);

        return parent::transform($item);
    }

}