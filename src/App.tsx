import React, { useState } from "react";
import "./App.css";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import InformationPage from "./components/information";
import CampaignPage from "./components/campaign";
import { CampaignSubmit } from "./interface";

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
    const [keyTabs, sẹtKeyTabs] = useState(0);

    const [campaign, setCampaign] = useState<CampaignSubmit>({
        information: {
            name: "",
            describe: "",
        },
        subCampaigns: [
            {
                name: "Chiến dịch con 1",
                status: true,
                ads: [
                    {
                        name: "Quảng cáo 1",
                        quantity: 0,
                    },
                ],
            },
        ],
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        sẹtKeyTabs(newValue);
    };

    const onSubmit = async () => {};

    return (
        <div className="app">
            <div className="app-buttonsubmit">
                <Button onClick={onSubmit} variant="contained">
                    Submit
                </Button>
            </div>
            <div className="app-container">
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        padding: 0,
                    }}
                >
                    <Tabs
                        value={keyTabs}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Thông tin" {...a11yProps(0)} />
                        <Tab label="Chiến dịch con" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={keyTabs} index={0}>
                    <InformationPage form={campaign} setForm={setCampaign} />
                </CustomTabPanel>
                <CustomTabPanel value={keyTabs} index={1}>
                    <CampaignPage
                        campaign={campaign}
                        setCampaign={setCampaign}
                    />
                </CustomTabPanel>
            </div>
        </div>
    );
}

export default App;
