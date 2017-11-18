
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
    var div = document.getElementById("chat");
    div.innerHTML = "";
    if(json!=''){
        for(var msg in mensaje)
            {
                div.innerHTML+='<blockquote><h6>' + mensaje.sender + ':</h6>' + 
                mensaje.mensaje +'</blockquote>'
         
            }
    }
    
    
}
