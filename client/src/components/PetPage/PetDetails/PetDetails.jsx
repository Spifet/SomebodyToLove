import { Typography } from "@mui/material";
import useStyles from "../styles";
import TextAttribute from "../../Helpers/TextAttribute";

const PetDetails = ({ pet }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.containerPetDetails}>
        <div className={classes.picture}>
          <img src={pet.picture || ""} alt="" width={300} height={300} />
        </div>
        <div className={classes.description}>
          <Typography variant="h3">{pet.name}</Typography>
          <div className={classes.divider} />
          <TextAttribute
            attribute={"Type"}
            value={pet.type}
            // value={typeIcons(pet, "type")}
          />
          <TextAttribute
            attribute={"AdoptionStatus"}
            value={pet["adoptionStatus"]}
          />
          <TextAttribute
            attribute={"Dietry Restrictions"}
            value={pet["dietryRestrictions"]}
          />
          <TextAttribute attribute={"Breed"} value={pet["breed"]} />
          <TextAttribute attribute={"Sex"} value={pet["sex"]} />
          <TextAttribute attribute={"Height"} value={pet["height"] + "cm"} />
          <TextAttribute attribute={"Weight"} value={pet["weight"] + "kg"} />
          <TextAttribute
            attribute={"Hypoallergenic"}
            value={pet["hypoallergenic"]}
          />
        </div>
      </div>
      <div className={classes.bio}>
        <Typography variant="h3">Description:</Typography>
        <Typography variant="body">{pet.bio}</Typography>
      </div>
    </>
  );
};

export default PetDetails;
