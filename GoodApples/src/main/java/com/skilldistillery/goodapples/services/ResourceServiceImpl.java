package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Resource;
import com.skilldistillery.goodapples.repositories.ResourceRepository;

@Service
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceRepository resourceRepo;
	
	@Override
	public List<Resource> index() {
		return resourceRepo.findAll();
	}

}
