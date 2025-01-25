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
    try{
      startLoading()
      const res = await authfetch({
        endpoint: 'register',
        redirectRoute: '/',
        formData
      });
      finishLoading()
      if(res){
        setTimeout(()=>window.location.reload(), 2000);
      }
    } catch(err){
    }
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
          label='Nombre(s)' 
          name='name' 
          placeholder='Escriba su nombre...' 
          type='text'/>

        <Form.Input 
          label='Apellidos' 
          name='lastname' 
          placeholder='Escriba sus apellidos...' 
          type='text'/>

          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Escriba su email...' 
          type='text'/>

          <Form.Input 
          label='Usuario' 
          name='username' 
          placeholder='Escriba un nombre de usuario...' 
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

        <Form.Input 
          label='Token' 
          name='tokenId' 
          placeholder='Escriba su token...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Registrate'
          isLoading={isLoading}
        />

      <Form.Footer 
        description="Al crear una cuenta estas aceptando nuestros" 
        link='/terms/terminos-y-condiciones-ecotivista.pdf' 
        textLink='Términos y Condiciones'/>

      <Form.Footer 
        description="Al crear una cuenta estas aceptando nuestras" 
        link='/terms/politica-de-privacidad-ecotivista.pdf' 
        textLink='Politicas de Privacidad'/>

        <Form.Footer 
        description="¿Ya Tienes una Cuenta?" 
        link='/login' 
        textLink='Iniciar Sesión'/>

      </Form>

    </section>
  );
}
