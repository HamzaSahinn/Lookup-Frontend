"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ModalSchema from "@/Components/Modals/ModalSchema";
import {
  ArrowLeftStartOnRectangleIcon,
  BeakerIcon,
  FilmIcon,
  TrashIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import ModalBodyFilm from "@/Components/Modals/ModalBodyFilm";
import ModalBodyRecipe from "@/Components/Modals/ModalBodyRecipe";
import ModalBodyGame from "@/Components/Modals/ModalBodyGame";
import { logout } from "@/utils/auth.utils";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { FilmDto, GameDto, RecipeDto } from "@/types/dto.types";
import { ApiClientWithAuth } from "@/utils/ClientApi.utils";
import FilmCard from "@/Components/LookupCards/FilmCard";
import GameCard from "@/Components/LookupCards/GameCard";
import RecipeCard from "@/Components/LookupCards/RecipeCard";

export default function Page() {
  const context = useContext(AuthContext);
  const [isOpenFilm, setIsOpenFilm] = useState<boolean>(false);
  const [isOpenRecipe, setIsOpenRecipe] = useState<boolean>(false);
  const [isOpenGame, setIsOpenGame] = useState<boolean>(false);

  const [films, setFilms] = useState<FilmDto[]>();
  const [games, setGames] = useState<GameDto[]>();
  const [recipes, setRecipes] = useState<RecipeDto[]>();

  const client = ApiClientWithAuth();
  const router = useRouter();

  async function getUserData(type: string) {
    let path = "";

    if (type === "film") path = "/api/film/my_data";
    else if (type === "game") path = "/api/game/my_data";
    else if (type === "recipe") path = "/api/recipe/my_data";
    else return;

    try {
      const res = await client.get(path);

      switch (type) {
        case "film":
          setFilms(res.data as FilmDto[]);
          console.log(res.data);
          break;
        case "game":
          setGames(res.data as GameDto[]);
          console.log("asd");
          break;
        case "recipe":
          setRecipes(res.data as RecipeDto[]);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUserData(type: string, id: string) {
    await client.delete(`/api/${type}/${id}`);
  }

  useEffect(() => {
    const client = ApiClientWithAuth();

    client
      .get("/api/film/my_data")
      .then((res) => {
        setFilms(res.data as FilmDto[]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ToastContainer hideProgressBar={true} position="bottom-right" />

      <div className="flex flex-row justify-end">
        <button
          onClick={async () => {
            if (await logout()) router.push("/");
            toast.error("Logout error");
          }}
          type="button"
          className="text-white flex flex-row gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
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

      <div className="flex w-full flex-col items-center mt-6">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="bordered"
          onSelectionChange={(key) => getUserData(key.toString())}
        >
          <Tab
            key="film"
            title={
              <div className="flex items-center space-x-2">
                <FilmIcon className="w-4 h-4" />
                <span>Films</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {films?.map((e) => {
                return (
                  <div className="flex flex-col gap-3" key={e.id}>
                    <button
                      onClick={() => deleteUserData("film", e.id)}
                      className="self-center"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                    <FilmCard film={e} />
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab
            key="game"
            title={
              <div className="flex items-center space-x-2">
                <WindowIcon className="w-4 h-4" />
                <span>Games</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {games?.map((e) => {
                return <GameCard game={e} key={e.id} />;
              })}
            </div>
          </Tab>
          <Tab
            key="recipe"
            title={
              <div className="flex items-center space-x-2">
                <BeakerIcon className="w-4 h-4" />
                <span>Recipe</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recipes?.map((e) => {
                return <RecipeCard recipe={e} key={e.id} />;
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
