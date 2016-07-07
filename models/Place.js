var mongoose = require('mongoose')

var PlaceSchema = new mongoose.Schema({
	name: {type: String, default:''},
	password: {type:String, default:''},
	image: {type:mongoose.Schema.Types.Mixed, default:{}},
	address: {type: String, lowercase: true, default:''},
	city: {type: String, lowercase: true, default:''},
	state: {type: String, lowercase: true, default:''},
	zip: {type: String, lowercase: true, default:''},
	admins:{type: Array, default:[]},
	geo: {type:[Number], index: '2d'},
	timestamp: {type: Date, default: Date.now}
})

PlaceSchema.methods.summary = function(){
	var summary ={
		name: this.name,
		image: this.image,
		address: this.address,
		password: this.password,
		city: this.city,
		state: this.state,
		zip: this.zip,
		geo: this.geo,
		admins: this.admins,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('PlaceSchema', PlaceSchema)