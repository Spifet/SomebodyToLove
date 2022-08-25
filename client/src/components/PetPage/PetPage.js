import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPet } from "../../actions/pet";
import { Button, Container, Modal, Paper } from "@mui/material";

import PetDetails from "./PetDetails/PetDetails";
import useStyles from "./styles";
import PetForm from "../PetForm/PetForm";
import { ROLE } from "../../constants/roles";
import ButtonAdoptionStatus from "./ButtonAdoptionStatus";

const PetPage = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.users);
  const { pet, isLoadingPet } = useSelector((state) => state.pets);
  const { idPokedex } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false);
  const [fostered, setFostered] = useState(false);

  useEffect(() => {
    dispatch(getPet(idPokedex));
  }, [owner, fostered, idPokedex, pet?._id]);

  useEffect(() => {
    if (!currentUser || !pet?._id) return;
    const { listOfPetsAdopted, listOfPetsFostered } = currentUser;
    if (!listOfPetsAdopted || !listOfPetsFostered) return;

    setOwner(listOfPetsAdopted.includes(pet._id));
    setFostered(listOfPetsFostered.includes(pet._id));
  }, [currentUser, pet?._id, pet?.adoptionStatus]);

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalStyle1}
      >
        <Paper className={classes.paperModal}>
          <PetForm pet={pet} setOpenModal={setOpenModal} />
        </Paper>
      </Modal>
      <Container>
        {!isLoadingPet && !pet && <h1> Pet not found !</h1>}
        {!isLoadingPet && pet && (
          <Paper elevation={6} className={classes.paper}>
            <div className={classes.topPage}>
              {currentUser ? (
                <div className={classes.topLeftPage}>
                  {currentUser?.role === ROLE.ADMIN ? (
                    <Button
                      sx={{ height: 50, marginTop: 2 }}
                      variant="contained"
                      onClick={handleOpenModal}
                    >
                      Edit Pet
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <PetDetails pet={pet} />
            {currentUser && (
              <ButtonAdoptionStatus
                currentUser={currentUser}
                pet={pet}
                owner={owner}
                fostered={fostered}
              />
            )}
          </Paper>
        )}
      </Container>
    </>
  );
};

export default PetPage;
