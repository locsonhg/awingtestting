import React, { useState } from "react";
import { AdsType, SubCampaign } from "../../../interface";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useData } from "../../../utils/DataContext";

type TypeProps = {
  ads: AdsType[];
  setListSubCampaign: React.Dispatch<React.SetStateAction<SubCampaign[]>>;
  id: number;
};

const TableAds = ({ ads, setListSubCampaign, id }: TypeProps) => {
  const { valueActions } = useData();
  const [listIndexCheckbox, setListIndexCheckbox] = useState<string[]>([]);

  // add row ads
  const handleAddRow = () => {
    setListSubCampaign((prev: SubCampaign[]) =>
      prev.map((subCampaign: SubCampaign, index: number) => {
        if (index === id) {
          return {
            ...subCampaign,
            ads: [
              ...subCampaign.ads,
              {
                name: `Quảng cáo ${ads?.length + 1}`,
                quantity: 0,
                id: ads?.length + 1,
              },
            ],
          };
        }
        return subCampaign;
      })
    );
  };

  console.log({
    ads,
    listIndexCheckbox,
    valueActions,
  });

  // handle selectAll cellTable
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIndexes = ads.map((_, index) => String(index));
      setListIndexCheckbox(allIndexes);
      return;
    }
    setListIndexCheckbox([]);
  };

  // handle select cellTable
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    adId: number
  ) => {
    const { checked } = event.target;

    setListIndexCheckbox((prevListIndexCheckbox) => {
      if (checked) {
        return [...prevListIndexCheckbox, String(adId)];
      } else {
        return prevListIndexCheckbox.filter((id) => id !== String(adId));
      }
    });
  };

  const handleDeleteSingle = (adId: number) => {
    setListSubCampaign((prev: SubCampaign[]) =>
      prev.map((subCampaign: SubCampaign, index: number) => {
        if (index === id) {
          return {
            ...subCampaign,
            ads: subCampaign.ads.filter((ad) => ad.id !== adId),
          };
        }
        return subCampaign;
      })
    );
  };

  // handle delete cells
  const handleDeleteMultiple = () => {
    setListSubCampaign((prev: SubCampaign[]) =>
      prev.map((subCampaign: SubCampaign, index: number) => {
        if (index === id) {
          return {
            ...subCampaign,
            ads: subCampaign.ads.filter(
              (ad) => !listIndexCheckbox.includes(String(ad.id - 1))
            ),
          };
        }
        return subCampaign;
      })
    );
    setListIndexCheckbox([]);
  };

  // edit text field celltabel
  const handleEditCell =
    (idAd: number, name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setListSubCampaign((prev: SubCampaign[]) =>
        prev.map((subCampaign: SubCampaign, index: number) => {
          if (index === id) {
            return {
              ...subCampaign,
              ads: subCampaign.ads.map((ad: AdsType) => {
                if (ad.id === idAd) {
                  return {
                    ...ad,
                    [name]: name === "quantity" ? Number(newValue) : newValue,
                  };
                }
                return ad;
              }),
            };
          }
          return subCampaign;
        })
      );
    };

  return (
    <TableContainer>
      <div className="box_titletable">
        <span>DANH SÁCH QUẢNG CÁO</span>
        {listIndexCheckbox?.length ? (
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteMultiple}
          >
            Xoá nhiều
          </Button>
        ) : (
          ""
        )}
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  listIndexCheckbox?.length > 0 &&
                  listIndexCheckbox?.length < ads?.length
                }
                checked={
                  ads?.length > 0 && listIndexCheckbox?.length === ads?.length
                }
                onChange={handleSelectAll}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
            <TableCell align="left">Tên quảng cáo*</TableCell>
            <TableCell align="left">Số lượng*</TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
              >
                Thêm
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads.map((ad: AdsType) => (
            <TableRow
              key={ad.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={listIndexCheckbox.includes(String(ad.id - 1))}
                  onChange={(event) => handleCheckboxChange(event, ad.id - 1)}
                />
              </TableCell>
              <TableCell component="th" scope="ads" align="left">
                <TextField
                  name="name"
                  required
                  value={ad.name}
                  id="standard-basic"
                  variant="standard"
                  error={
                    (valueActions === "validate" && ad.name?.length === 0) ??
                    false
                  }
                  onChange={handleEditCell(ad.id, "name")}
                />
              </TableCell>
              <TableCell align="left">
                <TextField
                  name="quantity"
                  required
                  value={ad.quantity}
                  id="standard-basic"
                  variant="standard"
                  type="number"
                  error={
                    (valueActions === "validate" && ad.quantity <= 0) ?? false
                  }
                  onChange={handleEditCell(ad.id, "quantity")}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    handleDeleteSingle(ad.id);
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAds;
