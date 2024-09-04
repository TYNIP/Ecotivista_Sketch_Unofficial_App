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
        title="Ecotivista | Register "
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/register`}
      />
      <Form title='Register' onSubmit={register} description='Register to enter to have an Ecotivista account'>

        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Enter your email...' 
          type='text'/>
          <Form.Input 
          label='Password' 
          name='password' 
          placeholder='Password...' 
          type='password'/>
          <Form.Input 
          label='Password' 
          name='confirmPassword' 
          placeholder='Confirm Password...' 
          type='password'/>

        </div>

        <Form.SubmitButton 
          buttonText='Register'
          isLoading={isLoading}
        />

        <Form.Footer 
        description="Already have an account?" 
        link='/login' 
        textLink='Log In'/>

      </Form>

    </section>
  );
}
