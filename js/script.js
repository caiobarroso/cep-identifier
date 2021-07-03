const form = document.getElementById('form')
const main = document.getElementById('main')
const input = document.getElementById('search')
const btn = document.getElementById('submit')
const lbl = document.getElementById('label')

const url = (cep) => `https://api.postmon.com.br/v1/cep/${cep}`


async function getCepByLocation (cep) {
    try {
        const resp = await fetch(url(cep), { origin: "cors" })
        const respData = await resp.json()
        lbl.innerHTML = ''
        showCep(respData)
    } catch(err) {
        lbl.innerHTML = ('Oops! Não encontramos nenhum endereço ..')
        console.log('Oops! ' + err)
        main.innerHTML = ""
    }
}

function showCep(data) {
    const cidade = data.cidade
    const bairro = data.bairro
    const endereco = data.logradouro
    const estado = data.estado_info.nome
    const cep = data.cep

    const info = document.createElement('div')
    info.classList.add('info')

    info.innerHTML = `
                
                    <table id="table">
                    <tr style="background-color: #537895;
                    background-image: linear-gradient(315deg, #537895 0%, #09203f 74%); color:white">
                        <th>Logradouro</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Cep</th>
                    </tr>
                    <tr>
                        <td>${endereco}</td>
                        <td>${bairro}</td>
                        <td>${cidade}</td>
                        <td>${estado}</td>
                        <td>${cep}</td>
                    </tr>
                    </table>
                `
    main.innerHTML = ""
    main.appendChild(info)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cep = input.value

    if(cep) {
        getCepByLocation(cep)
    } else {
        main.innerHTML = ""
        lbl.innerHTML = ('Preencha todos os campos ..')
    }
})