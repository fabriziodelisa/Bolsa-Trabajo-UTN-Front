import React, { useState } from "react";

const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [jwt, setJwt] = useState(() => window.sessionStorage.getItem('jwt'));
  const [role, setRole] = useState(() => window.sessionStorage.getItem('role'));
  const [active, setActive] = useState(() => window.sessionStorage.getItem('active'));

  return (
    <UserContext.Provider value={{ jwt, setJwt, role, setRole, active, setActive }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
