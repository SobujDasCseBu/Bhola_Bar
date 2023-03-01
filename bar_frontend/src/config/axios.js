import axios from 'axios'

export default axios.create({
  baseURL: `${process.env.REACT_APP_ENV === 'DEV'
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_ENV === 'PROD' ? process.env.REACT_APP_API_BASE_URL_PROD : ''
    }`,
});
