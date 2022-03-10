const API_HOST = 'https://api.countapi.xyz';

const getKey = async (type: 'pageview' | 'sunflower', version: number = 0) => {
  const MODE = import.meta.env.MODE === 'development' ? 'dev' : 'prod';
  const key = `${location.pathname.replace(/\//g, '')}-${type}-${MODE}-v${version}`;
  if (!/^[A-Za-z0-9_\-.]{3,64}$/.test(key)) {
    throw new Error('[getKey]: Invalid Key');
  }
  await createKeyIfNotFound(key);
  return key;
}

const createKeyIfNotFound = async (key: string) => {
  const data = await fetch(`${API_HOST}/info/${location.hostname}/${key}`).then((res) => res.json());
  if (data.namespace === null) {
    // creating key
    const newKey = await fetch(`${API_HOST}/create?namespace=${location.hostname}&key=${key}&value=0&update_lowerbound=0&update_upperbound=50`)
      .then((res) => res.json())

    return newKey;
  }
}

export async function countPageVisit() {
  const key = await getKey('pageview');
  const data = await fetch(`${API_HOST}/hit/${location.hostname}/${key}`).then((res) => res.json());
  console.log(`Heloooo!! I am wondering why you opened this console 🤔, anyway here's some bonus information for you. You are the visitor number ${data.value}`);
}

export async function storeSunflowers(sunflowerCount) {
  const key = await getKey('sunflower');
  const data = await fetch(`${API_HOST}/update/${location.hostname}/${key}?amount=${sunflowerCount}`).then((res) => res.json());
  return data.value;
}

export async function getSunflowers(): Promise<number> {
  const key = await getKey('sunflower');
  const data = await fetch(`${API_HOST}/info/${location.hostname}/${key}`).then((res) => res.json());
  return data.value;
}

