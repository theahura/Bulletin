

var CurrentDate = new Date();

var CurrentMonth = CurrentDate.getMonth();

var CurrentYear = CurrentDate.getFullYear();

var CurrentDay = CurrentDate.getDate();

var CurrentDayText = CurrentDate.getDay();


//Calculate the day that appears on the calendar by taking the current DATE and modding by 7, 
//giving a day value; subtracting from the actual day value; and adding back; subtract one for array length vs position
var CalendarDay = CurrentDay + Math.abs(CurrentDayText - CurrentDay % 7) - 1;

$('.calendar').each(function(i){

	var monthText = "";
	var numDays = 31; 

	if(CurrentMonth === 0)
	{
		monthText = "January";
	}
	if(CurrentMonth === 1)
	{
		monthText = "February";
		if(CurrentYear % 4 === 0)
			numDays = 29;
		else
			numDays = 28;
	}
	if(CurrentMonth === 2)
	{
		monthText = "March";
	}
	if(CurrentMonth === 3)
	{
		monthText = "April";
		numDays = 30; 
	}
	if(CurrentMonth === 4)
	{
		monthText = "May";
	}
	if(CurrentMonth === 5)
	{
		monthText = "June";
		numDays = 30; 
	}
	if(CurrentMonth === 6)
	{
		monthText = "July";
	}
	if(CurrentMonth === 7)
	{
		monthText = "August";
	}
	if(CurrentMonth === 8)
	{
		monthText = "September";
		numDays = 30; 
	}
	if(CurrentMonth === 9)
	{
		monthText = "October";
	}
	if(CurrentMonth === 10)
	{
		monthText = "November";
		numDays = 30; 
	}
	if(CurrentMonth === 11)
	{
		monthText = "December";
	}

	$(this).find(".month").html(monthText);

	$(this).find(".year").html(CurrentYear);

	CurrentMonth++;

	if(CurrentMonth >= 12)
	{
		CurrentYear++;
		CurrentMonth = 0;
	}



	//nested for loops
	$(this).find(".day").each(function(index)
	{
		if(index >= CalendarDay && CurrentDay <= numDays)
		{
			$(this).html(CurrentDay);
			CurrentDay++;
			CalendarDay++;

			//allows for easy date searching
			$(this).attr("date", CurrentMonth + "_" + CurrentDay + "_" + CurrentYear);
		}
		else
		{
			$(this).css({"opacity":"0.4"});
		}
	});

	
	CalendarDay = CalendarDay % 7; 

	CurrentDay -= numDays;

});



$(".day").click(function(){
	$(".center-panel").fadeOut(250);
	$(".day-panel").fadeIn(250);
	$(".day-pick").fadeIn(250);
});

$(".day-add").click(function(){
	$(".new-event-panel").fadeIn(250);
});

$(".day-pick").click(function(){
	$(".center-panel").fadeIn(250);
	$(".day-panel").fadeOut(250);
	$(this).fadeOut(250);
});

$(".event-panel-cover").click(function(){
	$(".new-event-panel").fadeOut(250);
});	