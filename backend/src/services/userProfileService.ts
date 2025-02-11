import prisma from "../config/db";
import { User, Profile } from "@prisma/client";
import { hashPassword } from "../utils/security/hash";

// Membuat user beserta profile baru
export const createUserAndProfile = async (
  email: string,
  password: string,
  first_name: string = "User"
): Promise<User> => {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          first_name,
        },
      },
    },
  });
};

// Mengambil semua user beserta profil mereka
export const getAllUserWithProfiles = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: { profile: true },
  });
};

// Mengambil user berdasarkan ID
export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
};

// Mengupdate data user (email & password)
export const updateUser = async (
  id: number,
  email: string,
  password: string
): Promise<User | null> => {
  const hashedPassword: string = await hashPassword(password);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  return prisma.user.update({
    where: { id },
    data: {
      email,
      password: hashedPassword,
    },
  });
};

// Mengupdate data profile user
export const updateProfile = async (
  id: number,
  first_name: string,
  last_name: string,
  bio: string,
  profile_picture_path: string
): Promise<Profile | null> => {
  return prisma.profile.update({
    where: { userId: id },
    data: {
      first_name,
      last_name,
      bio,
      profile_picture_path,
    },
  });
};

// Menghapus user berdasarkan ID
export const deleteUser = async (id: number): Promise<User | null> => {
  return prisma.user.delete({ where: { id } });
};
