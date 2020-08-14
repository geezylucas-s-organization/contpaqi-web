import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FilterListIcon from "@material-ui/icons/FilterList";
import MaterialTable from "material-table";

const Documents = () => {
  const tableRef = createRef();
  const concepts = [
    {
      value: 5,
      label: "Facturas al Contado",
    },
    {
      value: 6,
      label: "Facturas Crédito",
    },
  ];
  const [concept, setConcept] = useState(5);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              Lista de documentos
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<NoteAddIcon />}
              component={Link}
              to="/documents/create"
            >
              Crear documento
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <MaterialTable
              title={
                <TextField
                  select
                  id="concept"
                  name="concept"
                  fullWidth
                  value={concept}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setConcept(event.target.value)}
                >
                  {concepts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
              tableRef={tableRef}
              columns={[
                { title: "Id", field: "id" },
                { title: "First Name", field: "first_name" },
                { title: "Last Name", field: "last_name" },
              ]}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let url = "https://reqres.in/api/users?";
                  url += "per_page=" + query.pageSize;
                  url += "&page=" + (query.page + 1);
                  fetch(url)
                    .then((response) => response.json())
                    .then((result) => {
                      resolve({
                        data: result.data,
                        page: result.page - 1,
                        totalCount: result.total,
                      });
                    });
                })
              }
              options={{
                actionsColumnIndex: -1,
              }}
              actions={[
                {
                  icon: "refresh",
                  tooltip: "Refrescar datos",
                  isFreeAction: true,
                  onClick: () =>
                    tableRef.current && tableRef.current.onQueryChange(),
                },
                {
                  icon: "picture_as_pdf",
                  tooltip: "PDF",
                  onClick: (event, rowData) =>
                    alert("You saved " + rowData.first_name),
                },
                {
                  icon: "code",
                  tooltip: "XML",
                  onClick: (event, rowData) =>
                    alert("You saved " + rowData.last_name),
                },
              ]}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Documents;
