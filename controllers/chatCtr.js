/**
 * Created by kristofer on 04.02.17.
 */
const config = require("config");
var User = require("../models/user.js");
var Sound = require("../lib/speach")
var fs = require("fs")

var chatCtr  = function(bot){

    return{
        makeChat:function(msg, cmd){
            var userTelId = msg.from.id;
            User.findByTelId(userTelId, function(err, user){
                if(err){
                    console.log("error");
                }else{
                    if(user){
                        User.updUsrLastCmd(user.telId, cmd, function(err){
                            if(err){
                                console.log("update com err");
                            }else{
                                bot.sendMessage(user.telId, "Введите имя пользователя  с которым хотите модать чат. Список пользователей доступен /getPeopleList");
                            }
                        });
                    }else{
                        bot.sendMessage(userTelId, "Пользователь не добавлен");
                    }
                }
            });
        },

        startChat: function(userId, withWhom){
            User.updUsrLastCmd(userId, "chating", function(err){
                if(err){
                    console.log("update com err");
                }else{
                    User.chatWith(userId, withWhom, function(err){
                       if(err){
                           console.log("error");
                       }else{
                           bot.sendMessage(userId, "го");

                       }
                    });
                }
            });
        },

        sendMessage: function(userId, text){
            User.findByTelId(userId, function(err, user){
                if(err){
                    console.log("error");
                }else{
                    var whomId = user.chatWith;
                    Sound.makeAudio(text, userId, function(filePath){

                        var option = {
                            parse_mode: "HTML"
                        };

                        bot.sendMessage(userId, "<i>Я</i>",option).then(function(){
                            bot.sendVoice(userId, filePath);
                        });

                        bot.sendMessage(whomId, "<i>"+ user.name +"</i>", option).then(function(){
                            bot.sendVoice(whomId, filePath);
                        });


                    });
                    // bot.sendVoice(msg.chat.id, "world.mp3")

                }
            });
        },

        joinToChat: function(name, userId){
            console.log("name", name);
            User.findByName(name, function(err, user){
                if(err){
                    console.log("chat create error");
                }else{
                    if(user){
                        console.log("user join", user);
                        var option = {
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{ text: 'Старт', callback_data: user.telId.toString() }],
                                    [{ text: 'Отмена', callback_data: 'cancel' }]
                                ]
                            })
                        };
                        bot.sendMessage(userId, "Начать чат с "+user.name, option);

                    }else{
                        bot.sendMessage(userId, "Пользователь не найден");
                    }
                }
            });

        }
    }

};

module.exports = chatCtr;