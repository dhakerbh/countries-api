import { useState, useEffect } from "react";
import List from "./List";

const regions = [
  {
    name: "Africa",
  },
  {
    name: "America",
  },
  {
    name: "Asia",
  },
  {
    name: "Europe",
  },
  {
    name: "Oceania",
  },
];
const Search = () => {
  const [countries, setCountries] = useState([]);
  const [toShowCountries, settoShowCountries] = useState([]);
  const [toShowCountries2, settoShowCountries2] = useState([]);
  //Get The Countries List from API
  const getCountries = async () => {
    try {
      const responce = await fetch("https://restcountries.com/v3.1/all");
      const jsonData = await responce.json();
      setCountries(jsonData);
      settoShowCountries(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  //Searching For Countries

  const filterR = () => {
    const s = document.getElementById("search-input").value.toUpperCase();

    const region_index =
      document.getElementById("filter-region").selectedIndex - 1;
    settoShowCountries(countries);
    try {
      if (region_index > -1) {
        const region_name = regions[region_index].name.toUpperCase();
        settoShowCountries(
          countries.filter((country) =>
            country.region.toUpperCase().includes(region_name)
          )
        );
      }
    } catch (err) {
      console.log(err.message);
      settoShowCountries(countries);
    }
    try {
      if (s.length > 0)
        settoShowCountries((tsc) => {
          return tsc.filter((country) =>
            country.name.common.toUpperCase().includes(s)
          );
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    filterR();
  }, []);
  const region_filter = () => {};
  return (
    <div className="search-container">
      <form>
        <input
          onChange={() => filterR()}
          placeholder="Search for a country..."
          type="text"
          id="search-input"
        />
        <div>
          <select
            onChange={() => filterR()}
            name="region-list"
            id="filter-region"
          >
            <option value="" id="0">
              Filter by Region
            </option>
            {regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <h1>{}</h1>
      <List countries={toShowCountries} />
    </div>
  );
};
export default Search;
