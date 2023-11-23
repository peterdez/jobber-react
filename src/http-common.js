import axios from "axios";

export default axios.create({
  baseURL: "https://jobber-api.vercel.app/api",
  headers: {
    "Content-type": "application/json"
  }
});