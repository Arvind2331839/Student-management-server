var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Schema/UserSchema");

const Register = async (req, res) => {
  try {
    //get all data from
    const { Name, Age, Email,Mobile } = req.body;

    //all data should exists
    if (!(Name && Age && Email && Mobile)) {
      console.log("All feilds are compalsory");
      return res
        .status(400)
        .send({ status: false, messsage: "All feilds are compalsory" });
    }

    //check if user already exists - email
    const existingUser = await UserModel.findOne({ Email });
    if (existingUser) {
      return res
        .status(400)
        .send({
          status: false,
          messsage: "User already exists with this email",
        });
    } else {
      // encrypt the password
      // const myEncPassword = await bcrypt.hash(Mobile, 10);

      //save the user in DB
      const user = await UserModel.create({ Name, Age, Email, Mobile });
      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};


//Gett Data from DataBase
const GetAllData = async (req, res) => {
  try {
    const userData = await UserModel.find();
    console.log(userData);
    return res.status(201).json(userData);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong" });
  }
};


//Gett One Data from DataBase
const GetOneData = async (req, res) => {
  try {
    const id = req.params.id;
    const ExistingUser = await UserModel.findById(id);
    console.log(ExistingUser);
    return res.status(201).json(ExistingUser);
  } catch (error) {
    res.status(500).send({ msg: "User not found" });
  }
};


// Update Data
// const UpdateData = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const ExistingUser = await UserModel.findById(id);
//     if(ExistingUser){
//       const updatedData = await UserModel.findByIdAndUpdate(id);
//       console.log(updatedData);
//     return  res.status(500).send({ msg: "Updated Successfully" });
//     }
//     return  res.status(500).send({ msg: "User not found" });
//   }catch(error){
//     res.status(500).send({msg: "Find Some error" });
//   }
// }
const UpdateData =async(req,res)=>{
  try{
const id = req.params.id;
const userExist =await UserModel.findById(id)
if(!userExist){
return res.status(500).send({msg: "User not found" });
}
const updatedData = await UserModel.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json(updatedData);
console.log(updatedData)
  }catch(error){
console.log(error)
  }
}

// Delete Data
const DeleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const ExistingUser = await UserModel.findById(id);
    if(ExistingUser){
    await UserModel.findByIdAndDelete(id);
    console.log(ExistingUser);
    res.status(500).send({ msg: "Deleted Successfully" });
    }else{
      res.status(500).send({ msg: "User not found" });
    }
    
  }catch(error){
    res.status(500).send({ msg: "Find Some error" });
  }
}

// const DeleteData = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const ExistingUser = await UserModel.findById(id);
//     if(!ExistingUser){
//     return  res.status(500).json({ msg: "User not found" });
    
//     }
//       await UserModel.findByIdAndDelete(id);
//       res.status(200).send({ msg: " deleted" });
    
    
//   }catch(error){
//     res.status(500).send({ msg: "Some Error" });
//   }
// }

module.exports = { Register, GetAllData, GetOneData, UpdateData, DeleteData };
