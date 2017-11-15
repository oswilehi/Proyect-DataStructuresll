$(document).ready(function(){
    $('#signUp').click(function(){
        event.preventDefault();

        
    });
});

//https://teamtreehouse.com/community/using-ajax-post-to-send-data-to-nodejs-server
//https://stackoverflow.com/questions/8517071/send-json-data-via-post-ajax-and-receive-json-response-from-controller-mvc
function sendInfoToServer(routeInServer, typeOfRequest, data, successFunction){
    $.ajax({
        url: 'http://localhost:3000/' + routeInServer,
        type: typeOfRequest,
        dataType: 'json',
        data: data,
        success: successFunction
    });
}