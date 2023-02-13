export async function fetchContent(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.results;

  } catch (error) {
    console.error(error);
  }
}
