import axios from "axios";

export default axios.create({
  baseURL: "https://pacific-caverns-43958-c025eed56607.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});