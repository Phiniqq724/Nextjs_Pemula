"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface LoginRequest {
  email: string;
  password: string;
}

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: string;
  profilePicture?: string | null;
}

interface UserData {
  token: string;
  idUser: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string | null;
}

interface UserResponse {
  status: boolean;
  logged: boolean;
  data: UserData;
  message: string;
}

interface GetAllUsersResponse {
  status: boolean;
  data: UserData[];
  message: string;
}

interface LoginResponse {
  status: boolean;
  logged: boolean;
  data: UserData;
  message: string;
}

export const GetAllUsers = async (): Promise<GetAllUsersResponse> => {
  const cookie = await cookies();
  const getToken = cookie.get("token");
  try {
    const response = await axios.get<GetAllUsersResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Don't have permission";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const CreateUser = async (
  credentials: CreateUserRequest
): Promise<UserResponse> => {
  const cookie = await cookies();
  const getToken = cookie.get("token");
  try {
    const response = await axios.post<UserResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Do not have permission";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const GetUserbyId = async (idUser: number): Promise<UserResponse> => {
  const cookie = await cookies();
  const getToken = cookie.get("token");
  try {
    const response = await axios.get<UserResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${idUser}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Do not have permission";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const UpdateUser = async (
  idUser: number,
  credentials: CreateUserRequest
): Promise<UserResponse> => {
  const cookie = await cookies();
  const getToken = cookie.get("token");
  try {
    const response = await axios.put<UserResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${idUser}`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Do not have permission";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const loginAction = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};
