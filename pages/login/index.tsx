/* LOG IN */

import Meta from '../../components/seo/Meta';
import {Form} from '../../components/forms/index';
import {useAuthFetch} from '../api/hooks/useAuthFetch';
import {useLoading} from '../api/hooks/useLoading';
const {PATHURL} = require('../api/config');

export default function LoginPage () {
  const {finishLoading, isLoading, startLoading} = useLoading();
  const authfetch = useAuthFetch();

  const login = async (formData: any)=>{
    startLoading()
    await authfetch({
      endpoint: 'login',
      redirectRoute: '/',
      formData
    });
    finishLoading()
    setTimeout(()=>window.location.reload(), 200);
  }

  return (
    <section className='mainCenter'>
      <Meta
        title="Inicio de Sesión - Ecotivista"
        description="Inicio de Sesión a Ecotivista"
        canonical={`${PATHURL}/login`}
      />
      <Form title='Iniciar Sesión' onSubmit={login} description='Inicia sesión para acceder a tu cuenta de Ecotivista'>

        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input 
          label='Email' 
          name='Email' 
          placeholder='Escriba su email...' 
          type='text'/>
          <Form.Input 
          label='Contraseña' 
          name='Contraseña' 
          placeholder='Escriba su contraseña...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Iniciar Sesión'
          isLoading={isLoading}
        />

        <Form.Footer 
        description='¿Olvidaste tu Contraseña?' 
        link='/forget-password' 
        textLink='Recuperar Contraseña'/>

        <Form.Footer 
        description="¿No Tienes Contraseña?" 
        link='/register' 
        textLink='Registrate'/>

      </Form>

    </section>
  );
}
