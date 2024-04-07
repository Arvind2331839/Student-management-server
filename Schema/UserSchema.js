const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    Name:String,
    Age:String,
    Email:String,
    Mobile:String
   
})


// create a massage model based on schema
const UserModel=mongoose.model('user',UserSchema)


// export the massage model and massageSchema

module.exports={UserModel}

