import React, { createContext, useContext, useId, useState } from "react";
import { CampaignInformation, SubCampaign } from "../interface";

interface DataContextProps {
    valueAction: string;
    setValueAction: (value: string) => void;
    listSubCampaign: SubCampaign[];
    setListSubCampaign: React.Dispatch<React.SetStateAction<SubCampaign[]>>;
    information: CampaignInformation;
    setInformation: React.Dispatch<React.SetStateAction<CampaignInformation>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const idads = useId();
    const [valueAction, setValueAction] = useState<string>("");
    const [listSubCampaign, setListSubCampaign] = useState<SubCampaign[]>([
        {
            name: "Chiến dịch con 1",
            status: true,
            ads: [
                {
                    name: "Quảng cáo 1",
                    quantity: 0,
                    id: idads,
                },
            ],
        },
    ]);
    const [information, setInformation] = useState<CampaignInformation>({
        name: "",
        describe: "",
    });

    return (
        <DataContext.Provider
            value={{
                valueAction,
                setValueAction,
                listSubCampaign,
                setListSubCampaign,
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
