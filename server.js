
//Variables for database access
var pg = require("pg");

var conString = "pg://diagraphic:diagraphictech@rumblrdbinstance.ch4xhlbujkhp.us-east-1.rds.amazonaws.com:5432/diagraphic";

var client = new pg.Client(conString);

client.connect();

//Type: io; sets up server connection on localhost, channel 3001

var io = require('socket.io').listen(3003);


//On an io socket connection...
io.sockets.on('connection', function(socket) 
{
	socket.on('clientToServer', function(data)
	{
		if(!(data && data.name))
			serverError(socket, "Data did not have a name")

		serverHandler(socket, data)
	});

});

function serverError(socket, message)
{
	socket.emit('ServerToClient',{
		name: "Error",
		message: message
	});
}

function serverHandler(socket, incomingObj)
{
	if(incomingObj.name == "storeEventToDB")
	{
		storeEventToDB(incomingObj.eventObj)
	}
	else if(incomingObj.name == "requestFromDB")
	{
		if(incomingObj.type == "event")
		{
			eventData = requestEventFromDB(socket, incomingObj.query)
		}
			
	}
}

function storeEventToDB(eventObj)
{
	console.log(eventObj)
	client.query("CREATE TABLE IF NOT EXISTS events(eventName varchar(64), eventLocation varchar(64), eventStart time, eventEnd time, eventDate date)");
	client.query("INSERT INTO events(eventName, eventLocation, eventStart, eventEnd, eventDate) values($1, $2, $3, $4, $5)", [eventObj.name, eventObj.location, eventObj.start, eventObj.end, eventObj.date]);
}


function requestEventFromDB(socket, query)
{
	var query = client.query("SELECT eventName, eventLocation, eventStart, eventEnd, eventDate FROM events");

	query.on("row", function (row, result) 
	{
	    result.addRow(row);
	});

	query.on("end", function (result) 
	{
	    socket.emit('serverToClient', {
	    	name: "returnRequestedEvent",
	    	eventData: JSON.stringify(result.rows, null, "    ")
	    }) 
	});
}