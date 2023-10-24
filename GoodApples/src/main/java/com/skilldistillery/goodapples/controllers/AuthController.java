package com.skilldistillery.goodapples.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.services.AuthService;

@RestController
@CrossOrigin({"*", "http://localhost/"})
public class AuthController {
  @Autowired
  private AuthService authService;
}