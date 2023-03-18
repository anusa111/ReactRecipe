import React, { useState } from "react";
import "./App.css";
import Display from "./Components/Display";
import Stepcomponent from "./Components/Stepcomponent";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const [foodname, setfoodname] = useState("pastry");
  const getname = () => {
    const food = document.getElementById("foodname").value;
    setfoodname(food);
  };
  return (
    <div>
      <div className="searchContainer">
        <div className="searchfield">
       
          <input type="text" placeholder="Enter the food name" id="foodname" />
          <button onClick={getname} className="my-button">
            Search
          </button>
        </div>
      </div>
      <Routes>
        <Route exact path="" element={<Display propsname={foodname} />} />
        <Route
          path="/steps/:id/:image"
          element={<Stepcomponent query={foodname} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
