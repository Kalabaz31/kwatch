import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../../App";
import { useFetchData } from "../../hooks";
import { Carousel } from "../../components";

import "./MovieDetails.scss";

const api_key = "f62888504de69414d884fba13ee25852";

const MovieDetails = () => {
  const { img_base_url, popularMovies, trendingMovies, trendingSeries } =
    useContext(Context);

  let { id, title } = useParams();

  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
  const movieCastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`;
  const movieRecommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}`;

  const movieDetails = useFetchData(movieDetailsUrl);
  const movieCast = useFetchData(movieCastUrl);
  const movieRecommendations = useFetchData(movieRecommendationsUrl);

  return (
    <div className="app__movie-details">
      {movieDetails && (
        <>
          <div className="app__details-item">
            <div className="backdrop-background">
              <img
                className="app__details-backdrop"
                src={`${img_base_url}${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
              />

              <img
                className="app__details-background"
                src={`${img_base_url}${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            </div>

            <img
              className="app__details-item-poster"
              src={`${img_base_url}${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />

            <div className="item-details">
              <div className="movie-title">
                <a href={`/movie/${id}&${title}`}>{movieDetails.title}</a> (
                {movieDetails.release_date?.slice(0, 4)})
              </div>

              <div className="small-details">
                <p>{movieDetails.release_date}</p>|
                {movieDetails.genres?.map((genre, index) => (
                  <span key={genre.id}>
                    <a href={`/genre/${genre.name}`}>{genre.name}</a>
                    {movieDetails.genres.length - 1 > index && "."}
                  </span>
                ))}
              </div>

              <p className="p-text tagline">{movieDetails.tagline}</p>
              <h5>Overview</h5>
              <p className="p-text">{movieDetails.overview}</p>
            </div>
          </div>

          <div className="top-billed-cast">
            <h2>Top Billed Cast</h2>
            <Carousel
              data={movieCast.cast}
              img_base_url={img_base_url}
              type="cast"
            />
          </div>
          <div className="top-billed-cast">
            <h2>Recommendations</h2>
            <Carousel
              data={movieRecommendations}
              img_base_url={img_base_url}
              type="movie"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
