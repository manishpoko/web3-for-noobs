

import bcrypt from "bcrypt";

import prisma from "./prisma.ts";
const saltRounds = 10;

interface SignupInput {
    username : string;
    password: string;
    name: string;
}

export async function createUser(input: SignupInput) {
    const hashedPassword = await bcrypt.hash(input, saltRounds)

    const newUser = await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword
        }
    });

    return newUser;
}










