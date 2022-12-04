import axios from "axios";

const axiosHook = (method, url, contentType, data, jwtToken = null) => {
  if (jwtToken === null) {
    axios(url, {
      method: method,
      headers: {
        "Content-type": contentType,
      },
      body: JSON.stringify(data),
    })
      .then((r) => r)
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios(url, {
      method: method,
      headers: {
        "Content-type": contentType,
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((r) => r)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
};

export default axiosHook;
