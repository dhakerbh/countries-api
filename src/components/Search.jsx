import { useState, useEffect } from "react";
import List from "./List";
const Search = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setsearchedCountries] = useState([]);
  const getCountries = async () => {
    try {
      const responce = await fetch("https://restcountries.com/v3.1/all");
      const jsonData = await responce.json();
      setCountries(jsonData);
      setsearchedCountries(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

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
  const searchCountry = (s) => {
    if (s != "") {
      setsearchedCountries(
        countries.filter((country) =>
          country.name.common.toUpperCase().includes(s.toUpperCase())
        )
      );
    } else {
      setsearchedCountries(countries);
    }
  };
  return (
    <div className="search-container">
      <form>
        <input
          onChange={(e) => searchCountry(e.target.value)}
          placeholder="Search for a country..."
          type="text"
          id="search-input"
        />
        <div>
          <label htmlFor="region-list">Filter by region</label>
          <select defaultValue="Heyu" name="region-list" id="filter-region">
            {regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <List countries={searchedCountries} />
    </div>
  );
};
export default Search;
