<?php

namespace Stock\ProductBundle\Application\Manager;

use Stock\ProductBundle\Domain\Entity\Category;
use Stock\UserBundle\Domain\Entity\User;

interface CategoryManagerInterface
{
    public function createNewCatagory($category, User $user);
    public function updateCategory(Category $category, User $user, $data): Category;
    public function createMultipleCatagories($category, User $user);
}