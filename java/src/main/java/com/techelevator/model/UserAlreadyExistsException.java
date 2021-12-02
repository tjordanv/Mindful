package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus( value = HttpStatus.NOT_ACCEPTABLE, reason = "User Already Exists.")
public class UserAlreadyExistsException extends RuntimeException {

}
