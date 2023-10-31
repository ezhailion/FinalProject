package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.StudentRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	StudentRepository studentRepo;

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
	public User updateOtherUser(String username, int userId, User updatedUser, int studentId) {
		User updatingUser = userRepo.findByUsername(username);
		User userToUpdate = userRepo.searchById(userId);
		Student studentWithUpdates = updatedUser.getStudent(); 
		Student studentToUpdate = studentRepo.findByWhoami_Username(userToUpdate.getUsername());
		if(updatingUser != null && userToUpdate != null) {
			studentToUpdate.setAccommodations(studentWithUpdates.getAccommodations());
			studentToUpdate.setNickname(studentWithUpdates.getNickname());
			studentRepo.saveAndFlush(studentToUpdate);
			userToUpdate.setStudent(studentToUpdate);
			
			userToUpdate.setFirstName(updatedUser.getFirstName());
			userToUpdate.setLastName(updatedUser.getLastName());
			userToUpdate.setEmail(updatedUser.getEmail());
			userToUpdate.setPhone(updatedUser.getPhone());
			userToUpdate.setImageUrl(updatedUser.getImageUrl());
			userToUpdate.setAboutMe(updatedUser.getAboutMe());
			System.out.println( studentWithUpdates +"studentWithUpdates********************************************************************studentWithUpdates");
			System.out.println( studentToUpdate +"studentToUpdate********************************************************************studentToUpdate");
//			userToUpdate.getStudent().setAccommodations(updatedUser.getStudent().getAccommodations());
//			userToUpdate.getStudent().setNickname(updatedUser.getStudent().getNickname());
			userRepo.saveAndFlush(userToUpdate);
		}
		
		return userToUpdate;
	}
}
