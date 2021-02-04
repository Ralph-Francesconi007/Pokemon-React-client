import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/AutoDismissAlert'
import { withRouter } from 'react-router-dom'
import './PokemonUpdate.styles.scss'

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
        this.setState({ name: '', type: '', move: '', strengths: '', weaknesses: '' })
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
        <div className="pokemon-border">
          <form onSubmit={this.handleSubmit}>
            <h4 className="h4-style">Name: <input name="name" type="text" value={this.state.name} onChange={this.onNameChangeHandler}/></h4>
            <h4 className="h4-style">Type: <input name="type" type="text" value={this.state.type} onChange={this.onTypeChangeHandler}/></h4>
            <h4 className="h4-style">Move: <input name="move" type="text" value={this.state.move} onChange={this.onMoveChangeHandler}/></h4>
            <h4 className="h4-style">Good Against: <input name="strengths" type="text" value={this.state.strengths} onChange={this.onStrengthsChangeHandler}/></h4>
            <h4 className="h4-style">Weak Against: <input name="weaknesses" type="text" value={this.state.weaknesses} onChange={this.onWeaknessesChangeHandler}/></h4>
            <input className="button-style" type="submit" value="Update" />
          </form>
        </div>
      )
    }
    return (
      <div>
        <h3 className="h3-style">Update The Pokemon</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(PokemonUpdate)
