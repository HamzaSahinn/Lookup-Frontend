import { FilmDto } from "@/types/dto.types";
import { Sec2Hour, Stamp2Date } from "@/utils/helper.utils";
import { FilmIcon } from "@heroicons/react/24/outline";

export default function FilmCard({ film }: { film: FilmDto }) {
  return (
    <div className="flex flex-col p-2 border border-blue-500 rounded-lg gap-3">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-1 bg-gray-100 rounded-lg">
          <FilmIcon className="w-6 h-6 text-red-500" />
        </div>
        <span>{film.name}</span>
      </div>
      <div className="ml-8 pl-3 flex flex-col gap-2">
        <p className="text-sm">
          <span className="font-bold">Category: </span>
          {film.category}
        </p>
        <p className="text-sm">
          <span className="font-bold">Length: </span>
          {Sec2Hour(film.lengthInSeconds)}
        </p>
        <p className="text-sm">
          <span className="font-bold">ReleaseDate: </span>
          {Stamp2Date(film.releaseDate)}
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <span className="text-sm text-black">
          Author: {film.applicationUserName}
        </span>
      </div>
    </div>
  );
}
