import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SupabaseContext } from "../../App";

function Header() {
  const supabase = useContext(SupabaseContext);

  return (
    <header>
      <nav>
        <Link to="/recipes">Recipes</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </nav>
    </header>
  );
}

export default Header;
