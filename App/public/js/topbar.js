let dropDownMade = false;
function userActions() {
    let userActionHolder = document.getElementById("user-actions");
    if (!dropDownMade){
        dropDownMade = true;
        userActionHolder.style.display = "none";
        userActionHolder.style.width = document.getElementById("user-action-holder").getBoundingClientRect().width + "px"
    }else{
        dropDownMade = false;
        userActionHolder.style.display = "block";
    }
}