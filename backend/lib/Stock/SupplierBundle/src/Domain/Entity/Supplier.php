<?php

namespace Stock\SupplierBundle\Domain\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\State\Provider\ReadProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stock\ProductBundle\Domain\Entity\Product;
use Stock\SupplierBundle\Domain\Repository\SupplierRepository;
use Stock\SupplierBundle\Infrastucture\Persistence\Doctrine\Processor\State\SupplierDeleteProcessor;
use Stock\SupplierBundle\Infrastucture\Persistence\Doctrine\Processor\State\SupplierPostProcessor;
use Stock\SupplierBundle\Infrastucture\Persistence\Doctrine\Processor\State\SupplierPutProcessor;
use Stock\UserBundle\Domain\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

use function PHPSTORM_META\map;

#[ORM\Entity(repositoryClass: SupplierRepository::class)]

#[ApiResource(
    order: ['id' => 'DESC'],
    operations: [
        new Post(
            security: "is_granted('ROLE_USER')",
            uriTemplate: "/create/new/supplier",
            processor: SupplierPostProcessor::class,
            normalizationContext: ['groups' => ['supplier:read']],
            denormalizationContext: ['groups' => ['supplier:write']],
        ),
        new Put(
            security: "is_granted('ROLE_USER')",
            uriTemplate: "/create/update/supplier/{id}",
            processor: SupplierPutProcessor::class,
            normalizationContext: ['groups' => ['supplier:read']],
            denormalizationContext: ['groups' => ['supplier:write']],
           
        ),
        new Delete(
            uriTemplate: "/create/delete/supplier/{id}",
            processor: SupplierDeleteProcessor::class,
        ),
        new Get(
            uriTemplate: "/get/supplier/{id}",
            normalizationContext: ['groups' => ['supplier:read']],
            denormalizationContext: ['groups' => ['supplier:write']],
        ),
        new GetCollection(
            uriTemplate: '/get/suppliers/by/paginations',
            paginationClientItemsPerPage: true,
            paginationItemsPerPage: true,
        ),
      
    ],
    paginationPartial: true,
   
)]
class Supplier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Supplier name cannot be empty.")]
    #[Assert\Length(max: 255, maxMessage: "Supplier name cannot exceed {{ limit }} characters.")]
    #[Groups(['supplier:read', 'supplier:write','product:read', 'product:write'])]
    private ?string $supplierName = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Unique identifier is required.")]
    #[Assert\Length(max: 255, maxMessage: "Unique identifier cannot exceed {{ limit }} characters.")]
    #[Groups(['supplier:read', 'supplier:write','product:read', 'product:write'])]
    private ?string $uniqueIdentifer = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Address cannot be empty.")]
    #[Groups(['supplier:read', 'supplier:write','product:read', 'product:write'])]
    private ?string $adresse = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Main contact is required.")]
    #[Groups(['supplier:read', 'supplier:write','product:read', 'product:write'])]
    private ?string $mainContact = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Email cannot be empty.")]
    #[Assert\Email(message: "The email '{{ value }}' is not a valid email.")]
    #[Groups(['supplier:read', 'supplier:write','product:read', 'product:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Phone number is required.")]
    #[Assert\Length(max: 15, maxMessage: "Phone number cannot exceed {{ limit }} characters.")]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?string $phoneNumber = null;

    #[ORM\Column]
    #[Assert\NotBlank(message: "Supplier type is required.")]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?string $supplierType = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Payment methods cannot be empty.")]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?string $paymentMethods = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Payment terms cannot be empty.")]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?string $paymentTerms = null;



    #[ORM\Column]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'suppliers')]
    #[Groups(['supplier:read', 'supplier:write'])]
    private ?User $user = null;

    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'supplier')]
    private Collection $product;


    public function __construct()
    {
        $this->product = new ArrayCollection();
    }




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSupplierName(): ?string
    {
        return $this->supplierName;
    }

    public function setSupplierName(string $supplierName): static
    {
        $this->supplierName = $supplierName;

        return $this;
    }

    public function getUniqueIdentifer(): ?string
    {
        return $this->uniqueIdentifer;
    }

    public function setUniqueIdentifer(string $uniqueIdentifer): static
    {
        $this->uniqueIdentifer = $uniqueIdentifer;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getMainContact(): ?string
    {
        return $this->mainContact;
    }

    public function setMainContact(string $mainContact): static
    {
        $this->mainContact = $mainContact;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getSupplierType(): ?string
    {
        return $this->supplierType;
    }

    public function setSupplierType(string $supplierType): static
    {
        $this->supplierType = $supplierType;

        return $this;
    }

    public function getPaymentMethods(): ?string
    {
        return $this->paymentMethods;
    }

    public function setPaymentMethods(string $paymentMethods): static
    {
        $this->paymentMethods = $paymentMethods;

        return $this;
    }

    public function getPaymentTerms(): ?string
    {
        return $this->paymentTerms;
    }

    public function setPaymentTerms(string $paymentTerms): static
    {
        $this->paymentTerms = $paymentTerms;

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

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

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

    /**
     * @return Collection<int, Product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->product->contains($product)) {
            $this->product->add($product);
            $product->setSupplier($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->product->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getSupplier() === $this) {
                $product->setSupplier(null);
            }
        }

        return $this;
    }





}
