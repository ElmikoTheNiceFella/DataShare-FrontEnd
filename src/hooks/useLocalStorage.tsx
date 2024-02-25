function useLocalStorage() {
  const getItem = (key: string) => {
    return localStorage.getItem(key);
  }
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const deleteItem = (key: string) => {
    localStorage.removeItem(key);
  }
  return { getItem, setItem, deleteItem }
}

export type LocalStorage = ReturnType<typeof useLocalStorage>

export default useLocalStorage