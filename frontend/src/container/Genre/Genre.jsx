import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { urls } from "../../constants";

import { useFetchData } from "../../hooks";

import "./Genre.scss";

const api_key = "f62888504de69414d884fba13ee25852";

const not_found_image =
  "data:image/jpeg;base64,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";

const Genre = ({ type }) => {



  let { genre } = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [wait, setWait] = useState(genre ? true : false);

  let itemsByGenreUrl = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&sort_by=popularity.desc&page=${page}`;

  const genresListUrl = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}`;

  const allGenres = useFetchData(genresListUrl);

  const genreId = allGenres?.genres?.find(
    (g) => g.name?.toLowerCase() === genre?.toLowerCase()
  );

  if (genre) {
    itemsByGenreUrl = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&sort_by=popularity.desc&with_genres=${genreId?.id}&page=${page}`;
  }

  let itemsByGenre = useFetchData(itemsByGenreUrl, wait);

  const observer = useRef();

  const lastMovieItem = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < 500) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    setData((prevData) => [...new Set([...prevData, ...itemsByGenre])]);

    if (genreId) setWait(false);
  }, [itemsByGenre, page, genreId]);

  return (
    <div className="app__genre">
      
      <div className="app__genre-list">
        {data &&
          data.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <div
                  key={index}
                  className="app__genre-item"
                  ref={lastMovieItem}
                >
                  <img
                    src={`${
                      item.poster_path
                        ? urls.img_base_url + item.poster_path
                        : item.profile_path
                        ? urls.img_base_url + item.profile_path
                        : not_found_image
                    }`}
                    alt={item.title ? item.title : item.name}
                  />
                  <div>
                    <a
                      href={`/${item}/${item.id}&${
                        item.title
                          ? item.title.replace(" ", "-")
                          : item.name.replace(" ", "-")
                      }`}
                    >
                      {item.title ? item.title : item.name}
                    </a>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="app__genre-item">
                  <img
                    src={`${
                      item.poster_path
                        ? urls.img_base_url + item.poster_path
                        : item.profile_path
                        ? urls.img_base_url + item.profile_path
                        : not_found_image
                    }`}
                    alt={item.title ? item.title : item.name}
                  />
                  <div>
                    <a
                      href={`/${type}/${item.id}&${
                        item.title
                          ? item.title.replace(" ", "-")
                          : item.name.replace(" ", "-")
                      }`}
                    >
                      {item.title ? item.title : item.name}
                    </a>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Genre;
