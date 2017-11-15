function loadSignUp(visible){

    if (visible)
        document.getElementById("alertMessage").style.visibility = "visible";
    else{
        document.getElementById("alertMessage").style.display = "none";
        document.getElementById("alertMessage").style.visibility = 'hidden';
    }
        
}