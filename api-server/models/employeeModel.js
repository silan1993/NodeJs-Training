var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var employeeSchema = new Schema({
	name: String,
	mobile: {type:String,unique:true},
	email:String
})
module.exports =  mongoose.model('employee',employeeSchema);
