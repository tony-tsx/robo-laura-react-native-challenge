import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    accept: 'application/vnd.github.v3+json',
  },
});
