// src/db/user.ts (Final, Correct CJS Structure)

// 1. CJS IMPORTS: Use require() for stability

// Define the shape of the data (remains the same)
interface UserData {
  email: string;
  password: string;
  name: string;
}

// standard db function to create a new user
async function createUser(data: UserData) {
  // 2. REMOVE 'export' keyword

  const hashedPassword = await hashPassword(data.password);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });
  return newUser;
}

// 3. CJS EXPORT: Use module.exports to expose the function
module.exports = {
  createUser,
};
