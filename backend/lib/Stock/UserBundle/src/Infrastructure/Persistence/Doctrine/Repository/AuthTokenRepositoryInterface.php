<?php

namespace Stock\UserBundle\Infrastructure\Persistence\Doctrine\Repository;

use Stock\UserBundle\Domain\Entity\AuthToken;

interface AuthTokenRepositoryInterface
{
    public function findAuthTokenByValue(string $value): ?AuthToken;
}
