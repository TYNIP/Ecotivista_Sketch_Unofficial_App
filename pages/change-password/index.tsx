/* CHANGE PASSWORD */

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
      <Form title='Cambiar Contraseña' onSubmit={changePassword} description='Completa el formulario para cambiar contraseña'>

        <div className='my-[10px] flex flex-col gap-4'>

        <Form.Input 
          label='Contraseña' 
          name='password' 
          placeholder='Nueva Contraseña...' 
          type='password'/>

          <Form.Input 
          label='Confirmación de Contraseña'  
          name='confirmPassword' 
          placeholder='Confirma Nueva Contraseña...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Cambiar Contraseña'
          isLoading={isLoading}
        />

      </Form>

    </section>
  );
}
