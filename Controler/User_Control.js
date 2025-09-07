const User_model = require("../Model/User_model");

const getAllUsers = async (req, res,next) => {
    let users;
  try {
    users = await users.find();
  } catch (error) {
    console.log("error");
  }

// not found users
if (!users) {
    return res.status(404).json({ message: "No users found" });
  } else {
    return res.status(200).json({ users });
  };
};

// insert user
  const addUsers = async (req , res, next)=>{
    const { name, email, age}=req.body;

    let Users

    try{
        Users = new Users ({name,email,age});
        await Users.save();
    } catch (err){
        console.log(err); 
    }

    // not insert  users
    if (!Users){
        return res.status(404).json({message:"Unble to add users"});

    }
    return res.status(200).json({Users});
 } ;


 //get by id
const getById = async(req,res, next)=>{
    const id = req.params.id;
     let user; // variable
     
     try{

        user= await user.findById(id);

     } catch(err){
        console.log(err);
     }

     if (!user){
        return res.status(404).json({message:"User not found"});

    }
    return res.status(200).json({user});
 } ;
 //update user details
 const updateUser = async(req , res, next)=>{
    const id = req.params.id;
    const { name, email, age}=req.body;

    let users;
    try {
        users =  await users.findByIdAndUpdate(id, 
            { name:name ,email:email ,age:age})
            users = await users.save();

    }catch(err){
        console.log(err);
    }

    if (!users){
        return res.status(404).json({message:"unable to update user Details"});

     }
        return res.status(200).json({users});


 };

 //delect users
 const delectUser = async(req, res, next)=>{
    const id = req.params.id;
    let user;
    try{
          user= await user.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    
    if (!user){
        return res.status(404).json({message:"unable to delect user Details"});

     }
        return res.status(200).json({user});

 };





   
exports.getAllUsers=getAllUsers;
exports.addUser=addUsers;
exports.getById=getById;
exports.updateUser=updateUser;
exports.delectUser=delectUser;
