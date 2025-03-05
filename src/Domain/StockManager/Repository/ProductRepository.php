<?php
namespace Tuna\TunaStockManager\Domain\StockManager\Repository;

use wpdb;

class ProductRepository
{
    // Inject wpdb into the class
    public function __construct(private wpdb $wpdb)
    {
    }

    public function getProductsByStockStatus(string $status = 'all', int $limit = 10, int $offset = 0): array
    {
        $status_sql = '';
        if ($status === 'in_stock') {
            $status_sql = "AND pm_stock_status.meta_value = 'instock'";
        } elseif ($status === 'out_of_stock') {
            $status_sql = "AND pm_stock_status.meta_value = 'outofstock'";
        } elseif ($status === 'backorder') {
            $status_sql = "AND pm_stock_status.meta_value = 'onbackorder'";
        } elseif ($status === 'low_stock') {
            $status_sql = "AND pm_stock_status.meta_value = 'instock' AND pm_stock.meta_value <= 5";
        }

        // SQL query to fetch products with stock management enabled
        $query = "
            SELECT 
                p.ID,
                p.post_title AS name,
                pm_price.meta_value AS price,
                pm_sale_price.meta_value AS sale_price,
                pm_stock.meta_value AS stock,
                pm_stock_status.meta_value AS stock_status,
                pm_image.meta_value AS image,
                pm_low_stock.meta_value AS low_stock
            FROM {$this->wpdb->posts} p
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_price ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_sale_price ON p.ID = pm_sale_price.post_id AND pm_sale_price.meta_key = '_sale_price'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_stock ON p.ID = pm_stock.post_id AND pm_stock.meta_key = '_stock'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_stock_status ON p.ID = pm_stock_status.post_id AND pm_stock_status.meta_key = '_stock_status'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_image ON p.ID = pm_image.post_id AND pm_image.meta_key = '_thumbnail_id'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_low_stock ON p.ID = pm_low_stock.post_id AND pm_low_stock.meta_key = '_low_stock_threshold'
            LEFT JOIN {$this->wpdb->prefix}postmeta pm_manage_stock ON p.ID = pm_manage_stock.post_id AND pm_manage_stock.meta_key = '_manage_stock'
            WHERE p.post_type = 'product' 
            AND p.post_status = 'publish'
            AND pm_manage_stock.meta_value = 'yes'
            $status_sql
            ORDER BY p.post_title
            LIMIT %d OFFSET %d
        ";

        // Prepare query with limit and offset
        $prepared_query = $this->wpdb->prepare($query, $limit, $offset);

        // Execute the query and get results
        $results = $this->wpdb->get_results($prepared_query);

        $placeholder_image = wc_placeholder_img_src('shop_thumbnail');
        // Format the results
        $products = [];
        foreach ($results as $row) {
            $image_url = $row->image ? wp_get_attachment_url($row->image) : $placeholder_image;

            $products[] = [
                'id'             => $row->ID,
                'name'           => $row->name,
                'price'          => $row->price,
                'sale_price'     => $row->sale_price,
                'stock'          => $row->stock,
                'stock_status'   => $row->stock_status,
                'image'          => $image_url,
                'low_stock'      => $row->low_stock,
            ];
        }

        return $products;
    }
}
