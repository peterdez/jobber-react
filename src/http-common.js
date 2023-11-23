import axios from "axios";

export default axios.create({
  baseURL: "https://jobber-react-4d3gz4rcu-peterdez.vercel.app/api",
  headers: {
    "Content-type": "application/json"
  }
});