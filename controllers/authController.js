const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User already exists'
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(request.body.password,salt);
        req.body.password = hashedPassword
        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message:'User created successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }

};

module.exports = { registerController};