import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import orderModel from "../models/orderModel.js";
export const registerController = async(req,res)=> {
    try {
     const{name,email,password,phone,address,answer}=req.body   
     //validation
     if(!name){
        return res.send({message:'Name is required'})
     }
     if(!email){
        return res.send({message:'Email is required'})
     }
     if(!password){
        return res.send({message:'password is required'})
     }
     if(!phone){
        return res.send({message:'Phone is required'})
     }
     if(!address){
        return res.send({message:'addrees is required'})
     }
     if(!answer){
        return res.send({message:'answer is required'})
     }

     //check user
     const existinguser = await userModel.findOne({email})
    // existing user
    if (existinguser){
        return res.status (200).send({
            success:false,
            message:'already Registered please login'
        })
    }

    //Register user
     const hashedPassword = await hashPassword(password)


     //saving the psw
     const user= await new userModel({name,email, phone, address, password:hashedPassword,answer}).save()//key is password its value is hashedpassword


     res.status(201).send({
        success:true,
        message:'User Registered Succesfully',
        user 
     })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registeration',
            error
        })
    }
};

//POST LOGIN
export const loginController=async(req,res) =>{
try {
   const {email,password} = req.body
   //Validation
   if(!email || !password){
    return res.status(404).send({
        success:false,
        message:'Invalid Username or password'
    })
   }
   //check user
   const user = await userModel.findOne({email})
   if(!user){
    return res.status(404).send({
        success:false,
        message:'Email is not Registered'
    })
   }
   const match= await comparePassword(password,user.password)
   if(!match){
    return res.status(404).send({
        success:false,
        message:'Password did not match'
    })
   }

   //token
   const token = await JWT.sign({ _id: user.id},process.env.JWT_SECRET, {expiresIn:"900d"});

   res.status(200).send({
    success:true,
    message:'Logged In Succesfully',
    user:{
       name:user.name,
       email:user.email,
       phone:user.phone,
       address:user.address ,
       role:user.role
    },
    token,
   })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in Login',
        error
    })
}
};

//forgotPasswordController
export const forgotPasswordController=async(req,res) =>{
try {
    const{email,answer,newPassword}=req.body
    if(!email){
        res.status(400).send({message:'Email is required'})
    }
    if(!answer){
        res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
        res.status(400).send({message:'New Password is required'})
    }
// checking email and password
const user= await userModel.findOne({email,answer})
//validation
if(!user){
    res.status(404).send({
        success:false,
        message:'Wrong email or answer'
    })
}

const hashed = await hashPassword(newPassword)
await userModel.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
    success:true,
    message:"Password Reset Succesfully",
});

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Something Went Wrong',
        error
    })
}
}

//test controller
export const testController= (req,res)=>{
try {
    res.send('Protected route');
} catch (error) {
    console.log(error);
    res.send({error});
}
};

//update profile
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  //orders  single
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders all
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };