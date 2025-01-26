"use client"

import {StatusNotification} from '../../../pages/api/interfaces';
import {Notification} from '../../../components/ui/notifications';
import {createContext, useState} from 'react';

interface IState{
    open: Boolean
    status: StatusNotification
    msj: string | null
}

interface INotification extends IState{
    showNotification: (props: IState) => void
};

interface Props{
    children: JSX.Element | JSX.Element[]
}

const defaultState: IState = {
    open: false,
    status: null,
    msj: null
}

export const NotificationContext = createContext<INotification>(
    {} as INotification
);

export const NotificationProvider: React.FC<Props> = ({ children }) =>{
    const [notification, setNotification] = useState<IState>(defaultState);

    const showNotification = (props: IState) =>{
        if(props){
            setNotification(props);
            setTimeout(() => {
                setNotification({open: false, msj: null, status: null}); 
            }, 6000);
        };
    }

    return(
        <NotificationContext.Provider value={{...notification, showNotification}}>
            {children}
            {notification.open && (
                <>
                    <Notification status={notification.status} msj={notification.msj}/>
                </>
            )}
        </NotificationContext.Provider>
    )
}
