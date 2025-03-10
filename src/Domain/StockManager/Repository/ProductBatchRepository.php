<?php
namespace Tuna\TunaStockManager\Domain\StockManager\Repository;

use Exception;
use wpdb;

class ProductBatchRepository
{
    private const TABLE_NAME = 'tuna_product_batch';
    private const REMOVE_PRODUCT_CLOSE_TO_EXPIRATION_DAYS = 15;
    private string $tableName;
    public function __construct(private wpdb $wpdb, private int $removeProductCloseToExpirationDays = self::REMOVE_PRODUCT_CLOSE_TO_EXPIRATION_DAYS)
    {
        $this->tableName = $this->wpdb->prefix . self::TABLE_NAME;
    }

    public function getProductBatchIds(int $productId): array
    {
        return $this->wpdb->get_col($this->wpdb->prepare(
            "SELECT id FROM $this->tableName WHERE product_id = %d",
            $productId
        ));
    }

    public function saveProductBatches(int $productId, array $update, array $insert, array $delete)
    {
        $queries = [];

        foreach ($update as $batch) {
            $queries[] = $this->wpdb->prepare(
                "UPDATE $this->tableName SET batch_name = %s, expiry_date = %s, quantity = %d WHERE id = %d",
                $batch['batchName'],
                $batch['expiryDate'],
                $batch['quantity'],
                $batch['id']
            );
        }

        foreach ($insert as $batch) {
            $queries[] = $this->wpdb->prepare(
                "INSERT INTO $this->tableName (product_id, batch_name, expiry_date, quantity) VALUES (%d, %s, %s, %d)",
                $productId,
                $batch['batchName'],
                $batch['expiryDate'],
                $batch['quantity']
            );
        }

        foreach ($delete as $batchId) {
            $queries[] = $this->wpdb->prepare(
                "DELETE FROM $this->tableName WHERE id = %d",
                $batchId
            );
        }

        try {
            $this->wpdb->query('START TRANSACTION');
            foreach ($queries as $query) {
                $this->wpdb->query($query);
            }
            $this->wpdb->query('COMMIT');
        } catch (Exception) {
            $this->wpdb->query('ROLLBACK');
        }
    }

    public function getProductBatches(int $productId): array
    {
        return $this->wpdb->get_results($this->wpdb->prepare(
            "SELECT id, batch_name as batchName, expiry_date as expiryDate, quantity FROM $this->tableName WHERE product_id = %d",
            $productId
        ), ARRAY_A);
    }

    public function getQuantityNotExpiredProduct(int $productId): int
    {
        $expiryDate = date('Y-m-d', strtotime("+{$this->removeProductCloseToExpirationDays} days"));
        return (int) $this->wpdb->get_var($this->wpdb->prepare(
            "SELECT SUM(quantity) FROM $this->tableName WHERE product_id = %d AND expiry_date >= %s",
            $productId,
            $expiryDate
        ));
    }
}
