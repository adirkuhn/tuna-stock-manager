<?php
/**
 * Plugin Name: Tuna Stock Manager
 * Description: Simple stock manager for woocommerce
 * Version: 1.0.0
 * Author: Adir Kuhn
 * Text Domain: tuna-stock-manager
 * Domain Path: /languages
 */

use DI\ContainerBuilder;
use Tuna\TunaStockManager\Core\Activation;
use Tuna\TunaStockManager\Core\AdminMenu;
use Tuna\TunaStockManager\Core\EndpointLoader;
use Tuna\TunaStockManager\Core\EnqueueScript;
use Tuna\TunaStockManager\Domain\StockManager\Repository\ProductBatchRepository;
use Tuna\TunaStockManager\Domain\StockManager\Service\StockManagerBatch;

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

const TUNA_STOCK_MANAGER_VERSION = '1.0.0';

require_once __DIR__ . '/vendor/autoload.php';

$builder = new ContainerBuilder();
$container = $builder->build();
$container->set(wpdb::class, $GLOBALS['wpdb']);
$container->set(Activation::class, new Activation(TUNA_STOCK_MANAGER_VERSION, $container->get(wpdb::class)));

add_action('admin_init', static function() use ($container) {
    $container->get(Activation::class)->activate();
});
add_action('admin_menu', static function() use ($container) {
    $container->get(AdminMenu::class)->addMenu();
});
add_action('admin_enqueue_scripts', static function() use ($container) {
    $container->get(EnqueueScript::class)->enqueue();
});
add_action('init', static function() use ($container) {
    $container->get(EndpointLoader::class)->registerEndpoints();
});

$stockManagerBatch = $container->get(StockManagerBatch::class);
add_filter('woocommerce_get_stock_quantity', [$stockManagerBatch, 'getQuantityNotExpiredProduct'], 10, 2);