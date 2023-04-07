import request from '~/utils/request';

class salaryService {
    getAll = async () => {
        // formBody {Object}
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

    create = async (req = {}) => {
        // formBody {Object}
        try {
            const res = await request
                .post('/salary/create',JSON.stringify(req), {
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
                .post(`/salary/update`, req, {
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
                .delete(`/salary/${_id}/delete`, JSON.stringify(req), {
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
}

export default new salaryService();
