const api_key = "f62888504de69414d884fba13ee25852";

const urls = {
  popularMoviesUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`,

  trendingMoviesUrl: `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`,

  trendingSeriesUrl: `https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`,

  img_base_url : "https://image.tmdb.org/t/p/original"
};

export default urls;
