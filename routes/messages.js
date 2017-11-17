/**Manipular los mensajes en nuestra base de datos.
 * Tiene dos métodos principales: addMessage() para agregar a la
 * base de datos y getLatest() y obtener los últimos 
 * mensajes registrados.
 */
function Messages(){
    //Schema
    var message = require('../schemas/messageSchema');

    this.getLatest = function(limit, callback){
        var options = {
            'sort':[['date','desc']],
            'limit':limit
        }
        message.find(function(err,msgData){
            if(err) return callback(err,null);
            return callback(null, msgData);

        });
    }
}
module.exports.message = message;