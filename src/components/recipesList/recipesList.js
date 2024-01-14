import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SupabaseContext } from "../../App";

import "./recipesList.css";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");

  const supabase = useContext(SupabaseContext);

  const limit = 10;

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, search]);

  async function getRecipes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user ? user.id : null;

    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId)
        .range(page * limit, (page + 1) * limit - 1)
        .order("name", { ascending: sort === "asc" })
        .ilike("name", `%${search}%`);
      if (error) throw error;
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
      setError(error);
    }
  }

  if (error) {
    return (
      <div className="error-message">
        Error loading recipes: {error.message}
      </div>
    );
  }

  return (
    <div className="recipe-list-container">
      <TextField
        id="filled-search"
        label="Search recipes"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ margin: "10px", width: "200px " }}
      />
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        sx={{ margin: "10px", width: "200px" }}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
      <List>
        {recipes &&
          recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              component={Link}
              to={`/recipe/${recipe.id}`}
              className="list-item"
            >
              <ListItemText
                primary={recipe.name}
                secondary={recipe.cuisine}
                className="list-item-text"
              />
            </ListItem>
          ))}
      </List>
      <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Previous
      </Button>{" "}
      {/* Add this line */}
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}

export default RecipeList;
