# Complaint-management-system
This is an management application for students to register and login and raise complaints against their problem. The portal contains a form to request necessary details of the complaints and  directs to concerned authorities.

# Team Members (CS207- Applied Database Practicum)
1. Yash Sharma 
2. Saransh Bansal 
3. Abhay Gupta 
4. Aryansh Singla
5. Aayushmaan Jha
6. Vastav Bansal
7. Vishwas Garg

# Steps to run this Project Locally

**Step 1**:   Clone this repository locally using gitbash. Open gitbash on your PC and type the following command.
```
git clone git@github.com:yashcode00/Complaint-management-system.git
```
**Step 2** :  Open this cloned folder having name: "Complaint-management-system" using Visual Studio Code (preferably for best experience) 

**Step 3** :  Run a new terminal in VS Code and run the following command. This will install all required modules for running this project. 
```
npm install
```
**Step 4** :  Now, finally to run this website locally on your local host run the following command.
```
nodemon app
```
**Step 5**:   Finally, to open this hosted website, type following url in chrome browser (preferred for best experience).
```
localhost:3000
```
**Step 6**:   This way you will be directed to the login page of this comaplint-management-website and hence we succefully executed this project :)

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
