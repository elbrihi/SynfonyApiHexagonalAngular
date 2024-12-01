<?php

namespace Stock\ProductBundle\Interface\Controller;

use Stock\ProductBundle\Application\Manager\ProductManagerInterface;
use Stock\ProductBundle\Domain\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class PostProductController extends AbstractController
{

    public function __construct(private ProductManagerInterface $productManager )
    {
        
    }

    public function __invoke(Product $product): Product
    {
        //dd($product);
        return $product;
        //return $this->productManager-> createNewProduct($product, $this->getUser());
    }
}