import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(url, wait = false) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setData(
        request.data.results
          ? request.data.results
          : request.data
          ? request.data
          : request
      );
    }

    if (!wait) {
      fetchData();
    } else {
      return [];
    }
  }, [url, wait]);


  return data;
}

export { useFetchData };
