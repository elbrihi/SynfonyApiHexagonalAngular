<?php
namespace Stock\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Stock\UserBundle\Infrastructure\Symfony\DependencyInjection\StockUserExtension;

class StockUserBundle extends Bundle
{
    public function getContainerExtension(): ?ExtensionInterface
    {
        return new StockUserExtension();
    }
}