export const ls = {
  setWsUrl: (url: string) => {
    set("url", url);
  },

  getWsUrl: (): string | null => {
    return get("url");
  },
};

// ---

function set(key: string, value: string): void {
  globalThis.localStorage.setItem(key, value); // JSON.stringify(value)
}
function get(key: string): string | null {
  const stored = globalThis.localStorage.getItem(key);
  if (stored == null) return null;
  return stored;
}
// function del(key: string): void {
//   globalThis.localStorage.removeItem(key);
// }
