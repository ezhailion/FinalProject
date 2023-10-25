package com.skilldistillery.goodapples.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Gender;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User register(User user) {
		//delete later
		Gender g = new Gender();
		g.setId(1);
		user.setGender(g);
		
		user.setEnabled(true);
		String encrypted = encoder.encode(user.getPassword());
		user.setPassword(encrypted);
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

}