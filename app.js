const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const request = require('request')
const apiurl = 'https://randomuser.me/api/'
const path = require('path')

const app = express()
const people = {
	going : [],
	notgoing : []
}

app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')
app.set('views', path.join(__dirname + '/views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, '/public')))


app.get("/", (req, res, next) => {
	request(apiurl, (err, resp)  => {
		const body = JSON.parse(resp.body)
		const data = {
			name : body.results[0].name.first + " " + body.results[0].name.last,
			phone : body.results[0].phone,
			email : body.results[0].email,
			pic : body.results[0].picture.large,
			going: people.going.length,
			notgoing: people.notgoing.length
		}
		res.render('home', data)
	})
})


app.get('/going', (req, res, next) => {
	res.render('going', people)
})

app.get('/notgoing', (req, res, next) => {
	res.render('notgoing', people)
})


app.post('/going', (req, res, next) => {
	people.going.push(req.body)
	console.log(people.going)
	res.redirect('/')
})
app.post('/notgoing', (req, res, next) => {
	people.notgoing.push(req.body)
	console.log(people.notgoing)
	res.redirect('/')
})



app.listen(4040, () => {
	console.log("Listening on port 4040")
})



