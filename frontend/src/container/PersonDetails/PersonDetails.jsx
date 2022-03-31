import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getData,
  getSeriesData,
  getCast,
  reset,
} from "../../features/movie/movieSlice";
import { urls } from "../../constants";
import { Carousel } from "../../components";

import "./PersonDetails.scss";

const PersonDetails = () => {
  const { id, name } = useParams();

  const dispatch = useDispatch();

  const { movies, series, cast, isError, message } = useSelector(
    (state) => state.movie
  );

  const personDetails = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  const movieCreditsUrl = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
  const tvCreditsUrl = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCast(personDetails));
    dispatch(getData(movieCreditsUrl));
    dispatch(getSeriesData(tvCreditsUrl));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, personDetails]);

  return (
    <div className="app__person">
      <div className="app__person-info">
        <img src={`${urls.img_base_url}${cast.profile_path}`} alt="" />

        <h2>Personal Info</h2>
        <h4>Known For</h4>
        <p>{cast.known_for_department}</p>
        <h4>Gender</h4>
        <p>{cast.gender === 1 ? "Female" : "Male"}</p>
        <h4>Birthday</h4>
        <p>{cast.birthday}</p>
        <h4>Place of Birth</h4>
        <p>{cast.place_of_birth}</p>
        <h4>Also Known As</h4>
        {cast.also_known_as?.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div className="app__person-details">
        <h1>{cast.name}</h1>
        <h2>Biography</h2>
        <p>{cast.biography}</p>

        {movies.cast?.length > 0 && (
          <>
            <h2>Movies</h2>
            <Carousel data={movies.cast} type="movie" />
          </>
        )}
        {console.log(series.cast?.length)}
        {series.cast?.length > 0 && (
          <>
            <h2>Tv Shows</h2>
            <Carousel data={series.cast} type="movie" />
          </>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
