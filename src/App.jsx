import { useState, useEffect } from 'react';
import api from './utils/apiCep';
import './App.css'
import { FaSearchLocation } from "react-icons/fa";
import Modal from './components/Modal'
import Alert from './components/Alert';

export default function App() {

  const [cep, setCep] = useState("")
  const [findCep, setFindCep] = useState([])
  const [open, setOpen] = useState(false)
  const [alertBox, setAlertBox] = useState("")

  const handleWCEP = (e) => {
    setCep(e.target.value)
    setAlertBox("")
  }

  const handleCep = async () => {
    if (cep == "") {
      setAlertBox("Preencha com um CEP!")
      return
    }
    try {
      const response = await api.get(`${cep}/json`)
      const data = response.data
      setFindCep(data)
      setCep("")
      setOpen(true)
      navigator.vibrate([200, 250, 300])
    }
    catch (error) {
      setAlertBox(`${error.message} ${error.code}`)
      setCep("")
    }
  }

  const handleClose = () => {
    setOpen(false)
    setCep("")
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCep()
    }
  }

  return (
    <main>
      {alertBox && (
        <Alert>{alertBox}</Alert>
      )}
      <h1>Buscador CEP</h1>
      <div className="inputContainer">
        <input
          placeholder='Digite um CEP'
          type="text"
          name="cepSearch"
          id="cepSearch"
          value={cep}
          onChange={handleWCEP}
          onKeyDown={handleKeyDown}
          maxLength={9}
        />
        <button>
          <FaSearchLocation
            size={24}
            color='#fff'
            onClick={handleCep} />
        </button>
      </div>
      {Object.keys(findCep).length > 0 && (
        <Modal isOpen={open} onClose={handleClose}>
          <div className="results">
            <h2>CEP: {findCep.cep}</h2>
            <span>Rua: {findCep.logradouro}</span>
            <span>Bairro: {findCep.bairro}</span>
            <span>Cidade: {findCep.localidade}</span>
            <span>UF: {findCep.uf}</span>
          </div>
        </Modal>
      )}
      <footer><p>Feito por <a href="https://github.com/euaallee" target="_blank" rel="noopener noreferrer"></a> </p></footer>
    </main>
  )
}
