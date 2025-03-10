<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Domain\StockManager\Service;

use Tuna\TunaStockManager\Domain\StockManager\Repository\ProductBatchRepository;
use Tuna\TunaStockManager\Domain\StockManager\Request\AjaxRequest;
use WC_Product_Simple;
use WP_Error;

class StockManagerBatch
{
    public function __construct(private ProductBatchRepository $productBatchRepository)
    {
    }

    public function saveProductBatch(AjaxRequest $request): array
    {
        $productId = (int)$request->get('productId');
        $batches = $request->get('batches');
        $stockWithNoBatch = (int)$request->get('stockWithNoBatch');

        if (!$productId || !is_array($batches)) {
            return new WP_Error('invalid_data', 'Invalid product ID or batch data', ['status' => 400]);
        }

        $existingBatches = $this->productBatchRepository->getProductBatchIds($productId);

        $update = [];
        $insert = [];

        foreach ($batches as $batch) {
            if (!empty($batch['id']) && in_array($batch['id'], $existingBatches)) {
                $update[] = $batch;
            } else {
                $insert[] = $batch;
            }
        }

        $delete = array_diff($existingBatches, array_column($batches, 'id'));

        $this->productBatchRepository->saveProductBatches($productId, $update, $insert, $delete);

        return ['status' => 200];
    }

    public function getProductBatches(int $productId): array
    {
        return $this->productBatchRepository->getProductBatches($productId);
    }

    public function getQuantityNotExpiredProduct(int $wcStock, WC_Product_Simple $product): int
    {
        return $wcStock + $this->productBatchRepository->getQuantityNotExpiredProduct($product->get_id());
    }
}