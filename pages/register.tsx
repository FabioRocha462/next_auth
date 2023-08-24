import React , {SyntheticEvent, useState} from 'react';
import Layout
 from '../layouts/Layout';
import { useRouter } from 'next/router';


const Register = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {

            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                name,
                email,
                password
            })
        });

        const content = await response.json();

        if (content.email == email){

            await router.push('/login');

        }else {

            setMessage(`${content.email}`);
        }

    }
    return (
       <Layout>
            <form onSubmit={submit}>
                <h1 className = "h3 mb-3 fw-normal">Please make your Register</h1>

                <input type="text" className="form-control" id="floatingText" placeholder="your name" required 
                    onChange={e => setName(e.target.value)}
                />

                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required 
                    onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required 
                    onChange={e => setPassword(e.target.value)}
                />
    
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            
            </form>

            {message}
       </Layout>

    );
};

export default Register;