var express = require('express');
var router = express.Router();
var mySql = require('mysql');
var connection = mySql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'students'
})

connection.connect(); 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getStudents', (req, res, next)=>{

	var selectQuery = 'SELECT * FROM students';

	connection.query(selectQuery, (error, results, fields)=>{
		if (error) throw error;
		res.json(results);	
	});
	
})

router.post('/addStudent', (req, res, next)=>{
	var studentToAdd = req.body.name;

	connection.query('INSERT INTO students (Name) Values (?)', [studentToAdd],(error, results, fields)=>{
		if (error) throw error;

		var selectQuery = 'SELECT * FROM students';

		connection.query(selectQuery, (error, results, fields)=>{
			if (error) throw error;
			res.json(results);	
		});		
	});
	// res.json([studentToAdd]);
});

module.exports = router;
