"use server"

import {getCollection} from "../lib/db.js"
import bcrypt from "bcrypt"
import { cookies } from "next/headers.js"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation.js"

function isAlphaNumeric(x) {
    const regex = /^[a-zA-Z0-9ñÑ]*$/
    return regex.test(x)    
}

export const logout = async function() {
    (await cookies()).delete("ourhaikuapp")
    redirect("/")
}

export const login = async function(prevState,formData) {
const failObject ={
success: false,
            message: "Usuario invalido / contraseña"
}

    const ourUser = {
        username:formData.get("username"),
        password: formData.get("password")
       }
    if (typeof ourUser.username != "string") ourUser.username = ""
    if (typeof ourUser.password != "string") ourUser.password = ""

    const collection = await getCollection("users")
    const user = await collection.findOne({username: ourUser.username})
    
    if (!user) {
        return failObject    
        
        
    }

    const matchOrNot = bcrypt.compareSync(ourUser.password,user.password)

    if (!matchOrNot) {
        return failObject
    }

     //crear nuestro JWT value
   const ourTokenValue = jwt.sign({skyColor:"blue",userId: user._id,exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },process.env.JWTSECRET)
  
   // Lguear al Usuario obteniendo cookies
   cookies().set("ourhaikuapp",ourTokenValue,{
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60*60*24,
    secure: true
   })

return redirect("/")
}

export const register = async function(prevState, formData) {
   const errors= {}

   const ourUser = {
    username:formData.get("username"),
    password: formData.get("password")
   }

   if (typeof ourUser.username != "string") ourUser.username = ""
   if (typeof ourUser.password != "string") ourUser.password = ""

   ourUser.username = ourUser.username.trim()
   ourUser.password = ourUser.password.trim()

   if (ourUser.username.length < 3) errors.username = "El Nombre de Usuario debe ser mayor a 3 Caracteres"
   if (ourUser.username.length > 30) errors.username = "El Nombre de Usuario no debe exceder los 30 Caracteres"
   if (ourUser.username == "") errors.username = "Debes colocar un nombre de Usuario"

   if (!isAlphaNumeric(ourUser.username)) errors.username = "El nombre de usuario solo puede contener letras y numeros"

   // validar si el usuario existe o no

   const userCollection = await getCollection("users")
   const usernameInQuestion = await userCollection.findOne({username: ourUser.username})

   if ( usernameInQuestion) {
    errors.username = "Este nombre de usuario ya esta en uso"
   }



   if (ourUser.password.length < 12) errors.password = "La contraseña no debe ser menor a 12 Caracteres"
   if (ourUser.password.length > 50) errors.password = "La contraseña no debe exceder los 50 Caracteres"
   if (ourUser.password == "") errors.password = "Debes colocar una contraseña"



   if (errors.username || errors.password){
    return{
        errors: errors,
        success: false
    }
   }

   //hash primera contraseña
   const salt = bcrypt.genSaltSync(10)
   ourUser.password = bcrypt.hashSync(ourUser.password, salt)

   //Guardar nuevo Usuario en base de datos
   const usersCollection = await getCollection("users")
   const newUser = await usersCollection.insertOne(ourUser)
   const userId = newUser.insertedId.toString()

   //crear nuestro JWT value
   const ourTokenValue = jwt.sign({skyColor:"blue",userId: userId,exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },process.env.JWTSECRET)
  
   // Lguear al Usuario obteniendo cookies
   cookies().set("ourhaikuapp",ourTokenValue,{
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60*60*24,
    secure: true
   })

   return{
    success:true
   }
}