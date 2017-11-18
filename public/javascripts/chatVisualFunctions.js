
function loadSignUp(visible){

    if (visible)
        document.getElementById("alertMessage").style.visibility = "visible";
    else{
        document.getElementById("alertMessage").style.display = "none";
        document.getElementById("alertMessage").style.visibility = 'hidden';
    }
        
}

function setSessionStorage(token, actualUser){
    window.sessionStorage.token = token;
    window.sessionStorage.actualUser = actualUser;
    //window.location.href="/chat/getLatest";
    // document.location.href=  "/JWT/" + password +"&&"+ content;
    console.log(window.sessionStorage);
    
}
function showMessages(json){
    var mensaje = JSON.parse(json);
    var table = document.getElementById("chat");
t
    table.innerHTML = "";

    for(var msg in mensaje)
    {
        table.appendChild('<blockquote><h6>' + msg.sender + ':</h6>' + 
        msg.message +'</blockquote>');
       
 
    }
    
}
