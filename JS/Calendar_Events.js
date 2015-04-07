/*
	An event object that can be created to keep track of events
	@param: name; string; the name of the event "Name"
	@param: location; string; the location of the event "Location"
	@param: start; string; the start time of the event "08:00:00"
	@param: end; string; the end time of the event "08:00:00"
	@param: date; string; the date of the event "2015-09-24"
*/
function Event(name, location, start, end, date)
{
	this.name = name
	this.location = location
	this.start = start
	this.end = end
	this.date = date
}


/*
	Add Event takes an event object and puts an event label in the right date at the right time. 

	@Param: event; obj; object that contains info necessary to add a new event.
		Event parameters include: 
			(hidden info)
			Institution; day/month/year - stored in database, used to identify what info to pull when a day is clicked
			startTime (rounded to lowest hour) + half_day (am/pm designation)
			tags[] (array of strings)
			(public info)
			hours
			name
			location
*/
function addEvent(inputEvent)
{
	var $EventObj = $("#Event_Template").clone();

	$EventObj.attr("id","");

	if(inputEvent.name)
		$EventObj.find(".file-name").html(inputEvent.name);

	if(inputEvent.hours)
		$EventObj.find(".event-time").html(inputEvent.hours);

	if(inputEvent.location)
		$EventObj.find(".event-location").html(inputEvent.location);

	if(inputEvent.tags)
	{
		for(var i = 0; i < inputEvent.tags.length; i++)
		{
			$EventObj.addClass(inputEvent.tags[i]);
		}
	}

	//half_day + startTime required info
	var startTimeClassName = inputEvent.half_day + "-" + inputEvent.startTime;

	$("." + startTimeClassName).append($EventObj);
}



//Submit button for a new event
$("#newEventForm").submit(function(e){
	var eventObj = extractEvent()
	storeEventToDB(eventObj)
	//fade out form and clear
	return false
})

/*
	Creates an event object by grabbing the data from the html divs and form
	@return: obj; contains the date, start and end times, name, location, and returns an obj composed of those things
*/
function extractEvent()
{
	var date = document.getElementById("eventDate").value

	var start = document.getElementById("eventStartTime").value

	var end = document.getElementById("eventEndTime").value

	var name = document.getElementById("eventName").value

	var location = document.getElementById("eventLocation").value

	var eventObj = new Event(name, location, start, end, date)

	return eventObj
}

/*
	Takes an event Obj (taken from extractEvent) and send it to the server
	
	@param: eventObj; type: event; a filled event object
*/
function storeEventToDB(eventObj)
{
	socket.emit("clientToServer", {
		name: "storeEventToDB",
		eventObj: eventObj
	});	
}

/*
	Sends the call to the server to request data from db
*/
function requestFromDB(query)
{
	socket.emit("clientToServer", {
		name: "requestFromDB", 
		type: "event",
		query: query
	})
}

function getEventFromDB(eventObj)
{
	addEvent(eventObj)
}




