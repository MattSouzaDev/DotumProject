const listDOM = document.querySelector('.list')
const secondListDOM = document.querySelector('.list1')
const todas = document.querySelector('.list2')
const listOptionDOM = document.querySelector('.listOption')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.conta-form')
const InputDOM = document.querySelector('.conta-name')
const CompletedDOM = document.querySelector('.pending')
const ValueDOM = document.querySelector('.conta-value')
const DateDOM = document.querySelector('.conta-date')
const formAlertDOM = document.querySelector('.form-alert')
const total = document.querySelector('.total')
const totalRec = document.querySelector('.totalRec')
const totalPagar = document.querySelector('.totalPagar')
let rec = 0
let pag = 0

function convertDate (x) {
  const data  = x.slice(0, 10).split("-").reverse().join('/')
  return data
}

function convertMoney(x) {
  const money = x.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  return money
}

const showList = async (e) => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data } = await axios.get('/endProj')
    
    if (data.length < 1) {
      listDOM.innerHTML = '<h5 class="empty-list">Nada na lista</h5>'
      secondListDOM.innerHTML = '<h5 class="empty-list">Nada na lista</h5>'
      todas.innerHTML = '<h5 class="empty-list">Nada na lista</h5>'
      loadingDOM.style.visibility = 'hidden'
      return 
    }
    

    //retornar contas pendentes

    const list = data.map((x) => {
      if (x.pending == true && x.status == false) {
        pag ++
        const {_id, value, name, pending, date} = x

        return `<div class="single-conta ${pending}">
                  <h5><i class ="fas fa-exclamation-triangle"></i><span>${convertMoney(value)}</span></h5>
                  <h5><span>(${name})</span></h5>
                  <h5><span>Vencimento: ${convertDate(date)}</span></h5>
                  <div class="contas-links">
                    <a href="edit.html?id=${_id}"  class="edit-link"> <i class="fas fa-edit"></i> </a>
                    <button type="button" class="delete-btn" data-id="${_id}"> </button>
                  </div>
                </div>`
      }
    }).join('')

    //retornar contas a receber
    const list2 = data.map((x) => {
      if (x.pending == false && x.status == false) {
        rec ++
        const {_id, value, name, pending, date} = x
        return `<div class="single-conta ${pending}">
                <h5><span>${convertMoney(value)}</span></h5>
                <h5><span>(${name})</span></h5>
                  <h5><span>Vencimento: ${convertDate(date)}</span></h5>
                <div class="contas-links">
                  <a href="edit.html?id=${_id}"  class="edit-link"> <i class="fas fa-edit"></i> </a>
                  <button type="button" class="delete-btn" data-id="${_id}"></button>
                </div>
              </div>`
        }
    }).join(' ')

    //retornar todas as contas 

    const listTodas = data.map((x) => {
      const { _id, value, name, pending, status } = x
      return `<div class="single-conta ${pending} ${status && 'conta-paga'}">
                <h5><span><i class="far fa-check-circle"> Pago</i> ${convertMoney(value)} </span></h5
                <h5><span>${name}</span></h5>
                <div class="contas-links">
                  <a href="edit.html?id=${_id}"  class="edit-link"> <i class="fas fa-edit"></i> </a>
                  <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                </div>`
              }).join(' ')

    listDOM.innerHTML = list
    secondListDOM.innerHTML = list2
    todas.innerHTML = listTodas
    total.innerHTML = `Total de contas adicionadas: ${data.length}`
    totalPagar.innerHTML = `Total de Contas pendentes: ${pag}`
    totalRec.innerHTML = `Total de contas a receber: ${rec}`
  
    
  } catch (error) {
    let errorMs = `<h5 class="empty-list"> Houve um erro tente mais tarde...</h5>`

    listDOM.innerHTML = errorMs
    secondListDOM.innerHTML = errorMs
    todas.innerHTML = errorMs
    console.log(error)
  }
  loadingDOM.style.visibility = 'hidden'
}

showList()

// delete 
todas.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/endProj/${id}`)
      showList()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})


formDOM.addEventListener('submit', async () => {
  const value = ValueDOM.value
  const name = InputDOM.value
  const pending = CompletedDOM.checked
  const date = DateDOM.value

  if (pending) {
    CompletedDOM.checked = true
  }

  try {
    await axios.post('/endProj', {value, name, pending, date,})
    showTasks()
      InputDOM.value = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `Adicionado com sucesso!`
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3500)
  })