const config = require("config");
const stringUtils = require("../helpers/stringUtils");


var funcCtr  = function(bot){

    return{
        help: function(msg){
            if(msg.chat){
                var commands = stringUtils.makeCommandList(config.get("bot.commands"));
                var fromId = msg.from.id;
                bot.sendMessage(fromId, commands);
            }else{
                // bot.sendMessage(fromId, text);
            }
        },

        firstEnter: function(user){
            var option = {
                parse_mode: "HTML"
            };
            bot.sendMessage(user.telId, stringUtils.makeFirstEntStr(user), option);
        }



    }
};

module.exports = funcCtr;