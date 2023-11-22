import axios from 'axios';

console.log("url", process.env.VUE_APP_API_ADDRESS)

export default axios.create({
  baseURL: process.env.VUE_APP_API_ADDRESS,
});