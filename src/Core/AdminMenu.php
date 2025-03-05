<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Core;

class AdminMenu
{
    public function addMenu(): void
    {
        add_menu_page(
            'Tuna Stock Manager', // Page Title
            'Tuna Stock Manager', // Menu Title
            'manage_options', // Capability
            'tuna-stock', // Menu Slug
            [$this, 'renderApp'], // Callback function
            'dashicons-chart-bar', // Icon
            25 // Position
        );
    }

    public function renderApp(): void
    {
        echo '<div id="tuna-stock-manager"></div>';
    }
}