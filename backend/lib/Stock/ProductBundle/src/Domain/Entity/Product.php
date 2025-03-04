<?php

namespace Stock\ProductBundle\Domain\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stock\ProductBundle\Domain\Repository\ProductRepository;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\MultipleProductsPostProcessor;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\ProductPostProcessor;
use Stock\SupplierBundle\Domain\Entity\Supplier;
use Stock\UserBundle\Domain\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\ProductPutProcessor;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Provider\State\PostProductProvider;

#[ORM\Entity(repositoryClass: ProductRepository::class)]


#[ApiResource(
    order: ['id' => 'DESC'],
    operations:[
            new Post(
                security: "is_granted('ROLE_USER')",
                uriTemplate:'/create/new/category/{categoryId}/supplier/{supplierId}/products',
                uriVariables: [
                    'categoryId' => new Link(
                        fromClass: Category::class,
                        toProperty: 'category'
                    ),
                    'supplierId' => new Link(
                        fromClass: Supplier::class,
                        toProperty: 'supplier'
                    ),
 

                ],
                processor: ProductPostProcessor::class,
                provider: PostProductProvider::class, 
                normalizationContext: ['groups' => ['product:read']],
                denormalizationContext: ['groups' => ['product:write']],
            ),
            new Get(
                uriTemplate: "/get/product/{id}",
                normalizationContext: ['groups' => ['product:read']],
                denormalizationContext: ['groups' => ['product:write']],
            ),
            new Post(
                security: "is_granted('ROLE_USER')",
                uriTemplate: "/create//multiple/new/products",
                processor: MultipleProductsPostProcessor::class
            ),
            new GetCollection(
                uriTemplate: '/get/products/by/paginations',
                paginationClientItemsPerPage: true,
                paginationItemsPerPage: true,

            ),
            new Put(
                security: "is_granted('ROLE_USER')",
                uriTemplate: "/update/product/{id}",
                processor: ProductPutProcessor::class

            )
            
        ],
        paginationPartial: true,
       
        
)]
#[ApiResource(
    uriTemplate:'/create/new/categories/{categoryId}/products',
    uriVariables: [
        'categoryId' => new Link(
            fromClass: Category::class,
            toProperty: 'category'
        ),

    ],
    processor: ProductPostProcessor::class,

    operations: [new GetCollection(), new Post()]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique: true)]
    #[Groups(['category:read','category:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?string $productName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?string $productDescription = null;


    #[ORM\Column]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?float $productTax = null;


    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    #[ORM\JoinColumn( nullable: false)]
    
    #[ORM\Column]
    
    private ?float $unitPrice = null;


    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['category:read','category:write','product:read', 'product:write'])]
    private ?User $user = null;

    private ?int $categoryId = null ;

    private ?int $supplierId = null ;

    #[ORM\Column]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    public ?bool $status = true;

    #[ORM\Column]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?\DateTimeImmutable $modifiedAt = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'lots')]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?self $product = null;

    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'product')]
    #[Groups(['category:read','category:write','product:read', 'product:write','product:read', 'product:write'])]
    private Collection $lots;

    #[ORM\OneToMany(targetEntity: Lot::class, mappedBy: 'product')]
    private Collection $lot;

    #[ORM\ManyToOne(inversedBy: 'product')]
    #[Groups(['category:read','category:write','product:read', 'product:write','lot:read','lot:write'])]
    private ?Supplier $supplier = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'products')]
    
    private ?Category $category = null;


    public function __construct()
    {
        $this->lots = new ArrayCollection();
        $this->lot = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductName(): ?string
    {
        return $this->productName;
    }

    public function setProductName(string $productName): static
    {
        $this->productName = $productName;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getProductDescription(): ?string
    {
        return $this->productDescription;
    }

    public function setProductDescription(?string $productDescription): static
    {
        $this->productDescription = $productDescription;

        return $this;
    }



    public function getProductTax(): ?float
    {
        return $this->productTax;
    }

    public function setProductTax(float $productTax): static
    {
        $this->productTax = $productTax;

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



    public function setSategoryId(?int $categoryId): void
    {
       
        $this->categoryId = $categoryId;
    
    }

    public function getSategoryId(): int{
       
        return  $this->categoryId ;
    
    }

    public function setSupplierId(?int $supplierId): void
    {
       
        $this->$supplierId = $supplierId;
    
    }

    public function getSupplierId(): int{
       
        return  $this->supplierId ;
    
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
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

    public function getProduct(): ?self
    {
        return $this->product;
    }

    public function setProduct(?self $product): static
    {
        $this->product = $product;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getLots(): Collection
    {
        return $this->lots;
    }

    public function addLot(self $lot): static
    {
        if (!$this->lots->contains($lot)) {
            $this->lots->add($lot);
            $lot->setProduct($this);
        }

        return $this;
    }

    public function removeLot(self $lot): static
    {
        if ($this->lots->removeElement($lot)) {
            // set the owning side to null (unless already changed)
            if ($lot->getProduct() === $this) {
                $lot->setProduct(null);
            }
        }

        return $this;
    }

    public function getUnitPrice(): ?float
    {
        return $this->unitPrice;
    }

    public function setUnitPrice(float $unitPrice): static
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }

    /**
     * @return Collection<int, Lot>
     */
    public function getLot(): Collection
    {
        return $this->lot;
    }

    public function getSupplier(): ?Supplier
    {
        return $this->supplier;
    }

    public function setSupplier(?Supplier $supplier): static
    {
        $this->supplier = $supplier;

        return $this;
    }




}
