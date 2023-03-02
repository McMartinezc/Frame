<span style="color: gray" >
#Memòria tècnica: Aplicació web amb API TMDB>
</span>

En aquest projecte s'ha desenvolupat una aplicació web que utilitza l'API de TMDB per mostrar informació sobre pel·lícules i sèries. L'aplicació té diverses funcionalitats, com ara la visualització de les pel·lícules i sèries més populars en forma de targetes, la cerca de contingut específic, i una funció "Què veure?" que permet als usuaris obtenir una recomanació aleatòria de pel·lícula o sèrie.

##Tecnologies utilitzades
Per desenvolupar l'aplicació web s'han utilitzat les següents tecnologies:

**\*HTML i CSS** per a la estructura i estil de la pàgina web.

**\*JavaScript** per a la interacció dels usuaris i les crides a l'API de TMDB.

**\*L'API de TMDB** per obtenir informació sobre pel·lícules i sèries.
[API TMDB](https://www.themoviedb.org/documentation/api)

**Figma** per fer la composició del disseny de la web.
[Figma](https://www.figma.com/)

##Disseny
El disseny de l'aplicació s'ha desenvolupat amb l'eina Figma, on s'han realitzat diversos models de pàgines possibles i es van provar diferents paletes de colors i tipografies per als elements de la pàgina, com ara la barra de cerca, les targetes, els botons i el menú de navegació.

**Barra de cerca**
imagen --> ![Barra](carpeta/imagen.png).

**Targetes**
imagen --> ![Cards](carpeta/imagen.png).

**Botons**
imagen --> ![Botons](carpeta/imagen.png).

**Menú Navegació**
imagen --> ![Menú navegació](carpeta/imagen.png).

**Pàgina principal:**
imagen --> ![Índex](carpeta/imagen.png).

**Pàgina búsqueda:**
imagen --> ![Cerca](carpeta/imagen.png).

##Esquema de la web
Per tal de poder desenvolupar l'estructura i el contingut de la pàgina, s'ha creat un arbre de continguts amb l'eina Xmind, que mostra l'organització de les diferents seccions i subseccions de la pàgina.
**Arbre de la Web**
imagen --> ![Esquema web](carpeta/imagen.png).

#Funcionalitats
A continuació, es detallen les diferents funcionalitats que ofereix l'aplicació:

##Pàgina principal
La pàgina principal mostra les pel·lícules i sèries més populars del moment en forma de targetes, amb informació bàsica com el títol, la imatge de la portada, data i la puntuació. Al fer clic en una targeta es mostra a l'usuari una finestra modal, on es pot veure informació més detallada sobre la pel·lícula o sèrie seleccionada, com ara el títol, la imatge de la portada, la sinopsi i altres detalls rellevants.

###Implementació de codi
Per tal de poder fer la crida a l'API TMDB, es va crear un archiu anomenat `scripts/fecth.js`

En aquest arxiu es es troven dues funcions:

\*-La primera afegeix una propiedad _media_type_ a cada objecte, amb el valor de _movie_, si l'objecte té la propietat _titlte_, o _tv_ si té com a propietat _name_. Ens serveix per diferenciar si és una pel·lícula o una sèrie.

```js
async function fetchContent(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Agregar la propietat media_type per poder diferenciar si es movie o tv
    const results = data.results.map((result) => {
      if (result.media_type) {
        return result;
      } else if (result.title) {
        return { ...result, media_type: "movie" };
      } else if (result.name) {
        return { ...result, media_type: "tv" };
      } else {
        return result;
      }
    });
    return results;
  } catch (error) {
    console.error(error);
  }
}
```

\*-La segona funció, utilitza dos arguments _mediaType_ i _id_, per poder retornar l'objecte

```js
export async function fetchDetails(mediaType, id) {
  const API_KEY = "api_key=76ae581f1d594bc56d7dab63f40b4ed9";
  const API_BASE = "https://api.themoviedb.org/3";

  const url = `${API_BASE}/${mediaType}/${id}?${API_KEY}&language=ca`;
  const response = await fetch(url);
  const media = await response.json();
  return media;
}
```

Per tal de no repetir constanment blocs de codi com seria el cas de les targetes on és mostra la informació és van utilitzar _templates_. En el arxiu `templates.html`, hi han diversos templates creats per les diferents utilitzats empleades a la web, un exemple de codi utilitzat per les targetes:

```html
<!--Template Card-->
<template id="template-card">
  <article class="card movie">
    <img src="" alt="Cartell" class="poster" />
    <section class="movie-info">
      <div>
        <h3 class="card-title"></h3>
        <p>Data publicació</p>
      </div>
      <span class="puntuacio green"></span>
    </section>
  </article>
</template>
```

Els templates es renderitzen amb una serie de funcions creades al directori `scripts/render.js`, cadascuna d'elles s'encarreguen de crear i mostrar la informació.
En les funcions `createTemplateInfo`, `createTemplateCard` ,`createTemplateModalInfo` i `createTemplateLlista` s'utilitzent tant si és una pel·lícula o un série.

##Cerca
L'aplicació també permet als usuaris cercar pel·lícules o sèries específiques. L'usuari pot escriure el nom de la pel·lícula o sèrie a la barra de cerca i l'aplicació mostrarà les coincidències que es trobin a l'API de TMDB.

###Què veure?
L'aplicació té una funció "Què veure?" que permet als usuaris obtenir una pel·lícula o sèrie aleatori.
Aquesta funció es pot activar en fer clic sobre un dels dos botons disponibles a l'apartat "Què Veure?". Si es fa clic sobre el botó de pel·lícula, l'aplicació web retorna una pel·lícula aleatòria i mostra informació detallada sobre aquesta.

###Conclusió
L'aplicació web TMDB és una eina eficaç per mostrar informació sobre pel·lícules i sèries de televisió. Utilitzant l'API TMDB, l'aplicació web pot obtenir informació actualitzada sobre les pel·lícules i sèries. La cerca de pel·lícules o sèries i la secció "Veure?" proporcionen als usuaris una experiència d'usuari més interactiva i personalitzada. L'ús de tecnologies de programació web com HTML, CSS, JavaScript.
