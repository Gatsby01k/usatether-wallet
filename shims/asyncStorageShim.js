// shims/asyncStorageShim.js
const hasWindow = typeof window !== 'undefined';
const ls = hasWindow && window.localStorage ? window.localStorage : null;

const AsyncStorage = {
  getItem: async (key) => {
    try {
      if (!ls) return null;
      const v = ls.getItem(key);
      return v === null ? null : v;
    } catch {
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      if (!ls) return;
      ls.setItem(key, value);
    } catch {}
  },
  removeItem: async (key) => {
    try {
      if (!ls) return;
      ls.removeItem(key);
    } catch {}
  },
  // совместимость
  clear: async () => {
    try {
      if (!ls) return;
      ls.clear();
    } catch {}
  },
};

module.exports = AsyncStorage;
module.exports.default = AsyncStorage;
