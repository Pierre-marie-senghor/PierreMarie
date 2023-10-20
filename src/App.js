import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import './App.css';
import Table from "./components/Table";
import Personnel from "./component/Personnel";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Table /> } />
        <Route path = "*" element = {<Table /> } />
        <Route path = "/" element = {<Personnel /> } />
      </Routes>
    </BrowserRouter>

    
  );
}
 
export default App;

// <div className="">
//        <Table/>
//     </div>