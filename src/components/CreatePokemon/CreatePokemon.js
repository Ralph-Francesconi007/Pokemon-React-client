import React from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import { withRouter } from 'react-router-dom'

const headerStyle = {
  color: '#E70E02',
  fontSize: '20px'
}

const h2Style = {
  color: '#E70E02'
}

class CreatePokemon extends React.Component {
  constructor (props) {
    super()
    this.state = {
      pokemon: {
        pokemonImage: '',
        name: '',
        type: '',
        move: '',
        strengths: '',
        weaknesses: ''
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
        this.setState({ name: '', type: '', move: '', strengths: '', weaknesses: '' })
        msgAlert({
          heading: 'Could not create pokemon, Failed with error ' + error.messages,
          message: messages.pokemonCreateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { pokemonImage, name, type, move, strengths, weaknesses } = this.state
    return (
      <div>
        <h2 style={h2Style} className="headerStyle">Create a Pokemon!</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Image of the Pokemon:</Form.Label>
            <Form.Control required id="pokemonImage" type="text" name="pokemonImage" value={pokemonImage} placeholder="Image of the Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Name of the Pokemon:</Form.Label>
            <Form.Control required id="name" type="text" name="name" value={name} placeholder="Name of Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Type of the Pokemon:</Form.Label>
            <Form.Control required id="type" type="text" name="type" value={type} placeholder="Type of Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Best Move by Pokemon:</Form.Label>
            <Form.Control required id="move" type="text" name="move" value={move} placeholder="Best Move by Pokemon" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Pokemon is good against:</Form.Label>
            <Form.Control required id="strengths" type="text" name="strengths" value={strengths} placeholder="What types are the Pokemon good against" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label style={headerStyle} className="pStyle">Pokemon is bad against:</Form.Label>
            <Form.Control required id="weaknesses" type="text" name="weaknesses" value={weaknesses} placeholder="What types are the Pokemon bad against" onChange={this.handleChange}/>
          </Form.Group>
          <Button type="submit">Create the Pokemon</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreatePokemon)
