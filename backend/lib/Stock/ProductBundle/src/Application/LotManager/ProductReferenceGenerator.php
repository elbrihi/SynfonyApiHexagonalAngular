<?php

namespace Stock\ProductBundle\Application\LotManager;

use DateTimeImmutable;
use  Stock\ProductBundle\Application\LotManager\ProductReferenceGeneratorInterface;

class ProductReferenceGenerator implements ProductReferenceGeneratorInterface
{
    public function generateLotReference(DateTimeImmutable $receptionDate,string $productName, int $lotNumber): string{
        
       
        $date = $receptionDate->format('Ym');
        $formattedName = strtoupper(str_replace(' ', '', $productName)); // Supprime espaces et majuscules
        $formattedLot = str_pad((string)$lotNumber, 3, '0', STR_PAD_LEFT); // Lot avec 3 chiffres
        $lot = "LOT";
        return sprintf('%s-%s_%s_%s',$lot, $formattedName, $date, $formattedLot);
       
    }
    public function generateSerialNumber(DateTimeImmutable $receptionDate,string $productName, int $serialId): string{
        $date = $receptionDate->format('Ym');
        $formattedName = strtoupper(str_replace(' ', '', $productName)); // Supprime espaces et majuscules
        $formattedSerial = str_pad((string)$serialId, 5, '0', STR_PAD_LEFT); // 5 chiffres pour le produit
        return sprintf('%s_%s_%s', $formattedName, $date, $formattedSerial);
        
    }
}