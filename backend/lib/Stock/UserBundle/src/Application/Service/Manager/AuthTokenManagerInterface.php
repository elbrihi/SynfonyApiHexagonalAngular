<?php

namespace Stock\UserBundle\Application\Service\Manager;

use Stock\UserBundle\Domain\Entity\User;


interface AuthTokenManagerInterface
{
    public function postAuthTokens(array $request ): User;
}