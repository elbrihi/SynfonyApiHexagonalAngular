<?php

namespace Stock\ProductBundle\Application\Manager;

use Doctrine\ORM\EntityManagerInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\UserBundle\Domain\Entity\User;

class CategoryManager implements CategoryManagerInterface 
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
        
    }
    public function createNewCatagory($category, User $user)
    {
       
        $category->setUser($user);
        
        $category->setCategoryName($category->getCategoryName(). " From Manager ");

      // dd($category);
       return $category ;
    }

    public function updateCategory(Category $category, User $user, $data): Category
    {

        $category->setCategoryName($data["categoryName"]);
        $category->setCategoryStatus($data["categoryStatus"]);
        return  $category;
    }

    public function createMultipleCatagories($category, User $user)
    {

        return $category;
    }
}