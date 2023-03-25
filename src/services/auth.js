import { Navigate } from 'react-router-dom';
import request from '~/utils/request'
    

class authService{
   login = async (req = {}) => { // formBody {Object}
      try {
       console.log('Check Request : ',req);
       const res = await request.post('/auth/login',JSON.stringify(req),{
       headers: {
          'Content-Type': 'application/json'
          }
       })  // text -> JSON  
       //const res = await request.post('/api/v1/auth/login',JSON.stringify(req),)  // text -> JSON  
       
          .then((res) => {
             return {
                data : res.data,
                status : res.status
             };
          })
          .catch((err) => {
             return {
                data : err.response.data,
                status : err.response.status
             };
          });
          console.log(res)
          return new Promise((resolve, reject) => {
             if(res.status === 401){
                reject(
                   {
                      status : res.status, 
                      data : res.data
                   });
             }
             resolve({status : res.status, data : res.data});
         });
       } catch (error) {
          console.log(error);
       }
  }

  testAuthen = async () => {
    try {
       console.log('Check Request : ');
       const res = await request.get('/auth/testAuthentication',{
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
       })  // text -> JSON  
       //const res = await request.post('/api/v1/auth/login',JSON.stringify(req),)  // text -> JSON  
       
          .then((res) => {
             console.log('Check res',res);
             return {
                data : res.data,
                status : res.status
             };
          })
          .catch((err) => {
             console.log(err);
             return {
                data : err.response.data,
                status : err.response.status
             };
          });

          return res;
    }
    catch (error) {
       console.log(error);
    }
 }
   refreshtoken = async (refreshtoken = '') => {
      console.log('Log refresh: ',refreshtoken)
      let data = await request.get('/auth/refreshtoken',{
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshtoken}` 
          }
       })  
          .then((res) => {
            console.log('Data Token :',res);
             return res;
          }).catch( (err) => {
            return false;
          })

          return data;
 }
   checkAuth = async (token = '') => {
      let checkAuth = await request.get('/auth/authentication',{
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
            }
         })  
            .then((res) => {
               return true;
            })
            .catch( (err) => {
               console.log(err);
               return false;
            });
            return checkAuth;
   }
    getUser = async () => {
       try {
          console.log('Check Request : ');
          const res = await request.get('/auth/testAuthentication',{
          headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('token')}` 
             }
          }) 
             .then((res) => {
                console.log('Check res',res);
                return {
                   data : res.data,
                   status : res.status
                };
             })
             .catch((err) => {
                console.log(err);
                return {
                   data : err.response.data,
                   status : err.response.status
                };
             });
       }
       catch (error) {
          console.log(error);
       }
  }
}
    
export default new authService
     


