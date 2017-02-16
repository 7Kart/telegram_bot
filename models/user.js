var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    telId: Number,
    telegramName: String,
    name: String,
    lastCommand: String,
    chatWith: Number
});

userSchema.statics.findByTelId = function(telId, cb) {
    return this.findOne({ telId: telId }, cb);
};

userSchema.statics.updUsrLastCmd = function(telId, command, cb){
    return this.update({telId: telId }, {$set:{lastCommand:command}}, cb);
};

userSchema.statics.chatWith = function(telId, idWhom, cb){
    return this.update({telId: telId }, {$set:{chatWith:idWhom}}, cb);
};

userSchema.statics.deleteByTelId = function(telId, cb) {
    return this.remove({ telId: telId }, cb);
};

userSchema.statics.getAll = function( cb) {
    return this.find({}, cb);
};

userSchema.statics.findByName = function(name, cb){
    return this.findOne({ name: name }, cb);
};

var User = mongoose.model("User", userSchema);


module.exports = User;