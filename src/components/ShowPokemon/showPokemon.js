import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiUrl from './../../apiConfig'
// import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const headerStyle = {
  color: '#E70E02',
  fontSize: '20px'
}

const h2Style = {
  color: '#E70E02'
}

const cardStyle = {
  backgroundColor: '#8DDBE0',
  maxWidth: '25%',
  margin: '7px',
  padding: '4px'
}

class PokemonIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/pokemon`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.props.user.token}` }
    })
      .then(response => {
        this.setState({
          isLoaded: true,
          pokemon: response.data.pokemon
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading ...</p>
    } else if (this.state.pokemon.length === 0) {
      jsx = <p>No pokemon to Show! Hit the Create Pokemon tab to add one!</p>
    } else {
      jsx = (
        <div>
          {this.state.pokemon.map(pokemon => {
            return (
              <CardDeck key={pokemon._id} className="card-style">
                <Card border="primary" style={cardStyle}>
                  <Link to={`/pokemon-index/${pokemon._id}`}><Card.Header>Name: {pokemon.name}</Card.Header></Link>
                  <Card.Header>Type: {pokemon.type}</Card.Header>
                  <Card.Header>Move: {pokemon.move}</Card.Header>
                </Card>
              </CardDeck>
            )
          })}
        </div>
      )
    }
    return (
      <div>
        <h2 style={h2Style} className="headerStyle">Welcome to your Pokemon Library</h2>
        <p style={headerStyle} className="pStyle">Here are your Pokemon!</p>
        {jsx}
      </div>
    )
  }
}

export default PokemonIndex
