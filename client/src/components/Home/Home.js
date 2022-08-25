import { Container, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Home = () => {
  const styles = useStyles();
  const { currentUser } = useSelector((state) => state.users);

  return (
    <Container className={styles.container}>
      {currentUser && <h1>Hello {currentUser.firstName}</h1>}
      <Paper className={styles.paper}>
        <p className={styles.text}>
          SomebodyToLove is the place where people find their best friend. <br />
          Search through our beautiful animals and register to start the adoption process.
        </p>
      </Paper>
    </Container>
  );
};

export default Home;
