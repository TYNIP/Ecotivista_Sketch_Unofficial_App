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
      <Form title='Forget Password' onSubmit={forgetPassword} description='Fill out the form to recover your acount password'>

        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Enter your email...' 
          type='text'/>

        </div>

        <Form.SubmitButton 
          buttonText='Recover Password'
          isLoading={isLoading}
        />

        <Form.Footer 
        description="Go Back To Log In?" 
        link='/login' 
        textLink='Log In'/>

      </Form>

    </section>
  );
}
