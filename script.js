axios.defaults.headers.common['Authorization'] = 'hrCVia1hqaWes5Q2Nv7VAikS';
let sendname, nomevalue, intermanter, intergetmsg;
let msgserver = [];
let endboxmsg = 0;

function entrar() {
    nomevalue = document.querySelector('.entername').value;
    sendname = { name: nomevalue };
    const entrar = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', sendname);
    entrar.then(entradaok);
    entrar.catch(negado);
}

function manter() {
    const status = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', sendname);
    status.catch(erroconect);
    status.then(manterstatus);
}

function entradaok() {
    const batepapo = document.querySelector('.entrar');
    batepapo.classList.add('escondido')
    intermanter = setInterval(manter, 5000);
    intergetmsg = setInterval(getmsg, 3000);
    getmsg();
}

function getmsg() {
    const msg = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    msg.then(rendermsg);
}

function rendermsg(msg) {
    msgserver = msg.data;
    const ulmsg = document.querySelector('.mensagens');
    ulmsg.innerHTML = '';
    for (let i = 0; i < msgserver.length; i++) {
        let msg = msgserver[i];
        if (msgserver[i].type === "status") {
            ulmsg.innerHTML += `
            <li class='status' data-test="message">
                <h3><p>
                    <span class='time'>${msg.time}&nbsp;</span>
                    <span class='from'> ${msg.from}&nbsp;</span>
                    <span class='txt'>${msg.text}&nbsp;</span></p>
                </h3>                
            </li>
                `;
        } else {
            ulmsg.innerHTML += `
            <li class='msgchat' data-test="message">
                <h3><p>
                    <span class='time'>${msg.time}&nbsp;</span>
                    <span class='from'> ${msg.from}&nbsp;</span>
                    <span>para&nbsp;</span>
                    <span class='to'> ${msg.to}&nbsp;</span>
                    <span class='txt'>${msg.text}</span></p>
                </h3>                
            </li>
            `;
        }
    }
    if (endboxmsg === 0) {
        const element = document.getElementById("Box");
        element.scrollIntoView({ block: "end" });
    }
}

function negado(erro) {
    alert('ja existe usuário com este nome. Tente outro nome de usuário')
    }

function manterstatus() {
    console.log("conectado");
}

function sendmsg() {
    const msg = document.querySelector('.caixa').value;
    if (msg != "") {
        sendmsg1 =
        {
            from: nomevalue,
            to: "Todos",
            text: msg,
            type: "message"
        };
        const waitsendmsg = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', sendmsg1);
        waitsendmsg.then(msgenviada);
        waitsendmsg.catch(erroconect);
    }
}

function msgenviada() {
    getmsg();
    const clean = document.querySelector('.caixa');
    clean.value = '';
}

function erroconect() {
    const batepapo = document.querySelector('.entrar');
    batepapo.classList.remove('escondido');
    endboxmsg = 0;
    clearInterval(intergetmsg);
    clearInterval(intermanter);
    const ulmsg = document.querySelector('.mensagens');
    ulmsg.innerHTML = '';
}


