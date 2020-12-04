import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class ShowOnePokemon extends React.Component {
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
          pokemon: response.data.pokemon,
          name: response.data.pokemon.name,
          type: response.data.pokemon.type,
          move: response.data.pokemon.move
        })
      })
      .catch(console.error)
  }

  handleDelete = (event) => {
    axios({
      url: `${apiUrl}/pokemon/` + this.props.id,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + `${this.props.user.token}` }
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
              <Card.Title>Name: {this.state.pokemon.name}</Card.Title>
              <Card.Title>Type: {this.state.pokemon.type}</Card.Title>
              <Card.Title>Move: {this.state.pokemon.move}</Card.Title>
            </Card>
            <Button type="button" onClick={this.handleDelete}>Delete</Button>
            <Link to={`/pokemon-index/update-pokemon/${this.props.id}`}><Button>Edit</Button></Link>
          </Col>
        </div>
      )
    }
    return (
      <div>
        <h2>Show one Pokemon page</h2>
        {jsx}
      </div>
    )
  }
}

export default ShowOnePokemon
