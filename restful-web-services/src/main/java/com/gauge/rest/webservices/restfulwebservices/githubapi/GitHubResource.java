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

	int[] team1week1data;
	int[] team1week2data;
	int[] team1week3data;// data is correct by now
	int[] team2week1data;
	int[] team2week2data;
	int[] team2week3data;// data is correct by now
	int[] team3week1data;
	int[] team3week2data;
	int[] team3week3data;// data is correct by now
	int totalCommitsTeam1;
	int totalCommitsTeam2 = 0;
	int totalCommitsTeam3 = 0;
	int averageTeam1Week1 = 0;
	int averageTeam1Week2 = 0;
	int averageTeam1Week3 =0;
	int regularCommitsTeam1 = 0;
	int regularCommitsTeam2 = 0;
	int regularCommitsTeam3 = 0;
	
	int averageTeam2Week1 = 0;
	int averageTeam2Week2 = 0;
	int averageTeam2Week3 =0;
	
	int averageTeam3Week1 = 0;
	int averageTeam3Week2 = 0;
	int averageTeam3Week3 =0;

	@PostMapping("/gitapi/teamone/{team1week1}/{team1week2}/{t3}")
	public ArrayList<Integer> getAllgitTeam1Data(@PathVariable int[] team1week1, @PathVariable int[] team1week2,
			@PathVariable int[] t3) throws IOException, ParseException {
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase database = mongoClient.getDatabase("GitHubData");
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
		ArrayList<Integer> average = new ArrayList<Integer>();
		int totalCommitsTeamone=0;
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			totalCommitsTeamone += commitCount;
			int addition = doc.getInteger("Addition");
			int deletion = doc.getInteger("Deletion");
			int newLines = addition - deletion;
			int temp = (newLines/commitCount);
			average.add(temp);
		}
		totalCommitsTeam1=totalCommitsTeamone;
		
		int regularCommitsTeamOne=0;
		for(int i = 0; i<average.size();i++) {
			int tem = 0;
			
			averageTeam1Week1 = average.get(0);
			averageTeam1Week2 = average.get(1);
			averageTeam1Week3 = average.get(2);
			tem = average.get(i);
			//System.out.println(tem);
			if((average.get(i) < 40)) {
				regularCommitsTeamOne +=1;
			}
		}
		regularCommitsTeam1= regularCommitsTeamOne;
		
		System.out.println("TotalCommits Team 1: " + totalCommitsTeam1);
		System.out.println("Average Lines Committed Team 1: "+ averageTeam1Week1);
		System.out.println("Average Lines Committed Team 1: "+ averageTeam1Week2);
		System.out.println("Average Lines Committed Team 1: "+ averageTeam1Week3);
		System.out.println("Regular commits Team 1: "+ regularCommitsTeam1);
		
		mongoClient.close();
		return average;
		
	}

	@PostMapping("/gitapi/teamtwo/{w1}/{w2}/{w3}")
	public ArrayList<Integer> getAllgitTeam2Data(@PathVariable int[] w1, @PathVariable int[] w2, @PathVariable int[] w3)
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
		ArrayList<Integer> average = new ArrayList<Integer>();
		// int totalCommits = 0;
		int totalCommitsTeamtwo =0;
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			int addition = doc.getInteger("Addition");
			int deletion = doc.getInteger("Deletion");
			int newLines = addition - deletion;
			int temp = (newLines/commitCount);
			average.add(temp);
			totalCommitsTeamtwo += commitCount;
		}
		totalCommitsTeam2 = totalCommitsTeamtwo;
		
		int regularCommitsTeamTwo = 0;
		for(int i = 0; i<average.size();i++) {
			averageTeam2Week1 = average.get(0);
			averageTeam2Week2 = average.get(1);
			averageTeam2Week3 = average.get(2);
			if(average.get(i)<40) {
				regularCommitsTeamTwo +=1;
			}
		}
		regularCommitsTeam2 = regularCommitsTeamTwo;
		

		System.out.println("TotalCommits Team 2: " + totalCommitsTeam2);
		System.out.println("Average Lines Committed Team 2: "+ averageTeam2Week1);
		System.out.println("Average Lines Committed Team 2: "+ averageTeam2Week2);
		System.out.println("Average Lines Committed Team 2: "+ averageTeam2Week3);
		System.out.println("Regular commits Team 2: "+ regularCommitsTeam2);
		mongoClient.close();
		return average;
		
	}

	@PostMapping("/gitapi/teamthree/{w1}/{w2}/{w3}")
	public ArrayList<Integer> getAllgitTeam3Data(@PathVariable int[] w1, @PathVariable int[] w2, @PathVariable int[] w3)
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
		ArrayList<Integer> average = new ArrayList<Integer>();
		int totalCommitsTeamthree = 0;
		while (cursor.hasNext()) {
			Document doc = cursor.next();

			int commitCount = doc.getInteger("Commits");
			int addition = doc.getInteger("Addition");
			int deletion = doc.getInteger("Deletion");
			int newLines = addition - deletion;
			int temp = (newLines/commitCount);
			average.add(temp);
			totalCommitsTeamthree += commitCount;
			
		}
		totalCommitsTeam3 = totalCommitsTeamthree;
		
		int regularCommitsTeamThree = 0;
		for(int i = 0; i<average.size();i++) {
			averageTeam3Week1 = average.get(0);
			averageTeam3Week2 = average.get(1);
			averageTeam3Week3 = average.get(2);
			if(average.get(i)<40) {
				regularCommitsTeamThree +=1;
			}
		}
		regularCommitsTeam3 = regularCommitsTeamThree;

		System.out.println("TotalCommits Team 3: " + totalCommitsTeam3);		
		System.out.println("Average Lines Committed Team 3: "+ averageTeam3Week1);
		System.out.println("Average Lines Committed Team 3: "+ averageTeam3Week2);
		System.out.println("Average Lines Committed Team 3: "+ averageTeam3Week3);
		System.out.println("Regular commits Team 3: "+ regularCommitsTeam3);
		System.out.println("UPDATED "+ totalCommitsTeam1);
		mongoClient.close();
		
		return average;
	}
	
	@PostMapping("/gitapi/ranking")
	public String Ranking()
			throws IOException, ParseException {
		int num1 = totalCommitsTeam1;
		int num2 = totalCommitsTeam2;
		int num3 = totalCommitsTeam3;
		System.out.println("totalCommitsTeam1"+ totalCommitsTeam1);
		System.out.println("totalCommitsTeam2"+ totalCommitsTeam2);
		System.out.println("totalCommitsTeam3"+ totalCommitsTeam3);
		String rank = "";
		
		if ((num1 > num2 && num1 > num3))
        {
            if(num2 > num3)
            {
                return ("Team1" + ">" + "Team2" + ">" + "Team3");
            }
            else
                return ("Team1" + ">" + "Team3" + ">" + "Team2");
        }
        else if ((num2 > num1 && num2 > num3))
        {
            if(num1 > num3)
            {
                return("Team2" + ">" + "Team1" + ">" + "Team3");
            }
            else
                {
                return ("Team2" + ">" + "Team3" + ">" + "Team1");
                }
        }
        else if ((num3 > num1 && num3 > num2))
        {
            if(num1 > num2)
            {
                return("Team3" + ">" + "Team1" + ">" + "Team2");
            }
            else
                return("Team3" + ">" + "Team2" + ">" + "Team1");
        }
        else
        {	
            return("Please Reload for compute Ranking");
        }
 }
	
	@PostMapping("/gitapi/regularRanking")
	public String regularCommitsRanking()
			throws IOException, ParseException {
		int num1 = regularCommitsTeam1;
		int num2 = regularCommitsTeam2;
		int num3 = regularCommitsTeam3;
		
		int tc1 = totalCommitsTeam1;
		int tc2 = totalCommitsTeam2;
		int tc3 = totalCommitsTeam3;
		
		System.out.println("Regular Commits Team 1: "+ regularCommitsTeam1);
		System.out.println("Regular Commits Team 2: "+ regularCommitsTeam2);
		System.out.println("Regular Commits Team 3:"+ regularCommitsTeam3);
		
		if ((num1 > num2 && num1 > num3))
        {
            if(num2 > num3)
            {
                return("Team1" + ">" + "Team2" + ">" + "Team3");
            }
            else
                return("Team1" + ">" + "Team3" + ">" + "Team2");
        }
        else if ((num2 > num1 && num2 > num3))
        {
            if(num1 > num3)
            {
                return("Team2" + ">" + "Team1" + ">" + "Team3");
            }
            else
                {
                return("Team2" + ">" + "Team3" + ">" + "Team1");
                }
        }
        else if ((num3 > num1 && num3 > num2))
        {
            if(num1 > num2)
            {
                return("Team3" + ">" + "Team1" + ">" + "Team2");
            }
            else
                return("Team3" + ">" + "Team2" + ">" + "Team1");
        }
		
        else if ((num1 == num2 && num1 > num3))
        {
            if(tc1 > tc2)
            {
                return("Team1" + ">" + "Team2" + ">" + "Team3");
            }
            else
               return("Team2" + ">" + "Team1" + ">" + "Team3");
        }
        else if ((num2 == num3 && num2 > num1))
        {
            if(tc2 > tc3)
            {
                return("Team2" + ">" + "Team3" + ">" + "Team1");
            }
            else
                {
               return("Team3" + ">" + "Team2" + ">" + "Team1");
                }
        }
        else if ((num1 == num3 && num1 > num2))
        {
            if(tc1 > tc3)
            {
               return("Team1" + ">" + "Team3" + ">" + "Team2");
            }
            else
                return("Team3" + ">" + "Team1" + ">" + "Team2");
        }
		
		
        else
        {	
            return("Please Reload the Page for Computing the Regular Ranking!");
        }
		
	}
	
	
		
	
		
}
