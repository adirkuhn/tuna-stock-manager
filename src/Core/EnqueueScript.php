<?php
declare(strict_types=1);

namespace Tuna\TunaStockManager\Core;

class EnqueueScript
{
    private string $pluginUrl;

    public function __construct()
    {
        $this->pluginUrl = plugin_dir_url(__FILE__) . '../../frontend/dist/assets/';
    }

    function enqueue(): void
    {
        // Enqueue JS
        wp_enqueue_script(
            'tuna-frontend-js',
            $this->pluginUrl . 'index.js'
        );

        // Enqueue CSS
        wp_enqueue_style(
            'tuna-frontend-css',
            $this->pluginUrl . 'index.css'
        );

        // Force the script to load as a module
        add_filter('script_loader_tag', function ($tag, $handle) {
            if ($handle === 'tuna-frontend-js') {
                return str_replace(' src', ' type="module" src', $tag);
            }
            return $tag;
        }, 10, 2);

        wp_localize_script('tuna-frontend-js', 'tunaData', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'siteUrl' => site_url() // For your custom URL
        ));
    }
}