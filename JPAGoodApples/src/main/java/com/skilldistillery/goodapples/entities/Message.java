//!!!!!!!!!!! COMPLETE !!!!!!!!!

package com.skilldistillery.goodapples.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@Column(name="create_date")
	@CreationTimestamp
	private LocalDate createDate;
	
	@Column(name="last_update")
	@UpdateTimestamp
	private LocalDate lastUpdate;
	
	private Boolean enabled;
	
	@ManyToOne
	@JoinColumn(name="sender_id")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name="recipient_id")
	private User recipient;
	
	@ManyToOne
	@JoinColumn(name="message_id")
	private Message messageToReplyTo;
	
	@OneToMany(mappedBy = "messageToReplyTo")
	private List<Message> inReplyToMessages;
	
	//TODO: user and message relationships

	public Message() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDate getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDate createDate) {
		this.createDate = createDate;
	}

	public LocalDate getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(LocalDate lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public Message getMessageToReplyTo() {
		return messageToReplyTo;
	}

	public void setMessageToReplyTo(Message messageToReplyTo) {
		this.messageToReplyTo = messageToReplyTo;
	}

	public List<Message> getInReplyToMessages() {
		return inReplyToMessages;
	}

	public void setInReplyToMessages(List<Message> inReplyToMessages) {
		this.inReplyToMessages = inReplyToMessages;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Message other = (Message) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", createDate=" + createDate + ", lastUpdate="
				+ lastUpdate + ", enabled=" + enabled + "]";
	}
	
	

}
