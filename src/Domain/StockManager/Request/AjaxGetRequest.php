<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Domain\StockManager\Request;

class AjaxGetRequest extends Request
{
    public function __construct()
    {
        parent::__construct($_GET ?? []);
    }
}
