const express = require("express");
const router = express();
var fetchuser= require('../middleware/fetchuser')
const { body, validationResult } = require("express-validator");
const Project = require("../Models/Project");
const Requirements = require('../Models/requirements');
const Gamify= require('../Models/Gamify')
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWT_SERECT = 'HellothisisGamify'


            // USER AUTHENTICATION ROUTES 


// ROUTE :01 create user by adding user into database
// This is the working and tested and verified route


router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success=false;
    
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email is already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        fname: req.body.fname ,
        lname: req.body.lname,
        password: secPass,
        email: req.body.email,
        type:req.body.type
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      console.log(data.user.id);
      const authtoken = JWT.sign(data, JWT_SERECT);
      console.log({ authtoken });
      success=true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
    //.then(user=>res.json(user));
  }
);

// ROUTE :02  Creating  authenticate a user using login
// This is the verified and working route about login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ error: "Please enter valid not find " });
      }
      const passwordcampare = await bcrypt.compare(password, user.password);
      if (!passwordcampare) {
        success=false;
        return res.status(400).json({success, error: "Please enter valid password " });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = JWT.sign(data, JWT_SERECT);
      success=true;
      console.log({ authtoken });
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// ROUTE :03 Get logged in user detail using POST "api/auth/getuser". Login required
// This is the tested and working route
router.get(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);




          // PROJECT MANAGEMENT ROUTES 


// Route :1 Get All the notes of user throught this route
// This is tested route and verified 
router.get("/fetchallproject", fetchuser, async (req, res) => {
  try {
    const project0 = await Project.find({ createdby: req.user.id });
    const  project1 = await Project.find({ enduser: req.user.id });
    const   project2 = await Project.find({ reqeng: req.user.id });
      
    const project= project0.concat(project1,project2);

    const user= await User.findById(req.user.id).select("-password");;
    res.json({project, user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchproject/:id", fetchuser, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Route :2 Add notes of user throught this route
// This is the tested and verified route just want look arround
router.post(
  "/addproject",
  fetchuser,
  [
    body("Title", "Enter a valid title").isLength({ min: 1 }),
    body("Desc", "Enter a valid descr").isLength({ min: 1 }),
  ],
  async (req, res) => {
    
    try {
      const { Title, Desc, Tag,Status } = req.body;
      console.log(Title, Desc, Tag,Status);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

     const enduser =await User.findOne({email:req.body.useremail});
     const reqeng =await User.findOne({email:req.body.reqemail});
     console.log(enduser,reqeng)
      const project = new Project({
        Title,
        Desc,
        Tag,
        Status,
        createdby: req.user.id,
        enduser:enduser.id,
        reqeng:reqeng.id,

      });
      const saveproject = await project.save();
      


      let gam = await Gamify.findOne({user:req.user.id});
//let gam1=JSON.parse(JSON.stringify(gam))
//console.log(gam1.point)
//console.log(parseInt(gam.point))
if(gam){
  if((gam.point+50)>=250  ){
    gam=Object.assign(gam,{point:0,Level:'No Level',Ranks:gam.Ranks+1})
    }else if((gam.point+50)>=200){
    gam=Object.assign(gam,{point:gam.point+50,Level:'Three'})
    }else if((gam.point+50)>=150 && (gam.point+50)<200){
      gam=Object.assign(gam,{point:gam.point+50,Level:'Two'})
   
    }else if((gam.point+50)>=100 && (gam.point+50)<150){
      gam=Object.assign(gam,{point:gam.point+50,Level:'One'})
   
    }
    else{ gam=Object.assign(gam,{point:gam.point+50,Level:'No Level'})
  }
  gam = await Gamify.findByIdAndUpdate(
    gam.id,
    { $set: gam },
    { new: true }
    )
 
}else{
  gam= await Gamify.create({
    user:req.user.id,
    point:50
})}

res.json({Saveproject:saveproject, Gamify:gam});


      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route :03 this route update the notes
router.put("/updateproject/:id", fetchuser, async (req, res) => {
  const { Title, Desc, Tag,Status,reqeng,enduser } = req.body;
  // creating new note object
  const newproject = {};
  if (Title) {
    newproject.Title = Title;
  }
  if (Desc) {
    newproject.Desc = Desc;
  }
  if (Tag) {
    newproject.Tag = Tag;
  }
  if (Status) {
    newproject.Status= Status;
  }
  if (reqeng) {
    newproject.reqeng= reqeng;
  }
  if (enduser) {
    newproject.enduser= enduser;
  }

  let project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).send("Not Found");
  }
  if (project.createdby.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  project = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: newproject }
  );

  res.json({ project });
});

router.put("/completeproject/:id", fetchuser, async (req, res) => {
  
  // creating new note object
  const progress=req.body.Progress;
  const status=req.body.Status;
  var project= await Project.findById(req.params.id);
 console.log(progress)
  if (project) {
   
  const newreq= Object.assign(project,{Status:status,Progress:progress})
  console.log(newreq)
  project = await Project.findByIdAndUpdate(
    newreq.id,
    { $set: newreq }
   
  );
  }
  


  res.json( project );
});
// Route :04 this route update the notes
router.delete("/deleteproject/:id", fetchuser, async (req, res) => {

  // FIND THE NOTES TO BE DELETE AND DELETE IT
  let project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).send("Not Found");
  }
  // ALLOW DELETION IF USER OWNS THIS NOTES
  if (project.createdby.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  project = await Project.findByIdAndDelete(req.params.id);

  res.json({ SUCCESS: "THIS NOTE IS DELETED SUCESSFULLY",project:project });
});


                    // REQUIREMENT MANAGEMENT ROUTES  

// These Routes are stored in same file except to expand in different files
// This route is tested and verified but add little things

router.get('/allreq/:id',fetchuser, async (req,res)=>{
   const username=[]
  try {

     // const project = await Project.findById(req.params.id);
        const requirement = await Requirements.find({project:req.params.id});
       console.log({REQUIREMENTS:requirement});
       for (let index = 0; index < requirement.length; index++) {
          element = requirement[index];
         
          let usernam
         const user= await User.findById(element.submittedby)
         const user1= await User.findById(element.verifiedby)
        if(user1){
          usernam=user1.fname+user1.lname;
        }else{ 
          usernam="";
        }

        
         element.submittedby =user.fname;
    const newreq={
      _id: element._id,
      requirement: element.requirement,
      Status: element.Status,
      submittedby: user.fname+user.lname,
      project: element.project,
      verifiedby: usernam//requser.fname+requser.lname,
    }
    console.log(newreq)
         username.push(newreq)
         
       }
       res.json(username);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    });





    router.get("/req/:id", fetchuser, async (req, res) => {
      try {
        const reqs = await Requirements.findOne({ _id: req.params.id });
        res.json(reqs);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    });
 //This is the working route and tested route 

    router.post("/project/:id/addreq",fetchuser,
    //[      body("title", "Enter a valid title").isLength({ min: 3 }),
      //    body("description", "Enter a valid descr").isLength({ min: 5 }),
        //],
         async (req, res) => {
          try {
            const { requirement, Status } = req.body;
            const project= req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const requirements = new Requirements({
              requirement,
              submittedby:req.user.id,
              Status,
              project,
              
            });
            const saverequirement = await requirements.save();
            res.json(saverequirement);
          } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          }
        }
      );    

 // this is the route on which i am working
// This route is in working and testing 

      router.put("/updaterequirement/:id", fetchuser, async (req, res) => {
        const reqid = req.params.id;
        // creating new note object
        const { requirement,Status,reqemail,useremail } = req.body;
        var reqs= await Requirements.findById(reqid)
       
        if (requirement) {
         
        const newreq= Object.assign(reqs,{requirement:requirement,Status:'Updated'})
        console.log(newreq)
        reqs = await Requirements.findByIdAndUpdate(
          newreq.id,
          { $set: newreq }
         
        );
        }
        


        res.json( reqs );
      });

// this is the update req of requirement engineer

router.put("/requpdaterequirement/:id", fetchuser, async (req, res) => {
  const reqid = req.params.id;
  // creating new note object
  const { comment,Status,reqemail,useremail } = req.body;
  var reqs= await Requirements.findById(reqid)
 
  if (comment) {
   console.log(comment)
  const newreq= Object.assign(reqs,{Comment:comment,Status:'Require Update'})
  console.log(newreq)
  reqs = await Requirements.findByIdAndUpdate(
    newreq.id,
    { $set: newreq }
   
  );
  }
  


  res.json( reqs );
});


      router.delete("/deletereq/:id", fetchuser, async (req, res) => {
        
      
        // FIND THE NOTES TO BE DELETE AND DELETE IT
        let reqdel = await Requirements.findOne({_id:req.params.id});
        if (!reqdel) {
          return res.status(404).send("Not Found");
        }
        // ALLOW DELETION IF USER OWNS THIS NOTES
        if (reqdel.submittedby.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
        reqdel = await Requirements.findByIdAndDelete(req.params.id);
      
        res.json({ SUCCESS: "THIS REQUIREMENT IS DELETED SUCESSFULLY",DELETEDREQ:reqdel });
      });




// this is the geting requirements by using user to print points


router.get("/req", fetchuser, async (req, res) => {
  try {
    pointer=[]
    let points=0;
    const reqs = await Requirements.find({ submittedby: req.user.id });
    
    for (let index = 0; index < reqs.length; index++) {
      let element = reqs[index];
      if (element.Status=='Verified'){
        points=10;
      }else{
        points=0;
      }
      const newreq={
        _id: element._id,
        requirement: element.requirement,
        Status: element.Status,
        submittedby: element.submittedby,
        project: element.project,
        verifiedby: element.verifiedby,
        point:points
      }
pointer.push(newreq)
    }
    
    res.json(pointer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});





// This route Functionality is when req engneer click on verified button 
// The requirement is verified and point added to the user point dashboard

 router.put("/addpoints/:id",fetchuser, async (req,res)=>{
   //first we will get the user who submit requirement
  var requirement = await Requirements.findById(req.params.id);
  console.log(requirement.submittedby)
 if(!requirement){
   res.status(404).send("Requirement Not Found");
 }

const newreq= Object.assign(requirement,{verifiedby:req.user.id,Status:'Verified'})
console.log(newreq)
requirement = await Requirements.findByIdAndUpdate(
  newreq.id,
  { $set: newreq },
  
);
console.log(requirement.submittedby);
let gam = await Gamify.findOne({user:requirement.submittedby});
//let gam1=JSON.parse(JSON.stringify(gam))
//console.log(gam1.point)
//console.log(parseInt(gam.point))
if(gam){
  if((gam.point+10)>=250  ){
    gam=Object.assign(gam,{point:0,Level:'No Level',Ranks:gam.Ranks+1})
    }else if((gam.point+10)>=200){
    gam=Object.assign(gam,{point:gam.point+10,Level:'Three'})
    }else if((gam.point+10)>=150 && (gam.point+10)<200){
      gam=Object.assign(gam,{point:gam.point+10,Level:'Two'})
   
    }else if((gam.point+10)>=100 && (gam.point+10)<150){
      gam=Object.assign(gam,{point:gam.point+10,Level:'One'})
   
    }
    else{ gam=Object.assign(gam,{point:gam.point+10,Level:'No Level'})
  }
  gam = await Gamify.findByIdAndUpdate(
    gam.id,
    { $set: gam },
    { new: true }
    )
 
}else{
  gam= await Gamify.create({
    user:requirement.submittedby,
    point:10
})
  
}
console.log(gam)
res.json({ SUCCESS: "THIS POINT IS ADDED SUCESSFULLY",requirement:requirement ,Gamify:gam });

   // second we will add points in user id if it contains 

 })     


 // fetching points

 router.get('/getpoints',fetchuser, async (req,res)=>{

 const gamify= await Gamify.findOne({user:req.user.id})
 
 res.send(gamify)




 })





 //this route is working route

router.get(
  "/leaderboard", fetchuser,
  async (req, res) => {
    try {
      gamification=[]
      const user = await Gamify.find();
      for (let index = 0; index < user.length; index++) {
        const element = user[index];
        const ngamify= await User.findById(element.user);
        console.log(ngamify)
        const newgamify={
    no:index+1,
     _id:element._id,
     fname: ngamify.fname ,
     lname: ngamify.lname,
     email: ngamify.email,
     points:element.point,
     userlevel:element.Level,
     Ranks:element.Ranks

        }
       gamification.push(newgamify) 
      }

      res.send(gamification.sort(function(a, b){return b-a}))
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);









module.exports = router;