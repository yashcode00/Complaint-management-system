const express = require('express');
const mongoose=require('mongoose');
const Register = require('./models/register');

// express app
const app = express();

// connect to mongodb
const dburl='mongodb+srv://yash-mongodb:test123@complaint-database.erdlm.mongodb.net/db1?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log(err));

// // listen for requests is commented because we cannot perform until database is connected
// app.listen(3000, function() {
//   console.log("Server running on port 3000");
//   })

// Static Files
app.use(express.static('public'));

// register view engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login'});
});


app.get('/register', (req, res) => {
  res.render('register', { title: 'Sign up' });
});

// redirects
app.get('/complaint_register', (req, res) => {
  res.render('complaint_register', { title: 'Complaint' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

