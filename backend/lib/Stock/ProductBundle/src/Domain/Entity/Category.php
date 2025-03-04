<?php

namespace Stock\ProductBundle\Domain\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Symfony\Messenger\Processor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stock\ProductBundle\Domain\Repository\CategoryRepository;
use Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Processor\State\CategoryPostProcessor;
use Stock\ProductBundle\Interface\Controller\PostCategoryController;
use Stock\ProductBundle\Interface\Controller\PostMultipleCategoryController;
use Stock\ProductBundle\Interface\Controller\PutCategoryController;
use Stock\UserBundle\Domain\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(
      security: "is_granted('ROLE_ADMIN')",
      operations: [
        new Post(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can add categories.',
            controller: PostCategoryController::class,
            uriTemplate: '/create/new/category',
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can modify categories.',
            controller: PutCategoryController::class,
            uriTemplate: '/update/exsting/category/{id}',
        ),
        new Post(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: 'Only admins can add categories.',
            processor: CategoryPostProcessor::class,
            uriTemplate: '/create/multiple/new/categories',
        ),
        new Get(
            security: "is_granted('ROLE_ADMIN')",
            uriTemplate: '/get/category/{id}'
        ),
        new GetCollection(
            uriTemplate: '/get/catageries',
            
        ),
        new Delete(
            uriTemplate: '/delete/category/{id}'
        ),
    ],
    normalizationContext: ['groups' => ['category:read']],
    denormalizationContext: ['groups' => ['category:write']]

)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique: true)]
    #[Groups(['category:read','product:read', 'product:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['category:read','product:read', 'product:write'])]
    private ?string $categoryName = null;

    #[ORM\Column]
    #[Groups(['category:read','product:read', 'product:write'])]
    private ?bool $categoryStatus = null;

    #[ORM\ManyToOne(inversedBy: 'categories')]
    #[Groups(['category:read',])]
    private ?User $user = null;

    
    ##[Link(toProperty: 'category')]
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category', orphanRemoval: true)]
    #[Groups('category:read','category:write')]
    private  $products ;


    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategoryName(): ?string
    {
        return $this->categoryName;
    }

    public function setCategoryName(string $categoryName): static
    {
        $this->categoryName = $categoryName;

        return $this;
    }

    public function isCategoryStatus(): ?bool
    {
        return $this->categoryStatus;
    }

    public function setCategoryStatus(bool $categoryStatus): static
    {
        $this->categoryStatus = $categoryStatus;

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
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }



}
