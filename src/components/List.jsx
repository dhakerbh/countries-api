import { useState, useEffect } from "react";
import Search from "./Search";

const List = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const responce = await fetch("https://restcountries.com/v3.1/all");
      const jsonData = await responce.json();
      setCountries(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div className="cont">
      <Search />
      <div className="country-cont">
        {countries.map((country) => {
          var { population, capital, ccn3, region } = country;
          const { common } = country.name;
          const { png } = country.flags;
          return (
            <div key={ccn3} className="country">
              <div className="flag">
                <img src={png} alt="" srcset="" />
              </div>
              <div className="details">
                <h2>{common}</h2>
                <p>Population:{population}</p>
                <p>Region:{region}</p>
                <p>Capital:{capital}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
