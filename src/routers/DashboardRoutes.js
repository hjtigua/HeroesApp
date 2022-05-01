import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import { DcScreen } from "../Components/dc/DcScreen";
import { HeroScreen } from "../Components/heroes/HeroScreen";
import { MarvelScreen } from "../Components/marvel/MarvelScreen";
import { SearchScreen } from "../Components/search/SearchScreen";
import { Navbar } from "../Components/ui/NavBar";

export const DashboardRoutes = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container mt-2">
        <Switch>
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/hero/:heroeId" component={HeroScreen} />
          <Route exact path="/dc" component={DcScreen} />
          <Route exact path="/search" component={SearchScreen} />
          <Redirect to="/marvel" />
        </Switch>
      </div>
    </Fragment>
  );
};
