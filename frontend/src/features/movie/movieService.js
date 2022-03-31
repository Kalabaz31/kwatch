import axios from "axios";

const getData = async (api_url) => {
  const response = await axios.get(api_url);

  return response.data.results
  ? response.data.results
  : response.data
  ? response.data
  : response
};

const movieService = {
  getData
};
export default movieService;
