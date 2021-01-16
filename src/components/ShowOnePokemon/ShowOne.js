import React from 'react'
import apiUrl from './../../apiConfig'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/AutoDismissAlert'
import { Link } from 'react-router-dom'

const headerStyle = {
  color: '#E70E02',
  fontSize: '20px'
}
//
// const h2Style = {
//   color: '#E70E02'
// }

const cardStyle = {
  backgroundColor: '#8DDBE0',
  maxWidth: '25%',
  margin: '7px',
  padding: '4px'
}

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
        <div>
          <Col>
            <Card border="primary" style={cardStyle}>
              <Card.Title style={headerStyle} className="showOneStyle">Name: {this.state.pokemon.name}</Card.Title>
              <Card.Title style={headerStyle} className="showOneStyle">Type: {this.state.pokemon.type}</Card.Title>
              <Card.Title style={headerStyle} className="showOneStyle">Move: {this.state.pokemon.move}</Card.Title>
            </Card>
            <Button type="button" onClick={this.handleDelete}>Delete</Button>
            <Link to={`/pokemon-index/update-pokemon/${this.props.id}`}><Button>Edit</Button></Link>
          </Col>
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
