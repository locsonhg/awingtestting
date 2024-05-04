import React, { type Dispatch, SetStateAction } from "react";
import ListCampaign from "./components/listCampaign";
import TableAds from "./components/tableAds";
import { CampaignSubmit } from "../../interface";

type Typeprops = {
    campaign: CampaignSubmit;
    setCampaign: Dispatch<SetStateAction<CampaignSubmit>>;
};
const CampaignPage = ({ setCampaign, campaign }: Typeprops) => {
    return (
        <div>
            <ListCampaign campaign={campaign} setCampaign={setCampaign} />
            <TableAds />
        </div>
    );
};

export default CampaignPage;
