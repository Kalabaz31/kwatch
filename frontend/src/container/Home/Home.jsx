import React, { useContext } from "react";
import "./Home.scss";

import { Slider } from "../../components";
import { Trending } from "../";

const Home = () => {

  return (
    <div>
      <Slider />

      <Trending />
    </div>
  );
};

export default Home;
