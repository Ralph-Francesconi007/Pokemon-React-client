import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class PokemonUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      isUpdated: false,
      name: '',
      type: '',
      move: ''
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
          move: response.data.pokemon.move
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
  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/pokemon/` + this.props.id,
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + `${this.props.user.token}` },
      data: {
        pokemon: {
          name: this.state.name,
          type: this.state.type,
          move: this.state.move
        }
      }
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
            <Card>
              <form onSubmit={this.handleSubmit}>
                <Card.Title>Name: <input name="name" type="text" value={this.state.name} onChange={this.onNameChangeHandler}/></Card.Title>
                <Card.Title>Type: <input name="type" type="text" value={this.state.type} onChange={this.onTypeChangeHandler}/></Card.Title>
                <Card.Title>Move: <input name="move" type="text" value={this.state.move} onChange={this.onMoveChangeHandler}/></Card.Title>
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

export default PokemonUpdate
