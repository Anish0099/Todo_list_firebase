
import React from "react";
import Todolist from "./Todolist";
import Login from "./Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Contact from "./Contact";
 
 

function App() {
  return (
    <BrowserRouter>

    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/todolist" element={<Todolist/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </div>

    </BrowserRouter>
    
  );
}

export default App;
