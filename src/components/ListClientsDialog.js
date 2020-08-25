import React from "react";
import {Grid, Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import MaterialTable from "material-table";

const ListClientsDialog = ({
                               handleClose,
                               open,
                               setHeader,
                               header,
                               clients,
                           }) => {
    const rows = clients.map((o) => ({...o}));

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
                        <MaterialTable
                            title="Selecciona uno"
                            columns={[
                                {title: "Código", field: "codigo"},
                                {title: "Razón social", field: "razonSocial"},
                                {title: "RFC", field: "rfc"},
                                {title: "Moneda", field: "moneda"},
                            ]}
                            data={rows}
                            onRowClick={(event, rowData) => {
                                setHeader({
                                    ...header,
                                    client: {
                                        code: rowData.codigo,
                                        businessName: rowData.razonSocial,
                                        rfc: rowData.rfc,
                                        currency: rowData.moneda,
                                    },
                                });
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
