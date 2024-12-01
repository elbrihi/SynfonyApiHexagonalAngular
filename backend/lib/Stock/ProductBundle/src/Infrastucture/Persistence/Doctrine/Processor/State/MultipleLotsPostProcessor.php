<?php

namespace Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Clock\ClockInterface;
use Stock\ProductBundle\Application\LotManager\ProductReferenceGeneratorInterface;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\ProductBundle\Domain\Entity\Lot;
use Stock\ProductBundle\Domain\Entity\Product;
use Stock\SupplierBundle\Domain\Entity\Supplier;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class MultipleLotsPostProcessor implements ProcessorInterface
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
        private ProductReferenceGeneratorInterface $productReferenceGeneretor,
        
    )
    {
        
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
     
        $request = $context["request"];

        $lots = json_decode($request->getContent(), true);

        
        for($i = 0 ; $i < sizeof($lots); $i++)
        {
            $lot = new Lot();
            $product = $this->entityManager->getRepository(Product::class)->findOneBy(
                [
                    'id' => $lots[$i]["productId"]
                ]
            );


            $receptionDate = new \DateTimeImmutable($lots[$i]["receptionDate"]);
            
            $expirationDate = new \DateTimeImmutable($lots[$i]["expirationDate"]);
         
            $manufacturingDate = new \DateTimeImmutable($lots[$i]["manufacturingDate"]);

           
            $saleDate = new \DateTimeImmutable($lots[$i]["saleDate"]);

            $totalPrice =  $product->getUnitPrice()*$lots[$i]["totalQuantity"];
            
            $totalPrice = (float) number_format($totalPrice, 2, '.', '');

            $productId = $product->getId();
            
            $productName = $product->getProductName(); 
            

            $lotReference = $this->productReferenceGeneretor->generateLotReference($receptionDate,$productName, $productId);

            $lot->setReceptionDate( $receptionDate);
            $lot->setExpirationDate( $expirationDate);
            $lot->setManufacturingDate( $manufacturingDate);
            
            $lot->setSaleDate( $saleDate);
            $lot->setTotalQuantity($lots[$i]["totalQuantity"]);
            $lot->setRemainingQuantity($lots[$i]["totalQuantity"]);

           
            
           // $lot->setUnitPrice((float)$lots[$i]["unitPrice"]);
            $lot->setStatus($lots[$i]["status"]);
            $lot->setComments($lots[$i]["comments"]);
            $lot->setStorageLocation($lots[$i]["storageLocation"]);
            $lot->setDeliveryNoteNumber($lots[$i]["deliveryNoteNumber"]);
            $lot->setTotalPrice($totalPrice);
            $lot->setOrderNumber($lots[$i]["orderNumber"]);
            $lot->setSoldQuantity($lots[$i]["soldQuantity"]);
            $lot->setOrderNumber("");
            $lot->setLotReference("");
            $lot->setSerialNumber("");

            $data = $this->persistProcessor->process($lot, $operation, $uriVariables, $context);
           
            $newId = $lot->getId();
            $serialNumber = $this->productReferenceGeneretor->generateSerialNumber($receptionDate,$productName, $newId);
            
            $lot->setLotReference($lotReference);
            $lot->setSerialNumber($serialNumber);
            $this->entityManager->flush();
            
            
           
        }




    
    }
}
