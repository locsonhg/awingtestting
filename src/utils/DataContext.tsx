import React, { createContext, useContext, useState } from "react";
import { CampaignInformation, SubCampaign } from "../interface";

interface DataContextProps {
  valueActions: string;
  setValueActions: (value: string) => void;
  subCampains: SubCampaign[];
  setSubCampaigns: (data: SubCampaign[]) => void;
  information: CampaignInformation;
  setInformation: (data: CampaignInformation) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [valueActions, setValueActions] = useState<string>("");
  const [subCampains, setSubCampaigns] = useState<SubCampaign[]>([]);
  const [information, setInformation] = useState<CampaignInformation>({
    name: "",
    describe: "",
  });

  return (
    <DataContext.Provider
      value={{
        valueActions,
        setValueActions,
        subCampains,
        setSubCampaigns,
        information,
        setInformation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
