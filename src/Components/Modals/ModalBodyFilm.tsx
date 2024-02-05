import { ApiClientWithAuth } from "@/utils/ClientApi.utils";
import { FilmIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import DefaultLoader from "../Loaders/DefaultLoader";

export default function ModalBodyFilm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    length: 0,
    date: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const client = ApiClientWithAuth();
    try {
      const res = await client.post("/api/film", {
        Name: formData.name,
        Category: formData.category,
        ReleaseDate: new Date(formData.date),
        LengthInSeconds: formData.length,
      });

      if (res.status === 201) {
        toast.success("Film Added");
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
      <form>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Film Name
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
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="Film Category"
              required
            />
          </div>
          <div>
            <label
              htmlFor="length"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Film Length In Terms of Seconds
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
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Release Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleOnChange}
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          type="submit"
          className="text-white inline-flex gap-2 items-center bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? (
            <DefaultLoader />
          ) : (
            <FilmIcon className="mr-1 -ml-1 w-6 h-6" />
          )}
          Add new film
        </button>
      </form>
    </>
  );
}
