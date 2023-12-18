import React from "react";
import { useState } from "react";

import "./recipeForm.css";

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    name: "",
    cuisine: "",
    cooking_time: 0,
    servings: 0,
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
  };
  return (
    <div>
      <h2 className="recipe-title">Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cooking time (minutes)</label>
          <input
            type="number"
            name="cooking_time"
            value={recipe.cooking_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients</label>
          <p>Seperate each ingredient by line</p>
          <textarea
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instructions</label>
          <p>Separate each step by line</p>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
