import React, { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";
const DisplayInformation = (props) => {
  const [apidata, setapiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apifetch = useCallback(async () => {
    // fetch data from API using props.propsname
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${props.propsname}&addRecipeInformation=true&number=12&apiKey=2483aba0181f4152991a4757feeb8480`
    )
      .then((response) => response.json())
      .then((data) => {
        setapiData(data);
        setIsLoading(false);
      });
  }, [props.propsname]);
  useEffect(() => {
    apifetch();
  }, [apifetch]);

  //   const apifetch = () => {
  //     fetch(
  //       `https://api.spoonacular.com/recipes/complexSearch?query=${props.propsname}&addRecipeInformation=true&apiKey=df9e42ecf5cc4c0994762456edc9c6c5`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setapiData(data);
  //         setIsLoading(false);
  //       });
  //   };
  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (apidata) {
    const { results } = apidata;

    return (
      <div className="displaycontainer">
        <h1>Recipe Finder Website</h1>
        <div className="displayrow">
       
          {results.map((result, index) => (
            <div className="displaycol" key={result.id}>
              <div key={index} className="image-detail">
                <img src={result.image} alt="" />
                <br />
                <p>{result.title}</p>
                <Link className="link-button"
                  to={`/steps/${result.id}/${encodeURIComponent(result.image)}`}
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default DisplayInformation;
