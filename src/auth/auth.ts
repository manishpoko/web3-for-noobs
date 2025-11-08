import bcrypt from "bcryptjs";

const saltRounds = 10;

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);

  //hashing logic-
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
export default hashPassword;
