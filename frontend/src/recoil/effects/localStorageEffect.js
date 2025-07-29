export const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset || newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  }
};
