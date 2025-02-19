import { iMenu } from "@/lib/types";
// import { cookies } from "next/headers"; // ✅ Correct import
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/lib/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import { Search } from "../_components/search";
import Alert from "@/components/Alert";
// import { getCookies } from "@/lib/server-cookies";
import { cookies } from "next/headers";
import AddMenu from "./_components/addMenu";
import EditMenu from "./_components/editMenu";
import DeleteMenu from "./_components/deleteMenu";

const getMenu = async (search: string): Promise<iMenu[]> => {
  let result: iMenu[] = [];
  try {
    const TOKEN = (await cookies()).get("token")?.value || "";
    const url = `${BASE_API_URL}/menu?search=${search}`;
    const { data } = await get(url, TOKEN);
    if (data?.status) result = [...data.data];
  } catch (error) {
    console.log(error);
  }
  return result;
};

const MenuPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const menu: iMenu[] = await getMenu(search);
  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          Food
        </span>
      );
    }
    if (cat === "SNACK") {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
          Snack
        </span>
      );
    }
    return (
      <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
        Drink
      </span>
    );
  };

  return (
    <>
      <div className="mt-5">
        <h4 className="text-xl font-bold mb-2 text-center">Menu Data</h4>
        <p className="text-sm text-secondary mb-4 text-center">
          This page displays menu data, allowing menus to view details, search,
          and manage menu items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex justify-center items-center w-full gap-4">
            <Search url={`/manager/menu`} search={search} />
            <AddMenu />
          </div>
        </div>
        {menu.length == 0 ? (
          <Alert title="Informasi" variants="info">
            No data Available
          </Alert>
        ) : (
          <>
            <div className="m-2">
              {menu.map((data, index) => (
                <div
                  key={`key-${index}`}
                  className={`flex flex-wrap m-2 border border-gray-200 rounded-md`}
                >
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Picture
                    </small>
                    <br />
                    <Image
                      width={40}
                      height={40}
                      src={`${BASE_IMAGE_MENU}/${data.image}`}
                      className="rounded-sm overflow-hidden"
                      alt="preview"
                      unoptimized
                    />
                  </div>
                  <div className="w-full md:w-2/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Name
                    </small>{" "}
                    <br />
                    {data.name}
                  </div>
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Price
                    </small>{" "}
                    <br />
                    {data.price}
                  </div>
                  <div className="w-full md:w-5/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Description
                    </small>{" "}
                    <br />
                    {data.description}
                  </div>
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Category
                    </small>{" "}
                    <br />
                    {category(data.category)}
                  </div>
                  <div className="w-full md:w-2/12 p-2">
                    <small className="text-sm font-bold text-primary">
                      Action
                    </small>
                    <div className="flex gap-1">
                      <EditMenu selectedMenu={data} />
                      <DeleteMenu selectedMenu={data} />
                    </div>

                    <br />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MenuPage;
