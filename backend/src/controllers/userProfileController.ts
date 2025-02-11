import { Response, Request } from "express";
import * as userService from "../services/userProfileService";
import { successResponse, errorResponse } from "../utils/response";
import { User } from "@prisma/client";

// Membuat user beserta profile-nya
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, first_name } = req.body;

  try {
    const user: User | null = await userService.createUserAndProfile(
      email,
      password,
      first_name
    );

    if (!user) {
      return errorResponse(res, "Gagal membuat user", 500);
    }

    return successResponse<User>(
      res,
      user,
      "Berhasil membuat user dan profil",
      201
    );
  } catch (err) {
    return errorResponse(res, `Error saat membuat user: ${err}`, 500);
  }
};

// Mengambil semua user beserta profil mereka
export const getAllUserWithProfiles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users: User[] = await userService.getAllUserWithProfiles();

    return successResponse<User[]>(
      res,
      users,
      "Berhasil mengambil semua user",
      200
    );
  } catch (err) {
    return errorResponse(res, `Error saat mengambil semua user: ${err}`, 500);
  }
};

// Mengambil user berdasarkan ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);

  try {
    const user: User | null = await userService.getUserById(userId);

    if (!user) {
      return errorResponse(
        res,
        `User dengan ID ${userId} tidak ditemukan`,
        404
      );
    }

    return successResponse<User>(
      res,
      user,
      "Berhasil mengambil user berdasarkan ID",
      200
    );
  } catch (err) {
    return errorResponse(
      res,
      `Error saat mengambil user dengan ID ${userId}: ${err}`,
      500
    );
  }
};

// Mengupdate data user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  const { email, password } = req.body;

  try {
    const updatedUser: User | null = await userService.updateUser(
      userId,
      email,
      password
    );

    if (!updatedUser) {
      return errorResponse(
        res,
        `User dengan ID ${userId} tidak ditemukan`,
        404
      );
    }

    return successResponse<User>(
      res,
      updatedUser,
      "Berhasil memperbarui user",
      200
    );
  } catch (err) {
    return errorResponse(
      res,
      `Error saat memperbarui user dengan ID ${userId}: ${err}`,
      500
    );
  }
};

// Menghapus user berdasarkan ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);

  try {
    const deletedUser: User | null = await userService.deleteUser(userId);

    if (!deletedUser) {
      return errorResponse(
        res,
        `User dengan ID ${userId} tidak ditemukan`,
        404
      );
    }

    // Karena data dihapus, kita kirim null, tapi tetap sesuai dengan tipe `successResponse<null>`
    return successResponse<null>(res, null, "Berhasil menghapus user", 200);
  } catch (err) {
    return errorResponse(
      res,
      `Error saat menghapus user dengan ID ${userId}: ${err}`,
      500
    );
  }
};
