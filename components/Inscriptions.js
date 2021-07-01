import React from 'react'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import ListeJoueur from '../components/ListeJoueur'

class Inscription extends React.Component {

  constructor(props) {
    super(props)
    this.joueurText = "",
    this.addPlayerTextInput = React.createRef()
    this.state = {
      joueur: undefined,
      isChecked: false,
      etatBouton: false
    }
  }

  _ajoutJoueurTextInputChanged = (text) => {
    this.joueurText = text
    //Possible d'utiliser le bouton sauf si pas de lettre
    if (this.joueurText != '') {
      this.setState({
        etatBouton: true
      })
    }
    else {
      this.setState({
        etatBouton: false
      })
    }
  } 

  _ajoutJoueur() {
    //Test si au moins 1 caractère
    if(this.joueurText != '') {
      const action = { type: "AJOUT_JOUEUR", value: [this.joueurText, this.state.isChecked] }
      this.props.dispatch(action);
      this.addPlayerTextInput.current.clear();
      this.joueurText = "";
      this.setState({
        isChecked: false,
        etatBouton: false
      })
      //Ne fonctionne pas avec: "this.addPlayerTextInput.current.focus()" quand validation avec clavier donc "hack" ci-dessous
      setTimeout(() => this.addPlayerTextInput.current.focus(), 0)
    }
  }

  _ajoutJoueurBouton() {
    if (this.state.etatBouton == true) {
      return <Button color='#32cd32' title='Ajouter' onPress={() => this._ajoutJoueur()}/>
    }
    else {
      return <Button disabled title='Ajouter' onPress={() => this._ajoutJoueur()}/>
    }
  }

  _supprimerJoueur = (idJoueur) => {
    const actionSuppr = { type: "SUPPR_JOUEUR", value: idJoueur }
    this.props.dispatch(actionSuppr);
    const actionUpdate = { type: "UPDATE_ALL_JOUEURS_ID"}
    this.props.dispatch(actionUpdate);
  }

  _commencer() {
    this.props.navigation.navigate('GenerationMatchs');
  }

  _parametres() {
    this.props.navigation.navigate('OptionsTournoi');   
  }

  _displayListeJoueur() {
    if (this.props.listeJoueurs !== undefined) {
      return (
        <FlatList
          persistentScrollbar={true}
          data={this.props.listeJoueurs}
          keyExtractor={(item) => item.id.toString() }
          renderItem={({item}) => (
            <ListeJoueur
              joueur={item}
              supprimerJoueur={this._supprimerJoueur}
              isInscription={true}
            />
          )}
        />
      )
    }
  }

  _showNbJoueur() {
    let nbJoueur = this.props.listeJoueurs.length;
    return (
    <Text>{nbJoueur}</Text>
    )
  }

  _boutonCommencer() {
    let boutonActive = true
    let boutonTitle = "Nombre de joueurs n'est pas un multiple de 4"
    if (this.props.listeJoueurs.length % 4 == 0) {
      boutonActive = false
      boutonTitle = 'Commencer le tournoi'
    }
    return (
      <Button disabled={boutonActive} color='#32cd32' title={boutonTitle} onPress={() => this._commencer()}/>
    )
  }

  render() {
    return (
      <View style={styles.main_container} >
        <View style={styles.nbjoueur_container}>
          <Text style={styles.text_nbjoueur}>Il y a : {this._showNbJoueur()} joueur.se.s inscrit.e.s</Text>
        </View>
        <View style={styles.ajoutjoueur_container}>
          <View style={styles.textinput_ajoutjoueur_container}>
            <TextInput
              style={styles.textinput}
              placeholder="Nom du joueur"
              autoFocus={true}
              onChangeText={(text) => this._ajoutJoueurTextInputChanged(text)}
              onSubmitEditing={() => this._ajoutJoueur()}
              ref={this.addPlayerTextInput}
            />
          </View>
          <View style={styles.checkbox_ajoutjoueur_container}>
            <CheckBox
              onClick={()=>{
                this.setState({
                  isChecked:!this.state.isChecked
                })
              }}
              isChecked={this.state.isChecked}
              rightText={"Femme/Enfant"}
            />
          </View>
          <View style={styles.button_ajoutjoueur_container}>
            {this._ajoutJoueurBouton()}
          </View>
        </View>
        <View style={styles.flatList} >
          {this._displayListeJoueur()}
        </View>
        <View style={styles.buttonView}>
          <Button color='#32cd32' title='Options Tournoi' onPress={() => this._parametres()}/>
        </View>
        <View style={styles.buttonView}>
          {this._boutonCommencer()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  ajoutjoueur_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  textinput_ajoutjoueur_container: {
    flex: 1,
    marginLeft: 5
  },
  checkbox_ajoutjoueur_container: {
    flex: 1,
  },
  button_ajoutjoueur_container: {
    flex: 1,
    marginRight: 5
  },
  textinput: {
    height: 50,
    borderBottomWidth: 1,
    paddingLeft: 5,
  },
  buttonView: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  flatList: {
    flex: 1
  },
  nbjoueur_container: {
    alignItems: 'center',
    marginTop: 5
  },
  text_nbjoueur: {
    fontSize: 20,
  }
})

const mapStateToProps = (state) => {
  return {
    listeJoueurs: state.toggleJoueur.listeJoueurs
  }
}

export default connect(mapStateToProps)(Inscription)