export function genId(len?: number): string {
  if (typeof len !== "number") len = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function sleep(ms: number) {
  const MAX_SLEEP = 20_000;
  if (typeof ms !== "number") ms = 500;
  return new Promise((res, rej) => {
    setTimeout(res, ms); 
    setTimeout(rej, MAX_SLEEP)
  })
}

