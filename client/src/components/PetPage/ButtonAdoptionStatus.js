import { Button } from "@mui/material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { adoptPet, returnPet, savePet, unsavePet } from "../../actions/pet";
import { useEffect, useState } from "react";

const ButtonAdoptionStatus = ({ currentUser, pet, owner, fostered }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (currentUser.listOfPetsSaved.includes(pet._id)) setSaved(true);
  }, []);

  const handleAdopt = () => {
    dispatch(adoptPet(pet._id, "adopt", currentUser));
  };

  const handleFoster = () => {
    dispatch(adoptPet(pet._id, "foster", currentUser));
  };

  const handleReturnPet = () => {
    pet.adoptionStatus = "available";
    dispatch(returnPet(pet._id, currentUser));
  };

  const handleSavePet = () => {
    if (!saved) {
      dispatch(savePet(pet._id, currentUser));
      setSaved(true);
    } else {
      dispatch(unsavePet(pet._id, currentUser));
      setSaved(false);
    }
  };

  return (
    <div className={classes.actions}>
      {owner || fostered ? (
        <>
          {fostered && <Button onClick={handleAdopt}>Adopt</Button>}
          <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleReturnPet}
          >
            Return
          </Button>
        </>
      ) : pet.adoptionStatus === "available" ? (
        <>
          <Button variant="contained" onClick={handleFoster}>
            Foster
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleAdopt}
          >
            Adopt
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePet}
            sx={{ marginLeft: 1 }}
          >
            {saved ? "Unsave" : "Save"}
          </Button>
        </>
      ) : (
        <h1>Not available</h1>
      )}
    </div>
  );
};

export default ButtonAdoptionStatus;
