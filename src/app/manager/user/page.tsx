import { iUser } from "@/lib/types";
// import { cookies } from "next/headers"; // ✅ Correct import
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/lib/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import { Search } from "../_components/search";
import Alert from "@/components/Alert";
// import { getCookies } from "@/lib/server-cookies";
import { cookies } from "next/headers";

const getUser = async (search: string): Promise<iUser[]> => {
  try {
    const TOKEN = (await cookies()).get("token")?.value || "";
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: iUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
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
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const User: iUser[] = await getUser(search);
  const role = (cat: string): React.ReactNode => {
    if (cat === "MANAGER") {
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          Manager
        </span>
      );
    }
    if (cat === "CASHIER") {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
          Cashier
        </span>
      );
    }
    return (
      <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
        User
      </span>
    );
  };

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2">User Data</h4>
        <p className="text-sm text-secondary mb-4">
          This page displays User data, allowing Users to view details, search,
          and manage User items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md flex-grow">
            <Search url={`/manager/User`} search={search} />
          </div>
        </div>
        {
    User.length == 0 ?
        <Alert title="Informasi" variants="info">
            No data Available
        </Alert>
    :
    <>
        <div className="m-2">
            {User.map((data, index) => (
                <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                    <div className="w-full md:w-5/12 p-2">
                        <small className="text-sm font-bold text-primary">Id</small> <br />
                            {data.idUser}
                    </div>
                    <div className="w-full md:w-1/12 p-2">
                        <small className="text-sm font-bold text-primary">Picture</small><br />
                        <Image width={40} height={40} src={`${BASE_IMAGE_PROFILE}/${data.profilePicture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
                    </div>
                    <div className="w-full md:w-2/12 p-2">
                        <small className="text-sm font-bold text-primary">Name</small> <br />
                            {data.name}
                    </div>
                    <div className="w-full md:w-1/12 p-2">
                        <small className="text-sm font-bold text-primary">Email</small> <br />
                            {data.email}
                    </div>
                    <div className="w-full md:w-1/12 p-2">
                        <small className="text-sm font-bold text-primary">Role</small> <br />
                        {role(data.role)}
                    </div>
                    <div className="w-full md:w-2/12 p-2">
                        <small className="text-sm font-bold text-primary">Action</small><br />
                    </div>
            </div>
            ))}
        </div>
    </>
}

      </div>
    </div>
  );
};
export default UserPage;
