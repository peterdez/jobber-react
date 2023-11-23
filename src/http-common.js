import axios from "axios";

export default axios.create({
  baseURL: "https://jobber-api-669b1.firebaseapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});