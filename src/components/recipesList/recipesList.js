import React, { useState, useEffect, useContext } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { SupabaseContext } from "../../App";

import "./recipesList.css";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRecipes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user ? user.id : null;

    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId);
      if (error) throw error;
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
    <div className="recipe-list-container">
      <List>
        {recipes &&
          recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              component={Link}
              to={`/recipe/${recipe.id}`}
            >
              <ListItemText primary={recipe.name} secondary={recipe.cuisine} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default RecipeList;
