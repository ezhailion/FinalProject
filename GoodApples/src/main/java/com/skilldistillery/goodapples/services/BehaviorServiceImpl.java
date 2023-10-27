package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Behavior;
import com.skilldistillery.goodapples.repositories.BehaviorRepository;

@Service
public class BehaviorServiceImpl implements BehaviorService {

	@Autowired
	private BehaviorRepository behaviorRepo;
	
	@Override
	public List<Behavior> index() {
		return behaviorRepo.findAll();
	}
	

}
