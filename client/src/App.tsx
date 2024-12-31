import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import SignIn from "./pages/auth/signIn";
import { MantineProvider } from "@mantine/core";

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
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light", // Set to 'dark' for dark mode
        }}
      >
        {" "}
        <SignIn />
        <div className="App">test project {message}</div>;
      </MantineProvider>
    </>
  );
}

export default App;
