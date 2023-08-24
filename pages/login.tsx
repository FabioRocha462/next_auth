import React, {SyntheticEvent, useState} from 'react'
import Layout from '../layouts/Layout';
import { useRouter } from 'next/router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [message, setMessage] = useState('');

  const submit = async (e:SyntheticEvent)=> {

    e.preventDefault();
    
    const response = await fetch('http://localhost:8000/api/login', {

      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body:JSON.stringify({
        email,
        password

      })

    })

    const content = await response.json();

    if (content.jwt) {

      await router.push("/");
      

    }else{
      console.log(content);
      setMessage(`${content.detail}`);
    }

    

  }
    return (
       <Layout>
        <form onSubmit={submit}>
          <h1 className = "h3 mb-3 fw-normal">Please sign in</h1>

          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required 
            onChange={e => setEmail(e.target.value)}
          />

          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required 
            onChange={e => setPassword(e.target.value)}
          />
            
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          
        </form>
        {message}
       </Layout>
    );
};

export default Login;