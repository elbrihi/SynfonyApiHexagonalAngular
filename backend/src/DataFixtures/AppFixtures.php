<?php

namespace App\DataFixtures;

use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Stock\UserBundle\Domain\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }
    public function load(ObjectManager $manager): void
    {
        //php bin/console doctrine:fixtures:load
        $user = new User();
        $user->setUsername('admin');
        $user->setRoles(['ROLE_ADMIN', 'ROLE_USER']);
        
        $plaintextPassword = "admin";

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setApiToken(base64_encode(random_bytes(50)));
        $user->setPassword($hashedPassword);

        $manager->persist($user);
        
        $manager->flush();


        $user = new User();
        $user->setUsername('user');
        $user->setRoles(['ROLE_USER']);
        
        $plaintextPassword = "user";

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setApiToken(base64_encode(random_bytes(50)));
        $user->setPassword($hashedPassword);

        $manager->persist($user);
        
        $manager->flush();

    }
}
