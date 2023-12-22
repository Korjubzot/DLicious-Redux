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
import Home from "./components/home/home";

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
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "facebook", "github"]}
        redirectTo="/home"
        // todo fix this redirect
        // it's not working at all - do i need to package it as a route instead?
      />
    );
  } else
    return (
      <SupabaseContext.Provider value={supabase}>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<RecipeForm />} path="/add-recipe" exact />
            <Route element={<RecipeList />} path="/recipes" />
            <Route element={<RecipeCard />} path="/recipe/:id" exact />
            <Route element={<Home />} path="/" />
          </Routes>
        </div>
      </SupabaseContext.Provider>
    );
}

export default App;
