package com.gauge.rest.webservices.restfulwebservices.githubapi;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.gauge.rest.webservices.restfulwebservices.todo.Todo;

import org.bson.Document;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GitHubResource {

	private GitHubHardCodedService githubservice;
	int[] team1week1data;
	int[] team1week2data;
	int[] team1week3data;// data is correct by now
	int[] team2week1data;
	int[] team2week2data;
	int[] team2week3data;// data is correct by now
	int[] team3week1data;
	int[] team3week2data;
	int[] team3week3data;// data is correct by now
	int totalCommitsTeam1 = 0;
	int totalCommitsTeam2 = 0;
	int totalCommitsTeam3 = 0;
	DbHandling db = new DbHandling();

	@PostMapping("/gitapi/teamone/{team1week1}/{team1week2}/{t3}")
	public void getAllgitTeam1Data(@PathVariable int[] team1week1, @PathVariable int[] team1week2,
			@PathVariable int[] t3) throws IOException, ParseException {
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		// database.createCollection("Team1");
		team1week1data = team1week1;
		team1week2data = team1week2;
		team1week3data = t3;

		MongoCollection<Document> collection = database.getCollection("Team1");
		collection.drop();
		Document document = new Document("title", "Week1").append("id", 1).append("Commits", team1week1data[0])
				.append("Addition", team1week1data[1]).append("Deletion", team1week1data[2]);
		collection.insertOne(document);

		Document document2 = new Document("title", "Week2").append("id", 2).append("Commits", team1week2data[0])
				.append("Addition", team1week2data[1]).append("Deletion", team1week2data[2]);
		collection.insertOne(document2);

		Document document3 = new Document("title", "Week3").append("id", 3).append("Commits", team1week3data[0])
				.append("Addition", team1week3data[1]).append("Deletion", team1week3data[2]);
		collection.insertOne(document3);

		System.out.println("NewHiTeam1");

		FindIterable<Document> team1docs = collection.find();
		MongoCursor<Document> cursor = team1docs.iterator();
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			totalCommitsTeam1 += commitCount;
		}

		System.out.println("TotalCommits Team 1: " + totalCommitsTeam1);
		mongoClient.close();
	}

	@PostMapping("/gitapi/teamtwo/{w1}/{w2}/{w3}")
	public void getAllgitTeam2Data(@PathVariable int[] w1, @PathVariable int[] w2, @PathVariable int[] w3)
			throws IOException, ParseException {
		// Thread.sleep(3000);
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase database = mongoClient.getDatabase("GitHubData");
		// database.createCollection("Team1");
		team2week1data = w1;
		team2week2data = w2;
		team2week3data = w3;
	// if(!test_cursor.hasNext()) {

		MongoCollection<Document> collection = database.getCollection("Team2");
		collection.drop();
		Document document = new Document("title", "Week1").append("id", 1).append("Commits", team2week1data[0])
				.append("Addition", team2week1data[1]).append("Deletion", team2week1data[2]);
		collection.insertOne(document);

		Document document2 = new Document("title", "Week2").append("id", 2).append("Commits", team2week2data[0])
				.append("Addition", team2week2data[1]).append("Deletion", team2week2data[2]);
		collection.insertOne(document2);

		Document document3 = new Document("title", "Week3").append("id", 3).append("Commits", team2week3data[0])
				.append("Addition", team2week3data[1]).append("Deletion", team2week3data[2]);
		collection.insertOne(document3);
		
		System.out.println("NewHiTeam2");
		FindIterable<Document> team2docs = collection.find();
		MongoCursor<Document> cursor = team2docs.iterator();
		// int totalCommits = 0;
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			totalCommitsTeam2 += commitCount;
		}

		System.out.println("TotalCommits Team 2: " + totalCommitsTeam2);
		mongoClient.close();
	}

	@PostMapping("/gitapi/teamthree/{w1}/{w2}/{w3}")
	public void getAllgitTeam3Data(@PathVariable int[] w1, @PathVariable int[] w2, @PathVariable int[] w3)
			throws IOException, ParseException {
		// Thread.sleep(3000);
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase database = mongoClient.getDatabase("GitHubData");
		// database.createCollection("Team1");
		team3week1data = w1;
		team3week2data = w2;
		team3week3data = w3;

		MongoCollection<Document> collection = database.getCollection("Team3");
		collection.drop();
		Document document = new Document("title", "Week1").append("id", 1).append("Commits", team3week1data[0])
				.append("Addition", team3week1data[1]).append("Deletion", team3week1data[2]);
		collection.insertOne(document);

		Document document2 = new Document("title", "Week2").append("id", 2).append("Commits", team3week2data[0])
				.append("Addition", team3week2data[1]).append("Deletion", team3week2data[2]);
		collection.insertOne(document2);

		Document document3 = new Document("title", "Week3").append("id", 3).append("Commits", team3week3data[0])
				.append("Addition", team3week3data[1]).append("Deletion", team3week3data[2]);
		collection.insertOne(document3);
		
		System.out.println("NewHiTeam3");
		FindIterable<Document> team3docs = collection.find();
		MongoCursor<Document> cursor = team3docs.iterator();
		// int totalCommits = 0;
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			totalCommitsTeam3 += commitCount;
		}

		System.out.println("TotalCommits Team 3: " + totalCommitsTeam3);
		mongoClient.close();
	}
}
