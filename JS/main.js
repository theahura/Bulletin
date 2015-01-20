
/*Filter by location*/

var NE = false; 

var N = false; 

var MW = false; 

var W = false; 

var S = false; 

var SW = false; 

/*
Filters out main panel items (in this case, the list of institutions that use calendars)
by preset attributes and attribute values. 

@param: clicked; boolean; true false if the filter value is on or off
@param: attrib; string; the type of attribute being searched for
@param: value; string; the required value to avoid filtration of the attribute being searched for
@param: dom; string; a selector for the dom object that contains the filter button clicker
@param: dom value; what the current html of the dom is
*/

function filter(clicked, attrib, value, dom, domvalue)
{
	//adds the check mark to the filter list
	if(clicked)
		$(dom).html("<i class=\"fa fa-check\"></i> " + domvalue);
	else
		$(dom).html(domvalue)

	var calendar_list = document.getElementsByClassName("calendar-name");
	
	//goes through the institution list, sets the right oSs to empty
	for(var i = 0; i < calendar_list.length; i++)
	{
		if(calendar_list[i].hasAttribute(attrib) && calendar_list[i].getAttribute(attrib) !== value)
		{
			if(clicked)
			{
				$(calendar_list[i]).fadeOut("fast");
			}
			else
			{
				$(calendar_list[i]).fadeIn("fast");
			}
		}
	}
}

//NE
$('.filter-NE').click(function(){

	NE = !NE; 

	filter(NE, "location", "NorthEast", '.filter-NE', "NorthEast");
});

//N
$('.filter-N').click(function(){

	N = !N; 

	filter(N, "location", "North", '.filter-N', "North");
});

//MW
$('.filter-MW').click(function(){

	MW = !MW; 

	filter(MW, "location", "MidWest", '.filter-MW', "MidWest");
});

//W
$('.filter-W').click(function(){

	W = !W; 

	filter(W, "location", "West", '.filter-W', "West");
});

//S
$('.filter-S').click(function(){

	S = !S; 

	filter(S, "location", "South", '.filter-S', "South");
});

//SW
$('.filter-SW').click(function(){

	SW = !SW; 

	filter(SW, "location", "SouthWest", '.filter-SW', "SouthWest");
});

/*Filter by institution*/

var Uni = false;

var School = false;

var Corp = false; 

var Other_Inst = false; 

//Uni
$('.filter-uni').click(function(){

	Uni = !Uni; 

	filter(Uni, "institution", "University", '.filter-uni', "University");
});

//School
$('.filter-school').click(function(){

	School = !School; 

	filter(School, "institution", "School", '.filter-school', "School");
});

//Corp
$('.filter-corp').click(function(){

	Corp = !Corp; 

	filter(Corp, "institution", "Corporation", '.filter-corp', "Corporation");
});

//Other
$('.filter-other').click(function(){

	Other_Inst = !Other_Inst; 

	filter(Other_Inst, "institution", "Other", '.filter-other', "Other");
});