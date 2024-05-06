import React, { useId, useState } from "react";
import "./App.css";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import InformationPage from "./components/information";
import { useData } from "./utils/DataContext";
import SubCampaignPage from "./components/campaign/subcampagin";
import { SubCampaign } from "./interface";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function App() {
    const {
        setValueAction,
        listSubCampaign,
        information,
        setInformation,
        setListSubCampaign,
    } = useData();
    const idAds = useId();
    const [keyTabs, sẹtKeyTabs] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        sẹtKeyTabs(newValue);
    };

    const handleCheckValueSubcampaigns = (campaigns: SubCampaign[]) => {
        let checked = false;
        campaigns.forEach((campagin) => {
            if (campagin.name === "") {
                checked = true;
            }
            if (campagin.ads.some((ad) => ad.quantity <= 0)) {
                checked = true;
            }
        });

        return checked;
    };

    const handleResetCampaign = () => {
        setValueAction("unValidate");
        setInformation({
            name: "",
            describe: "",
        });
        setListSubCampaign([
            {
                name: "Chiến dịch con 1",
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

    const onSubmit = async () => {
        const CampaginsAction = listSubCampaign.filter(
            (campagin) => campagin.status
        );
        if (
            information?.name === "" ||
            handleCheckValueSubcampaigns(CampaginsAction)
        ) {
            alert("Vui lòng xem lại thông tin!");
            setValueAction("validate");
            return;
        }
        const campaignSuccess = {
            information,
            listSubCampaign,
        };
        alert(`Thêm chiến dịch thành công! ${JSON.stringify(campaignSuccess)}`);
        handleResetCampaign();
    };

    return (
        <div className="app">
            <div className="app-buttonsubmit">
                <Button onClick={onSubmit} variant="contained">
                    Submit
                </Button>
            </div>
            <div className="app-container">
                <Box>
                    <Tabs value={keyTabs} onChange={handleChange}>
                        <Tab label="Thông tin" {...a11yProps(0)} />
                        <Tab label="Chiến dịch con" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={keyTabs} index={0}>
                    <InformationPage />
                </CustomTabPanel>
                <CustomTabPanel value={keyTabs} index={1}>
                    <SubCampaignPage />
                </CustomTabPanel>
            </div>
        </div>
    );
}

export default App;
