import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import queryString from "query-string";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChangue] = useForm({
    searchString: q,
  });

  const { searchString } = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchString}`);
  };

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  return (
    <div>
      <h1>SeachScreen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Find your Hero"
              className="form-control"
              name="searchString"
              value={searchString}
              autoComplete="off"
              onChange={handleInputChangue}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === "" && <div className="alert alert-info">Search a hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">Hero no found</div>
          )}

          {heroesFiltered.map((hero) => {
            return <HeroCard key={hero.id} hero={hero} />;
          })}
        </div>
      </div>
    </div>
  );
};
