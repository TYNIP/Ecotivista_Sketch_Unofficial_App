import {AxiosRequestConfig} from 'axios';
const axios = require('axios');
import {useRouter} from 'next/navigation';
import {useContext} from 'react';
import { NotificationContext } from '../context/NotificationContext';

interface AuthFetchProps{
    endpoint: string
    redirectRoute?: string
    formData: any
    options?: AxiosRequestConfig<any>
}

export function useAuthFetch(){
    const {showNotification} = useContext(NotificationContext)
    const router = useRouter()

    const authRouter = async({endpoint, redirectRoute, formData, options}: AuthFetchProps) =>{
        try{

            const data = await axios.post(`/api/auth/${endpoint}`, formData, options);
            console.log("context",data);

            showNotification({
                msj: data.data.message,
                open: true,
                status: 'success'
            });

            /* NOTIFICATIONS */
            if(redirectRoute) router.push(redirectRoute);
            return true;

        }catch(err: any){
            showNotification({
                msj: err.response.data.message as string,
                open: true,
                status: 'error'
            })
        }
    };

    return authRouter;
}