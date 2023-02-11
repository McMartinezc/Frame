//Funció que pinta el color la valoració de la pelicula
function getColor(vote){
    let color;
    if(vote>=8){
        color="green";
    }else if(vote>=5){
        color="orange";
    }else{
        color="red";
    }
    return color;
}