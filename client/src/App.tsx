import axios from "axios";
import "./App.scss";
import { useEffect, useState } from "react";
import SignIn from "./pages/Auth/signIn";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./routes/Navbar";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3200/api/message")
      .then((response: any) => {
        setMessage(response.data);
        console.log("res", response.data);
      })
      .catch((error: any) => {
        console.error("There was an error!", error);
      });
  }, []);

  const isAuthenticated = true; // Replace with your actual authentication logic

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <MantineProvider withCssVariables>
      <Router>
        <Navbar />
        <Routes>
          {routes.map(
            ({ path, component: Component, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  ) : (
                    <Component />
                  )
                }
              />
            )
          )}
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
