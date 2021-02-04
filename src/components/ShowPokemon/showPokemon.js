import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import './showPokemon.styles.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const PokemonIndex = ({ user }) => {
  const [pokemon, setPokemon] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    axios({
      url: `${apiUrl}/pokemon`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => setPokemon(res.data.pokemon))
  }, [])

  const pokemonjsx = pokemon.map(pokemon => {
    return (
      <div key={pokemon._id} className="pokemon-border">
        <img src={pokemon.pokemonImage} className="pokemon-image" alt="pokemonImage" />
        <Link to={`/pokemon-index/${pokemon._id}`}><h4 className="name-style">Name: {pokemon.name}</h4></Link>
        <h4 className="type-style">Type: {pokemon.type}</h4>
        <Button variant="primary" onClick={handleShow}>
        See Skills!
        </Button>
        <div key={pokemon._id}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title-style">Pokemon Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 className="modal-style">Best Move: {pokemon.move}</h4>
              <h4 className="modal-style">Strong Against: {pokemon.strengths}</h4>
              <h4 className="modal-style">Weak Against: {pokemon.weaknesses}</h4>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  })
  return (
    <div>
      <h1 className="header-style">Here is your Pokedex!</h1>
      <div className="pokemon-grid">
        {pokemonjsx}
      </div>
    </div>
  )
}

export default PokemonIndex
