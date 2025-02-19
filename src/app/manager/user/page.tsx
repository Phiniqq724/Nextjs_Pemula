import { iUser } from "@/lib/types";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/lib/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import { Search } from "../_components/search";
import Alert from "@/components/Alert";
import { cookies } from "next/headers";

const getUser = async (search: string): Promise<iUser[]> => {
  try {
    const TOKEN = (await cookies()).get("token")?.value || "";
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, TOKEN);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : "";
  const users: iUser[] = await getUser(search);

  const roleBadge = (role: string) => {
    const roleStyles: { [key: string]: string } = {
      MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      CASHIER:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      USER: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    return (
      <span
        className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
          roleStyles[role] || roleStyles.USER
        }`}
      >
        {role.charAt(0) + role.slice(1).toLowerCase()}
      </span>
    );
  };

  return (
    <div className="mt-5">
      <h4 className="text-xl font-bold mb-2 text-center">User Data</h4>
      <p className="text-sm text-secondary mb-4 text-center">
        This page displays user data, allowing users to view details, search,
        and manage user items by adding, editing, or deleting them.
      </p>
      <div className="flex justify-center items-center w-full gap-4 mb-4">
        <Search url={`/manager/user`} search={search} />
      </div>
      {users.length === 0 ? (
        <Alert title="Informasi" variants="info">
          No data available
        </Alert>
      ) : (
        <div className="m-2">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex flex-wrap border border-gray-200 rounded-md p-2 m-2 shadow-sm"
            >
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">ID</small>
                <br />
                {user.idUser}
              </div>
              <div className="w-full md:w-1/12 p-2 flex items-center justify-center">
                <Image
                  width={40}
                  height={40}
                  src={`${BASE_IMAGE_PROFILE}/${user.profilePicture}`}
                  className="rounded-sm"
                  alt="Profile"
                  unoptimized
                />
              </div>
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Name</small>
                <br />
                {user.name}
              </div>
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Email</small>
                <br />
                {user.email}
              </div>
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Role</small>
                <br />
                {roleBadge(user.role)}
              </div>
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Action</small>
                <br />
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-md">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserPage;
