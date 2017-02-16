/**
 * Created by kristofer on 02.02.17.
 */
var stringUtils = function () {
    return{
        makeCommandList: function(arrCommand){
            var commandList = "Список команд: \n";
            arrCommand.forEach(function(command, ind){
                commandList += (ind+1) + "." + command.emodzi + " /" + command.text + "\n";
            });
            return commandList;
        },

        maskePeopleList: function(peopleList){
            var list = "";
            if(peopleList.length >0) {
                peopleList.forEach(function (people, indPeop) {
                    list += (indPeop + 1) + ". " + people.name + "\n";
                });
            }else{
                list+= "пусто..."
            }
            return list;
        },

        makeFirstEntStr: function(user){
            return "Добро пожаловать, <b>" + user.name + "</b>! Для получения списка команд нажмите /help"
        }
    };
};

module.exports = stringUtils();