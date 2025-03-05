<?php

namespace Tuna\TunaStockManager\Core;

abstract class TunaEndpoint
{
    const NAMESPACE = 'wp_ajax_tuna/v1';

    abstract public function registerEndpoints(): void;
    protected function registerRouter(string $path, callable $callback): void
    {
        add_action(self::NAMESPACE . $path, $callback);
    }
}

