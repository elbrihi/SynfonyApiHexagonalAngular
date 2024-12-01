<?php

namespace Stock\UserBundle\Domain\Entity;

use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Stock\ProductBundle\Domain\Entity\Category;
use Stock\ProductBundle\Domain\Entity\Lot;
use Stock\ProductBundle\Domain\Entity\Product;
use Stock\SupplierBundle\Domain\Entity\Supplier;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Stock\UserBundle\UI\Controller\PostAddNewUserController;
use Stock\UserBundle\UI\Controller\PostUserAuthTokenController;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Stock\UserBundle\Infrastructure\Persistence\Doctrine\Repository\UserRepository;

#[ApiResource(
    operations:[
        new Post(
            controller: PostAddNewUserController::class,
            uriTemplate: "/user/add",
            normalizationContext: ['groups' => ['read:user']],
            denormalizationContext: ['groups' => ['write:user']],

        ),
        new Post(
            controller: PostUserAuthTokenController::class,
            uriTemplate: "/user/auth-token",
            normalizationContext: ['groups' => ['read:authToken']],
            denormalizationContext: ['groups' => ['write:authToken']],

        ),
    ]
)]



#[ORM\Entity(repositoryClass: UserRepository::class)]



#[UniqueEntity('username')]
class User implements UserInterface , PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['category:read','read:user','write:user','product:read', 'product:write','supplier:read', 'supplier:write'])]
    private ?int $id = null;


    #[ORM\Column(length: 255)]
    #[Groups(['category:read','read:user','write:user','product:read', 'product:write','supplier:read', 'supplier:write'])]
    private ?string $username = null;


    #[ORM\Column]
    #[Groups(['category:read','read:user','write:user','product:read', 'product:write','supplier:read', 'supplier:write'])]
    private array $roles = [];

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:authToken', 'write:authToken'])]
    
    private ?string $apiToken = null;

    protected $plainPassword;

    #[ORM\OneToMany(targetEntity: Category::class, mappedBy: 'user')]
    private Collection $categories;

    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'user')]
    #[Groups(['read:user','write:user'])]
    private Collection $products;

    #[ORM\OneToMany(targetEntity: Supplier::class, mappedBy: 'user')]
    private Collection $suppliers;

    #[ORM\OneToMany(targetEntity: Lot::class, mappedBy: 'user')]
    private Collection $lot;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->products = new ArrayCollection();
        $this->suppliers = new ArrayCollection();
        $this->lot = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }


   
    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     *
     * @return void
     */
    public function eraseCredentials(): void
    {

    }

    /**
     * Returns the identifier for this user (e.g. username or email address).
     */
    public function getUserIdentifier(): string
    {
        return "";
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of plainPassword
     */ 
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * Set the value of plainPassword
     *
     * @return  self
     */ 
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * Get the value of apiToken
     */ 
    public function getApiToken()
    {
        return $this->apiToken;
    }

    /**
     * Set the value of apiToken
     *
     * @return  self
     */ 
    public function setApiToken($apiToken)
    {
        $this->apiToken = $apiToken;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->setUser($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        if ($this->categories->removeElement($category)) {
            // set the owning side to null (unless already changed)
            if ($category->getUser() === $this) {
                $category->setUser(null);
            }
        }

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
            $product->setUser($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getUser() === $this) {
                $product->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Supplier>
     */
    public function getSuppliers(): Collection
    {
        return $this->suppliers;
    }

    public function addSupplier(Supplier $supplier): static
    {
        if (!$this->suppliers->contains($supplier)) {
            $this->suppliers->add($supplier);
            $supplier->setUser($this);
        }

        return $this;
    }

    public function removeSupplier(Supplier $supplier): static
    {
        if ($this->suppliers->removeElement($supplier)) {
            // set the owning side to null (unless already changed)
            if ($supplier->getUser() === $this) {
                $supplier->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Lot>
     */
    public function getLot(): Collection
    {
        return $this->lot;
    }

    public function addLot(Lot $lot): static
    {
        if (!$this->lot->contains($lot)) {
            $this->lot->add($lot);
            $lot->setUser($this);
        }

        return $this;
    }

    public function removeLot(Lot $lot): static
    {
        if ($this->lot->removeElement($lot)) {
            // set the owning side to null (unless already changed)
            if ($lot->getUser() === $this) {
                $lot->setUser(null);
            }
        }

        return $this;
    }
}
