import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (props) => {
    const router = useRouter();
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })

        await router.push('/login');
    }
    let menu;

    if (!props.auth){
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link className="nav-link active" href = "/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="nav-link active" href = "/register">
                        Register
                    </Link>
                </li>   
            </ul>
        )
    }else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link className="nav-link active" href = "/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                        <a className="nav-link active" href = "#" onClick={logout}>
                            Logout
                        </a>
                </li>
            </ul>
        )
    }
    return (
        <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>
      </Head>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            {menu}
        </div>
      </nav>
    <main className = "form-signin">
        {props.children}
    </main>
        </>
    );
};

export default Layout;