<?php

namespace Stock\ProductBundle\Interface\Controller;

use Stock\ProductBundle\Application\Manager\CategoryManagerInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
final class PostCategoryController extends AbstractController
{
   
    public function __construct(private CategoryManagerInterface $categoryManager,
                                private SerializerInterface $serializer
        
    ) 
    {
        dd($this->categoryManager);
    }

    public function __invoke(Category $category): Category
    {
   
        
        return $this->categoryManager->createNewCatagory($category, $this->getUser());
   
    }
}
