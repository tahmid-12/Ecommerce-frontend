"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGetSearchQuery } from "@/redux/api/search";

export default function SearchBar() {

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log("Search Text:", e.target.value);
  };

  const handleSubmit = () => {
    if (!searchText.trim()) {
      alert("Please enter a search term"); 
      return;
    }

    console.log("Searching for:", searchText);

  };

  return (
    <div className="xl:w-[70%] lg:w-[60%] w-[40%] bg-card sm:flex hidden items-center rounded-[30px] gap-1 px-5 py-1 shadow-3xl">
      <Input
        className="w-full h-8 px-3 text-xl text-gray-700 border-none outline-0 bg-card rounded-2xl placeholder:text-gray-400 placeholder:text-xl"
        placeholder="Enter the product you are looking for"
        value={searchText}
        onChange={handleSearch}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button
        type="submit"
        className="bg-primary rounded-2xl hover:bg-[#F85606]/30"
        onClick={handleSubmit}
      >
        <Search size={15} />
      </Button>
    </div>
  );
}