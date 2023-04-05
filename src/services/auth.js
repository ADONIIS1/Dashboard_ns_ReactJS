import request from '~/utils/request';

class authService {
    login = async (req = {}) => {
        // formBody {Object}
        try {
            const res = await request
                .post('/auth/login', JSON.stringify(req), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    return {
                        data: res.data,
                        status: res.status,
                    };
                })
                .catch((err) => {
                    return {
                        data: err.response.data,
                        status: err.response.status,
                    };
                });
            return new Promise((resolve, reject) => {
                if (res.status === 401) {
                    reject({
                        status: res.status,
                        data: res.data,
                    });
                }
                resolve({ status: res.status, data: res.data });
            });
        } catch (error) {
            console.log(error);
        }
    };

    testAuthen = async () => {
        try {
            console.log('Check Request : ');
            const res = await request
                .get('/auth/testAuthentication', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }) // text -> JSON
                //const res = await request.post('/api/v1/auth/login',JSON.stringify(req),)  // text -> JSON

                .then((res) => {
                    console.log('Check res', res);
                    return {
                        data: res.data,
                        status: res.status,
                    };
                })
                .catch((err) => {
                    console.log(err);
                    return {
                        data: err.response.data,
                        status: err.response.status,
                    };
                });

            return res;
        } catch (error) {
            console.log(error);
        }
    };
    refreshtoken = async (refreshtoken = '') => {
        let data = await request
            .get('/auth/refreshtoken', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshtoken}`,
                },
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return false;
            });

        return data;
    };
    checkAuth = async (token = '') => {
        let checkAuth = await request
            .get('/auth/checkAuth', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return true;
            })
            .catch((err) => {
                return false;
            });
        return checkAuth;
    };
    getlstUser = async () => {
        const res = await request
            .get('/auth/lstUser', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                return {
                    data: res.data,
                    status: res.status,
                };
            })
            .catch((err) => {
                return {
                    data: err.response.data,
                    status: err.response.status,
                };
            });
        return res;
    };
    getCurrentUser = async () => {
        const res = await request
            .get('/auth/getCurrentUser', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                return {
                    data: res.data,
                    status: res.status,
                };
            })
            .catch((err) => {
                return false;
            });
        return res;
    };
}

export default new authService();
