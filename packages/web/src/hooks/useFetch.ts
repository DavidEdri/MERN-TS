import { useState, useEffect } from "react";
import Axios from "axios";

export default (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Axios(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {}
    };

    fetch();
  }, [url]);

  return { loading, data };
};
