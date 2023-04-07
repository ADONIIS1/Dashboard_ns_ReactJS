import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'http://localhost:3001',
});

// instance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem
//       if (token) {
//         // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
//         config.headers['Authorize'] = token; // for Node.js Express back-end
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

// export const get = async(path,options ={}) => {
//     const res = await request.get(path,JSON.parse(options));
//     return res;
// }

// export const post = async (path,options) => {
//     console.log(options);
//     const res = await request.post(path,JSON.parse(options));
//     return res;
// }
// export const Delete = async(path,options ={}) => {
//     const res = await request.post(path,options);
//     return res;
// }
// export const update = async(path,options ={}) => {
//     const res = await request.post(path,options);
//     return res;
// }
// export default request

export default instance;
