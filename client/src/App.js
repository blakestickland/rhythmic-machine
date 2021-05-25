import React from "react";
import Patterns from "./pages/Patterns";
import Nav from "./components/Nav";
import { Provider } from "./hooks/useStore"

function App() {
  return (
    <div>
      <Provider>
        <Nav />
        <Patterns />
      </Provider>
    </div>
  );
}

export default App;