import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

import "./recipeForm.css";
import { SupabaseContext } from "../../App";

function RecipeForm() {
  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    cuisine: "",
    cooking_time: 0,
    prep_time: 0,
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
    const { data, error } = await supabase
      .from("recipes")
      .insert([recipe])
      .select();

    if (error) {
      console.error("Error adding new recipe:", error);
    } else if (data) {
      console.log(data);
      setRecipe({
        name: "",
        cuisine: "",
      });
      navigate(`/recipe/${data[0].id}`);
    } else {
      console.error("No data returned after inserting new recipe");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Create Recipe
      </Typography>
      <TextField
        label="Title"
        name="name"
        value={recipe.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Cuisine"
        name="cuisine"
        value={recipe.cuisine}
        onChange={handleChange}
        required
      />
      <TextField
        label="Cooking time (minutes)"
        type="number"
        name="cooking_time"
        value={recipe.cooking_time}
        onChange={handleChange}
        required
      />
      <TextField
        label="Servings"
        type="number"
        name="servings"
        value={recipe.servings}
        onChange={handleChange}
        required
      />
      <TextField
        label="Ingredients"
        helperText="Separate each ingredient by line"
        multiline
        rows={4}
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
      />
      <TextField
        label="Instructions"
        helperText="Separate each step by line"
        multiline
        rows={4}
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">
        Create Recipe
      </Button>
    </Box>
  );
}

export default RecipeForm;
