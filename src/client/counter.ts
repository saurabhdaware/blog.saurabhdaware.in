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

    console.log('Created new key ', {newKey}, {key});

    return newKey;
  }
}

export async function countPageVisit() {
  const key = await getKey('pageview');
  console.log({key});
  const data = await fetch(`${API_HOST}/hit/${location.hostname}/${key}`).then((res) => res.json());
  console.log({pageVisit: data.value});
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

