<?php

declare(strict_types=1);

namespace Tuna\TunaStockManager\Core;

use DI\Container;

class EndpointLoader
{
    public function __construct(private Container $container)
    {
    }

    /**
     * Dynamically register all endpoints from the Domain directory.
     */
    public function registerEndpoints(): void
    {
        $domainPath = __DIR__ . '/../Domain'; // Path to the Domain directory

        if (!is_dir($domainPath)) {
            return; // Exit early if the Domain directory doesn't exist
        }

        // Iterate through all subdirectories in the Domain directory
        foreach (new \DirectoryIterator($domainPath) as $domainDir) {
            if ($domainDir->isDir() && !$domainDir->isDot()) {
                $endpointsFile = $domainDir->getPathname() . '/Endpoint.php';

                if (file_exists($endpointsFile)) {
                    require_once $endpointsFile;

                    // Determine the namespace of the endpoint class
                    $namespace = 'Tuna\\TunaStockManager\\Domain\\' . ucfirst($domainDir->getBasename());
                    $className = $namespace . '\\Endpoint';

                    if (class_exists($className)) {
                        /** @var TunaEndpoint $endpointInstance */
                        $endpointInstance = $this->container->get($className);

                        if (method_exists($endpointInstance, 'registerEndpoints')) {
                            $endpointInstance->registerEndpoints();
                        }
                    }
                }
            }
        }
    }
}