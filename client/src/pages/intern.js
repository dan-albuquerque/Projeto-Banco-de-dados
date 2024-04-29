import React from 'react';
import "../app/globals.css";
import Layout from "../app/layout";
import UpperNav from '@/components/UpperNav';
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
    <Layout className="max-w-4xl mx-auto">
      <UpperNav />
      <div className="flex justify-center items-center rounded-lg bg-customGrey h-64 w-64 mx-auto shadow-md hover:shadow-lg focus:shadow-xl w-9/12"></div>
    </Layout>
  );
}
