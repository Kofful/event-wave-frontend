import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const AuthorizedUserContext = createContext({
  authorizedUser: null,
  setAuthorizedUser: Function,
});

export const AuthorizedUserContextProvider = ({ children }) => {
  const storageUserJson = localStorage.getItem('authorizedUser');
  const storageUser = useMemo(() => {
    let parsedUserData = null;
    try {
      // TODO add verification whether the token is valid and not expired
      parsedUserData = JSON.parse(storageUserJson)
    } catch {
    }

    return parsedUserData;
  }, [storageUserJson])
  const [authorizedUser, setAuthorizedUser] = useState(storageUser);

  useEffect(() => {
    setAuthorizedUser(storageUser);
  }, [storageUser])

  const saveAuthorizedUser = useCallback((userData) => {
    localStorage.setItem('authorizedUser', JSON.stringify(userData));
    setAuthorizedUser(userData);
  }, []);

  return (
    <AuthorizedUserContext.Provider value={{ authorizedUser, setAuthorizedUser: saveAuthorizedUser }}>
      {children}
    </AuthorizedUserContext.Provider>
  )
};
