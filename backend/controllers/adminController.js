import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary'
import DoctorModel from "../models/Doctor.js"
import jwt from "jsonwebtoken" 

//API for Adding Doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, image, experience, about, fees, address } = req.body
        const imageFile = req.file
        
        // console.log({name, email, password, speciality, degree, experience, about, fees, address,imageFile})

        //validation
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            })
        }
        
        //validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            })
        }
        
        //validate strong password
        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image on cloudinary
        const uploadImage = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = uploadImage.secure_url

        //create doctor
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            date: Date.now(),
        }

        const newDoctor = new DoctorModel(doctorData)
        await newDoctor.save()
        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}


//API for Admin Login

const loginAdmin=(req,res)=>{
    try {
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL || password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                token,
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

export {addDoctor,loginAdmin}