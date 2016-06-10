var express = require('express');
var router = express.Router();
var profileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')


router.get('/:action', function(req, res, next) {
	var action = req.params.action

	if(action == 'logout'){
		req.session.reset()
		res.json({
			confirmation: 'success',
			message: 'User Logged Out'
		})

	}

	if (action == 'currentuser'){
		if (req.session == null){
			res.json({
				confirmation: 'fail',
				message: 'Not Logged In'
			})

			return
		}


		if (req.session.user == null){
			res.json({
				confirmation: 'fail',
				message: 'Not Logged In'
			})

			return
		}

		var userId = req.session.user
		profileController.getById(userId, false, function(err, result){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err.message
				})

				return
			}


			res.json({
				confirmation: 'success',
				currentUser: result
			})

			return
		})
	}
})


router.post('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'login'){
		var credentials = req.body
		var email = credentials.email.toLowerCase()

		profileController.get({email:email}, true, function(err, results){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err
				})

				return
			}

			if (results.length == 0){
				res.json({
					confirmation: 'fail',
					message: 'Profile Not Found'
				})

				return
			}

			var profile = results[0]
			var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)

			if (passwordCorrect == false){
				res.json({
					confirmation: 'fail',
					message: 'Incorrect Password'
				})

				return				
			}

			var profileSummary = profile.summary()
			req.session.user = profileSummary.id

			res.json({
				confirmation: 'success',
				currentUser: profileSummary
			})

			return
		})


	}


})

module.exports = router;