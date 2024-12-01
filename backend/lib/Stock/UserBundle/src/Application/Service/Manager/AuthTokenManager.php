<?php


namespace Stock\UserBundle\Application\Service\Manager;

use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Stock\UserBundle\Domain\Entity\User;
use Stock\UserBundle\Domain\Entity\AuthToken;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AuthTokenManager implements AuthTokenManagerInterface 
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher,
        private EntityManagerInterface $entityManager 
    )
    {
        
    }

    public function postAuthTokens($loginData): User
    {

       
        $user = $this->entityManager->getRepository(User::class)->findOneByUsername($loginData['username']);

      //  dd($loginData);
        if (!$user) {
            throw new \Exception('User not found');
        }
        
        $validPassword = $this->passwordHasher->isPasswordValid($user, $loginData['password']);


        if ($validPassword=== null) {
           // throw new BadRequestHttpException('le mot de passe n est pas validee.');
        }
        $user->setApiToken(base64_encode(random_bytes(50)));
       
        //$authToken->setCreatedAt(new \DateTimeImmutable('now')); 
        //$authToken->setUser($user);

        
        return  $user;
    }

}