import { useParams } from "react-router-dom";
import { SupabaseContext } from "../../App";
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";

function RecipeCard() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const supabase = useContext(SupabaseContext);

  useEffect(() => {
    async function getRecipe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user ? user.id : null;

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", id)
          .eq("user_id", userId)
          .single();
        if (error) throw error;

        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe: ", error);
      }
    }

    getRecipe();
  }, [id, supabase]);

  if (!recipe) return <p>404 Recipe Not Found</p>;

  const { name, cuisine, cooking_time, servings, ingredients, instructions } =
    recipe;

  async function handleDelete() {
    try {
      const { error } = await supabase.from("recipes").delete().eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  }

  async function handleEdit() {
    console.log("Editing...");
    // todo build this using the recipe form as a template
  }

  async function handleFavorite() {
    console.log("Favoriting...");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user ? user.id : null;

    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert([{ user_id: userId, recipe_id: recipe.id }]);
      // todo fix this to use the current user and recipe

      if (error) {
        console.error("Error favoriting recipe: ", error);
      } else {
        console.log("Successfully favorited recipe: ", data);
      }
    } catch (error) {
      console.error("Error favoriting recipe: ", error);
    }
  }

  return (
    <Card className="recipe-detail-container">
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1">Cuisine: {cuisine}</Typography>
        <Typography variant="body1">
          Cooking Time: {cooking_time} minutes
        </Typography>
        <Typography variant="body1">Servings: {servings}</Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Ingredients:
        </Typography>
        <List>
          {ingredients &&
            ingredients
              .split(`\n`)
              .map((ingredient, index) => (
                <ListItem key={index}>{ingredient.trim()}</ListItem>
              ))}
        </List>
        <Typography variant="h6" component="h2" gutterBottom>
          Instructions:
        </Typography>
        <List>
          {instructions &&
            instructions
              .split("\n")
              .map((instruction, index) => (
                <ListItem key={index}>{instruction.trim()}</ListItem>
              ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          className="delete-button"
        >
          Delete Recipe
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          className="edit-button"
        >
          Edit Recipe
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFavorite}
          className="favorite-button"
        >
          Favorite Recipe
        </Button>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
