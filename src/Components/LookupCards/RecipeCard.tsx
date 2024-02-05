import { RecipeDto } from "@/types/dto.types";
import { Sec2Hour } from "@/utils/helper.utils";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function RecipeCard({ recipe }: { recipe: RecipeDto }) {
  return (
    <div className="flex flex-col p-2 border border-blue-500 rounded-lg gap-3">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-1 bg-gray-100 rounded-lg">
          <BeakerIcon className="w-6 h-6 text-green-500" />
        </div>
        <span>{recipe.name}</span>
      </div>
      <div className="ml-8 pl-3 flex flex-col gap-2">
        <div className="text-sm">
          <span className="font-bold">Ingredients: </span>
          {recipe.ingredients.map((e) => {
            return <span key={e}>{e},&nbsp;</span>;
          })}
        </div>

        <p className="text-sm">
          <span className="font-bold">Required Time: </span>
          {Sec2Hour(recipe.requiredTimeIntermsSeconds)}
        </p>

        <p className="text-sm">
          <span className="font-bold">Description: </span>
          {recipe.recipeDescription}
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <span className="text-sm text-black">
          Author: {recipe.applicationUserName}
        </span>
      </div>
    </div>
  );
}
