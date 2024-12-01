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
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class LotPostProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private Security $security,
        private ProductReferenceGeneratorInterface $productReferenceGeneretor,
        private EntityManagerInterface $entityManager,
        private ClockInterface $clock,
        
    )
    {
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Lot
    {
            //Total Price=Total Quantity×Unit Price
            //Remaining Value=Remaining Quantity×Unit Price
            // Quantity Sold=Total Quantity−Remaining Quantity
            // Ensure the data is a Lot object before proceeding.
          
            // Parse the reception date if provided as a string in ISO 8601 format.
            
             
            $request = $context["request"];
            $lots = json_decode($request->getContent(), true);
            
            $productId = $uriVariables["productId"];

            $product = $this->entityManager->getRepository(Product::class)->findOneBy(
                [
                    'id' => $productId
                ]
            );

            $receptionDate = new \DateTimeImmutable($lots["receptionDate"]);
            
            $expirationDate = new \DateTimeImmutable($lots["expirationDate"]);
         
            $manufacturingDate = new \DateTimeImmutable($lots["manufacturingDate"]);

           
            $saleDate = new \DateTimeImmutable($lots["saleDate"]);

            $productName = $data->getProduct()->getProductName();
            $totalPrice = $data->getProduct()->getUnitPrice()*$lots["totalQuantity"];
            $totalPrice = (float) number_format($totalPrice, 2, '.', '');

            $productId = $data->getProduct()->getId();
            $productName = $data->getProduct()->getProductName();
            $unitPrice =  $data->getProduct()->getUnitPrice();
           
      
            $lotReference = $this->productReferenceGeneretor->generateLotReference($receptionDate,$productName, $productId);
           
           
            $data->setReceptionDate( $receptionDate);
            $data->setExpirationDate( $expirationDate);
            $data->setManufacturingDate( $manufacturingDate);
            
            $data->setSaleDate( $saleDate);
            $data->setTotalQuantity($lots["totalQuantity"]);
            $data->setRemainingQuantity($lots["totalQuantity"]);

           
            
            $data->setStatus($lots["status"]);
            $data->setComments($lots["comments"]);
            $data->setStorageLocation($lots["storageLocation"]);
            $data->setDeliveryNoteNumber($lots["deliveryNoteNumber"]);
            $data->setTotalPrice($totalPrice);
            $data->setOrderNumber($lots["orderNumber"]);
            $data->setSoldQuantity($lots["soldQuantity"]);
            $data->setOrderNumber("");
            $data->setLotReference("");
            $data->setSerialNumber("");

            
            $data->setUser($this->security->getUser());
            $data = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
           
            $newId = $data->getId();
            $serialNumber = $this->productReferenceGeneretor->generateSerialNumber($receptionDate,$productName, $newId);
            
            $data->setLotReference($lotReference);
            $data->setSerialNumber($serialNumber);
            $this->entityManager->flush();
           

           return $data;
            
               
    }

}
