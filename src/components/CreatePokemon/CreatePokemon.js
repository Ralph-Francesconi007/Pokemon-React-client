import React from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import { withRouter } from 'react-router-dom'

class CreatePokemon extends React.Component {
  constructor (props) {
    super()
    this.state = {
      pokemon: {
        name: '',
        type: '',
        move: ''
      },
      createdPokemon: null
    }
    console.log(props)
  }

  handleChange = (event) => {
    const userInput = event.target.value
    const key = event.target.name
    const pokemonCopy = Object.assign({}, this.state.pokemon)
    pokemonCopy[key] = userInput
    this.setState({ pokemon: pokemonCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const pokemonChar = this.state.pokemon
    axios({
      url: `${apiUrl}/pokemon`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` },
      data: {
        pokemon: pokemonChar
      }
    })
      .then(response => this.setState({ createdPokemon: response.data.pokemon._id }))
      .then(() => history.push('/pokemon-index'))
      .then(() => msgAlert({
        heading: 'Pokemon Created Successfully',
        message: messages.pokemonCreateSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ name: '', type: '', move: '' })
        msgAlert({
          heading: 'Could not create pokemon, Failed with error ' + error.messages,
          message: messages.pokemonCreateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { name, type, move } = this.state
    return (
      <div>
        <h2>Create a Pokemon!</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name of the Pokemon:</Form.Label>
            <Form.Control required id="name" type="text" name="name" value={name} placeholder="Name of Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of the Pokemon:</Form.Label>
            <Form.Control required id="type" type="text" name="type" value={type} placeholder="Type of Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Best Move by Pokemon:</Form.Label>
            <Form.Control required id="move" type="text" name="move" value={move} placeholder="Best Move by Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Button type="submit">Create the Pokemon</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreatePokemon)
