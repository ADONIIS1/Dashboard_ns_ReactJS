import request from '~/utils/request'
    export const login = async (req = {}) => { // formBody {Object}
        try {
         console.log(req);
         const res = await request.post('/auth/login',JSON.stringify(req),{
         headers: {
            'Content-Type': 'application/json'
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

    
     


