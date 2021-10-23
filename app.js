const express = require('express');

// express app
const app = express();

// Static Files
app.use(express.static('public'));

// register view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);
app.get('/', (req, res) => {
  res.render('login', { title: 'Login'});
});
app.get('/login.ejs', (req, res) => {
  res.render('login', { title: 'Login'});
});


app.get('/register.ejs', (req, res) => {
  res.render('register', { title: 'Sign up' });
});

// redirects
app.get('/complaint_register.ejs', (req, res) => {
  res.render('complaint_register', { title: 'Complaint' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});