import { Await } from 'react-router-dom';
import request from '~/utils/request'

    export const login = async (req = {}) => { // formBody {Object}
        try {
         console.log(req);
         const res = await request.post('/auth/login',JSON.stringify(req),  // text -> JSON  
         {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((res) => {
               console.log('Check res',res.data);
               return res;
            })
            .catch((err) => {
               console.log(err);
               return err;
            });

            return new Promise((resolve, reject) => {
               resolve(res);
           });
         } catch (error) {
            console.log(error);
         }
    }

    
     


