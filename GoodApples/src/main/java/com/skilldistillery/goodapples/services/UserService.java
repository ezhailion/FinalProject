package com.skilldistillery.goodapples.services;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;

public interface UserService  {
	User update (User user, String username);
	
	boolean disable (String username, int userId);

	boolean disableSelf(String username);
	
	Student getStudentByUsername(String username);
	
	
}
