import React from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import MaterialTable from "material-table";

const ListClientsDialog = ({ handleClose, open, setHeader, header }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Lista de clientes</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <MaterialTable
              title="Selecciona uno"
              columns={[
                { title: "Name", field: "name" },
                { title: "Surname", field: "surname" },
                { title: "Birth Year", field: "birthYear", type: "numeric" },
              ]}
              data={[
                {
                  name: "Mehmet",
                  surname: "Baran",
                  birthYear: 1987,
                },
                {
                  name: "Zerya Betül",
                  surname: "Baran",
                  birthYear: 2017,
                },
              ]}
              onRowClick={(event, rowData) => {
                handleClose();
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListClientsDialog;
