// Buscando os parametros recebidos na URL
const params = location.search;

// Verificando se algo foi recebido
if (params.length > 0) {

    // Verificando se a mensagem é de sucesso
    const error = params.indexOf("error=false") >= 0;

    if (error) {
        alert("Dados enviados com sucesso!");
    } else {
        alert("Ocorreu um erro ao enviar os dados.");
    }
    
    // Limpando os parametros na URL
    window.history.replaceState({}, document.title, location.pathname);
}

