import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Stepcomponent = (props) => {
  const [apisteps, setSteps] = useState(null);
  const [apiIng, setIng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ingLoading, setIngLoading] = useState(true);
  const { id, image } = useParams();
  const decodedImage = decodeURIComponent(image);
  useEffect(() => {
    apifetch();
    ingFetch();
  }, [id]);
  //Fetching Steps
  const apifetch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?query=${props.query}&apiKey=2483aba0181f4152991a4757feeb8480`
    )
      .then((response) => response.json())
      .then((data) => {
        setSteps(data);
        setLoading(false);
      });
  };
  //end of fetching steps
  //fetching ingredients
  const ingFetch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=2483aba0181f4152991a4757feeb8480`
    )
      .then((response) => response.json())
      .then((data) => {
        setIng(data);
        setIngLoading(false);
      });
  };
  //end of fetching ingredients
  if (loading && ingLoading) {
    return <div>Loading...</div>;
  }
  if (apisteps && apiIng) {
    return (
      <div>
        <div className="container-detail">
          <div className="img-detail">
            <img src={decodedImage} alt="" />
          </div>
          <div className="steps">
            <h2>Ingredients</h2>
            <div className="ing">
              {apiIng.ingredients.map((ing, ingindex) => (
                <div key={ingindex}>
                  <p className="ing-name" >{ing.name},</p>
                </div>
              ))}
            </div>
            <h2>Steps to follow:</h2>
            <div className="desc">
              {apisteps.map((inst, index) =>
                inst.steps.map((steps, indexes) => (
                  <div key={indexes} className="desc-step">
                    <span>-</span>
                    {steps.step}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Stepcomponent;
