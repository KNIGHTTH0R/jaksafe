<?php


namespace App\Http\Controllers;


use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Lang;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use Ransel\Presentation\Transformers\NullTransformer;

class ApiController extends RestfulController
{
    /**
     * @var Manager
     */
    protected $manager;

    function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }


    /**
     * @param $message
     * @param int $code
     * @throws ApiException
     */
    public function throwError($message, $code = 400)
    {
//        throw new ApiException(400, $message, $code);
    }

    public function throwErrorWithLang($key, $langDetails = [], $code = 400)
    {
        $message = Lang::get($key, $langDetails);
        $this->throwError($message, $code);
    }


    protected function listAll(Paginator $paginator, $transformer)
    {
        $request = app('request');
        $path = $request->path();
        $paginator->setPath('/' . $path);
        $query = array_except(Input::query(), $paginator->currentPage());
        $paginator->appends($query);

        $resource = new Collection($paginator->getCollection(), $transformer);
        $resource->setPaginator(new IlluminatePaginatorAdapter($paginator));

        return $this->manager->createData($resource)->toArray();
    }

    protected function returnItem($data, $transformer)
    {
        $resource = new Item($data, $transformer);

        return $this->manager->createData($resource)->toArray();
    }

    protected function returnOk($data = [], $statusCode = 200)
    {
        $resource = new Item($data, new NullTransformer(), false);
        $data = $this->manager->createData($resource)->toArray();

        return response($data, $statusCode);
    }

    protected function throwValidationException(
        Request $request,
        $validator
    ) {
        $messages = $validator->errors();
        foreach ($messages->all() as $message) {
            $this->throwError($message);
        }
    }

}