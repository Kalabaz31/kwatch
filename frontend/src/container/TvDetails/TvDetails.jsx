import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Carousel } from "../../components";

import { urls } from "../../constants";

import {getData, getCast, getRecommendations, reset} from '../../features/movie/movieSlice'

import "./TvDetails.scss";

const api_key = "f62888504de69414d884fba13ee25852";

const TvDetails = () => {

  let { id, title } = useParams();

  const movieDetailsUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`;
  const movieCastUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}`;
  const movieRecommendationsUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}`;

  
  const { movies, cast, recommendations, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.movie);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getData(movieDetailsUrl));
    dispatch(getCast(movieCastUrl));
    dispatch(getRecommendations(movieRecommendationsUrl));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, movieDetailsUrl,movieCastUrl,movieRecommendationsUrl]);


  return (
    <div className="app__tv-details">
      {movies && (
        <>
          <div className="app__details-item">
            <div className="backdrop-background">
              <img
                className="app__details-backdrop"
                src={`${urls.img_base_url}${movies.backdrop_path}`}
                alt={movies.title}
              />

              <img
                className="app__details-background"
                src={`${urls.img_base_url}${movies.poster_path}`}
                alt={movies.title}
              />
            </div>

            <img
              className="app__details-item-poster"
              src={`${urls.img_base_url}${movies.poster_path}`}
              alt={movies.title}
            />

            <div className="item-details">
              <div className="movie-title">
                <a href={`/tv/${id}&${title}`}>{movies.name}</a> (
                {movies.first_air_date?.slice(0, 4)})
              </div>

              <div className="small-details">
                <p>{movies.first_air_date}</p>|
                {movies.genres?.map((genre, index) => (
                  <span key={genre.id}>
                    <a href={`/tvseries/${genre.name}`}>{genre.name}</a>
                    {movies.genres.length - 1 > index && "."}
                  </span>
                ))}
              </div>

              <p className="p-text tagline">{movies.tagline}</p>
              <h5>Overview</h5>
              <p className="p-text">{movies.overview}</p>
            </div>
          </div>

          <div className="top-billed-cast">
            <h2>Top Billed Cast</h2>
            <Carousel
              data={cast.cast}
              type="cast"
            />
          </div>
          <div className="top-billed-cast">
            <h2>Recommendations</h2>
            <Carousel
              data={recommendations}
              type="tv"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TvDetails;
