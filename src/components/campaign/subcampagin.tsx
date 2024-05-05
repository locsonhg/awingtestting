import React, { useEffect, useState } from "react";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import { SubCampaign } from "../../interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./styled.css";
import TableAds from "./components/tableAds";
import { useData } from "../../utils/DataContext";

const SubCampaignPage = () => {
  const { valueActions } = useData();
  const [isSelect, setIsSelect] = useState<number>(0);
  const [listSubCampaign, setListSubCampaign] = useState<SubCampaign[]>([
    {
      name: "Chiến dịch con 1",
      status: true,
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
          id: 1,
        },
      ],
    },
  ]);

  useEffect(() => {
    setIsSelect(listSubCampaign.length - 1);
  }, [listSubCampaign.length]);

  // console.log({
  //   detail: listSubCampaign[isSelect],
  //   isSelect,
  // });

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
            id: 1,
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
          const totalQuantity = e.ads.reduce((acc, ad) => {
            const quantity = ad.quantity;
            return quantity;
          }, 0);

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
                      valueActions === "validate" && totalQuantity <= 0
                        ? "red"
                        : "#000",
                  }}
                >
                  {e.name}
                </Typography>
                <CheckCircleIcon color={e.status ? "success" : "disabled"} />
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
        />
        <Checkbox
          value={listSubCampaign[isSelect]?.status}
          aria-label="Đang hoạt động"
          defaultChecked
          onChange={handleChange("status")}
        />
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
