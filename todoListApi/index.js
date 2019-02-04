var bdd = require('./BDD_config.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.put('/:table/:key', (req, res) => {
	var str ='';
	var i = 0;

	Object.keys(req.body).forEach((key) => {
		str += key + ' = \'' + req.body[key] +'\'';
		i ++;
		if((Object.keys(req.body).length - i) > 0 ){
			str += ',';
		}
	})
	bdd.query({
	  sql: 'UPDATE '+ req.params.table+' SET '+ str +' WHERE ID'+req.prams.table +' = ?',
	  timeout: 40000, // 40s
	  values: [req.params.key]
	}, function (error, results, fields) {
	res.end('les donnees de ' + req.params.key + ' de la table ' + req.params.table + ' on ete mise a jour');
	})
});

app.post('/:table/:token', (req, res) => {
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			var str ='';
			var i = 0;

			Object.keys(req.body).forEach((key) => {
				str += key + ' = \'' + req.body[key] +'\'';
				i ++;
				if((Object.keys(req.body).length - i) > 0 ){
					str += ',';
				}
			})
			bdd.query({
			  sql: 'INSERT INTO '+ req.params.table+' SET '+ str ,
			  timeout: 40000, // 40s
			}, function (error, results, fields) {
			res.end('les donnees  ' + req.params.table + ' on ete ajoute');
			})
		}
	})
})


app.get('/:table/:id', (req, res) => {

	bdd.query({
	  sql: 'SELECT * FROM '+ req.params.table+' WHERE ID'+ req.params.table +' = ?',
	  timeout: 40000, // 40s
	  values: [req.params.id]
	}, function (error, results, fields) {
	  res.json(results);
	})
	
})

/*app.delete('/:table/:key', (req, res) => {
bdd.query({
	  sql: 'DELETE FROM ' + req.params.table +' WHERE ID'+req.params.table+' = ?',
	  timeout: 40000, // 40s
	  values: [req.params.key]
	}, function (error, results, fields) {
	  if (error) throw error;
	res.end('les donnees de ' + req.params.key + ' de la table ' + req.params.table + ' on ete suprimee');
	})
})*/
app.get('/valididea/:key/:token', (req, res) => {
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
			  sql: 'DELETE FROM idea WHERE IDidea = ?',
			  timeout: 40000, // 40s
			  values: [req.params.key]
			}, function (error, results, fields) {
			res.end('les donnees de ' + req.params.key + ' de la table ' + req.params.table + ' on ete suprimee');
			})
		}
	})
})

app.post('/idea/like/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  voteidea SET `reaction` = 1 ,`IDidea` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDidea,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.post('/idea/dislike/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  voteidea SET `reaction` = 2 ,`IDidea` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDidea,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.delete('/deleteidea/:IDidea/:IDuser/:token', (req, res) => {
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			console.log('deletevote');
			bdd.query({
			  sql: 'DELETE FROM voteidea WHERE IDuser = ? AND IDidea = ?',
			  timeout: 40000, // 40s
			  values: [req.params.IDuser,req.params.IDidea]
			}, function (error, results, fields) {
			res.end('vote remove');
			})
		}
	})
})

app.post('/event/like/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  _voteevent SET `reaction` = 1 ,`IDevent` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDevent,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.post('/event/dislike/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  _voteevent SET `reaction` = 2 ,`IDevent` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDevent,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.delete('/deleteevent/:IDevent/:IDuser/:token', (req, res) => {
	console.log('deletevote');
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){	
			
			bdd.query({
			  sql: 'DELETE FROM _voteevent WHERE IDuser = ? AND IDevent = ?',
			  timeout: 40000, // 40s
			  values: [req.params.IDuser,req.params.IDevent]
			}, function (error, results, fields) {
			res.end('vote remove');
			})
		}
	})
})
app.post('/event/addevent/',(req,res)=>{
	bdd.query({
		sql: 'INSERT INTO  events SET `name` = ? ,`description` = ?  ,`date` = ? ,`content` = ? ,`IDuser` = ? ,`price` = ? ,`punctuality` = ?, `past` = 0',
		timout : 40000,
		values: [req.body.name,req.body.description,req.body.date,req.body.content,req.body.IDuser,req.body.price,req.body.punctuality]
	},function (error, results, fields) {
	res.end('eventadd');
	})
})

app.post('/event/attend/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
	 
		if(results.length != 0){			
			bdd.query({
				sql: 'INSERT INTO attendee SET `IDevent` = ? ,`IDuser` = ? ',
				timout : 40000,
				values: [req.body.IDevent,req.body.IDuser]
			},function (error, results, fields) {
		  	
				res.end('tu participe gros');
			})	
		}
	})	
})

app.post('/idea/addidea/',(req,res)=>{
	bdd.query({
		sql: 'INSERT INTO  events SET `name` = ? ,`content` = ? ,`IDuser` = ? ',
		timout : 40000,
		values: [req.body.name,req.body.content,req.body.IDuser]
	},function (error, results, fields) {
	res.end('eventadd');
	})
})

app.post('/event/addcomment/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO comment SET `IDuser` = ? ,`content` = ? ,`ts` = ?,`IDevent` = ? ',
				timout : 40000,
				values: [req.body.IDuser,req.body.content,req.body.ts,req.body.IDevent]
			},function (error, results, fields) {
			res.end('eventadd');
			})
		}
	})
})

app.post('/img/like/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  voteimg SET `reaction` = 1 ,`IDVoteimg` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDVoteimg,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.post('/img/dislike/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO  voteimg SET `reaction` = 2 ,`IDVoteimg` = ?  ,`IDuser` = ?',
				timout : 40000,
				values: [req.body.IDVoteimg,req.body.IDuser]
			},function (error, results, fields) {
			res.end('like');
			})
		}
	})
})

app.delete('/deleteimg/:IDVoteimg/:IDuser/:token', (req, res) => {
	console.log('deletevote');
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){	
			bdd.query({
			  sql: 'DELETE FROM `voteimg` WHERE `voteimg`.`IDVoteimg` = ? AND `voteimg`.`IDuser` = ? ',
			  timeout: 40000, // 40s
			  values: [req.params.IDVoteimg,req.params.IDuser]
			}, function (error, results, fields) {
			res.end('vote remove');
			})
		}
	})
})

app.post('/image/addcomment/:token',(req,res)=>{
	bdd.query({
		sql: 'SELECT * FROM users WHERE token = ?',
		timout : 40000,
		values: [req.params.token]
	},function (error, results, fields) {
		if(results.length != 0){
			bdd.query({
				sql: 'INSERT INTO comment SET `IDuser` = ? ,`content` = ? ,`ts` = ?,`IDcomment_Image` = ? ',
				timout : 40000,
				values: [req.body.IDuser,req.body.content,req.body.ts,req.body.IDimg]
			},function (error, results, fields) {
			res.end('imageadd');
			})
		}
	})
})

app.listen(3000)