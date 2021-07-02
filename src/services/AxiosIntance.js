import Axios from "axios";

const InstanceTAOS = Axios.create({
  baseUrl: "http://taosback.test/",
});

InstanceTAOS.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const access_token = JSON.parse(window.localStorage.getItem("token"));
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      accept: "application/json",
    };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

InstanceTAOS.interceptors.response.use(
  function(response) {
    // Do something before request is sent
    return response;
  },
  function(error) {
    // Do something with request error
    if (error.response.status == 401) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default InstanceTAOS;
