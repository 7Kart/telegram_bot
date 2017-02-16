var Router  = function(bot){
	
	var userCtr = require('./controllers/userCtr.js')(bot);
    var funcCtr = require('./controllers/funcCtr')(bot);
    var chatCtr = require('./controllers/chatCtr')(bot);

    bot.onText(/\/(.+)/, function (msg, match) {
		textMsg = match[1];
		if(textMsg == "test"){
			userCtr.test(msg);
		}else if(textMsg == "getPeopleList"){
			userCtr.getPeopleList(msg);
		}else if(textMsg == "commandList"){
            funcCtr.help(msg);
        }else if(textMsg == "deleteFromChat"){
            userCtr.deleteFromChat(msg);
		}else if(textMsg == "help"){
            funcCtr.help(msg);
        }else if(textMsg == "makeChat"){
            chatCtr.makeChat(msg, textMsg);
        }else{
            funcCtr.help(msg);
		}
	});

    bot.on('callback_query',function(msg){
        console.log("callback query", msg);
        if (msg.data != "cancel"){
            chatCtr.startChat(msg.from.id, 1*msg.data);
        }
        bot.answerCallbackQuery(msg.id, "click", false)

    });

    bot.on("message", function(msg){
        if(msg.text[0]!= "/") {
            var userId = msg.from.id;
            userCtr.lastUserCommand(userId, function (err, lastCommand) {
                if (err) {
                    console.log("make err hendler");
                } else {
                    if(!lastCommand){
                        var user = msg.from;
                        userCtr.addToList(user, function (err, newUser) {
                           if(err){
                               console.log("make err hendler");
                           }else{
                               funcCtr.firstEnter(newUser);
                           }
                        });
                    }else{
                        console.log("lastCommand",lastCommand);
                       //last command detexted
                        if(lastCommand == "makeChat"){
                            chatCtr.joinToChat(msg.text, msg.from.id)
                        }else if(lastCommand == "chating"){
                            chatCtr.sendMessage(msg.from.id, msg.text);
                        }
                    }
                }
            });
        }
    });
};




module.exports = Router;
