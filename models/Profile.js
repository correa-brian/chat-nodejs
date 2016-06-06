var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName: {type: String, lowercase: true, trim: true, default:''},
	lasttName: {type: String, lowercase: true, trim: true, default:''},
	email: {type: String, lowercase:true, trim: true, default:''},
	image: {type: String, trim: true, default: ''},
	password: {type: String, default:''},
	timestamp: {type: Date, default: Date.now}
})

ProfileSchema.methods.summary = function(){
	var summary ={
		firstName: this.firstName,
		lasttName: this.lasttName,
		email: this.email,
		image: this.image,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)