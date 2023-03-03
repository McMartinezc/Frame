//Funció que pinta el color depenent de la valoració de la pelicula
export function getColorScore(vote){
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


   