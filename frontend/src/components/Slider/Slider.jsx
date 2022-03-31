import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { getData, reset } from "../../features/movie/movieSlice";
import { urls } from "../../constants/";


import "./Slider.scss";

const Slider = () => {
  const [active, setActive] = useState(0);

  const dispatch = useDispatch();

  const { movies, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.movie);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getData(urls.popularMoviesUrl));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <div className="app__slider">
      <div className="app__slider-container">
        {movies.length > 0 &&
          movies.map((item, index) => (
            <>
              <motion.a
                whileInView={{ scale: [1.2, 1] }}
                transition={{ duration: 0.5 }}
                href={`/movie/${item.id}&${item.title.replaceAll(" ", "-")}`}
                className={`app__slider-item ${
                  active === index && "app__slider-active"
                }`}
              >
                <img
                  src={`${urls.img_base_url}${item.backdrop_path}`}
                  alt={item.title}
                />
                <div className="gradient-overlay"></div>

                <h1 className="app__slider-title">{item.title}</h1>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className={`left ${active === index && "side-changer-active"}`}
                onClick={() =>
                  setActive(active > 0 ? active - 1 : movies.length - 1)
                }
              >
                {"<"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className={`right ${active === index && "side-changer-active"}`}
                onClick={() =>
                  setActive(active < movies.length - 1 ? active + 1 : 0)
                }
              >
                {">"}
              </motion.button>
            </>
          ))}
      </div>

      <div className="app__slider-changer">
        {movies.length > 0 &&
          movies.map((item, index) => (
            <div
              key={item.title}
              className={`app__slider-changer-item ${
                active === index && "app__slider-active"
              }`}
              onClick={() => setActive(index)}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
