<?php

namespace Stock\ProductBundle\Domain\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\State\CreateProvider;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Stock\ProductBundle\Domain\Repository\LotRepository;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\LotPostProcessor;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\MultipleLotsPostProcessor;
use Stock\UserBundle\Domain\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LotRepository::class)]
#[ApiResource(
    order: ['id' => 'DESC'],
    operations: [
        new Post(
            uriTemplate: "/create/product/{productId}/lot",
            uriVariables: [
                'productId' => new Link(
                    fromClass: Product::class,
                    toProperty: 'product'
                ),
            ],
            processor: LotPostProcessor::class,
            provider: CreateProvider::class,
            normalizationContext: ['groups' => ['lot:read']],
            denormalizationContext: ['groups' => ['lot:write']],
            
        ),
        new Post(
            uriTemplate: "/create/multiples/lots",
            processor: MultipleLotsPostProcessor::class,
            normalizationContext: ['groups' => ['lot:read']],
            denormalizationContext: ['groups' => ['lot:write']],
            
        ),
        new Get(
            uriTemplate: "/get/lot/by/{id}",
            normalizationContext: ['groups' => ['lot:read']],
            denormalizationContext: ['groups' => ['lot:write']],
        ),
        new GetCollection(
            uriTemplate: '/get/lots/by/paginations',
            paginationClientItemsPerPage: true,
            paginationItemsPerPage: true,
        ),
        
    ],
    paginationPartial: true
)]
class Lot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['lot:read','lot:write'])]
    private ?string $serialNumber = null;

    #[ORM\Column]
    #[Groups(['lot:read','lot:write'])]
    private ?int $totalQuantity = null;

    #[ORM\Column]
    #[Groups(['lot:read','lot:write'])]
    private ?int $remainingQuantity = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['lot:read','lot:write'])]
    private ?\DateTimeInterface $receptionDate = null;


    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['lot:read','lot:write'])]
    private ?float $totalPrice = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['lot:read','lot:write'])]
    private ?\DateTimeInterface $expirationDate = null;


    #[ORM\Column]
    private ?bool $status = null;

    #[ORM\Column]
    #[Groups(['lot:read','lot:write'])]
    private ?string $comments = null;

    private ?int $productId = null ;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['lot:read','lot:write'])]
    private ?string $storageLocation = null;

    #[ORM\Column(length: 255)]
    #[Groups(['lot:read','lot:write'])]
    private ?string $lotReference = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['lot:read','lot:write'])]
    private ?string $deliveryNoteNumber = null;



    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['lot:read','lot:write'])]
    private ?\DateTimeInterface $saleDate = null;



    #[ORM\ManyToOne(inversedBy: 'lot')]
    #[Groups(['lot:read','lot:write'])]
    private ?Product $product = null;



    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['lot:read','lot:write'])]
    private ?\DateTimeInterface $manufacturingDate = null;

    #[ORM\Column(length: 255)]
    #[Groups(['lot:read','lot:write'])]
    private ?string $orderNumber = null;

    #[ORM\Column]
    #[Groups(['lot:read','lot:write'])]
    private ?int $soldQuantity = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable:true)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable:true)]
    private ?\DateTimeImmutable $modifiedAt = null;

    #[ORM\ManyToOne(inversedBy: 'lot')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSerialNumber(): ?string
    {
        return $this->serialNumber;
    }

    public function setSerialNumber(string $serialNumber): static
    {
        $this->serialNumber = $serialNumber;

        return $this;
    }

    public function getTotalQuantity(): ?int
    {
        return $this->totalQuantity;
    }

    public function setTotalQuantity(int $totalQuantity): static
    {
        $this->totalQuantity = $totalQuantity;

        return $this;
    }

    public function getRemainingQuantity(): ?int
    {
        return $this->remainingQuantity;
    }

    public function setRemainingQuantity(int $remainingQuantity): static
    {
        $this->remainingQuantity = $remainingQuantity;

        return $this;
    }

    public function getReceptionDate(): ?\DateTimeInterface
    {
        return $this->receptionDate;
    }

    public function setReceptionDate(\DateTimeInterface $receptionDate): static
    {
        $this->receptionDate = $receptionDate;

        return $this;
    }



    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(float $totalPrice): static
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(\DateTimeInterface $expirationDate): static
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }



    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(string $comments): static
    {
        $this->comments = $comments;

        return $this;
    }

    public function getStorageLocation(): ?string
    {
        return $this->storageLocation;
    }

    public function setStorageLocation(?string $storageLocation): static
    {
        $this->storageLocation = $storageLocation;

        return $this;
    }

    public function getLotReference(): ?string
    {
        return $this->lotReference;
    }

    public function setLotReference(string $lotReference): static
    {
        $this->lotReference = $lotReference;

        return $this;
    }

    public function getDeliveryNoteNumber(): ?string
    {
        return $this->deliveryNoteNumber;
    }

    public function setDeliveryNoteNumber(?string $deliveryNoteNumber): static
    {
        $this->deliveryNoteNumber = $deliveryNoteNumber;

        return $this;
    }


    public function getSaleDate(): ?\DateTimeInterface
    {
        return $this->saleDate;
    }

    public function setSaleDate(\DateTimeInterface $saleDate): static
    {
        $this->saleDate = $saleDate;

        return $this;
    }


    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

 
    public function getManufacturingDate(): ?\DateTimeInterface
    {
        return $this->manufacturingDate;
    }

    public function setManufacturingDate(\DateTimeInterface $manufacturingDate): static
    {
        $this->manufacturingDate = $manufacturingDate;

        return $this;
    }

    public function getOrderNumber(): ?string
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(string $orderNumber): static
    {
        $this->orderNumber = $orderNumber;

        return $this;
    }

    public function getSoldQuantity(): ?int
    {
        return $this->soldQuantity;
    }

    public function setSoldQuantity(int $soldQuantity): static
    {
        $this->soldQuantity = $soldQuantity;

        return $this;
    }

    public function getProductId(): ?int
    {
        return $this->productId;
    }

    public function setProductI(int $productId): void
    {
        
        $this->productId = $productId;
        
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getModifiedAt(): ?\DateTimeImmutable
    {
        return $this->modifiedAt;
    }

    public function setModifiedAt(\DateTimeImmutable $modifiedAt): static
    {
        $this->modifiedAt = $modifiedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
