import axios from 'axios';

/** 
 * Create a default Axios instance with configured Headers and baseURL
 * based on environment variables
*/
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SMARTMILE_API}`,
    headers: {
        'x-smartmile-app-key' : `${process.env.REACT_APP_SMARTMILE_API_KEY}`
    }
});

export default axiosInstance;