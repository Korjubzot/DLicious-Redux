import { useParams } from "react-router-dom";

import { SupabaseContext } from "../../App";

import React, { useEffect, useState, useContext } from "react";

function RecipeCard() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    async function getRecipe() {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;

        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe: ", error);
      }
    }

    getRecipe();
  }, [id, supabase]);

  if (!recipe) return <p>404 Recipe Not Fund</p>;

  const { name, cuisine, cooking_time, servings, ingredients, instructions } =
    recipe;

  return (
    <div className="recipe-detail-container">
      <h1 className="recipe-title">{name}</h1>
      <div className="recipe-info">
        <p>Cuisine: {cuisine}</p>
        <p>Cooking Time: {cooking_time} minutes</p>
        <p>Servings: {servings}</p>
      </div>
      <div className="recipe-section">
        <h2 className="section-title">Ingredients:</h2>
        <ul>
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient">
                {ingredient}
              </li>
            ))}
        </ul>
      </div>
      <div className="recipe-section">
        <h2 className="section-title">Instructions:</h2>
        <div className="instruction-list">{instructions}</div>
      </div>
      {/* <button onClick={} className="delete-button">
        Delete Recipe
      </button>
      <button onClick={} className="edit-button">
        Edit Recipe
      </button> */}
    </div>
  );
}

export default RecipeCard;
