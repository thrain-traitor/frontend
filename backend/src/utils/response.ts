import { Response } from "express";

// Interface untuk response sukses
interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Interface untuk response error
interface ErrorResponse {
  success: boolean;
  message: string;
}

// Fungsi untuk custom response Sukses
export const successResponse = <T>(
  res: Response,
  data: T,
  message: string,
  statusCode: number
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

// Fungsi untuk custom response error
export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
