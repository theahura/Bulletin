/*File handles all of the incoming data from the server, and passes it to the right spot*/
socket.on("serverToClient", function(data)
{
	if(data.name == "Error")
	{
		alert("Error: " + data.message)
	}
	else if(data.name == "returnRequestedEvent")
	{
		handleReturnedEvent(data.eventData)
	}

	
});


function handleReturnedEvent(incomingObj)
{
	console.log(incomingObj)
}