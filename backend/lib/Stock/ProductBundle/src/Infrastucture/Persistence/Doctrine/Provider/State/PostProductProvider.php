<?php

namespace Stock\ProductBundle\Infrastucture\Persistence\Doctrine\Provider\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Stock\ProductBundle\Domain\Entity\Product;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class PostProductProvider  implements ProviderInterface 
{

    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private ProviderInterface $itemProvider,
    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Retrieve the state from somewhere
        $request = $context["request"];

        return null;
    }
}
