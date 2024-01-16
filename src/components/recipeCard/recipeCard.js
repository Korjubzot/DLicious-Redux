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
  const [isFavorited, setIsFavorited] = useState(false);

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

  useEffect(() => {
    async function fetchFavoriteStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user ? user.id : null;

      // Add null check for recipe
      if (recipe) {
        const { data: existingFavorite, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", userId)
          .eq("recipe_id", recipe.id);

        if (error) {
          console.error("Error fetching favorite status:", error);
        } else {
          setIsFavorited(existingFavorite.length > 0);
        }
      }
    }

    fetchFavoriteStatus();
  }, [recipe, supabase]);

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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user ? user.id : null;

    try {
      const { data: existingFavorite, error: fetchError } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .eq("recipe_id", recipe.id);

      if (fetchError) {
        console.error("Error fetching favorite status:", fetchError);
        return;
      }

      if (existingFavorite.length > 0) {
        const { error: deleteError } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("recipe_id", recipe.id);

        if (deleteError) {
          console.error("Error unfavoriting recipe:", deleteError);
        } else {
          console.log("Successfully unfavorited recipe");
          setIsFavorited(false);
        }
      } else {
        const { error: insertError } = await supabase
          .from("favorites")
          .insert([{ user_id: userId, recipe_id: recipe.id }]);

        if (insertError) {
          console.error("Error favoriting recipe:", insertError);
        } else {
          console.log("Successfully favorited recipe");
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
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
          color={isFavorited ? "secondary" : "primary"}
          onClick={handleFavorite}
          className="favorite-button"
        >
          {isFavorited ? "Unfavorite Recipe" : "Favorite Recipe"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
