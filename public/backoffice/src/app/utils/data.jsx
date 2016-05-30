var Parse = require('parse')
var ParseReact = require('parse-react')
import { _PARSE_APP_KEY, _PARSE_SERVER_URL } from '../constants/config'

export const getClientsCurrentHuissier = () => {
  let _clients = []
  Parse.initialize( _PARSE_APP_KEY )
  Parse.serverURL = _PARSE_SERVER_URL;

  var clientObjet = Parse.Object.extend(Parse.User);
  var query = new Parse.Query(clientObjet);

  query.find({
  success: function(results) {
    console.log("results ===")
    console.log(results)
    console.log("resutls ===")
    _clients = results
   },
   error: function( error ) {
     console.log("Erreur: Erreur lors de la récupération des clients pour l'huissier courant")
   }
 }).then( (_clients) => {
   return _clients
 });
}
