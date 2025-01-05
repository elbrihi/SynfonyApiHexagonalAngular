<?php 


namespace Stock\ProductBundle\Application\LotManager;

use DateTimeImmutable;

interface ProductReferenceGeneratorInterface
{
    public function generateLotReference(DateTimeImmutable $receptionDate,string $productName, int $lotNumber): string;
    public function generateSerialNumber(DateTimeImmutable $receptionDate,string $productName, int $serialId): string;
}