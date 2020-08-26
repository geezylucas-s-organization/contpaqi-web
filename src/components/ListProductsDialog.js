import React from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { TableGeneral } from ".";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population) {
  return { name, code, population };
}

const rows = [
  createData("India", "IN", 1324171354),
  createData("China", "CN", 1403500365),
  createData("Italy", "IT", 60483973),
  createData("United States", "US", 327167434),
  createData("Canada", "CA", 37602103),
  createData("Australia", "AU", 25475400),
  createData("Germany", "DE", 83019200),
  createData("Ireland", "IE", 4857000),
  createData("Mexico", "MX", 126577691),
  createData("Japan", "JP", 126317000),
  createData("France", "FR", 67022000),
  createData("United Kingdom", "GB", 67545757),
  createData("Russia", "RU", 146793744),
  createData("Nigeria", "NG", 200962417),
  createData("Brazil", "BR", 210147125),
];

const ListProductsDialog = ({ handleClose, open }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        Lista de productos o servicios
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <TableGeneral rows={rows} columns={columns} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListProductsDialog;
