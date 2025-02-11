import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "./global";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

export const get = async (url: string, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}` || "",
    };
    const result = await axiosInstance.get(url, {
      headers,
    });

    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};

export const post = async (
  url: string,
  data: string | FormData,
  token: string
) => {
  try {
    const typed: string =
      typeof data == "string" ? "application/json" : "multipart/form-data";
    const headers = {
      Authorization: `Bearer ${token}` || "",
      "Content-Type": typed,
    };
    const result = await axiosInstance.post(url, data, {
      headers,
    });

    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.response.data.message}`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong`,
    };
  }
};
