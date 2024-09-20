/* REGISTER */

import Meta from '../../components/seo/Meta';
import {Form} from '../../components/forms/index';
import {useAuthFetch} from '../api/hooks/useAuthFetch';
import {useLoading} from '../api/hooks/useLoading';
const {PATHURL} = require('../api/config');

export default function RegisterPage () {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const authfetch = useAuthFetch();

  const register = async (formData: any)=>{
    startLoading()
    await authfetch({
      endpoint: 'register',
      redirectRoute: '/',
      formData
    });
    finishLoading()
    setTimeout(()=>window.location.reload(), 200);
  }

  return (
    <section className='mainCenter'>
      <Meta
        title="Registro - Ecotivista"
        description="Registro de cuenta para formar parte de la comunidad de Ecotivista"
        canonical={`${PATHURL}/register`}
      />
      <Form title='Registro' onSubmit={register} description='Registrate para tener tu cuenta de Ecotivista'>

        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Escriba su email...' 
          type='text'/>
          <Form.Input 
          label='Contraseña' 
          name='password' 
          placeholder='Contraseña...' 
          type='password'/>
          <Form.Input 
          label='Confirmar Contraseña' 
          name='confirmPassword' 
          placeholder='Confirmar Contraseña...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Registrate'
          isLoading={isLoading}
        />

        <Form.Footer 
        description="¿Ya Tienes una Cuenta?" 
        link='/login' 
        textLink='Iniciar Sesión'/>

      </Form>

    </section>
  );
}
