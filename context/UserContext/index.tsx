import { fetchUser } from "@/services/student.service";
import { TCreateUser } from "@/types/api";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export type TOmitPasswordUser = Omit<TCreateUser, "password">;
interface ContextProps {
  user?: TOmitPasswordUser;
}
interface IProps {
  children: JSX.Element;
}

export const UserContext = createContext<ContextProps>({
  user: undefined,
});

const initialState: TOmitPasswordUser = {
  collegeId: "00",
  name: "unknown",
  sid: "000000000",
};
const UserContextProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<TOmitPasswordUser>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      if (data?.success) setUser(data.user);
      else return;
    };
    fetchData();
  }, []);
  console.log(user);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
