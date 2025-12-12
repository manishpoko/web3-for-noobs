import { PrismaClient } from "../generated/prisma/client.js";

import bcrypt from "bcrypt";
const saltRounds = 10;

const prisma = new PrismaClient();

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

export async function createuser(input: SignupInput) {
  const { email, password, username } = input;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await prisma.user.create({
    data: { email: email, password: hashedPassword, username: username },
  });

  return newUser;
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  const emailExists = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!emailExists) {
    return "invalid email or password"
  }

  //comparing the user password with the database one

  const match = await  bcrypt.compare(password, emailExists.password);
    if (match) {
      //password is correct, proceed to login
    } else {
      return "invalid password";
    }



}
