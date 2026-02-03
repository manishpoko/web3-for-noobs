


//this contains the signup and login logic



// import { PrismaClient } from "../generated/prisma/client.js";

import  prisma  from "./prisma.ts";

import bcrypt from "bcrypt";
const saltRounds = 10;

import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET ||             "a_fallback_secret_key";

interface SignupInput {
  email: string;
  password: string;
  username?: string;
}

interface LoginInput {
  email: string;
  password: string;
  username?: string;
}

//signup logic (for a newuser)
export async function createUser(input: SignupInput) {
  const { email, password, username } = input;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await prisma.user.create({
    data: { email: email, password: hashedPassword, username: username },
  }); //defining newuser properties

  const payload = {userId: newUser.id}; //generate token immediately on signup itself (no need to redirect to login page again)
  const token = jwt.sign(payload, secretKey, {expiresIn: "12h"}) //the token will have these attributes in it

  return {newUser, token};
}


//login logic
export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  const emailExists = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    //the select logic selects only these specified fields as attributes for the main variable
    select: {
      email: true,
      password: true,
      id: true
    },
  });

  if (!emailExists) {
    throw new Error("invalid email") 
  } 

  //comparing the user password with the database one

  const match = await  bcrypt.compare(password, emailExists.password);
    if (match) {
      //password is correct, proceed to login - jwt sign here:
      const payload = {userId: emailExists.id} //assigning the unique user id fetched during login (using select)


      const token = jwt.sign(payload, secretKey, {expiresIn: "12h"})
      return token; //this is imp. the entire function basically is to return the jwt token here    
    } else {
      throw new Error("invalid password") ;
    }



}
