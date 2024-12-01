<?php

namespace Stock\ProductBundle\Application\Manager;

use Stock\ProductBundle\Application\Manager\CategoryManagerInterface;
use Stock\ProductBundle\Domain\Entity\Product;

class ProductManager implements ProductManagerInterface

{
    public function createNewProduct($product, $user)
    {
       // Check if productDate is provided, otherwise set it to current date
        if (!$product->getProductDate()) {
            $product->setProductDate(new \DateTime()); // Defaults to current date/time
        }

        return $product;
    }
}