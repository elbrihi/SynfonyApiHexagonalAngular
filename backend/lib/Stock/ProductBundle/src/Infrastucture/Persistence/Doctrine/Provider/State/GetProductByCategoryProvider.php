<?php

namespace Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Provider\State;


use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ProductRepository;
use Stock\ProductBundle\Domain\Repository\ProductRepository as RepositoryProductRepository;
use Symfony\Component\HttpFoundation\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException as ExceptionNotFoundHttpException;

class GetProductByCategoryProvider implements ProviderInterface
{

    public function __construct(private RepositoryProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable
    {
        $categoryId = $uriVariables['categoryId'] ?? null;

        if (!$categoryId) {
            throw new ExceptionNotFoundHttpException('Category ID is required.');
        }

        return $this->productRepository->findBy(['category' => $categoryId], ['id' => 'DESC']);
    }
}