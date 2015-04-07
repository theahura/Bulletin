#!/usr/bin/env node

var pg = require("pg");

var conString = "pg://diagraphic:diagraphictech@rumblrdbinstance.ch4xhlbujkhp.us-east-1.rds.amazonaws.com:5432/diagraphic";

var client = new pg.Client(conString);

client.connect();


client.query("CREATE TABLE IF NOT EXISTS events(eventName varchar(64), eventLocation varchar(64), eventStart time, eventEnd time, eventDate date)");

client.query("INSERT INTO events(eventName, eventLocation, eventStart, eventEnd, eventDate) values($1, $2, $3, $4, $5)", ['event1', 'lerner', '03:00:00', '04:00:00', '2015-03-21']);

client.query("INSERT INTO events(eventName, eventLocation, eventStart, eventEnd, eventDate) values($1, $2, $3, $4, $5)", ['event2', 'lowe', '05:00:00', '08:00:00', '2015-05-21']);

var query = client.query("SELECT eventName, eventLocation, eventStart, eventEnd, eventDate FROM events");

query.on("row", function (row, result) 
{
	console.log(row);
	console.log(result);
    result.addRow(row);
});

query.on("end", function (result) 
{

	console.log("HELLO")
	console.log(result.rows)
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

client.query("DROP TABLE events")
