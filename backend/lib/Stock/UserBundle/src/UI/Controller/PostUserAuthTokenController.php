<?php

namespace Stock\UserBundle\UI\Controller;

use ApiPlatform\Exception\RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Stock\UserBundle\Domain\Entity\User;
use Stock\UserBundle\Domain\Entity\AuthToken;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Stock\UserBundle\Application\DTO\AuthTokenDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Stock\UserBundle\Application\Service\Manager\AuthTokenManagerInterface;

#[AsController]
final class PostUserAuthTokenController extends AbstractController
{

   
    public function __construct(private AuthTokenManagerInterface $authTokenManager )
    {
      
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return User
     */
    public function __invoke(Request $request): User
    {

        $loginData= json_decode($request->getContent(), true);

       /* if ($tokenValue === null) {
            throw new BadRequestHttpException('Token value is missing in the request.');
        }*/

       return  $this->authTokenManager->postAuthTokens($loginData);

        
        $authTokenDTO = new AuthTokenDTO
                      ($authToken->getUser()->getUsername()
                        ,$authToken->getValue(), 
                      ); 


        return $this->json($authTokenDTO);
       
    }
}