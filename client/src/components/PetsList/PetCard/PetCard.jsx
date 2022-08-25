import { Button, Card, Typography, CardContent } from "@mui/material";
import useStyles from "./styles";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../../images";

const PetCard = ({ pet }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToInfo = () => {
    navigate(`/pet/${pet._id}`);
  };

  return (
    <Card elevation={5} className={classes.card}>
      <img src={pet.picture || ""} className={classes.media} />

      <CardContent>
        <Typography variant="h4">{pet.name}</Typography>
        <Typography variant="h4">{pet.type}</Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h7">{`Status: ${pet.adoptionStatus}`}</Typography>
            <Typography variant="h7">{`Breed: ${pet.breed}`}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h7">{`Weight: ${pet.weight}`}</Typography>
            <Typography variant="h7">{`Height: ${pet.height}`}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h7">{`Hypoallergenic: ${pet.hypoallergenic}`}</Typography>
            <Typography variant="h7">{`Sex: ${pet.sex}`}</Typography>
          </div>
        </div>
        <div className={classes.petInfos}>{pet.bio}</div>
      </CardContent>
      <div
        size="large"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <Button variant="outlined" onClick={goToInfo}>
          View
        </Button>
      </div>
    </Card>
  );
};

export default PetCard;
