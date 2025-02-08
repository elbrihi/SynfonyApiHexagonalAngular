<?php

namespace Stock\ProductBundle\Interface\Controller;

use Stock\ProductBundle\Application\Manager\CategoryManagerInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
final class PutCategoryController extends AbstractController
{
   
    public function __construct(private CategoryManagerInterface $categoryManager,
                                private SerializerInterface $serializer
        
    ) 
    {
       // dd($this->categoryManager);
    }

    public function __invoke(Category $category, Request $request): Category
    {
   
        $data = json_decode($request->getContent(), true);
        $data->setCreatedAt(new \DateTimeImmutable());
        $data->setUpdatedAt(new \DateTimeImmutable());
        return $this->categoryManager->updateCategory($category, $this->getUser(), $data);
   
    }
}
