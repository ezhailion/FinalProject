package com.skilldistillery.goodapples.services;

import java.util.List;

import com.skilldistillery.goodapples.entities.Message;

public interface MessageService {

	List<Message> index(String username);
	
}