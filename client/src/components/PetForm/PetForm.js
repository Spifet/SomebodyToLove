import { Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { listsOfAdoptionStatus } from "../../constants/listsOfSearch";
import { useDispatch, useSelector } from "react-redux";
import { addPet, editPet, getPets } from "../../actions/pet";
import TypesSelect from "../Helpers/TypesSelect";
import useStyles from "./styles";

import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const initialState = {
  type: "",
  name: "",
  sex: "",
  adoptionStatus: "",
  hypoallergenic: "",
  dietryRestrictions: "",
  breed: "",
  color: "",
  picture: undefined,
  age: "",
  height: 0,
  weight: 0,
  bio: "",
};

const PetForm = ({ pet, setOpenModal }) => {
  const isNewPet = pet ? false : true;

  const [type, setType] = useState("");
  const [sex, setSex] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [formData, setFormData] = useState(() => {
    return pet ? pet : initialState;
  });
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.pets);

  const classes = useStyles();
  useEffect(() => {
    if (isNewPet) {
      dispatch(getPets());
      if (!pets || pets.length === 0) return;
    }
  }, [pets.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewPet) {
      dispatch(addPet(formData));
    } else {
      dispatch(editPet(formData));
    }
    setOpenModal(false);
  };

  const [previewSource, setPreviewSource] = useState("");

  const handleCapture = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setFormData((form) => ({ ...form, picture: reader.result }));
      setPreviewSource(reader.result);
    };
  };

  return (
    <form
      className={classes.form}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value);
              setFormData({ ...formData, type: e.target.value });
            }}
          >
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Sex</InputLabel>
          <Select
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={sex}
            label="Sex"
            onChange={(e) => {
              setSex(e.target.value);
              setFormData({ ...formData, sex: e.target.value });
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Hypoallergenic
          </InputLabel>
          <Select
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={hypoallergenic}
            label="hypoallergenic"
            onChange={(e) => {
              setHypoallergenic(e.target.value);
              setFormData({ ...formData, hypoallergenic: e.target.value });
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.inputForm}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          variant="filled"
        />
      </div>
      <div
        className={classes.inputForm}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextField
          label="Breed"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          fullWidth
          style={{ marginRight: "5px" }}
          variant="filled"
        />
        <TextField
          label="Dietry Restrictions"
          value={formData.dietryRestrictions}
          onChange={(e) =>
            setFormData({ ...formData, dietryRestrictions: e.target.value })
          }
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <TextField
          label="Color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <TextField
          label="Age (years)"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <TextField
          select
          label="Adoption Status"
          value={formData.adoptionStatus}
          variant="filled"
          onChange={(e) =>
            setFormData({ ...formData, adoptionStatus: e.target.value })
          }
          fullWidth
        >
          {listsOfAdoptionStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={classes.inputForm}>
        <TextField
          name="weight"
          label="Weight"
          type="number"
          value={formData.weight}
          onChange={(e) =>
            setFormData({
              ...formData,
              weight: e.target.value.replace(/^00+/, "0"),
            })
          }
          onBlur={(e) => setFormData({ ...formData, weight: +formData.weight })}
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <TextField
          name="height"
          label="Height"
          type="number"
          value={formData.height}
          onChange={(e) =>
            setFormData({
              ...formData,
              height: e.target.value.replace(/^00+/, "0"),
            })
          }
          onBlur={(e) => setFormData({ ...formData, height: +formData.height })}
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <TextField
          name="bio"
          label="Bio"
          minRows={3}
          type="text"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          fullWidth
          variant="filled"
        />
      </div>
      <div className={classes.inputForm}>
        <input type="file" name="picture" onChange={handleCapture} />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </div>

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PetForm;
