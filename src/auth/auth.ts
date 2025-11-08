



import bcrypt, { compare } from "bcryptjs";
import prisma from "../db/prisma";

const saltRounds = 10;

export async function hashPassword (password: string): Promise <string> {
    //above, we have promise<string> to declare that a promise is expected of string datatype since it is async-await function (this is just type safety, remember it tho!)

  const salt = await bcrypt.genSalt(saltRounds);

  //hashing logic-
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function findUserByEmail(email: string): Promise <any> {

    const user = await prisma.user.findUnique({
        where:{
            email: email //checks the unique email provided by the user
        }
    })
    if(!user) {
        console.log(`login failed with the email ${email}`)
        return null;
    }
    return user;
}

export async function comparePassword(plaintextPassword: string, hashedPassword: string) {
    try{
        const passwordMatch =await  bcrypt.compare(plaintextPassword, hashedPassword)

        if(passwordMatch) {
            console.log("pwd checked successful");
        } else{
            console.log("pwd check failed")
        }
        return passwordMatch;
    }
    catch (error){
        console.error("error during password comparision", error);
        return false
    }
}
export async function validateUserLogin(email: string, password: string) {

    //checking the email validation first - 
    const user = await findUserByEmail(email) 
    if(!user) {
        return false
    }

    //email checked, now password-
    const passwordIsValid = await comparePassword(password, (user as any).password)

    return passwordIsValid;


}



