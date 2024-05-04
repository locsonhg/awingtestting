import React, { type Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";
import { CampaignSubmit } from "../../interface";

export type Typeprops = {
    form: CampaignSubmit;
    setForm: Dispatch<SetStateAction<CampaignSubmit>>;
};
const InformationPage = ({ form, setForm }: Typeprops) => {
    const handleChange =
        (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev: CampaignSubmit) => ({
                ...prev,
                information: {
                    ...prev.information,
                    [name]: event.target.value,
                },
            }));
        };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    error={form?.information?.name?.length === 0 ?? false}
                    id="outlined-error"
                    label="Tên chiến dịch"
                    helperText={
                        form?.information?.name?.length === 0 &&
                        "Vui lòng nhập đủ thông tin!"
                    }
                    name="name"
                    required
                    onChange={handleChange("name")}
                />
                <TextField
                    id="outlined-error-helper-text"
                    label="Mô tả"
                    name="describe"
                    onChange={handleChange("describe")}
                />
            </div>
        </Box>
    );
};

export default InformationPage;
