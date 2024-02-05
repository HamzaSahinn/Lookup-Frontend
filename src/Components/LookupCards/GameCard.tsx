import { GameDto } from "@/types/dto.types";
import { Sec2Hour, Stamp2Date } from "@/utils/helper.utils";
import { WindowIcon } from "@heroicons/react/24/outline";

export default function GameCard({ game }: { game: GameDto }) {
  return (
    <div className="flex flex-col p-2 border border-blue-500 rounded-lg gap-3">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-1 bg-gray-100 rounded-lg">
          <WindowIcon className="w-6 h-6 text-blue-500" />
        </div>
        <span>{game.name}</span>
      </div>
      <div className="ml-8 pl-3 flex flex-col gap-2">
        <p className="text-sm">
          <span className="font-bold">Genre: </span>
          {game.genre}
        </p>
        <p className="text-sm">
          <span className="font-bold">Price: </span>
          {game.price + " $"}
        </p>
        <p className="text-sm">
          <span className="font-bold">ReleaseDate: </span>
          {Stamp2Date(game.releaseDate)}
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <span className="text-sm text-black">
          Author: {game.applicationUserName}
        </span>
      </div>
    </div>
  );
}
