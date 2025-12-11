import { PrismaClient } from '../generated/prisma/client.js'

import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
const saltRounds = 10;

interface SignupInput {
    name: string;
    username: string;
    password: string
}

export async function createuser(input:SignupInput) {
    const {username, password, name} = input;


    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            name,
        }
    });
    return newUser;
}













