<?php


namespace App\Presentation;


use League\Fractal\Pagination\PaginatorInterface;
use League\Fractal\Serializer\JsonApiSerializer;

class JaksafeSerializer extends JsonApiSerializer
{
    public function paginator(PaginatorInterface $paginator)
    {
        if ($paginator->getCount() == 0) {
            return null;
        }

        $currentPage = (int)$paginator->getCurrentPage();
        $lastPage = (int)$paginator->getLastPage();

        $pagination = array(
            'total' => (int)$paginator->getTotal(),
            'count' => (int)$paginator->getCount(),
            'per_page' => (int)$paginator->getPerPage(),
            'current_page' => $currentPage,
            'total_pages' => $lastPage,
        );

        $links = new \stdClass();


        if ($currentPage > 1) {
            $links->previous = $paginator->getUrl($currentPage - 1);
        }

        if ($currentPage < $lastPage) {
            $links->next = $paginator->getUrl($currentPage + 1);
        }
        $pagination['links'] = $links;

        return array('pagination' => $pagination);
    }

    public function item($resourceKey, array $data)
    {
        if ($resourceKey === false) {
            return $data;
        } elseif (!$resourceKey) {
            return array('data' => $data);
        } else {
            return array($resourceKey => $data);
        }

    }


}