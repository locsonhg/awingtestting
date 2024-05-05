import React, { useState } from "react";
import "./App.css";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import InformationPage from "./components/information";
import { CampaignSubmit } from "./interface";
import { useData } from "./utils/DataContext";
import SubCampaignPage from "./components/campaign/subcampagin";

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
  const { valueActions, setValueActions, subCampains, information } = useData();
  const [keyTabs, sẹtKeyTabs] = useState(0);

  // console.log({
  //   valueActions,
  //   subCampains,
  //   information,
  // });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    sẹtKeyTabs(newValue);
  };

  const onSubmit = async () => {
    setValueActions("validate");
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
