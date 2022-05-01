import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router";
import { heroImages } from "../../helpers/heroImages";
import { getHeroesById } from "../../selectors/getHeroeById";

export const HeroScreen = ({ history }) => {
  const { heroeId } = useParams();
  // const hero = getHeroesById(heroeId);

  const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

  if (!hero) return <Redirect to="/" />;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push("/");
      return;
    }
    history.goBack();
  };

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          className="img-thumbnail animate__animated animate__fadeInLeft"
          src={heroImages(`./${heroeId}.jpg`).default}
          alt="..."
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter Ego: </b>
            {hero.alter_ego}
          </li>

          <li className="list-group-item">
            <b>Publisher: </b> {hero.publisher}
          </li>

          <li className="list-group-item">
            <b>First appearance: </b> {hero.first_appearance}
          </li>
        </ul>
        <h5>Characters</h5>
        <p>{hero.characters}</p>
        <button className="btn btn-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
