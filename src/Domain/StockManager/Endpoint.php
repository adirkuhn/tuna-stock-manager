<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Domain\StockManager;

use Tuna\TunaStockManager\Core\TunaEndpoint;
use Tuna\TunaStockManager\Domain\StockManager\Request\AjaxRequest;
use Tuna\TunaStockManager\Domain\StockManager\Service\StockManager;
use Tuna\TunaStockManager\Domain\StockManager\Service\StockManagerBatch;

class Endpoint extends TunaEndpoint
{

    public function __construct(private StockManager $stockManager, private StockManagerBatch $stockManagerBatch)
    {
    }

    public function registerEndpoints(): void
    {
        $this->registerRouter('/stock-manager', [$this, 'getStockManager']);
        $this->registerRouter('/stock-manager/batch/save', [$this, 'saveProductBatch']);
        $this->registerRouter('/stock-manager/batch', [$this, 'getBatches']);
    }

    public function getStockManager(): void
    {
        wp_send_json($this->stockManager->getProductsByStockStatus());
    }

    public function saveProductBatch(): void
    {
        $this->stockManagerBatch->saveProductBatch(new AjaxRequest());
    }

    public function getBatches(): void
    {
        $productId = $_GET['productId'] ?? null;

        if ($productId === null) {
            wp_send_json([]);
        }

        wp_send_json($this->stockManagerBatch->getProductBatches((int)$productId));
    }
}