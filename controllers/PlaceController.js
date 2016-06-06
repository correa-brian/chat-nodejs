var Place = require('../models/Place')

module.exports = {
	get: function(params, isRaw, callback){
		Place.find(params, function(err, places){
			if(err){
				if(callback != null)
					callback(err, null)

				return
			}

			if(callback != null){
				if(isRaw == true){
					callback(null, places)
					return
				}
				
				var summaries = []
				for(var i=0; i<places.length; i++){
					var place = places[i]
					summaries.push(place.summary())
				}

				callback(null, summaries)
			}

		})
	},

	getById: function(id, isRaw, callback){
		Place.findById(id, function(err, place){
			if(err){
				if(callback != null)
					callback({message: 'Place Not Found'}, null)

				return
			}

			if(callback != null)
				callback(null, place.summary())
		})
	},

	post: function(params, callback){
		Place.create(params, function(err, place){
			if(err){
				if(callback != null)
					callback(err, null)
				return
			}
			if(callback != null)
				callback(null, place.summary())
		})
	},

	put: function(id, params, callback){
		Place.findByIdAndUpdate(id, params, {new:true}, function(err, place){
			if(err){
				if(callback != null)
					callback(err, null)
				return
			}

			if(callback != null)
				callback(null, place.summary())
		})

	}

}