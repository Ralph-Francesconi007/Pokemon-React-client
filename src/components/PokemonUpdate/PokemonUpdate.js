import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import messages from '../AutoDismissAlert/AutoDismissAlert'
import { withRouter } from 'react-router-dom'

const cardStyle = {
  backgroundColor: '#8DDBE0',
  maxWidth: '25%',
  margin: '7px',
  padding: '4px'
}

class PokemonUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      name: '',
      type: '',
      move: '',
      strengths: '',
      weaknesses: ''
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/pokemon/` + this.props.id,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + `${this.props.user.token}` }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          name: response.data.pokemon.name,
          type: response.data.pokemon.type,
          move: response.data.pokemon.move,
          strengths: response.data.pokemon.strengths,
          weaknesses: response.data.pokemon.weaknesses
        })
      })
      .catch(console.error)
  }
  onNameChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      name: userInput
    })
  }
  onTypeChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      type: userInput
    })
  }
  onMoveChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      move: userInput
    })
  }
  onStrengthsChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      strengths: userInput
    })
  }
  onWeaknessesChangeHandler = (event) => {
    const userInput = event.target.value
    this.setState({
      weaknesses: userInput
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    axios({
      url: `${apiUrl}/pokemon/` + this.props.id,
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + `${this.props.user.token}` },
      data: {
        pokemon: {
          name: this.state.name,
          type: this.state.type,
          move: this.state.move,
          strengths: this.state.strengths,
          weaknesses: this.state.weaknesses
        }
      }
    })
      .then(response => this.setState({ isUpdated: true }))
      .then(() => history.push('/pokemon-index'))
      .then(() => msgAlert({
        heading: 'Successfully updated pokemon',
        messages: messages.updatePokemonSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ name: '', type: '', move: '' })
        msgAlert({
          heading: 'Could not update the pokemon, failed with ' + error.messages,
          messages: messages.updatePokemonFailue,
          variant: 'danger'
        })
      })
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading ...</p>
    } else {
      jsx = (
        <div>
          <Col>
            <Card border="primary" style={cardStyle}>
              <form onSubmit={this.handleSubmit}>
                <Card.Title>Name: <input name="name" type="text" value={this.state.name} onChange={this.onNameChangeHandler}/></Card.Title>
                <Card.Title>Type: <input name="type" type="text" value={this.state.type} onChange={this.onTypeChangeHandler}/></Card.Title>
                <Card.Title>Move: <input name="move" type="text" value={this.state.move} onChange={this.onMoveChangeHandler}/></Card.Title>
                <Card.Title>Good Against: <input name="strengths" type="text" value={this.state.strengths} onChange={this.onStrengthsChangeHandler}/></Card.Title>
                <Card.Title>Weak Against: <input name="weaknesses" type="text" value={this.state.weaknesses} onChange={this.onWeaknessesChangeHandler}/></Card.Title>
                <input type="submit" value="Submit" />
              </form>
            </Card>
          </Col>
        </div>
      )
    }
    return (
      <div>
        <h3>Update pokemon page</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(PokemonUpdate)
