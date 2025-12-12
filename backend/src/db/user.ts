
import { PrismaClient } from "../generated/prisma/client.js";

import bcrypt from 'bcrypt'
const saltRounds = 10;

const prisma = new PrismaClient();

interface SignupInput {
    username: string;
    password: string;
    name?: string
}

export async function createuser(input: SignupInput) {
    const {username, password, name} = input
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await prisma.user.create({
        data: {username: username,
        password: hashedPassword,
        name: name}
        });

        return newUser;


}













