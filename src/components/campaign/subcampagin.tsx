import React, { useEffect, useId, useState } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { SubCampaign } from "../../interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./styled.css";
import TableAds from "./components/tableAds";
import { useData } from "../../utils/DataContext";
import { ellipsisText } from "../../utils/ellipsisText";

const SubCampaignPage = () => {
    const idAds = useId();
    const { valueAction, listSubCampaign, setListSubCampaign } = useData();
    const [isSelect, setIsSelect] = useState<number>(0);

    useEffect(() => {
        setIsSelect(listSubCampaign.length - 1);
    }, [listSubCampaign.length]);

    //add subcampaign
    const handleAddSubCampaign = () => {
        setListSubCampaign((prevState: SubCampaign[]) => [
            ...prevState,
            {
                name: `Chiến dịch con ${prevState.length + 1}`,
                status: true,
                ads: [
                    {
                        name: "Quảng cáo 1",
                        quantity: 0,
                        id: idAds,
                    },
                ],
            },
        ]);
    };

    // edit subcampaign
    const handleChange =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = event.target;
            setListSubCampaign((prev: SubCampaign[]) =>
                prev.map((subCampaign: SubCampaign, index: number) => {
                    if (index === isSelect) {
                        return {
                            ...subCampaign,
                            [name]: name === "name" ? value : checked,
                        };
                    }
                    return subCampaign;
                })
            );
        };

    return (
        <div className="boxlist_campaign">
            <div className="list_campaign">
                <Button onClick={handleAddSubCampaign}>Thêm</Button>
                {listSubCampaign?.map((e, index) => {
                    return (
                        <CardSubCampagin
                            campaign={e}
                            isSelect={isSelect}
                            setIsSelect={setIsSelect}
                            index={index}
                        />
                    );
                })}
            </div>
            <div className="box_formcampaign">
                <TextField
                    label="Tên chiến dịch con"
                    required
                    value={listSubCampaign[isSelect]?.name}
                    name="name"
                    style={{
                        width: "70%",
                    }}
                    onChange={handleChange("name")}
                    error={
                        (valueAction === "validate" &&
                            listSubCampaign[isSelect]?.name?.length === 0) ??
                        false
                    }
                    helperText={
                        valueAction === "validate" &&
                        listSubCampaign[isSelect]?.name?.length === 0 &&
                        "Dữ liệu không hợp lệ!"
                    }
                />
                <div>
                    <Checkbox
                        value={listSubCampaign[isSelect]?.status}
                        aria-label="Đang hoạt động"
                        defaultChecked
                        onChange={handleChange("status")}
                    />
                    <span>Không hoạt động</span>
                </div>
            </div>
            <TableAds
                ads={listSubCampaign[isSelect]?.ads}
                setListSubCampaign={setListSubCampaign}
                id={isSelect}
            />
        </div>
    );
};

export default SubCampaignPage;

type TypePropsCardSubCampaign = {
    campaign: SubCampaign;
    isSelect: number;
    setIsSelect: React.Dispatch<React.SetStateAction<number>>;
    index: number;
};

const CardSubCampagin = ({
    campaign,
    isSelect,
    setIsSelect,
    index,
}: TypePropsCardSubCampaign) => {
    const { valueAction } = useData();
    const totalQuantity = campaign.ads.reduce((acc, ad) => {
        const quantity = ad.quantity + acc;
        return quantity;
    }, 0);

    const hasInvalidQuantity = campaign.ads.some((ad) => ad.quantity <= 0);

    return (
        <div
            className={
                index === isSelect ? "box_campaignselect" : "box_campaign"
            }
            onClick={() => {
                setIsSelect(index);
            }}
        >
            <div className="boxcampaign_name">
                <Typography
                    className="campaign_name"
                    sx={{
                        maxWidth: "200px",
                    }}
                    align={"center"}
                    style={{
                        color:
                            (valueAction === "validate" &&
                                hasInvalidQuantity) ||
                            campaign.ads?.length <= 0
                                ? "red"
                                : "#000",
                    }}
                >
                    {ellipsisText(campaign.name, 40)}
                    <CheckCircleIcon
                        style={{ verticalAlign: "text-bottom" }}
                        fontSize={"small"}
                        color={campaign.status ? "success" : "disabled"}
                    />
                </Typography>
            </div>
            <span
                style={{
                    fontSize: "20px",
                }}
            >
                {totalQuantity}
            </span>
        </div>
    );
};
