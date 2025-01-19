<?php

namespace Stock\SupplierBundle\Infrastucture\Persistence\Doctrine\Processor\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Symfony\Validator\Validator;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use ApiPlatform\Validator\ValidatorInterface;
use Stock\SupplierBundle\Domain\Entity\Supplier;

class SupplierPostProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private Security $security ,
        private  ValidatorInterface  $validator
        
    )
    {
       
    }
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Supplier
    {
        

        $data->setUser($this->security->getUser());
        // Set the timestamps
        $data->setCreatedAt(new \DateTimeImmutable());
        $data->setUpdatedAt(new \DateTimeImmutable());
       
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
