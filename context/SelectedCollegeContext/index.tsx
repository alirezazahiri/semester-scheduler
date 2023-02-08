import React, { createContext, useState } from "react";

interface ContextProps {
  selectedCollege: string;
  setSelectedCollege: (college?: string) => void;
}
interface IProps {
  children: JSX.Element;
}

export const SelectedCollegeContext = createContext<ContextProps>({
  selectedCollege: "",
  setSelectedCollege: () => {},
});

const SelectedCollegeContextProvider: React.FC<IProps> = ({ children }) => {
  const [selectedCollege, setSelectedCollege] = useState<string>("11");

  const setCollege_ = (college: string = "") => {
    setSelectedCollege(college);
  };

  return (
    <SelectedCollegeContext.Provider
      value={{ selectedCollege, setSelectedCollege: setCollege_ }}
    >
      {children}
    </SelectedCollegeContext.Provider>
  );
};

export default SelectedCollegeContextProvider;
