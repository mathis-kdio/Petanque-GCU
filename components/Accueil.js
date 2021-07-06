import React from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'
import { expo } from '../app.json'
import { connect } from 'react-redux'


class Accueil extends React.Component {
  _showMatchs() {
    this.props.navigation.navigate('InscriptionGeneral', {screen: 'ListeMatchsInscription',});  
  }

  _showInscription() {
    this.props.navigation.navigate('InscriptionGeneral');
  }

  _buttonShowMatchs() {
    if(this.props.listeMatchs && this.props.listeMatchs.length != 0) {
      return <Button title='Reprendre le tournoi' onPress={() => this._showMatchs()}/>
    }
    else {
      return <Button disabled title='Pas de tournoi en cours'/>
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.logo_container}>
          <Image style={styles.logo} source={require('../assets/icon.png')}/>
        </View>
        <View style={styles.body_container}>
          <View style={styles.menu_container}>
            <View style={styles.buttonView}>
              {this._buttonShowMatchs()}
            </View>
            <View style={styles.buttonView}>
              <Button title='Nouveau tournoi' onPress={() => this._showInscription()}/>
            </View>
            <View style={styles.buttonView}>
              <Button disabled title='Voir les anciens tournois' onPress={() => this._showInscription()}/>
            </View>
          </View>
          <View style={styles.informations_container}>
            <Text style={styles.informations_titre}>Informations</Text>
            <Text style={styles.informations_texte}>Mode de tournois disponible :</Text>
            <Text style={styles.informations_texte}>- mêlée-démélée</Text>
          </View>
        </View>
        <View style={styles.create_container}>
          <Text style={styles.create_text}>Par Mathis Cadio</Text>
          <Text style={styles.create_text}>Version: {expo.version}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  logo_container: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  body_container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menu_container : {

  },
  buttonView: {
    marginBottom: 20
  },
  informations_container: {
    alignItems: 'center',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  informations_titre: {
    fontSize: 27
  },
  informations_texte: {
    fontSize: 20,
    textAlign: "justify"
  },
  create_container: {
    alignItems: 'center',
    paddingBottom: 10
  },
  create_text: {
    fontSize: 15
  },
})

const mapStateToProps = (state) => {
  return {
    listeJoueurs: state.toggleJoueur.listeJoueurs,
    listeMatchs: state.gestionMatchs.listematchs
  }
}

export default connect(mapStateToProps)(Accueil)