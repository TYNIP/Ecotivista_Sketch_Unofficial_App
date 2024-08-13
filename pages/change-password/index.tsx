/* CHANGE PASSWORD */
"use client"

import {Form} from '../../components/forms/index';
import {useAuthFetch} from '../api/hooks/useAuthFetch';
import {useLoading} from '../api/hooks/useLoading';
import { useSearchParams } from 'next/navigation';
import { AxiosRequestConfig } from 'axios';


export default function ChangePasswordPage () {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const searchParams = useSearchParams();
  const authfetch = useAuthFetch();

  const changePassword = async (formData: any)=>{
    startLoading()
    const token = searchParams.get('token');
    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }
    await authfetch({
      endpoint: 'change-password',
      formData,
      redirectRoute: '/login',
      options
    });
    finishLoading()
  }

  return (
    <section className='mainCenter'>
      <Form title='Change Password' onSubmit={changePassword} description='Fill out the form to change your password'>

        <div className='my-[10px] flex flex-col gap-4'>

        <Form.Input 
          label='Password' 
          name='newPassword' 
          placeholder='New Password...' 
          type='password'/>

          <Form.Input 
          label='Password' 
          name='confirmPassword' 
          placeholder='Confirm New Password...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Change Password'
          isLoading={isLoading}
        />

      </Form>

    </section>
  );
}
