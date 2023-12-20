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

  if (!recipe) return <p>404 Recipe Not Found</p>;

  const { name, cuisine, cooking_time, servings, ingredients, instructions } =
    recipe;

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
            ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
        </List>
        <Typography variant="h6" component="h2" gutterBottom>
          Instructions:
        </Typography>
        <Typography variant="body1">{instructions}</Typography>
        {/* <Button variant="contained" color="secondary" onClick={} className="delete-button">
          Delete Recipe
        </Button>
        <Button variant="contained" color="primary" onClick={} className="edit-button">
          Edit Recipe
        </Button> */}
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
