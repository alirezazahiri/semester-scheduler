import { fetchUser } from "@/services/student.service";
import { TCreateUser } from "@/types/api";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export type TOmitPasswordUser = Omit<TCreateUser, "password">;
interface ContextProps {
  user?: TOmitPasswordUser & { token?: string };
  setUser: any;
}
interface IProps {
  children: JSX.Element;
  sid: string;
}

export const UserContext = createContext<ContextProps>({
  user: undefined,
  setUser: undefined,
});

const initialState: TOmitPasswordUser = {
  collegeId: "",
  name: "",
  sid: "",
  gender: "",
};
const UserContextProvider: React.FC<IProps> = ({ children, sid }) => {
  const [user, setUser] = useState<TOmitPasswordUser>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      if (data?.success) setUser(data.user);
      else return;
    };
    fetchData();
  }, [sid]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
