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
    />
  );
};
