import Header from "./components/header/header";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { useState, useEffect, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import RecipeForm from "./components/recipeForm/recipeForm";
import RecipeList from "./components/recipesList/recipesList";
import RecipeCard from "./components/recipeCard/recipeCard";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_KEY
);

export const SupabaseContext = createContext();

function App() {
  const [session, setSession] = useState(null);

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
          <Header />
          <Routes>
            <Route element={<RecipeForm />} path="/add-recipe" exact />
            <Route element={<RecipeList />} path="/recipes" exact />
            <Route element={<RecipeCard />} path="/recipe/:id" exact />
          </Routes>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      </SupabaseContext.Provider>
    );
}

export default App;
