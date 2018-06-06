var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	name: String,
	mobile: {type:String,unique:true},
	password:String,
	email:String,
	createdBy:String
})
module.exports =  mongoose.model('user',userSchema);
