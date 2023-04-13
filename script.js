axios.defaults.headers.common['Authorization'] = 'hrCVia1hqaWes5Q2Nv7VAikS';
let sendname;
let msgserver = [];

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
    getmsg();
}

function getmsg(){
    console.log('get msg')
    
    const msg = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    msg.then(rendermsg);
    


}

function rendermsg(msg){ 
    msgserver = msg.data;
    const ulmsg = document.querySelector('.mensagens');
    ulmsg.innerHTML = '';

    // percorrer a minha lista de receitas
    for( let i = 0; i < msgserver.length; i++){
        // pergar receita por receita
        let msg = msgserver[i];
        
        if(msgserver[i].type==="status"){
        ulmsg.innerHTML += `
            <li class='status'>
            <h3><p class='time'>${msg.time}&nbsp; </p> <p class='from'> ${msg.from}&nbsp;</p><p class='txt'>${msg.text}&nbsp;</p></h3>                
            </li>
        `;}else{
            ulmsg.innerHTML += `
            <li class='msgchat'>
            <h3><p class='time'>${msg.time} </p> <p class='from'> ${msg.from} para ${msg.to}</p><p class='txt'>${msg.text}</p></h3>                
            </li>
        `;

        }
    }
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


