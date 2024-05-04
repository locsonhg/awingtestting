import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import { CampaignSubmit } from "../../../interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./styled.css";

type Typeprops = {
    campaign: CampaignSubmit;
    setCampaign: Dispatch<SetStateAction<CampaignSubmit>>;
};

const ListCampaign = ({ setCampaign, campaign }: Typeprops) => {
    const [isSelect, setIsSelect] = useState<number>(0);

    useEffect(() => {
        setIsSelect(campaign?.subCampaigns.length - 1);
    }, [campaign?.subCampaigns.length]);

    console.log({
        campaign,
        detail: campaign?.subCampaigns[isSelect],
        isSelect,
    });

    const handleAddSubCampaign = () => {
        setCampaign((pre: any) => ({
            ...pre,
            subCampaigns: [
                ...pre.subCampaigns,
                {
                    name: `Chiến dịch con ${pre.subCampaigns.length + 1}`,
                    status: true,
                    ads: [
                        {
                            name: "Quảng cáo 1",

                            quantity: 0,
                        },
                    ],
                },
            ],
        }));
    };
    const handleChange =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = event.target;
            setCampaign((prevCampaign: any) => ({
                ...prevCampaign,
                subCampaigns: prevCampaign.subCampaigns.map(
                    (subCampaign: any, index: number) => {
                        if (index === isSelect) {
                            return {
                                ...subCampaign,
                                [name]: name === "name" ? value : checked,
                            };
                        }
                        return subCampaign;
                    }
                ),
            }));
        };

    return (
        <div className="boxlist_campaign">
            <div className="list_campaign">
                <Button onClick={handleAddSubCampaign}>Thêm</Button>
                {campaign?.subCampaigns?.map((e, index) => {
                    return (
                        <div
                            className={
                                index === isSelect
                                    ? "box_campaignselect"
                                    : "box_campaign"
                            }
                            onClick={() => {
                                setIsSelect(index);
                            }}
                        >
                            <div className="boxcampaign_name">
                                <Typography
                                    className="campaign_name"
                                    sx={{ maxWidth: "200px" }}
                                    align={"center"}
                                >
                                    {e.name}
                                </Typography>
                                <CheckCircleIcon
                                    color={e.status ? "success" : "disabled"}
                                />
                            </div>
                            <span>
                                {campaign.subCampaigns.reduce(
                                    (acc, campaign) =>
                                        acc + campaign.ads[0].quantity,
                                    0
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="box_formcampaign">
                <TextField
                    label="Tên chiến dịch con"
                    required
                    value={campaign?.subCampaigns[isSelect]?.name}
                    name="name"
                    style={{
                        width: "70%",
                    }}
                    onChange={handleChange("name")}
                />
                <Checkbox
                    value={campaign?.subCampaigns[isSelect]?.status}
                    aria-label="Đang hoạt động"
                    defaultChecked
                    onChange={handleChange("status")}
                />
            </div>
        </div>
    );
};

export default ListCampaign;
