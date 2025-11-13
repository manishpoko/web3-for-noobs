// src/auth/authService.ts (FINAL, CORRECT CJS STRUCTURE)

// 1. CJS IMPORTS
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

// 2. DEFINE FUNCTIONS (NO 'export' keyword here)

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
}

async function findUserByEmail(email: string): Promise<any> { 
    // We assume prisma is correctly instantiated and imported in the final environment.
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    });
    
    if(!user) {
        console.log(`Login failed with the email ${email}`);
        return null;
    }
    return user;
}

async function comparePassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const passwordMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
        return passwordMatch; 
    }
    catch (error){
        console.error("Error during password comparision:", error);
        return false;
    }
}

async function validateUserLogin(email: string, password: string): Promise<boolean> {
    const user = await findUserByEmail(email); 
    if(!user) {
        return false;
    }
    
    // We rely on the 'any' type resolution here to access 'user.password'.
    const passwordIsValid = await comparePassword(password, (user as any).password); 
    return passwordIsValid;
}

// 3. CJS EXPORT: Export all functions as an object (The disciplined way)
module.exports = {
    hashPassword,
    findUserByEmail,
    comparePassword,
    validateUserLogin
};