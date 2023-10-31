package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;

	@Override
	public User update(User user, String username) {
		System.out.println(username);	
		User updatingUser = userRepo.findByUsername(username);

		// User updatingUser = userRepo.searchById(userId);

		if (updatingUser != null) {
			updatingUser.setFirstName(user.getFirstName());
			updatingUser.setLastName(user.getLastName());
			updatingUser.setEmail(user.getEmail());
			updatingUser.setPhone(user.getPhone());
			updatingUser.setImageUrl(user.getImageUrl());
			updatingUser.setAboutMe(user.getAboutMe());
			userRepo.saveAndFlush(updatingUser);
		}
		return updatingUser;
	}

	@Override
	public boolean disable(String username, int userId) {
		User userToDisable = userRepo.searchById(userId);
		User authUser = userRepo.findByUsername(username);
		if (authUser != null && authUser.getId() != userToDisable.getId()) {
			if (userToDisable != null) {
				userToDisable.setEnabled(false);
				userRepo.saveAndFlush(userToDisable);
				return true;
			}
		}
		return false;
	}
	@Override
	public boolean disableSelf(String username) {
		User userToDisable = userRepo.findByUsername(username);
			if (userToDisable != null) {
				userToDisable.setEnabled(false);
				userRepo.saveAndFlush(userToDisable);
				return true;
			}
		return false;
	}

	@Override
	public Student getStudentByUsername(String username) {
		User user = userRepo.findByUsername(username);
		Student student = user.getStudent();
		return student;
	}

	@Override
	public List<Student> getAParentsKids(String parentUsername) {
		
		return userRepo.findByUsername(parentUsername).getParentsKids();
	}

	@Override
	public List<User> getAllTeachers() {
		return userRepo.findByRole("teacher");
	}

	@Override
	public List<User> getAllParents() {
		return userRepo.findByRole("parent");
	}
}
