import React from 'react';
import "../app/globals.css";

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:8080/intern`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { interns:data }, // will be passed to the page component as props
    }

}


export default function Interns({ interns }) {
    return (
      <div>
        <h1 className='text-red-500'>Interns List</h1>
        <ul>
          {interns.map((intern) => (
            <li key={intern.cpf}>
              Name: {intern.nome}, CPF: {intern.cpf}, Password: {intern.senha}, ID: {intern.matricula}
            </li>
          ))}
        </ul>
      </div>
    );
  }
