package com.gauge.rest.webservices.restfulwebservices.githubapi;

import java.io.IOException;
import java.text.ParseException;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class DbHandling {
	
	public void loadDataToMongoDB() throws IOException, ParseException {
		 
	}
	
	public static void main(String[] args) {
		MongoClient mc = new MongoClient("localhost", 27017);
		MongoDatabase database = mc.getDatabase("myDbTest");
	}
}
