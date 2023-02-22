export async function fetchContent(url) {
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
