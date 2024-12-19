/* ABOUT */
import Meta from '../../../components/seo/Meta';
const { PATHURL } = require('../../api/config');
import {useLoading} from '../../api/hooks/useLoading';
import {Form} from '../../../components/forms/index';
import styles from '../index.module.scss';
const Logo = require("../../../public/assets/ecotivistalogo.jpg");
import Image from "next/image";

export default function AboutPage() {
    const {finishLoading, isLoading, startLoading} = useLoading();

  const login = async (formData: any)=>{
    try{
      startLoading()
      alert("Servicio no disponible. Favor de intentarlo más tarde")
      finishLoading()
    } catch(err){
    }
  }

  return (
    <>
      <Meta
        title="Ecotivista | About"
        description="Contactanos Ecotivista"
        canonical={`${PATHURL}/about/contact`}
      />
      
      <section className={styles.aboutContainer}>

        <Form title='' onSubmit={login} description=''>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Contactanos</h2>
        </div>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input 
          label='Email' 
          name='email' 
          placeholder='Escriba su email...' 
          type='text'/>
          <Form.Input 
          label='Asunto' 
          name='topic' 
          placeholder='Asunto del Correo...' 
          type='password'/>
          <Form.Input 
          label='Contenido' 
          name='content' 
          placeholder='Escriba el contenido del correo...' 
          type='textarea'/>

        </div>

        <Form.SubmitButton 
          buttonText='Enviar Correo'
          isLoading={isLoading}
        />

      <Form.Footer 
        description="Si tiene alguna duda de como sus datos pueden ser usados favor de checar nuestra" 
        link='/terms-service/privacy-policy' 
        textLink='Politica de Privacidad'/>

      </Form>
        
      </section>
    </>
  );
}
