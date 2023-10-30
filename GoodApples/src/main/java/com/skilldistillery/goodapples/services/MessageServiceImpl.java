package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Message;
import com.skilldistillery.goodapples.repositories.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepo;

	@Override
	public List<Message> index(String username) {
		return messageRepo.findBySender_UsernameOrRecipient_Username(username, username);
		
	}
	
}
