import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS || 10;

// Fungsi untuk hashing password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Fungsi untuk verifikasi password
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
