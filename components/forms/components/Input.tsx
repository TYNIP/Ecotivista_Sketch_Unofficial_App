"use client"

import {useContext} from 'react';
import { FormContext } from '..';
import styles from './styles.module.scss';

interface InputProps{
    type?: "text" | "password" | "textarea"
    name: string
    label: string
    placeholder?: string
}

export function Input({label, name, placeholder, type}: InputProps){
    const{formValues, setFormValues} = useContext(FormContext)!

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value}= event.target;
        setFormValues(prevValues=>({
            ...prevValues,
            [name]: value
        }));
    }

    if(type==="textarea"){
        return(
            <div className={styles.textAreaContainer}>
                <label className={styles.label} htmlFor={name}>{label}</label>
                <textarea 
                    type={type}
                    id={name} 
                    name={name}
                    value={formValues[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </div>
        )
    } else {
        return(
            <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor={name}>{label}</label>
                <input 
                    type={type}
                    id={name} 
                    name={name}
                    value={formValues[name] || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}