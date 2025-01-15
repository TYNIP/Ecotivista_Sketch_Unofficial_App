
import {useLoading} from '@/pages/api/hooks/useLoading';
import {Form} from '@/components/forms/index';
import styles from '@/styles/index.module.scss';
const Logo = require("@/public/assets/ecotivistalogo.jpg");
import Image from "next/image";

export default function ReportComponent({article}:any) {
    const {finishLoading, isLoading, startLoading} = useLoading();

  const report = async (formData: any)=>{
    try{
      startLoading()
      alert("Servicio no disponible. Favor de intentarlo más tarde")
      finishLoading()
    } catch(err){
    }
  }

  return (
    <>

        <Form title='' onSubmit={report} description=''>
        <div className={styles.head}>
          <Image src={Logo} alt="Ecotivista Logo" />
          <h2>Reportar Articulo</h2>
        </div>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input 
          label='Asunto' 
          name='topic' 
          placeholder='Tipo de violación de los terminos de uso' 
          type='text'/>
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
        description="Al reportar el articulo esta identificando una violación de este mismo a los terminos de uso. Si tiene una duda de estos puede checar los" 
        link='/terms-service' 
        textLink='Terminos de Servicio'/>

      </Form>
        
    </>
  );
}
