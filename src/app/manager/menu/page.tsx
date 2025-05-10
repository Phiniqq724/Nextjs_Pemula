import { iMenu } from "@/lib/types";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/lib/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import Alert from "@/components/Alert";
import { cookies } from "next/headers";
import AddMenu from "./_components/addMenu";
import EditMenu from "./_components/editMenu";
import DeleteMenu from "./_components/deleteMenu";
import { Search } from "../_components/search";

const getMenu = async (search: string): Promise<iMenu[]> => {
  try {
    const TOKEN = (await cookies()).get("token")?.value || "";
    const url = `${BASE_API_URL}/menu?search=${search}`;
    const { data } = await get(url, TOKEN);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const categoryBadge = (category: string) => {
  const categoryStyles: { [key: string]: string } = {
    FOOD: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    SNACK:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    DRINK:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };
  return (
    <span
      className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
        categoryStyles[category] || categoryStyles.DRINK
      }`}
    >
      {category.charAt(0) + category.slice(1).toLowerCase()}
    </span>
  );
};

const MenuPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : "";
  const menu: iMenu[] = await getMenu(search);

  return (
    <div className="mt-5">
      <h4 className="text-xl font-bold mb-2 text-center">Menu Data</h4>
      <p className="text-sm text-secondary mb-4 text-center">
        This page displays menu data, allowing menus to view details, search,
        and manage menu items by adding, editing, or deleting them.
      </p>
      <div className="flex justify-center items-center w-full gap-4 mb-4">
        <Search url={`/manager/menu`} search={search} />
        <AddMenu />
      </div>
      {menu.length === 0 ? (
        <Alert title="Informasi" variants="info">
          No data available
        </Alert>
      ) : (
        <div className="m-2">
          {menu.map((data, index) => (
            <div
              key={index}
              className="flex flex-wrap border justify-between border-gray-200 rounded-md p-2 m-2 shadow-sm"
            >
              <div className="w-full md:w-1/12 p-2 flex items-center justify-center">
                <Image
                  width={40}
                  height={40}
                  src={`${BASE_IMAGE_MENU}/${data.image}`}
                  className="rounded-sm"
                  alt="preview"
                  unoptimized
                />
              </div>
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Name</small>
                <br />
                {data.name}
              </div>
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Price</small>
                <br />
                {data.price}
              </div>
              <div className="w-full md:w-5/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Description
                </small>
                <br />
                {data.description}
              </div>
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Category
                </small>
                <br />
                {categoryBadge(data.category)}
              </div>
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Action</small>
                <br />
                <div className="flex gap-2">
                  <EditMenu selectedMenu={data} />
                  <DeleteMenu selectedMenu={data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
