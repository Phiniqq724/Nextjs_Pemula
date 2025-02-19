"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

interface Props {
  url: string;
  search: string;
}

export const Search = ({ url, search }: Props) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`${url}?search=${searchValue}`);
    }
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={handleSearch}
      placeholder="Search..."
      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 max-w-md focus:ring-primary focus:border-transparent"
    />
  );
};
