import axios from "axios";
import "./App.scss";
import { useEffect, useState } from "react";
import SignIn from "./pages/Auth/signIn";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

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

  return (
    <MantineProvider withCssVariables>
      <SignIn />
      <div className="App">test project {message}</div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <header className="header">
          <h1>Welcome to My App</h1>
        </header>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Click Me
        </button>
      </div>
    </MantineProvider>
  );
}

export default App;
