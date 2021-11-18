# Complaint-management-system

This is an management application for students to register and login and raise complaints against their problem. The portal contains a form to request necessary details of the complaints and directs to concerned authorities.


**_THIS SITE HAS BEEN HOSTED USING HEROKUAPP AND CAN BE ACCESSED FROM THE LINK GIVEN IN THE ABOUT SECTION OF THIS REPOSITORY._**


# Steps to run this Project Locally

**Step 1**: Clone this repository locally using gitbash. Open gitbash on your PC and type the following command.

```
git clone git@github.com:yashcode00/Complaint-management-system.git
```

**Step 2 :** Change the branch to node_new using the following command:

```
git checkout node_new
```

**Step 3** : Open this cloned folder having name: "Complaint-management-system" using Visual Studio Code (preferably for best experience)

**Step 4** : Run a new terminal in VS Code and run the following command.This will install all required modules for running this project. Please ensure that you have Nodejs installed on your pc.

```JavaScript
npm install
```

**Step 5**: Now, run the follwing to install nodemon globally.

```JavaScript
npm install -g nodemon
```

**Step 6** : Now, finally to run this website locally on your local host run the following command.

```JavaScript
nodemon app
```

**Step 7**: Finally, to open this hosted website, type following url in chrome browser (preferred for best experience).

```
localhost:3000
```

**Step 8**: This way you will be directed to the login page of this comaplint-management-website and hence we succefully executed this project :)

# Possible Error

A possible error may occur if you are running nodejs for first time on yor PC.

For those who are not aware of how to solve this error using Windows PowerShell

Open PowerShell (Run As Administrator)

Check the current execution policy using this command

```
   Get-ExecutionPolicy
```

**You should get 'Restricted'**

Run this command to make it 'Unrestricted'

```
    Set-ExecutionPolicy Unrestricted
```

Check again whether execution policy changed by running this command

```
    Get-ExecutionPolicy
```

**You should get 'Unrestricted'**

Now try to run nodemon on your project

```
    nodemon app
```


Now, it will work perfectly. :)

<<<<<<<<<<<<<<------------------->>>>>>>>>>>>>>>>

 _Team Members (CS207- Applied Database Practicum)_
 

>_1. Yash Sharma_
>_2. Saransh Bansal_

_3. Abhay Gupta_

_4. Aryansh Singla_

_5. Aayushmaan Jha_

_6. Vastav Bansal_

_7. Vishwas Garg_


