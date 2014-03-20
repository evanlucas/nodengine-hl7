var express = require('express')
var port = 4000

var app = express()

app.set('views', __dirname+'/views')
app.set('view engine', 'jade')
app.set('view options', { doctype: 'html', pretty: false })

app.get('/', function(req, res) {
  res.render('index')
})

app.use(express.static(__dirname))

app.listen(port)
