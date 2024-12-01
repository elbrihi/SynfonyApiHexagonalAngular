<?php

namespace Stock\SupplierBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Stock\UserBundle\Infrastructure\Symfony\DependencyInjection\StockUserExtension;

class StockSupplierBundle extends Bundle
{
    public function getContainerExtension(): ?ExtensionInterface
    {
       
        return new StockUserExtension();
    }
}

