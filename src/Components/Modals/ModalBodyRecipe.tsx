"use client";
import { ApiClient } from "@/utils/ClientApi.utils";
import { BeakerIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

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
    const client = ApiClient();
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
      <ToastContainer hideProgressBar={true} position="bottom-right" />
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
          className="text-white inline-flex items-center bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <BeakerIcon className="mr-1 -ml-1 w-6 h-6" />
          )}
          Add new recipe
        </button>
      </form>
    </>
  );
}
