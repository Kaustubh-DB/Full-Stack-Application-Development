package com.gauge.rest.webservices.restfulwebservices.githubapi;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.gauge.rest.webservices.restfulwebservices.todo.Todo;
import org.json.simple.JSONArray; 
import org.json.simple.JSONObject; 
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GitHubResource {

	private GitHubHardCodedService githubservice;
	
	
	@PostMapping("/gitapi/{team1week1}/{team1week2}/{t3}")
	public void getAllgitData(@PathVariable int [] team1week1, @PathVariable int [] team1week2,@PathVariable int[] t3) {
		// Thread.sleep(3000);
		
		String urlTeam1 = "https://api.github.com/repos/fabpot/symfony/stats/contributors";
		for(int i =0; i<team1week1.length;i++) {
		System.out.println(team1week1[i]);
		}
		System.out.println("******");
		for(int i =0; i<team1week2.length;i++) {
			System.out.println(team1week2[i]);
			}
		System.out.println("###########");
		for(int i =0; i<t3.length;i++) {
			System.out.println(t3[i]);
			}
	}

	
}
