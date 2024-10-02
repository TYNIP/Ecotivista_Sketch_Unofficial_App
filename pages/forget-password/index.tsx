/* FORGET PASSWORD */

import {Form} from '../../components/forms/index';
import {useAuthFetch} from '../api/hooks/useAuthFetch';
import {useLoading} from '../api/hooks/useLoading';

export default function ForgetPasswordPage () {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const authfetch = useAuthFetch();

  const forgetPassword = async (formData: any)=>{
    startLoading()
    await authfetch({
      endpoint: 'forget-password',
      formData
    });
    finishLoading()
  }

  return (
    <section className='mainCenter'>
      <Form title='Recuperar Contraseña' onSubmit={forgetPassword} description='Completa el formulario para recuperar contraseña'>

        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Escriba su email...' 
          type='text'/>

        </div>

        <Form.SubmitButton 
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />

        <Form.Footer 
        description="¿Tienes una cuenta?" 
        link='/login' 
        textLink='Inicia Sesión'/>

      </Form>

    </section>
  );
}
