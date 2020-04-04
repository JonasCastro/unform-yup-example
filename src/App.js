import React, { useRef, useEffect} from 'react';
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import './App.css';
import * as Yup from 'yup';

import Input from './components/Form/Input'

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data,{reset}){
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
        .email('Digite um e-mail válido.')
        .required('O e-mail é obrigatório.'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'No mínimo 3 caracteres').required('A cidade é obrigatório.')
        })
      });

      await schema.validate(data,{
        abortEarly: false,
      })
      alert(JSON.stringify(data))
      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if(err instanceof Yup.ValidationError){
        const errorMessages = {};
        err.inner.forEach(error =>{
          errorMessages[error.path] = error.message;
        })
        formRef.current.setErrors(errorMessages);
      }
    }

  }

  useEffect(()=>{
    setTimeout(()=>{
      formRef.current.setData({
        address:{
          state:'Ce'
        }
      })
    },200);
  },[]);

  return (
    <div className="App">
      <div className="content">
        <section>
          <h1>Exemplo de uso Unform e Yup</h1>

          </section>
        <Form ref={formRef}  onSubmit={handleSubmit}>
          <Input name="name"  label="Nome*" />
          <Input type="email" name="email" label="E-mail*"/>

          <Scope path="address">
            <Input name="city" label="Cidade*"/>
            <Input name="state" label="Estado*"/>
          </Scope>

          <button type="submit">Enviar</button>
        </Form>
      </div>
    </div>
  );
}

export default App;
