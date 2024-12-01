<?php

namespace Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Clock\ClockInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\ProductBundle\Domain\Entity\Product;
use Stock\SupplierBundle\Domain\Entity\Supplier;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class MultipleProductsPostProcessor implements ProcessorInterface
{
    // providers
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private Security $security, 
        private EntityManagerInterface $entityManager,
        private ClockInterface $clock, 
        
    )
    {
        
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
     
        $request = $context["request"];
        $products = json_decode($request->getContent(), true);
        
        for($i = 0 ; $i < sizeof( $products); $i++){
            $product = new Product();
            
            $categoryId = $products[$i]["categoryId"];
            $supplierId = $products[$i]["supplierId"];
              
            $category = $this->entityManager->getRepository(Category::class)->findOneBy([
                  'id'=> $categoryId
              ]);
  
            $supplier = $this->entityManager->getRepository(Supplier::class)->findOneBy([
                  'id'=> $supplierId
              ]);
            $this->clock->now();
            $product->setProductName($products[$i]["productName"]);
            $product->setProductDescription($products[$i]["productDescription"]);
            $product->setProductTax($products[$i]["productTax"]);
           
            $product->setUnitPrice($products[$i]["unitPrice"]);
   
            $product->setStatus($products[$i]["status"]);
      
            $product->setCreatedAt($this->clock->now());
            $product->setModifiedAt($this->clock->now());
            $product->setCategory($category);
            $product->setSupplier($supplier);
            $product->setUser($this->security->getUser());
            $this->persistProcessor->process( $product, $operation, $uriVariables, $context);
        }
       
    
    }
}
