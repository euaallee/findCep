import api from './utils/apiCep';
import './App.css'
import { FaSearchLocation } from "react-icons/fa";
import Modal from './assets/components/Modal'
import { useState } from 'react';

export default function App() {

  const [cep, setCep] = useState("")
  const [findCep, setFindCep] = useState([])
  const [open, setOpen] = useState(false)

  const handleCep = () => {

    if (cep === "") {
      alert("Preencha com um CEP!")
      return
    }

    try {
      const cepApi = api.get(cep + "/json")
      cepApi
        .then((response) => {
          const data = response.data
          setFindCep(data)
          setCep("")
          setOpen(true)
        })
        .catch((error) => {
          alert(error.message + " " + error.code)
          setCep("")    
        })
    } catch {
      alert("Algo deu errado! Tente novamente!")
      setCep("")
    }

  }

  const handleClose = () => {
    setOpen(false)
    setCep("")
  }

  return (
    <main>
      <h1>Buscador CEP</h1>
      <div className="inputContainer">
        <input
          placeholder='Digite um CEP'
          type="number"
          name="cepSearch"
          id="cepSearch"
          value={cep}
          onChange={(e) => { setCep(e.target.value) }}
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
    </main>
  )
}
