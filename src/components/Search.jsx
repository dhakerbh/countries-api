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
      console.error(err.message);
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
    //console.log(regions[region_index - 1].name);
    try {
      settoShowCountries2(
        countries.filter((country) =>
          country.region.includes(regions[region_index].name)
        )
      );
      console.log(regions[region_index].name);
    } catch (err) {
      settoShowCountries2(countries);
    }
    try {
      settoShowCountries(
        toShowCountries2.filter((country) =>
          country.name.common.toUpperCase().includes(s.toUpperCase())
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };
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
      <List countries={toShowCountries} />
    </div>
  );
};
export default Search;
