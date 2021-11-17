const express = require('express');
const mongoose=require('mongoose');
const Register = require('./models/register');
const Complaint = require('./models/complaint');
const bcrypt = require("bcrypt"); // for password hashing
const nodemailer=require("nodemailer");
var session=require('express-session');
var flush=require("connect-flash");
const cookieParser = require('cookie-parser');

// express app
const app = express();

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

// connect to mongodb
const dburl='mongodb+srv://yash-mongodb:test123@complaint-database.erdlm.mongodb.net/db1?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(server_port, server_host, function() {
  console.log('Listening on port %d', server_port);
}))
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

// Mail function
let fromMail = 'group3.adp@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: fromMail ,
      pass: 'Group3#ADP'
  }
  });

// middleware to check if new_password page is not ilegally accesed
const isAuth=(req,res,next) =>{
if(req.session.isAuth==true)
{
  next();
}
else{
  req.flash('message','Unauthorized access!');
  res.redirect('/login');
}
};

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  var arr=[
    {
      firstname: "",
      lastname: "",
      fathersname: "",
      email: "",
      mobile: "",
      dob: "",
      state: "",
    }
  ];
  req.flash('form',arr);
  req.flash('cache','true');
  res.render('login', { title: 'Login',message: req.flash('message')});
});

app.get('/otppage', (req, res) => {
  res.render('otppage', { title: 'Verify',message: req.flash('message')});
});

app.get('/new_password',isAuth, (req, res) => {
  res.render('new_password', { title: 'New Password',message: req.flash('message')});
});

app.get('/logout', (req, res) => {
  req.flash('message','User logged out successfully!');
  cookie = req.cookies;
  for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.cookie(prop, '', {expires: new Date(0)});
  }
  res.redirect('/login');
});

app.get('/register', (req, res) => {
  if(req.flash("cache")!='true'){
    var arr=[
      {
        firstname: "",
        lastname: "",
        fathersname: "",
        email: "",
        mobile: "",
        dob: "",
        state: "",
      }
    ];
    req.flash('form',arr);
  }
  res.render('register', { title: 'Sign up' ,message: req.flash('message'),form: req.flash('form')[0]});
});

app.get('/forget', (req, res) => {
  res.render('forget', { title: 'Forget Password' ,message: req.flash('message')});
});

app.get('/past_complaints', function (req, res) {   
    Complaint.find({rollno:req.cookies.roll_cookie}, function (err, details) {
        if (err) {
            console.log(err);
        } else {
          // console.log(details);
          req.flash('message','Any problems? We may help!');
          res.render("past_complaints", { title: 'History',allDetails: details })
        }
    })
    });

// redirects
app.get('/complaint_register', (req, res) => {
  if(req.cookies.roll_cookie!=null){
  res.render('complaint_register', { title: 'Complaint' ,message: req.flash('message'),user:req.cookies.user});
}
else
{
  req.flash('message','Login First!');
  res.render("login", { title: 'login',message: req.flash('message')});
}});

app.post("/forget", async(req, res) => {
  try
  {
    const roll=req.body.rollno;
    if((req.body.rollno).length==0)
    {
        req.flash('message',"Invalid RollNo!");
        res.redirect('/forget');
    }
    else {
    const find_user=await Register.findOne({rollno:roll});
    if(find_user.rollno!=null)
    {
      // req.flash('message','Login succesfully!');
      // redirect to complaint regitration page
      res.cookie(`forget_user`,roll,{maxAge: 1000*60*10});
      let otp = Math.floor(1000 + Math.random() * 9000);
      var otpcopy = otp
      transporter.sendMail({
        from:fromMail,
        to:find_user.email,
        subject: "OTP",
        text: "OTP is "+ otp
        }, (error, response) => {
      if (error) {
          console.log(error);
      }
        });
      res.cookie(`otp`,otp,{maxAge: 1000*60*10});
      console.log("OTP sent!");
      res.redirect('/otppage');
    }
    else
    {
      req.flash('message',"Invalid RollNo!");
      res.redirect('/forget');
    }}

  } catch(error)
  {
    req.flash('message',"Invalid RollNo!");
    res.redirect('/forget');
    console.log(error);
  }
});

app.post('/otppage', (req, res) => {
  if(req.body.OTP==req.cookies.otp){
    req.flash('message','Right OTP!');
    req.session.isAuth=true;
    res.redirect('/new_password');
  }
  else{
    req.flash('message','Invalid/Wrong OTP!');
    res.redirect('/otppage');
  }
});

app.post('/new_password', async(req, res) => {
  try {
    const password1=req.body.password1;
    const password2=req.body.password2;
    if (password1 ===password2){
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      const pass=await bcrypt.hash(req.body.password1, salt);
      var query = {rollno:req.cookies.forget_user};
      
      Register.findOneAndUpdate(query,{password:pass}, function(err, doc) {
          if (err) console.log(err);
      });
    console.log("Password Updated Succesfully!");
    req.flash('message',"Password Updated Succesfully!");
    res.redirect('/login');

  }
    else if(password1 !=password2){
      req.flash('message',"Passwords do not match!");
      res.redirect('/new_password');
    }
  } catch (error) {
    console.log("Here in new password");
    console.log(error);
  }
});

function checkpass(pass){
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if(pass.length>=8&&pass.match(lowerCaseLetters)&&pass.match(upperCaseLetters)&&pass.match(numbers)){
    return true;
  }
  else{
    return false;
  }
}

// registration page getting setails and storing to server via post method
app.post('/register', async(req, res) => {
  // console.log(req.body);
try {
  const password1=req.body.password1;
  const password2=req.body.password2;
  if (password1 ===password2 && checkpass(password1)){
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
    req.flash('message','User created succesfully!');
    res.redirect('/login');
  }).catch(err => {
    // console.log(err);
    if (err.code === 11000) {
      // duplicate key
      console.log("Here");
      req.flash('form',req.body);
      req.flash('message','Username/Rollno already in use!');
      res.redirect('/register');
    }
  });
}
  else if(!checkpass(password1)){
    req.flash('form',req.body);
    req.flash('message',"Passwords is too weak!");
    res.redirect('/register');
  }
  else if(password1 !=password2){
    req.flash('form',req.body);
    req.flash('message',"Passwords do not match!");
    res.redirect('/register');
  }
} catch (error) {
  console.log("Here");
  console.log(error);
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
      console.log("User successfully logged in!");
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
    req.flash('message',"Your session has expired. Please log in again.");
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
  console.log('Complaint registered succesfully!');
  transporter.sendMail({
    from:fromMail,
    to:"b20132@students.iitmandi.ac.in",
    subject: "New complaint from "+find_user.rollno,
    cc: find_user.email,
    text: "Complaint Registered from: " + complaint.username + "\nRoll-no :" + complaint.rollno + "\nComplaint-Category is: " + complaint.complaintcategory + "\nMessage is: " + complaint.message + "\n\nThanks and Regards\nComplaint Management Authority\nJohn Wick (Ex-Communicado)"
    }, (error, response) => {
  if (error) {
      console.log(error);
  }
    });
  complaint.save().then(result => {
    req.flash('message','Complaint registered succesfully!');
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
