import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Footer, MovieDetails, TvDetails, PersonDetails , Genre } from "./container";
import { urls } from "./constants/";
import { Navbar, Login, Register } from "./components";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="app-container">
            <Navbar />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path={`/movie/:id&:title`}
                element={<MovieDetails />}
              />
              <Route exact path={`/tv/:id&:title`} element={<TvDetails />} />
              <Route
                exact
                path={`/movies/:genre`}
                element={<Genre type="movie" />}
              />
              <Route exact path={`/movies`} element={<Genre type="movie" />} />
              <Route
                exact
                path={`/tvseries/:genre`}
                element={<Genre type="tv" />}
              />
              <Route exact path={`/tvseries`} element={<Genre type="tv" />} />

              <Route
                exact
                path={`/person/:id&:name`}
                element={<PersonDetails type="cast" />}
              />
              <Route
                exact
                path={`/person`}
                element={<PersonDetails type="cast" />}
              />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
