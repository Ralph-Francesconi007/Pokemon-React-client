import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/AutoDismissAlert'
import { Link } from 'react-router-dom'
import './ShowOne.styles.scss'

class ShowOnePokemon extends React.Component {
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
          pokemon: response.data.pokemon,
          name: response.data.pokemon.name,
          type: response.data.pokemon.type,
          move: response.data.pokemon.move,
          strengths: response.data.pokemon.strengths,
          weaknesses: response.data.pokemon.weaknesses
        })
      })
      .catch(console.error)
  }

  handleDelete = (event) => {
    const { msgAlert, history } = this.props
    axios({
      url: `${apiUrl}/pokemon/` + this.props.id,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + `${this.props.user.token}` }
    })
      .then(() => history.push('/pokemon-index'))
      .then(() => msgAlert({
        heading: 'Successfully Deleted the Pokemon',
        message: messages.deletePokemonSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Could not delete the pokemon failed with ' + error.messages,
          message: messages.deletePokemonFailure,
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
          <h4 className="h4-style">Name: {this.state.pokemon.name}</h4>
          <h4 className="h4-style">Type: {this.state.pokemon.type}</h4>
          <h4 className="h4-style">Move: {this.state.pokemon.move}</h4>
          <h4 className="h4-style">Good Against: {this.state.pokemon.strengths}</h4>
          <h4 className="h4-style">Bad Against: {this.state.pokemon.weaknesses}</h4>
          <Link to={`/pokemon-index/update-pokemon/${this.props.id}`}><Button>Edit</Button></Link>
          <Button type="button" className="deleteButton" onClick={this.handleDelete}>Delete</Button>
        </div>
      )
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}

export default ShowOnePokemon
