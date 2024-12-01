<?php

namespace Stock\UserBundle\Application\DTO;

use Stock\UserBundle\Application\DTO\UserDTO;


class AuthTokenDTO 
{

    public function __construct(private ?string $userName, private ?string $value)
    {
      //  parent::__construct($userName );
    }
  
    /**
     * Get the value of value
     */ 
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set the value of value
     *
     * @return  self
     */ 
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }


    /**
     * Get the value of userName
     */ 
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * Set the value of userName
     *
     * @return  self
     */ 
    public function setUserName($userName)
    {
        $this->userName = $userName;

        return $this;
    }
}