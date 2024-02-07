"use client";
import { ApiClientWithAuth } from "@/utils/ClientApi.utils";
import { BeakerIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import DefaultLoader from "../Loaders/DefaultLoader";

export default function ModalBodyRecipe() {
  const [ingredients, setIngredients] = useState([{ ingredient: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    length: 0,
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddInput = () => {
    setIngredients([...ingredients, { ingredient: "" }]);
  };

  const handleChange = (event: any, index: number) => {
    let { name, value } = event.target;
    let onChangeValue = [...ingredients];
    onChangeValue[index]["ingredient"] = value;
    setIngredients(onChangeValue);
  };

  const handleDeleteInput = (index: number) => {
    const newArray = [...ingredients];
    newArray.splice(index, 1);
    setIngredients(newArray);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const client = ApiClientWithAuth();
    console.log({
      Name: formData.name,
      RequiredTimeIntermsSeconds: formData.length,
      RecipeDescription: formData.description,
      Ingredients: ingredients.map((e) => e.ingredient),
    });
    try {
      const res = await client.post("/api/recipe", {
        Name: formData.name,
        RequiredTimeIntermsSeconds: formData.length,
        RecipeDescription: formData.description,
        Ingredients: ingredients.map((e) => e.ingredient),
      });

      if (res.status === 201) {
        toast.success("Recipe Added");
      } else {
        toast.error("Unknown error");
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const handleOnChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form action="#">
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="Film name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="length"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Required Time In Terms of Seconds
            </label>
            <input
              type="number"
              id="length"
              name="length"
              onChange={handleOnChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="90210"
              required
            />
          </div>
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto w-full sm:col-span-2 sm:pr-6">
            {ingredients.map((item, index) => (
              <div className="flex flex-row gap-2 w-full" key={index}>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Some Fresh Food"
                  name="ingredient"
                  type="text"
                  value={item.ingredient}
                  onChange={(event) => handleChange(event, index)}
                />

                {ingredients.length > 1 && (
                  <button onClick={() => handleDeleteInput(index)}>
                    <div className="p-1 hover:bg-gray-50 rounded-md">
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </div>
                  </button>
                )}
                {index === ingredients.length - 1 && (
                  <button onClick={() => handleAddInput()}>
                    <div className="p-1 hover:bg-gray-50 rounded-md">
                      <PlusIcon className="w-5 h-5 text-blue-500" />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              onChange={handleOnChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Write product description here"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className="text-white inline-flex gap-2 items-center bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading ? (
            <DefaultLoader />
          ) : (
            <BeakerIcon className="mr-1 -ml-1 w-6 h-6" />
          )}
          Add new recipe
        </button>
      </form>
    </>
  );
}
