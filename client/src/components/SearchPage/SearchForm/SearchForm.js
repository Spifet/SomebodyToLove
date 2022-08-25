import { Paper, Typography, MenuItem, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import MinMaxInput from "./MinMaxInput";
import { useDispatch } from "react-redux";
import { getPetsWithForm } from "../../../actions/pet";
import TypesSelect from "../../Helpers/TypesSelect";
import { listsOfAdoptionStatus } from "../../../constants/listsOfSearch";
import useStyles from "./styles";

const initialState = {
  type: [],
  adoptionStatus: "",
  minHeight: "",
  maxHeight: "",
  minWeight: "",
  maxWeight: "",
  name: "",
};

const SearchForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(true);
  const [query, setQuery] = useState("");

  const [searchForm, setSearchForm] = useState(initialState);

  const clearForm = () => {
    setSearchForm(initialState);
  };

  useEffect(() => {
    const queryString = Object.keys(searchForm)
      .filter((key) => searchForm[key] !== "" && searchForm[key]?.length > 0)
      .map((key) => key + "=" + searchForm[key])
      .join("&");
    console.log(query);
    setQuery(queryString);

    for (const key of Object.keys(searchForm)) {
      if (key === "type") {
        if (searchForm[key].length > 0) {
          setIsSearchFormEmpty(false);
          return;
        }
      } else if (searchForm[key] !== "") {
        setIsSearchFormEmpty(false);
        return;
      }
    }
    setIsSearchFormEmpty(true);
  }, [searchForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getPetsWithForm(query));
  };

  return (
    <Paper
      elevation={6}
      style={{ width: "500px", margin: "auto", padding: "10px" }}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <div className={classes.title}>
          <Typography variant="h4">Search a pet</Typography>
        </div>

        <div className={classes.clearButton}>
          <Button variant="contained" color="secondary" onClick={clearForm}>
            {" "}
            Clear{" "}
          </Button>
        </div>

        <TypesSelect
          attribute="type"
          name="Type"
          formData={searchForm}
          setFormData={setSearchForm}
        />

        <TextField
          label="Name"
          value={searchForm.name}
          onChange={(e) =>
            setSearchForm({ ...searchForm, name: e.target.value })
          }
          fullWidth
          variant="outlined"
          InputProps={{ className: classes.inputRow }}
        />
        <TextField
          select
          label="Adoption Status"
          value={searchForm.adoptionStatus}
          variant="outlined"
          onChange={(e) =>
            setSearchForm({ ...searchForm, adoptionStatus: e.target.value })
          }
          fullWidth
          InputProps={{ className: classes.inputRow }}
        >
          {listsOfAdoptionStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <MinMaxInput
          minKey={"minWeight"}
          maxKey={"maxWeight"}
          unit="kg"
          setSearchForm={setSearchForm}
          searchForm={searchForm}
        />
        <MinMaxInput
          minKey={"minHeight"}
          maxKey={"maxHeight"}
          type="height"
          unit="cm"
          setSearchForm={setSearchForm}
          searchForm={searchForm}
        />

        <div className={classes.submitButton}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSearchFormEmpty}
          >
            Search pet
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default SearchForm;
