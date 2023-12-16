import "./App.css";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

function App() {
  const [session, setSession] = useState(null);
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else
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
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
    );
}

export default App;
