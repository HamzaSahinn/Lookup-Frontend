"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export default function DefaultPagination({
  totalPage,
}: {
  totalPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("Page")) || 1;

  return (
    <div className="flex">
      <a
        href={
          currentPage - 1 <= 0 ? "" : `${pathname}/?Page=${currentPage - 1}`
        }
        className="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-blue-500 hover:text-white"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </a>

      {[...Array(totalPage)].map((e, index) => {
        return (
          <a
            key={index}
            href={`${pathname}/?Page=${index + 1}`}
            className={clsx(
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700",
              "hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white"
            )}
          >
            {index + 1}
          </a>
        );
      })}

      <a
        href={
          currentPage === totalPage
            ? ""
            : `${pathname}/?Page=${currentPage + 1}`
        }
        className="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-blue-500 hover:text-white"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </a>
    </div>
  );
}
