import React from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import MaterialTable from "material-table";

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
            <MaterialTable
              title="Selecciona uno"
              columns={[
                { title: "Name", field: "name" },
                { title: "Surname", field: "surname" },
              ]}
              data={[
                {
                  name: "Mehmet",
                  surname: "Baran",
                },
                {
                  name: "Zerya Betül",
                  surname: "Baran",
                },
              ]}
              onRowClick={(event, rowData) => alert(rowData.name)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListProductsDialog;
