<?php

namespace Stock\UserBundle\Application\Security\Authenticator;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Stock\UserBundle\Domain\Entity\User;
use Stock\UserBundle\Domain\Entity\AuthToken;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\CustomCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\CredentialsInterface;
use Stock\UserBundle\Infrastructure\Persistence\Doctrine\Repository\AuthTokenRepositoryInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ApiTokenAuthenticator extends AbstractAuthenticator
{
     
    public function __construct(private EntityManagerInterface $entityManager  )
    {

    }
    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {

        return $request->headers->has('Authorization') && str_contains($request->headers->get('Authorization'),'Bearer ') ;
    }

    public function authenticate(Request $request): Passport
    {
       
        $apiToken = $request->headers->get('Authorization');
        if (null === $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }

        // implement your own logic to get the user identifier from `$apiToken`
        // e.g. by looking up a user in the database using its API key
        $userIdentifier = str_replace('Bearer ','',$apiToken);

        return new SelfValidatingPassport(new UserBadge($userIdentifier));

      
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
      
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        
        $data = [
            // you may want to customize or obfuscate the message first
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
    public function authenticate1(Request $request): Passport
    {
        $apiToken = $request->headers->get('X-AUTH-TOKEN');
        if (null === $apiToken) {
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }

        return new Passport(
            new UserBadge($apiToken, function (string $apiToken): ?UserInterface {
                // Load the user by the apiToken
                $user = $this->entityManager->getRepository(User::class)->findOneBy(['apiToken' => $apiToken]);

                if (!$user) {
                    throw new CustomUserMessageAuthenticationException('Invalid API token');
                }

                return $user;
            }),
            new CustomCredentials(
                function (string $credentials, UserInterface $user): bool {
                    return $user->getApiToken() === $credentials;
                },
                $apiToken
            )
        );
    }
}