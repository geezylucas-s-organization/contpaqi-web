import React from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { TableGeneral } from ".";

const columns = [
  { id: "codigo", label: "Código" },
  { id: "razonSocial", label: "Razón social" },
  { id: "rfc", label: "RFC" },
];

const ListClientsDialog = ({
  handleClose,
  open,
  setHeader,
  header,
  clientsVendors,
}) => {
  const clickRow = (row) => {
    setHeader({
      ...header,
      client: {
        code: row.codigo,
        businessName: row.razonSocial,
        rfc: row.rfc,
        currency: row.moneda,
      },
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Lista de clientes</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <TableGeneral
              rows={clientsVendors}
              columns={columns}
              clickRow={clickRow}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListClientsDialog;
