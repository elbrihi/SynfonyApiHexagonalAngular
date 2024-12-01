<?php

namespace ProductBundle\tests\Stock\ProductBundle\Application\Manager;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use PHPUnit\Framework\TestCase;
use Stock\ProductBundle\Application\Manager\CategoryManager;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\UserBundle\Domain\Entity\User;

class CategoryManagerTest extends TestCase
{
    private $entityManager;
    private $categoryManager;

    protected function setUp(): void
    {
        $this->entityManager = $this->createMock(EntityManagerInterface::class);

        //dd($this->entityManager);
        $this->categoryManager = new CategoryManager($this->entityManager);

       // $this->authTokenManager = new AuthTokenManager($this->passwordHasher, $this->entityManager);
       
    }

    public function testCreateNewCategory()
    {

        $category = new Category();

        $category->setCategoryName("Electronics");
        $category->setCategoryStatus(true);

        $user = new User();
        $categoryFromManager = $this->categoryManager->createNewCatagory($category, $user);

       // dd($category, $categoryFromManager);
        $this->assertSame($categoryFromManager, $category);
        
    }

  
}