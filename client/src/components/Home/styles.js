import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
  },

  text: {
    color: "black",
    weight: "bolder",
    fontSize: "1.5rem",
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: "lightblue",
    textAlign: "center",
    width: "100%",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },

  welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));
