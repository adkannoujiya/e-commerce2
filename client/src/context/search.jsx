import { useState, createContext, useEffect, useContext } from "react";

//1 step: call the createcontext and store in a constant like navigation
const SearchContex = createContext();

//2 step: make a arrow function which had two part first one contain all state and
// second part is return which we wrap children from provider
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContex.Provider value={[auth, setAuth]}>
      {children}
    </SearchContex.Provider>
  );
};

// makin own hook

const useSearch = () => useContext(SearchContex);

export { useSearch, SearchProvider };
