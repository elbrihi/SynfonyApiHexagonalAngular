<?php

namespace Stock\UserBundle\Domain\Entity;

use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Stock\UserBundle\UI\Controller\PostUserAuthTokenController;
use Stock\UserBundle\Infrastructure\Persistence\Doctrine\Repository\AuthTokenRepository;

#[ApiResource(
    
)]


#[ORM\Entity(repositoryClass: AuthTokenRepository::class)]

class AuthToken
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:authToken'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:authToken', 'write:authToken'])]
    private ?string $value = null;

    #[ORM\Column]
    #[Groups(['read:authToken', 'write:authToken'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'authTokens')]
    #[Groups(['read:authToken', 'write:authToken'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

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
