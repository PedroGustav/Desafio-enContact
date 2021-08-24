import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToDoProvider } from "./hooks/useToDo";
import { GlobalStyle } from "./styles/global";
import { Container } from "./styles/styles";
import Dashboard from "./pages/Dashboard";

export default function App() {
  
  

  return (
    <Router>
    <ToDoProvider>
      <GlobalStyle/>
        <Container>
          <div>
          <h1>to.dos</h1>
            <Dashboard/>    
          </div>
        </Container>
    </ToDoProvider>
    </Router>
  );
}
