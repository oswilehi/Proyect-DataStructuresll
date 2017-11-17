$(document).ready(function(){
    /*$('#logIn').click(function(){
        event.preventDefault();

        sendInfoToServer('', 'post', '' , 'html' ,function(){
            var token = jwt.sign({ user: $('#username').val()}, password);
            window.sessionStorage.token = token;
            console.log(window.sessionStorage.token);
        });
        
    });*/
});

//https://teamtreehouse.com/community/using-ajax-post-to-send-data-to-nodejs-server
//https://stackoverflow.com/questions/8517071/send-json-data-via-post-ajax-and-receive-json-response-from-controller-mvc
function sendInfoToServer(routeInServer, typeOfRequest, data, dataType,  successFunction){
    $.ajax({
        url: 'http://localhost:3000/' + routeInServer,
        type: typeOfRequest,
        dataType: dataType,
        data: data,
        success: successFunction
    });
}