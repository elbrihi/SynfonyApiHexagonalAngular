<?php

namespace ProductBundle\tests\Stock\ProductBundle\Interface\Controller ;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Stock\ProductBundle\Application\Manager\CategoryManagerInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class PostCategoryControllerTest extends ApiTestCase

{

    private $categoryManagerMock;
    private $entityManagerMock;
    protected function setUp(): void
    {
       
        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
    
        $this->categoryManagerMock = $this->createMock(CategoryManagerInterface::class);

        
        $this->categoryManagerMock
            ->method('createNewCatagory')
            ->willReturnCallback(function (Category $category) {
                // Modify the Category entity as needed for the test
                $category->setCategoryName('Modified Category Name');
                $category->setCategoryStatus(false);

                
                return $category;
        });

        // Inject the mocks into the container
        static::getContainer()->set(CategoryManagerInterface::class, $this->categoryManagerMock);
        static::getContainer()->set(EntityManagerInterface::class, $this->entityManagerMock);
    }
    

    public function testCreateCategory():void
    {
                                          
    }
    /*public function testCreateCategory():void
    {
        $client = self::createClient();
       
        $response = $client->request('POST', '/api/create/new/category', [
            'headers' => ['Content-Type' => 'application/ld+json'],
            'json' => [
                'categoryName' => 'Test Category',
                'categoryStatus' => true,
            ],
        ]);

       
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $data = $response->toArray();

        $this->assertMatchesRegularExpression('~^/api/categories/\d+$~', $data['@id']);

       
        $this->assertMatchesResourceItemJsonSchema(Category::class);
    }*/
}