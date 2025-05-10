import { getCookie } from "@/lib/client-cookie";
import { BASE_API_URL } from "@/lib/global";
import { iUser } from "@/lib/types";
// import { get } from "http";
import { cookies } from "next/headers";
import React from "react";
import Button from "./Buttons";

// interface SidebarContentsProps {
//   name: string;
//   link: string;
// }

const getUser = async (id: number): Promise<iUser[]> => {
  let result: iUser[] = [];
  try {
    const TOKEN = (await cookies()).get("token")?.value || "";
    const url = `${BASE_API_URL}/id/${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.json();
    if (data?.status) result = [...data.data];
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default function SidebarContents() {
  const idUser = getCookie("id") || "";
  // const userName = getCookie("name") || "";

  const getUserData = getUser(parseInt(idUser));

  console.log(getUserData);

  return (
    <Button
      variants="danger"
      onClick={() => {
        console.log(getUserData);
      }}
    >
      Nigga
    </Button>
  );
}
