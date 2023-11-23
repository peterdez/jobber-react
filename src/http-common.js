import axios from "axios";

export default axios.create({
  baseURL: "https://jobber-api-669b1.web.app/api",
  headers: {
    "Content-type": "application/json"
  }
});