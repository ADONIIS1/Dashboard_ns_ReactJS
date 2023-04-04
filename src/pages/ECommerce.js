import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '~/services/auth';

function ECommerce() {
    // const data = async () => {

    //     try {
    //         const check = await authService.testAuthen();

    //         return check;
    //     } catch (error) {

    //     }

    // }
    // console.log('Check Token Err or Succ',data.data);
    return <h2>ECommerce page</h2>;
}

export default ECommerce;
