module.exports = function Route(app){
	
	var users = {};
	
	// route to the index page
	app.get('/', function(req,res){
		res.render('index', {users: users});
	});
	
	// when someone joins the chatroom
	app.io.route('got_a_new_user', function(req){
		users[req.sessionID] = {id: req.sessionID, name: req.data.name};
		req.io.broadcast('new_user', {name: req.data.name, users: users});
	});
	
	// when someone sends a message
	app.io.route('user_message', function(req){
		//users[req.sessionID] = {text: req.data.text};
		app.io.broadcast('updated_text', {name: req.data.name, text: req.data.text});
	});
	
	// when someone leaves the chatroom
	app.io.route('disconnect', function(req){
		req.io.broadcast('someone_left', {name: users[req.sessionID].name, users: users});
		delete users[req.sessionID];
	});
	
}

/*

E - emit
L - listen
B - broadcast

event			client				server
---------------------------------------
new user 		E got_new_user 		L got_new_user
recent chat 	L recent_chat_hist 	E recent_chat_hist
				L new_user_in_room 	B new_user_in_room
chat 			E chat 				L chat
update chat 	L update_chat 		B update_chat
log off 		(nothing)			L disconnect

*/