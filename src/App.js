import "./App.css";

import { useState, useEffect, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import RecipeForm from "./components/recipeForm/recipeForm";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

export const SupabaseContext = createContext();

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

  // async function addRecipe() {
  //   const newRecipe = { name: "Based", cuisine: "Cringe" };
  //   const { data, error } = await supabase
  //     .from("recipes")
  //     .insert([newRecipe])
  //     .select();

  //   if (error) {
  //     console.error("Error adding new recipe:", error);
  //   } else if (data) {
  //     setRecipes([...recipes, data[0]]);
  //   } else {
  //     console.error("No data returned after inserting new recipe");
  //   }
  // }

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
      <SupabaseContext.Provider value={supabase}>
        <div className="App">
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                {recipe.name}, {recipe.cuisine}
              </li>
            ))}
          </ul>
          <RecipeForm />
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      </SupabaseContext.Provider>
    );
}

export default App;
