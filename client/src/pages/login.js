import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import {Layout} from '../app/layout';
import "../app/globals.css";
import Cookies from 'js-cookie';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.promise(
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: cpf, password }),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Falha na autenticação');
          }
        })
        .then((data) => {
          let jwtToken = data.token;
          localStorage.setItem('cpf', cpf);
          localStorage.setItem('jwtToken', jwtToken);
          Cookies.set('jwtToken', jwtToken, {
            expires: 7,
            secure: true,
            sameSite: 'Strict'
          });
          Cookies.set('cpf', cpf, {
            expires: 7,
            secure: true,
            sameSite: 'Strict'
          });
          setTimeout(() => {
            router.push('/home');
          }, 2000);
          return data;
        }),
      {
        loading: 'Autenticando...',
        success: <b>Login realizado com sucesso!</b>,
        error: (err) => <b>{err.message}</b>
      }
    );
  }

  return (
    <>
      <Toaster />
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full bg-[#fff8e1] p-6 rounded-3xl shadow-md">
            <div className="mb-4 flex items-center justify-center">
              <img src="/img/logo.png" alt="Logo eHospital" className="h-8 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                eHospital
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  autoComplete="cpf"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Insira o CPF do médico"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Insira a senha do médico"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
