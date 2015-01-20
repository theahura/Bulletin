
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