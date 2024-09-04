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
        title="Ecotivista | Log In "
        description="The House of Independent Journalism, Activism and Education."
        canonical={`${PATHURL}/login`}
      />
      <Form title='Log In' onSubmit={login} description='Log in to enter to your Ecotivista account'>

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

        </div>

        <Form.SubmitButton 
          buttonText='Log In'
          isLoading={isLoading}
        />

        <Form.Footer 
        description='Forgot your password?' 
        link='/forget-password' 
        textLink='Recover Password'/>

        <Form.Footer 
        description="You don't have an account?" 
        link='/register' 
        textLink='Register'/>

      </Form>

    </section>
  );
}
