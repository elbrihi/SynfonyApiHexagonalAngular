<?php

namespace Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class CategoryPostProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private Security $security 
        
    )
    {
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $request = $context["request"];
        
        $categories = json_decode($request->getContent(), true);
        foreach($categories as $category)
        {
            $newCategory = new Category();
            $newCategory->setCategoryName($category['categoryName']);
            $newCategory->setCategoryStatus($category['categoryStatus']);
            $newCategory->setUser($this->security->getUser());
             $this->persistProcessor->process($newCategory, $operation, $uriVariables, $context);
        }
        
    }
}
