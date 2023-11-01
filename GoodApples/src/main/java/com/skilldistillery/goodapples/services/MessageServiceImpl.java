package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Message;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.MessageRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Message> index(String username) {
		return messageRepo.findBySender_UsernameOrRecipient_Username(username, username);
		
	}

	@Override
	public Message create(String username, Message message, int recipientId) {
		User sender = userRepo.findByUsername(username);
		User recipient = userRepo.searchById(recipientId);
		if(sender != null && recipient != null) {
			message.setSender(sender);
			message.setRecipient(recipient);
			message.setEnabled(true);
			return messageRepo.saveAndFlush(message);
		}
		return null;
	}
	
	@Override
	public List<Message> getInReplyTo(int messageId) {
		
		Message msg = messageRepo.searchById(messageId);
		return msg.getInReplyToMessages();
		
	}

	@Override
	public Message updateRead(Message message) {
		Message messageToUpdate = messageRepo.searchById(message.getId());
		
		messageToUpdate.setSeen(message.getSeen());

		
		return messageRepo.saveAndFlush(messageToUpdate);
	}
	
	@Override
	public Message updateThreadRead(Message message) {
		Message messageToUpdate = messageRepo.searchById(message.getId());
		
		setAllSeen(messageToUpdate, message);

		
		return messageRepo.saveAndFlush(messageToUpdate);
	}
	
	public void setAllSeen(Message toUpdate, Message updateFrom) {
		if (toUpdate == null || updateFrom == null) {
			return;
		} else {
			toUpdate.setSeen(updateFrom.getSeen());
			setAllSeen(toUpdate.getMessageToReplyTo(), updateFrom.getMessageToReplyTo());
		}
	}
	

}
