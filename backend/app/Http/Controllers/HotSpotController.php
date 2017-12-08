<?php


namespace App\Http\Controllers;


use App\Domains\Jakgo\Entity\HotSpot;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Input;
use App\Presentation\Transformers\BaseTransformer;
use App\Presentation\Transformers\HotSpotTransformer;

class HotSpotController extends ApiController
{

    public function index()
    {
        $page = Input::get('page', 1);
        $type = Input::get('type', null);
        $limit = Input::get('limit', 10);
        $sort = Input::get('sort', null);
        $location = Input::get('location', '-6.1921633,106.7895428');
//        $criteria = Input::get('criteria', null);

        $limit = max(min(50, $limit), 1);

        $projectionFields = array('_id', 'nama', 'location', 'geometry', 'type', 'origin_id');

        $location = explode(',', $location);
        if (count($location) == 2 && is_numeric($location[0]) && is_numeric($location[1])) {
            $lat = $location[0];
            $lon = $location[1];
            $minDistance = (int)Input::get('min_distance', 1);
            $maxDistance = (int)Input::get('max_distance', 1000);
            $hotspots = HotSpot::where('geometry', 'near', [
                '$geometry' => [
                    'type' => 'Point',
                    'coordinates' => [
                        (float) $lon,
                        (float) $lat,
                    ],
                ],
                '$maxDistance' => $maxDistance,
            ])->get();

            if (!$hotspots->isEmpty()) {
                $total = $hotspots->count();
                $offset = ($page - 1) * $limit;
                $hotspots = array_slice($hotspots->all(), $offset, $limit);
                $paginator = new LengthAwarePaginator($hotspots, $total, $limit, $page);
            } else {
                $paginator = new LengthAwarePaginator($hotspots, count($hotspots), $limit, 1);
            }


            return $this->listAll($paginator, new HotSpotTransformer());
        }
    }

    public function show($id)
    {
        $school = HotSpot::findOrFail($id);

        return $this->returnItem($school, new HotSpotTransformer(BaseTransformer::DETAILED_ITEM));
    }

}