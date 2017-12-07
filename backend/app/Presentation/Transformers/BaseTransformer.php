<?php


namespace App\Presentation\Transformers;


use League\Fractal\TransformerAbstract;
use Pgn\BaseModel;

/**
 * Class BaseTransformer
 */
abstract class BaseTransformer extends TransformerAbstract
{
    const COLLECTION = 1;
    const PARENTLESS_COLLECTION = 2;
    const ITEM = 3;
    const DETAILED_ITEM = 4;

    protected $mode;

    public function __construct($mode = self::COLLECTION)
    {
        $this->mode = $mode;
    }

    public function transform($item)
    {
        switch ($this->mode) {
            case self::COLLECTION:
                return $this->transformCollection($item);
            case self::PARENTLESS_COLLECTION:
                return $this->transformParentlessCollection($item);
            case self::ITEM:
                return $this->transformItem($item);
            default:

                return $this->transformDetail($item);
        }
    }

    protected function insertBeforeKey($array, $key, $data = null)
    {
        if (($offset = array_search($key, array_keys($array))) === false) // if the key doesn't exist
        {
            $offset = 0; // should we prepend $array with $data?
            $offset = count($array); // or should we append $array with $data? lets pick this one...
        }

        return array_merge(array_slice($array, 0, $offset), (array)$data, array_slice($array, $offset));
    }

    protected function transformParentlessCollection($item)
    {
        return $this->transformDetail($item);
    }

    protected function transformCollection($item)
    {
        return $this->transformDetail($item);
    }

    protected function transformItem($item)
    {
        return $this->transformDetail($item);
    }

    abstract protected function transformDetail($item);
}