<?php

namespace Tuna\TunaStockManager\Domain\StockManager\Service;

use Tuna\TunaStockManager\Domain\StockManager\Repository\ProductRepository;

class StockManager {
    public function __construct(private ProductRepository $productRepository)
    {
    }

    public function getProductsByStockStatus(string $status = 'all', int $limit = 10, int $offset = 0): array
    {
        return $this->productRepository->getProductsByStockStatus($status, $limit, $offset);
    }
}