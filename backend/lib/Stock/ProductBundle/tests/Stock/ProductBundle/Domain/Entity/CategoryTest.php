<?php

namespace Stock\ProductBundle\Tests\Domain\Entity;

use PHPUnit\Framework\TestCase;
use Stock\ProductBundle\Domain\Entity\Category;

class CategoryTest extends TestCase
{
    public function testCategoryName()
    {
        $category = new Category();

        $category->setCategoryName("Electronics");

        $this->assertEquals("Electronics", $category->getCategoryName());

        
    }
}