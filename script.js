axios.defaults.headers.common['Authorization'] = 'hrCVia1hqaWes5Q2Nv7VAikS';
let sendname;

function entrar() {



    const nome = document.querySelector('.entername').value;
    console.log(nome);

    sendname = { name: nome };
    console.log(sendname);

    const entrar = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', sendname);
    console.log(entrar);
    entrar.then(entradaok);
    entrar.catch(negado);

}
function manter() {
    

    const status = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', sendname);
    status.catch(negado);
    status.then(manterstatus())


}

function entradaok() {
    const batepapo = document.querySelector('.entrar');
    batepapo.classList.add('escondido')
    console.log("entradaok");
    const inter = setInterval(manter, 4000);





}

function negado(erro) {
    alert('ja existe usuário com este nome. Tente outro nome de usuário')
    console.log("negado")
    console.log(erro)

}
function manterstatus(){
    console.log("conectado");
}










function sendmsg() {
    const send = 1;

}


