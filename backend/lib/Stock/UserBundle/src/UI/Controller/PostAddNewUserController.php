<?php
namespace Stock\UserBundle\UI\Controller;



use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



final class PostAddNewUserController extends AbstractController
{
    

    #[IsGranted("ROLE_ADMIN")]
    public function __invoke(Request $request)
    {

    }
}