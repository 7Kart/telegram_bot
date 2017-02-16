var User = require("../models/user.js");
var config = require("config");
const stringUtils = require("../helpers/stringUtils");

var userCtr  = function(bot){
	
	return{
		test: function(msg){
			if(msg.chat){
                var fromId = msg.from.id;
                var option = {
                    // reply_markup:JSON.stringify({
                    //     inline_keyboard:config.get("keyBoard.commandList")
                    // })
                    parse_mode: "HTML"
                };
				bot.getChat(msg.chat.id).then(function(chat){
                    //bot.sendMessage(fromId, "<b>!</b>", option);
                    bot.sendVoice(msg.chat.id, "world.mp3")
				});				
			}
		},
        //add user to bot
		addToList:function(user, cb){
            if(user){
                var newUser = new User({
                    telId: user.id,
                    name: user.first_name
                });
                newUser.save(function(err, newUser){
                    if(err){
                        cb(err, null)
                    }else {
                        if(cb){
                            cb(null, newUser);
                        }
                    }
                });
            }else{
                console.log("no msg");
            }
		},

		getPeopleList: function(msg){
			if(msg.chat){
                User.getAll(function(err, usersList){
                    if(err){
                        console.log("err", err);
                    }
                    bot.sendMessage(msg.from.id, stringUtils.maskePeopleList(usersList));
                    console.log("usersList", usersList);
                })
			}else{
				bot.sendMessage(msg.from.id, "you are not in chat");
			}
		},

        deleteFromChat: function(msg){
            User.deleteByTelId(msg.from.id, function(err, data){
                if(err) {
                    throw err;
                }else{
                    bot.sendMessage(msg.from.id, msg.from.first_name+" удален из чата");
                }
            })
        },

        lastUserCommand:function(telId, cb){
            User.findByTelId(telId, function(err, user){
                if(err) {
                    cb(err, null);
                }else{
                    if (user) {
                        if (user.lastCommand !== undefined) {
                            cb(null, user.lastCommand)
                        } else {
                            cb(null, "empty");
                        }
                    } else {
                        cb(null, null);
                    }
                }
            });
        }



	}
};

module.exports = userCtr;