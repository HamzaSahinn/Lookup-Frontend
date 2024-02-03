"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ModalSchema from "@/Components/Modals/ModalSchema";
import {
  BeakerIcon,
  FilmIcon,
  PlusCircleIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import ModalBodyFilm from "@/Components/Modals/ModalBodyFilm";
import ModalBodyRecipe from "@/Components/Modals/ModalBodyRecipe";
import ModalBodyGame from "@/Components/Modals/ModalBodyGame";

export default function Page() {
  const context = useContext(AuthContext);
  const [isOpenFilm, setIsOpenFilm] = useState<boolean>(false);
  const [isOpenRecipe, setIsOpenRecipe] = useState<boolean>(false);
  const [isOpenGame, setIsOpenGame] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-12">
        <div className="border border-blue-600 ring-2 ring-blue-200 p-4 rounded-lg flex flex-col gap-2">
          <h2 className="font-semibold">Add Film to Lookup</h2>
          <p className="text-sm text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem sed debitis minima tempore aspernatur eum neque
            necessitatibus iure dolor! Provident placeat dolor earum alias esse.
            Quam non perspiciatis labore ipsum.
          </p>
          <button
            className="flex flex-row gap-3 items-center self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 focus:outline-none"
            onClick={() => setIsOpenFilm((prev) => !prev)}
          >
            <FilmIcon className="w-4 h-4" />
            Add Film
          </button>
          <ModalSchema isOpen={isOpenFilm} setIsOpen={setIsOpenFilm}>
            <ModalBodyFilm />
          </ModalSchema>
        </div>

        <div className="border border-blue-600 ring-2 ring-blue-200 p-4 rounded-lg flex flex-col gap-2">
          <h2 className="font-semibold">Add Recipe to Lookup</h2>
          <p className="text-sm text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem sed debitis minima tempore aspernatur eum neque
            necessitatibus iure dolor! Provident placeat dolor earum alias esse.
            Quam non perspiciatis labore ipsum.
          </p>
          <button
            className="flex flex-row gap-3 self-end items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 focus:outline-none"
            onClick={() => setIsOpenRecipe((prev) => !prev)}
          >
            <BeakerIcon className="w-4 h-4" />
            Add Recipe
          </button>
          <ModalSchema isOpen={isOpenRecipe} setIsOpen={setIsOpenRecipe}>
            <ModalBodyRecipe />
          </ModalSchema>
        </div>

        <div className="border border-blue-600 ring-2 ring-blue-200 p-4 rounded-lg flex flex-col gap-2">
          <h2 className="font-semibold">Add Game to Lookup</h2>
          <p className="text-sm text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem sed debitis minima tempore aspernatur eum neque
            necessitatibus iure dolor! Provident placeat dolor earum alias esse.
            Quam non perspiciatis labore ipsum.
          </p>
          <button
            className="flex flex-row gap-3 self-end items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 focus:outline-none"
            onClick={() => setIsOpenGame((prev) => !prev)}
          >
            <WindowIcon className="w-4 h-4" />
            Add Game
          </button>
          <ModalSchema isOpen={isOpenGame} setIsOpen={setIsOpenGame}>
            <ModalBodyGame />
          </ModalSchema>
        </div>
      </div>
    </>
  );
}
