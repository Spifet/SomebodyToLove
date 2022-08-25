import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePet, getPets } from "../../../actions/pet";
import useStyles from "../styles";

const DataGridOfPets = ({ handleOpenModal }) => {
  const { pets } = useSelector((state) => state.pets);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (pets.length > 0) {
      let newRows = pets.map((pet) => {
        return {
          id: pet._id,
          picture: pet.picture,
          type: pet.type,
          name: pet.name,
          adoptionStatus: pet.adoptionStatus,
          adoptionOwner: pet.adoptionOwner,
        };
      });
      setRows(newRows);
    } else {
      dispatch(getPets(""));
    }
  }, [pets.length]);

  const columns = [
    { field: "id", headerName: "Pet ID", sortable: false },
    {
      field: "picture",
      headerName: "Picture",
      sortable: false,
      renderCell: (params) => {
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        return <img src={thisRow.picture} alt="" height="50px" width="50px" />;
      },
    },
    { field: "name", headerName: "Name", flex: 0.1 },
    { field: "adoptionStatus", headerName: "Adoption Status", flex: 0.1 },
    { field: "adoptionOwner", headerName: "Owner", flex: 0.1 },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.2,
      renderCell: (params) => {
        const onClick = (e, status) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) =>
                (thisRow[c.field] = params.getValue(
                  params.id,
                  c.field === "petId" ? "id" : c.field
                ))
            );
          console.log(thisRow);
          if (status === "navigate") {
            navigate("/pet/" + thisRow.id);
          } else {
            dispatch(deletePet(thisRow.id));
          }
        };

        return (
          <>
            <Button onClick={(e) => onClick(e, "navigate")}>See pet</Button>
            <Button onClick={(e) => onClick(e, "delete")}>Delete</Button>
          </>
        );
      },
    },
  ];

  return (
    <div className={classes.petsAdminContainer}>
      <Typography variant="h2">All Pets</Typography>
      <Grid
        item
        md={12}
        style={{
          height: 650,
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: "10px",
        }}
      >
        {rows.length > 0 && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        )}
      </Grid>
      <Button variant="contained" onClick={handleOpenModal}>
        {" "}
        Add Pet
      </Button>
    </div>
  );
};

export default DataGridOfPets;
