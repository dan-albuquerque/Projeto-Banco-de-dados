// submitConForm.js
document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var codigo = document.getElementById('codigo').value;
  var conduta = document.getElementById('conduta').value;
  var historicoDoenca = document.getElementById('historico_doenca').value;
  var exameFisico = document.getElementById('exame_fisico').value;
  var pacienteCpf = document.getElementById('paciente_cpf').value;
  var dataRealizacao = document.getElementById('data_realizacao').value;

  fetch('http://localhost:8080/user', {
    credentials: 'include' // Garante que os cookies de sessão sejam incluídos
  })
  .then(response => response.ok ? response.text() : Promise.reject('Falha ao obter CPF do médico: ' + response.statusText))
  .then(medicoCpf => {
    // Após obter o CPF do médico, iniciar a cadeia de registro e consulta
    const registroData = {
      codigo: codigo,
      conduta: conduta
    };

    return fetch('http://localhost:8080/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registroData)
    })
    .then(response => response.ok ? response.text() : Promise.reject('Falha ao registrar: ' + response.statusText))
    .then(() => {
      const registroUrgenciaData = {
        fk_registro_codigo: codigo,
        historico_doenca: historicoDoenca,
        exame_fisico: exameFisico
      };

      return fetch('http://localhost:8080/registro_urgencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registroUrgenciaData)
      });
    })
    .then(response => response.ok ? response.text() : Promise.reject('Falha ao registrar urgência: ' + response.statusText))
    .then(() => {
      const consultaUrgenciaData = {
        fk_registro_urgencia_codigo: codigo,
        data_realizacao: dataRealizacao,
        fk_medico_cpf: medicoCpf,
        fk_paciente_urgencia_cpf: pacienteCpf
      };

      return fetch('http://localhost:8080/consulta_urgencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaUrgenciaData)
      });
    })
    .then(response => response.ok ? response.text() : Promise.reject('Falha ao criar consulta de urgência: ' + response.statusText))
    .then(() => {
      alert('Consulta de urgência criada com sucesso!');
      document.getElementById('registroForm').reset();
    });
  })
  .catch((error) => {
    alert('Erro: ' + error);
  });
});
