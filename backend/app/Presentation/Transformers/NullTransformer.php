<?php


namespace App\Presentation\Transformers;


class NullTransformer extends BaseTransformer
{

    protected function transformDetail($item)
    {
        return $item;
    }
}