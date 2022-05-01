import React from "react";
import { Link } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";

export const HeroCard = ({ hero }) => {
  return (
    <div className="col">
      <div className="card">
        <img
          src={heroImages(`./${hero.id}.jpg`).default}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{hero.superhero}</h5>
          <p className="card-text">
            {hero.alter_ego} <Link to={`./hero/${hero.id}`}>Ver Más</Link>
          </p>
          {/* {hero.alter_ego !== hero.characters && (
            <p className="card-text">{hero.characters}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};
