async function fetchResource(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch {
    throw new Error("");
  }
}
