<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Domain\StockManager\Request;

abstract class Request
{
    public function __construct(private array $data)
    {
    }

    public function get(string $key, $default = null)
    {
        return $this->data[$key] ?? $default;
    }

    public function has(string $key): bool
    {
        return isset($this->data[$key]);
    }

    public function all(): array
    {
        return $this->data;
    }

    public function validate(array $requiredFields): bool
    {
        foreach ($requiredFields as $field) {
            if (!isset($this->data[$field])) {
                return false;
            }
        }
        return true;
    }

    public function verifyNonce(string $action): bool
    {
        return isset($this->data['security']) && wp_verify_nonce($this->data['security'], $action);
    }
}
