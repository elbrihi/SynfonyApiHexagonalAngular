<?php
namespace Stock\ProductBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Stock\ProductBundle\Infrastucture\Symfony\DependencyInjection\StockProductExtension;
//use Stock\UserBundle\Infrastructure\Symfony\DependencyInjection\StockUserExtension;

class StockProductBundle extends Bundle
{
   
    public function getContainerExtension(): ?ExtensionInterface
    {
        
        return new StockProductExtension();
    }
}