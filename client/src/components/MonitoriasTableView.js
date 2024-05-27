import React from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Cookies from 'js-cookie';
import { Toaster, toast } from 'react-hot-toast';


export default function MonitoriasTableView({ monitoria }) {
  const router = useRouter();

  const jwtToken = Cookies.get('jwtToken');

  // Verifica se monitoria é um array
  if (!Array.isArray(monitoria)) {
    console.log('Monitoria is not an array:', monitoria);
    return <div>No data available</div>;
  }

  const handleDelete = async (cpfPaciente, cpfInterno) => {
    try {
      const response = await fetch(`http://localhost:8080/monitora/${cpfInterno}/${cpfPaciente}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        toast.success('Monitoria deletada com sucesso');
        window.location.reload();
      } else {
        console.error('Failed to delete monitoria:', response);
        toast.error('Falha ao deletar monitoria');
      }
    } catch (error) {
      console.error('Failed to delete monitoria:', error);
    }
    
  }

  return (
    <>
    <Toaster />
    <div className="container mx-auto mt-8 flex items-center justify-center">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do paciente</th>
            <th className="border-b-2 border-gray-300 border-r px-5 py-2 text-sm text-left">Nome do interno</th>
            <th className="border-b-2 border-gray-300 px-5 py-2 text-left text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          {monitoria.map((relacao, index) => (
            <tr key={index}>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{relacao.nomePaciente}</td>
              <td className="border-b border-gray-300 border-r px-5 py-2 text-sm text-left">{relacao.nomeInterno}</td>
              <td className="flex gap-2 items-start justify-start border-b border-gray-300 border-r px-5 py-2 ">
                <AlertDialog>
                  <AlertDialogTrigger ><img src="/img/Delete.png" className="w-6 h-6 mt-1 transition-transform duration-200 hover:scale-110" alt="perfil icon" /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você está prestes a remover uma relação desta tabela.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(relacao.cpf_paciente, relacao.cpf_interno)}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
