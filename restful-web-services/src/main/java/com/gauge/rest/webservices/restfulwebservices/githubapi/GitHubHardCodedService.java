package com.gauge.rest.webservices.restfulwebservices.githubapi;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.gauge.rest.webservices.restfulwebservices.todo.Todo;

@Component
public class GitHubHardCodedService {

	
	private static List<GitHub> gitdata = new ArrayList<>();
	private static long idCounter = 0;

	static {
		gitdata.add(new GitHub(++idCounter, "Darshan", "", new Date(), false));
		gitdata.add(new GitHub(++idCounter, "Vidit", "", new Date(), false));
	}
	
	public List<GitHub> findAll() {
		return gitdata;
	}
}
