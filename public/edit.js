const IDDOM = document.querySelector('.edit-id')
const nameDOM = document.querySelector('.edit-name')
const statusDOM = document.querySelector('.status')
const editFormDOM = document.querySelector('.single-conta-form')
const editBtnDOM = document.querySelector('.conta-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const { data } = await axios.get(`/endProj/${id}`)
    const { _id, name, pending, status } = data

    IDDOM.textContent = _id
    nameDOM.value = name

    if (status) {
      statusDOM.checked = true;
    }

  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Carregando...'
  e.preventDefault()
  try {
    const { data } = await axios.patch(`/endProj/${id}`, {
      name: nameDOM.value,
      status: statusDOM.checked
    })

    const { _id, name, status } = data

    if (status) {
      statusDOM.cheched = true
    }

    
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Editado com sucesso!`
    formAlertDOM.classList.add('text-success')

  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Erro, tente novamente!`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
