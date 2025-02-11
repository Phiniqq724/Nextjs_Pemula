"use server"

import { cookies } from "next/headers";

const Cookies = await cookies();

export const getCookies = async (key: string): Promise<string> => {
  return Cookies.get(key)?.value || "";
};

export const setCookies = async (key: string, value: string) => {
  Cookies.set(key, value);
};

export const removeCookies = async (key: string) => {
  Cookies.delete(key);
};
