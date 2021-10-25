const express = require('express');
const mongoose=require('mongoose');
const Register = require('./models/register');
const Complaint = require('./models/complaint');
const bcrypt = require("bcrypt"); // for password hashing
var session=require('express-session');
var flush=require("connect-flash");
const cookieParser = require('cookie-parser')

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
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized:false
}));
app.use(flush());
// let’s you use the cookieParser in application
app.use(cookieParser());

// register view engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login',message: req.flash('message')});
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Sign up' });
});

// redirects
app.get('/complaint_register', (req, res) => {
  res.render('complaint_register', { title: 'Complaint' ,message: req.flash('message'),user:req.cookies.user});
});

// registration page getting setails and storing to server via post method
app.post('/register', async(req, res) => {
  // console.log(req.body);
try {
  const password1=req.body.password1;
  const password2=req.body.password2;
  if (password1 ===password2){
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const pass=await bcrypt.hash(req.body.password1, salt);
  const register = new Register({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    fathersname: req.body.fathersname,
    username: req.body.username,
    // now we set user password to hashed password
    password :pass,
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
    if((req.body.userid).length==0||(req.body.password).length==0)
    {
        req.flash('message',"Invalid username or password!");
        res.redirect('/login');
    }
    else {
    const find_user=await Register.findOne({username:userid});
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, find_user.password);
    console.log(validPassword);
    if(validPassword)
    {
      res.cookie(`roll_cookie`,find_user.rollno,{maxAge: 1000*60*10});
      res.cookie('user',find_user.firstname,{maxAge: 1000*60*10});
      req.flash('message','Login succesfully!');
      // redirect to complaint regitration page
      res.redirect('/complaint_register');
      console.log("User succesfully logged in!");
    }
    else
    {
      req.flash('message',"Invalid username or password!");
      res.redirect('/login');
    }}

  } catch(error)
  {
    req.flash('message',"Invalid username or password!");
    res.redirect('/login');
    console.log(error);
  }

});


// registering the complaint of signed in user
app.post('/complaint_register', async(req, res) => {
  // console.log(req.body);
  var rollnumber=req.body.rollno;
  if(req.cookies.roll_cookie==null)
  {
    console.log("Session expired!");
    req.flash('message',"Session expired!");
    res.redirect('/login');
  }
try {
  const find_user=await Register.findOne({rollno:req.cookies.roll_cookie});

  if(find_user.rollno!=rollnumber)
  {
    console.log("Please provide valid RollNo!");
    req.flash('message',"Please provide valid RollNo!");
    res.redirect('/complaint_register');
  }
  else{
  const complaint = new Complaint({
    username: find_user.username,
    rollno: find_user.rollno ,
    message: req.body.message,
    complaintcategory: req.body.complaintcategory}
  );
  console.log(find_user.username);
  req.flash('message','Complaint registered succesfully!');
  console.log('Complaint registered succesfully!');
  complaint.save().then(result => {
    res.redirect('/complaint_register');
  })
  .catch(err => {
    console.log(err);
  });}
} catch (error) {
  res.send(error);
}
}
);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
