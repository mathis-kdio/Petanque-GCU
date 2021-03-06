import React from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'

class MatchDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      match: undefined,
      score1: undefined,
      score2: undefined
    }
  }

  _ajoutScoreTextInputChanged = (score, equipe) => {
    if(equipe === 1) {
      this.setState({
        score1: score
      })
    }
    else if(equipe === 2) {
      this.setState({
        score2: score
      })
    }
  } 

  componentDidMount() {
    var idMatch = this.props.route.params.idMatch;
    this.setState({
      match: idMatch,
    })
  }

  _displayName = (joueurNumber) => {
    let listeJoueurs = this.props.listeMatchs[this.props.listeMatchs.length - 1].listeJoueurs
    let joueur = listeJoueurs.find(item => item.id === joueurNumber)
    if (joueur) {
      return <Text key={joueur.id} style={styles.joueurName}>{joueur.id+1} {joueur.name}</Text>
    }
  }

  _displayEquipe(equipe, match) {
    let nomsJoueurs = []
    for (let i = 0; i < 3; i++) {
      nomsJoueurs.push(this._displayName(match.equipe[equipe - 1][i], equipe))
    }
    return nomsJoueurs
  }

  _envoyerResultat() {
    if (this.state.score1 && this.state.score2) {
      let info = {idMatch: this.state.match, score1: this.state.score1, score2: this.state.score2};
      const actionAjoutScore = { type: "AJOUT_SCORE", value: info};
      this.props.dispatch(actionAjoutScore);
      const actionUpdateTournoi = { type: "UPDATE_TOURNOI", value: {tournoi: this.props.listeMatchs, tournoiId: this.props.listeMatchs[this.props.listeMatchs.length - 1].tournoiID}};
      this.props.dispatch(actionUpdateTournoi);
      this.props.navigation.navigate('ListeMatchsStack');
    }
  }

  _supprimerResultat() {
    let info = {idMatch: this.state.match, score1: undefined, score2: undefined};
    const actionAjoutScore = { type: "AJOUT_SCORE", value: info};
    this.props.dispatch(actionAjoutScore);
    const actionUpdateTournoi = { type: "UPDATE_TOURNOI", value: {tournoi: this.props.listeMatchs, tournoiId: this.props.listeMatchs[this.props.listeMatchs.length - 1].tournoiID}};
    this.props.dispatch(actionUpdateTournoi);
    this.props.navigation.navigate('ListeMatchsStack');
  }

  _boutonValider() {
    let boutonActive = true
    if (this.state.score1 && this.state.score2) {
      boutonActive = false
    }
    return (
      <Button disabled={boutonActive} color="green" title='Valider le score' onPress={() => this._envoyerResultat()}/>
    )
  }

  render() {
    let match = this.props.route.params.match
    return (
      <View style={styles.main_container}>
        <View style={styles.body_container}>
          <View style={styles.content_container} >
            <View>
              <Text style={styles.title}>Partie n??{(this.state.match + 1)}</Text>
            </View>
            <View style={styles.equipe_container}>
              <View style={styles.equipe1}>
                {this._displayEquipe(1, match)}
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.equipe2}>
                {this._displayEquipe(2, match)}
              </View>
            </View>
          </View>
          <View style={styles.resultat_container} >
            <TextInput
              style={styles.textinput}
              placeholderTextColor='white'
              underlineColorAndroid='white'
              keyboardType={'decimal-pad'}
              maxLength={2}
              autoFocus = {true}
              returnKeyType= {'next'}
              placeholder="score ??quipe 1"
              onChangeText={(text) => this._ajoutScoreTextInputChanged(text, 1)}
              onSubmitEditing={() => this.secondInput.focus()}
            />
            <TextInput
              style={styles.textinput}
              placeholderTextColor='white'
              underlineColorAndroid='white'
              keyboardType={'decimal-pad'}
              maxLength={2}
              ref={ref => {this.secondInput = ref}}
              placeholder="score ??quipe 2"
              onChangeText={(text) => this._ajoutScoreTextInputChanged(text, 2)}
              onSubmitEditing={() => this._envoyerResultat()}
            />
          </View>
          <View style={styles.buttonView}>
            <Button color="red" title='Supprimer le score' onPress={() => this._supprimerResultat()}/>
          </View>
          <View style={styles.buttonView}>
            {this._boutonValider()}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#0594ae",
  },
  body_container: {
    flex: 1,
    marginHorizontal: '5%'
  },
  content_container: {
    margin: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  equipe_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  equipe1: {
    marginLeft: 10
  },  
  equipe2: {
    alignItems: 'flex-end',
    marginRight: 10
  },
  joueurName: {
    fontSize: 15,
    color: 'white'
  },
  vs_container: {
    justifyContent: 'center'
  },
  vs: {
    fontSize: 20,
    color: 'white'
  },
  resultat_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonView: {
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  textinput: {
    height: 50,
    paddingLeft: 5,
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    listeMatchs: state.gestionMatchs.listematchs,
    listeTournois: state.listeTournois.listeTournois
  }
}

export default connect(mapStateToProps)(MatchDetail)