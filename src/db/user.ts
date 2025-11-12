import prisma from "./prisma";
import {hashPassword} from "../auth/authService";


//defining the blueprint of the user type to be accepted
interface UserData {
    email: string;
    password: string;
    name: string
}

//standard db function to create a new user
export async function createUser(data: UserData){

    const hashedPassword = await hashPassword(data.password)

    const newUser = await prisma.user.create({
        data:{
            email: data.email,
            password: hashedPassword, //remember this should be hashed
            name: data.name
        }
    });
    
    return newUser;

}