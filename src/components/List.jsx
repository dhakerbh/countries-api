const List = ({ countries }) => {
  return (
    <div className="cont">
      <div className="country-cont">
        {countries.map((country) => {
          const { population, capital, ccn3, region } = country;
          const { common } = country.name;
          const { png } = country.flags;
          return (
            <div key={ccn3} className="country">
              <div className="flag">
                <img src={png} />
              </div>
              <div className="details">
                <h2>{common}</h2>
                <p>Population: {population.toLocaleString("en-EN")}</p>
                <p>Region: {region}</p>
                <p>Capital: {capital}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
