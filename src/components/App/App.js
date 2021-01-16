import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreatePokemon from '../CreatePokemon/CreatePokemon'
import PokemonIndex from '../ShowPokemon/showPokemon'
import ShowOnePokemon from '../ShowOnePokemon/ShowOne'
import PokemonUpdate from '../PokemonUpdate/PokemonUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-pokemon' render={() => (
            <CreatePokemon msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/pokemon-index' render={() => (
            <PokemonIndex user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/pokemon-index/:id' render={(pokemonProps) => {
            const { match, history } = pokemonProps
            const pokemonId = match.params.id
            return (
              <ShowOnePokemon
                id={pokemonId}
                user={user}
                history={history}
                msgAlert={this.msgAlert}
              />
            )
          }}/>
          <AuthenticatedRoute user={user} exact path='/pokemon-index/update-pokemon/:id' render={(pokemonProps) => {
            const { match, history } = pokemonProps
            const pokemonId = match.params.id
            return (
              <PokemonUpdate
                id={pokemonId}
                user={user}
                history={history}
                msgAlert={this.msgAlert}
              />
            )
          }} />
        </main>
      </Fragment>
    )
  }
}

export default App
