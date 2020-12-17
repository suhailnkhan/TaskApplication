import axios from 'axios'
const getData = () => {
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const url = "https://swapi.dev/api/people"
    return axios.get(url)
    .then(res => res.data)
    .catch(error => {
      console.log(error);
    });
}
 // eslint-disable-next-line 
export default {getData};