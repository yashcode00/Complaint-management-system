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
app.use(express.urlencoded({ extended: true }));

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

app.post('/register', (req, res) => {
  // console.log(req.body);
try {
  const password1=req.body.password1;
  const password2=req.body.password2;
  if (password1 ===password2){
  const register = new Register({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fathersname: req.body.fathersname,
    username: req.body.username,
    password: req.body.password1,
    rollno: req.body.rollno ,
    email: req.body.email,
    mobile: req.body.mobile,
    dob: req.body.dob,
    state: req.body.state,
    gender: req.body.gender
  });
  register.save().then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
  });
  console.log('User created succesfully!');
}
  else{
    res.send("Passwords do not match!")
  }
}  catch (error) {
  if (error.code === 11000) {
    // duplicate key
    return res.json({ status: 'error', error: 'Username already in use' })
  }
  throw error
}
});

// login page checking authetication
app.post('/login', async(req, res) => {
  
  try
  {
    const userid=req.body.userid;
    const password=req.body.password;

    const find_user=await Register.findOne({username:userid});
    if(find_user.password===password)
    {
      // redirect to complaint regitration page
      res.render('complaint_register', { user: find_user.firstname ,title:"Complaint"});
      console.log("User succesfully logged in!");
    }
    else
    {
      res.send("Invalid username or password!");
    }

  } catch(error)
  {
    res.send("Invalid username or password!");
    console.log(error);
  }

});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
