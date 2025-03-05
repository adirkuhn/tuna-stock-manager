<?php
declare(strict_types=1);

namespace Tuna\TunaStockManager\Core;

use wpdb;

class Activation
{
    private const TABLE_NAME = 'tuna_product_batch';
    private string $version;
    private wpdb $wpdb;

    public function __construct(string $version, wpdb $wpdb)
    {
        $this->version = $version;
        $this->wpdb = $wpdb;
    }

    public function activate(): void
    {
        $table_name = $this->wpdb->prefix . self::TABLE_NAME;
        $charset_collate = $this->wpdb->get_charset_collate();

        // Check the current version
        $installed_version = get_option(self::TABLE_NAME, null);

        if ($installed_version === $this->version) {
            return;
        }

        $sql = "CREATE TABLE $table_name (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            product_id BIGINT(20) UNSIGNED NOT NULL,
            batch_name VARCHAR(255) NOT NULL,
            expiry_date DATE NOT NULL,
            quantity INT(11) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (product_id) REFERENCES {$this->wpdb->prefix}posts(ID) ON DELETE CASCADE
        ) $charset_collate;";

        $this->wpdb->query($sql);
        update_option(self::TABLE_NAME, $this->version);
    }
}