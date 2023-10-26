package com.skilldistillery.goodapples.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;

	@Override
	public User update(User user, int userId, String username) {
		User authenticatedUser = userRepo.findByUsername(username);
		
		User updatingUser = userRepo.searchById(userId);
		
		if (authenticatedUser != null && authenticatedUser.getId() == updatingUser.getId()) {
			if (updatingUser != null) {
				updatingUser.setFirstName(user.getFirstName());
				updatingUser.setLastName(user.getLastName());
				updatingUser.setDateOfBirth(user.getDateOfBirth());
				updatingUser.setUsername(user.getUsername());
				updatingUser.setPassword(user.getPassword());
				updatingUser.setEnabled(user.isEnabled());
				updatingUser.setRole(user.getRole());
				updatingUser.setEmail(user.getEmail());
				updatingUser.setPhone(user.getPhone());
				updatingUser.setImageUrl(user.getImageUrl());
				updatingUser.setAboutMe(user.getAboutMe());
				updatingUser.setGender(user.getGender());
				userRepo.saveAndFlush(updatingUser);
			}
		}
		else {
			updatingUser = null;
		}
		return updatingUser;
	}

	@Override
	public boolean disable(String username, int userId) {
		User userToDisable = userRepo.searchById(userId);
		User authUser = userRepo.findByUsername(username);
		if (authUser != null && authUser.getId() == userToDisable.getId()) {
			if( userToDisable != null) {
				userToDisable.setEnabled(false);
				userRepo.saveAndFlush(userToDisable);
				return true;
			}
		}
		return false;
	}
	
	

}
