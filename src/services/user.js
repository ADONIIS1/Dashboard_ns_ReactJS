import request from '~/utils/request';

class userService {
    getAll = async () => {
        // formBody {Object}
        try {
            const res = await request
                .get('/user/getAll', {
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
            console.log(res);
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
    
    create = async (req = {}) => {
        // formBody {Object}
        try {
            const res = await request
                .post('/auth/register', JSON.stringify(req), {
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
            console.log(res);
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

    update = async (req = {}) => {
        try {
            const res = await request
                .post(`/user/update`, JSON.stringify(req),{
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
            console.log(res);
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

    delete = async (_id, req = {}) => {
        try {
            const res = await request
                .delete(`/user/${_id}/delete`, JSON.stringify(req), {
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
            console.log(res);
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
    getDepartment = async () => {
        try {
            const res = await request
                .get('/department/getAll', {
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
            console.log(res);
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
    getSalary = async () => {
        try {
            const res = await request
                .get('/salary/getAll', {
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
            console.log(res);
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
    getDegree = async () => {
        try {
            const res = await request
                .get('/degree/getAll', {
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
            console.log(res);
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
    getById = async (_id) => {
        try {
            console.log(_id);
            const res = await request
                .get(`/user/getById/${_id}`, {
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
            console.log(res);
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
    getCurrentUser = async (req = {}) => {
        try {
            console.log(req);
            console.log(localStorage.getItem('token'));
            const res = await request
            .post('/user/getcurrentuser',req, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((res) => {
                    console.log(res);
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
            console.log(res);
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
    }
    addRolestoUser = async (req = {}) => {
        try {
            const res = await request
                .post(`/auth/addRolestoUser`, JSON.stringify(req), {
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
                    console.log(err);
                });
            console.log(res);
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
}

export default new userService();
