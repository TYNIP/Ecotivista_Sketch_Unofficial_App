/* LOG IN */
"use client"

import Meta from '../../components/seo/Meta';
import {Form} from '../../components/forms/index';
import {useAuthFetch} from '../api/hooks/useAuthFetch';

export default function LoginPage () {
  const authfetch = useAuthFetch();

  const login = async (formData: any)=>{
    await authfetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
  }

  return (
    <section className='mainCenter'>
      <Meta
        title="Ecotivista | Log In "
        description="The House of Independent Journalism, Activism and Education."
        canonical="http://localhost:3000/"
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
