
//Type: Socket; used to transfer data/commands to the student
socket = io('http://54.86.173.127:3003');

	/**
 * When the socket connects (receiving 'connect' as a command) 
 * it emits its room choice to the socket.io server, which 
 * then handles room delegation. 
 * 
 * This is done to ensure that multiple teachers only communicate with their own students
 * 
 * @Param: 'connect'; name of command that socket is listening for
 * @Param: function; callback upon receiving command
 */
socket.on('connect', function() 
{
	alert("Connected")
});

