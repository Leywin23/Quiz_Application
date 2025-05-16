import React, { useState } from 'react';
import axios from 'axios';

type FormValues = {
    name: string;
    email: string;
}

type FormErrors = {
    name?: string;
    email?: string;
}

const Login = () => {
    const [userValue, setUserValue] = useState<FormValues>({ name: '', email: '' });
    const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e:any) =>{
    const {name, value} = e.target;
    setUserValue({...userValue, [name]:value});
  }

  const validate = () => {
    let temp: FormErrors = {};
    temp.name = userValue.name ? "" : "Name Is Required.";
    temp.email = /\S+@\S+\.\S+/.test(userValue.email)? "" : "Email is not valid.";
    setErrors(temp);
    return Object.values(temp).every((x)=> x==="");
  }

  const login = (e:any) => {
    e.preventDefault();
    if(validate()){
        axios.post(`https://localhost:7260/api/participant`, userValue).then(res=>{
            alert('Zalogowano pomyślnie!');}
        ).catch(err=>{
            alert('Wystapil blad');
        })
    }
  }
     
  return (
    <>
        <form onSubmit={login}>
            <input name="name" value={userValue.name} onChange={handleChange}/>
            <input name="email" value={userValue.email} onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    </>
  );
};

export default Login;
