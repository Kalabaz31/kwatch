import { useState, useEffect } from "react";
import { Carousel } from "../../components";
import { useSelector, useDispatch } from "react-redux";

import { urls } from "../../constants";
import { getData,getSeriesData, reset } from "../../features/movie/movieSlice";

import "./Trending.scss";
import Spinner from "../../components/Spinner/Spinner";
const Latest = () => {
  const dispatch = useDispatch();
  const { movies, series, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.movie);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getData(urls.trendingMoviesUrl));
    dispatch(getSeriesData(urls.trendingSeriesUrl));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);


  if (isLoading) {
    console.log("isLoading")
    return <Spinner />;
  }


  return (
    <div className="app__latest">
      <h1>Trending Movies This Week</h1>

      <Carousel data={movies} type="movie" />

      <h1>Trending Series This Week</h1>

      <Carousel data={series} type="tv" />
    </div>
  );
};

export default Latest;
