import axios from 'axios';


export default axios.create({
    baseURL : 'http://localhost:3001'
})

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