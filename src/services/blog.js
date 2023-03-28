import request from '~/utils/request'
    

class blogService{

   getAll = async (req = {}) => { // formBody {Object}
      try {
       const res = await request.get('/blog/getAll',JSON.stringify(req),{
       headers: {
          'Content-Type': 'application/json'
          }
       })
       
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

  create = async (req = {}) => { // formBody {Object}
   try {
    const res = await request.post('/blog/create',JSON.stringify(req),{
    headers: {
       'Content-Type': 'application/json'
       }
    })
    
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

   update = async (_id,req = {}) => {
      try {

       const res = await request.put(`/blog/${_id}/update`,JSON.stringify(req),{
       headers: {
          'Content-Type': 'application/json'
          }
       })
       
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

      delete = async (_id,req = {}) => {
         try {
   
          const res = await request.delete(`/blog/${_id}/delete`,JSON.stringify(req),{
          headers: {
             'Content-Type': 'application/json'
             }
          })
          
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
  

}
    
export default new blogService
     


