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

// //Funció random per mostrar aleatoria
// function getRandomShow (min,max){
//     return Math.floor(Math.random()*(max-min)) + min ;
// }

// console.log(getRandomShow(1, data.results.length));

