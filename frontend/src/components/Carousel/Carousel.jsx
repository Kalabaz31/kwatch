import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Carousel.scss";
import { urls } from "../../constants";

const not_found_image = "https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png"
const Carousel = ({ data, type }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const urlPrefix = type === "movie" ? "movie" : type === "tv" ? "tv" : "person";
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  return (
    <motion.div ref={carousel} className="app__latest-carousel">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="app__latest-container"
      >
        {data &&
          data.map((item, index) => (
            <motion.div key={index} className="app__latest-item">
              
              <img
                src={`${item.poster_path ? urls.img_base_url + item.poster_path : item.profile_path ? urls.img_base_url + item.profile_path : not_found_image }`}
                alt={item.title ? item.title : item.name}
              />
              <div>
                <a href={`/${urlPrefix}/${item.id}&${item.title? item.title.replace(" ", "-") : item.name.replace(" ", "-") }`}>{item.title ? item.title : item.name}</a>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default Carousel;
