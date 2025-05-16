import React, { useState } from 'react'

type Props = {}

const Register = (props: Props) => {
      const [name, setName] = useState<string>('');
      const [email, setEmail] = useState<string>('');
  return (
    <>
    <form>
      <input value={name} onChange={(e)=>setName(e.target.value)}/>
      <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default Register