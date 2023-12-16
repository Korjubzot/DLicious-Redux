import "./App.css";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    const { data } = await supabase.from("recipes").select();
    console.log(data);
    setRecipes(data);
  }

  async function addRecipe() {
    const newRecipe = { name: "Testing...", cuisine: "American" };
    const { data, error } = await supabase.from("recipes").insert([newRecipe]);

    if (error) {
      console.error("Error adding new recipe:", error);
    } else if (data) {
      setRecipes([...recipes, data[0]]);
    } else {
      console.error("No data returned after inserting new recipe");
    }
  }

  return (
    <div className="App">
      <button onClick={addRecipe}>Add Recipe</button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.name}>
            {recipe.name}, {recipe.cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
