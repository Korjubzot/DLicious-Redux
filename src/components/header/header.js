import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as MuiLink, Button } from "@mui/material";
import { SupabaseContext } from "../../App";

function Header() {
  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  return (
    <header>
      <nav>
        <Button color="inherit" onClick={handleNavigation("/recipes")}>
          <MuiLink>Recipes</MuiLink>
        </Button>
        <Button color="inherit" onClick={handleNavigation("/add-recipe")}>
          <MuiLink>Add Recipe</MuiLink>
        </Button>
        <Button color="inherit" onClick={handleNavigation("/home")}>
          <MuiLink>Home</MuiLink>
        </Button>
        <Button color="inherit" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </nav>
    </header>
  );
}

export default Header;
