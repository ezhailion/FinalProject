package com.skilldistillery.goodapples.services;

import com.skilldistillery.goodapples.entities.User;

public interface UserService  {
	User update (User user, int userId, String username);
	
	boolean disable (String username, int userId);
}