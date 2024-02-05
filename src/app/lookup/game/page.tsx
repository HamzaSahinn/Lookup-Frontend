"use client";
import GameCard from "@/Components/LookupCards/GameCard";
import DefaultPagination from "@/Components/Pagination/DefaultPagination";
import { GameDto } from "@/types/dto.types";
import { ApiClientPublic } from "@/utils/ClientApi.utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
  const Client = ApiClientPublic();
  const [games, setGames] = useState<[GameDto]>();
  const [totalPage, setTotalpage] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("Name", term);
    } else {
      params.delete("Name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    Client.get(
      `/api/game?Page=${searchParams.get("Page") || "1"}&Name=${
        searchParams.get("Name") || ""
      }`
    ).then((res) => setGames(res.data));
  }, [searchParams]);

  useEffect(() => {
    Client.get(`/api/game/count`).then((res) =>
      setTotalpage(1 + Math.floor(res.data / 16))
    );
  }, []);
  return (
    <>
      <h1 className="text-center mt-5 text-4xl font-semibold mb-6">
        Welcome to the Games Page
      </h1>

      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-blue-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("Name")?.toString()}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {games?.map((e) => {
          return <GameCard key={e.id} game={e} />;
        })}
      </div>
      <div className="flex flex-row justify-center mt-8">
        <DefaultPagination totalPage={totalPage} />
      </div>
    </>
  );
}
