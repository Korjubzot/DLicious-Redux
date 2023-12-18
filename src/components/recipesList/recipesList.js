import React, { useState, useEffect, useContext } from "react";
import { SupabaseContext } from "../../App";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRecipes() {
    try {
      const { data, error } = await supabase.from("recipes").select();
      if (error) throw error;
      console.log(data);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
      setError(error);
    }
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>;
  }

  return (
    <ul>
      {recipes &&
        recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}, {recipe.cuisine}
          </li>
        ))}
    </ul>
  );
}

export default RecipeList;
