import React from "react";
import { Box, TextField } from "@mui/material";
import { CampaignInformation } from "../../interface";
import { useData } from "../../utils/DataContext";

const InformationPage = () => {
    const { information, setInformation, valueAction } = useData();

    // edit cell with namekey
    const handleChange =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setInformation((prev: CampaignInformation) => ({
                ...prev,
                [name]: event.target.value,
            }));
        };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
        >
            <TextField
                error={
                    (valueAction === "validate" &&
                        information.name?.length === 0) ??
                    false
                }
                value={information?.name}
                id="outlined-error"
                label="Tên chiến dịch"
                helperText={
                    valueAction === "validate" &&
                    information.name?.length === 0 &&
                    "Vui lòng nhập đủ thông tin!"
                }
                name="name"
                required
                onChange={handleChange("name")}
            />
            <TextField
                value={information?.describe}
                id="outlined-error-helper-text"
                label="Mô tả"
                name="describe"
                onChange={handleChange("describe")}
            />
        </Box>
    );
};

export default InformationPage;
