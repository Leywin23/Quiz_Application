import React, { useState } from 'react';
import axios from 'axios';

type FormValues = {
  name: string;
  email: string;
};

type FormErrors = {
  name?: string;
  email?: string;
};

const Login = () => {
  const [values, setValues] = useState<FormValues>({ name: '', email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    let temp: FormErrors = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name ? "" : "Name is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true); // Zmieniamy stan na "trwa wysyłanie"
      axios.post('https://localhost:7260/api/participant', values)
        .then(res => {
          console.log(res);
          setIsSubmitting(false); // Zmieniamy stan na zakończenie wysyłania
          alert('Zalogowano pomyślnie!');
        })
        .catch(err => {
          console.log(err);
          setIsSubmitting(false); // Zmieniamy stan na zakończenie wysyłania
          alert('Błąd podczas logowania!');
        });
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        
        <input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <button type="submit" disabled={isSubmitting}>START</button>
      </form>
    </div>
  );
};

export default Login;
