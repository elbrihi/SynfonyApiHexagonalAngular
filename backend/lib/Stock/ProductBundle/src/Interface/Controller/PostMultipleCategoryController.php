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
final class PostMultipleCategoryController extends AbstractController
{
   
    public function __construct(private CategoryManagerInterface $categoryManager,
                                private SerializerInterface $serializer
        
    ) 
    {
       // dd($this->categoryManager);
    }

    public function __invoke(Request $request)
    {
   

        $data = json_decode($request->getContent(), true);

        return $this->categoryManager->createMultipleCatagories($data, $this->getUser());
   
    }
}
