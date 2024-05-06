import authLogin from "../utils/AuthLogin";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function Login(props) {
  return (
    <Paper
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "#cc5577",
        backgroundImage: `url("https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Card
        style={{
          margin: "auto",
          top: "50%",
          left: "50%",
          width: "350px",
          height: "350px"
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#efd3d7",
          }}
        >
          <Typography variant="h5">LOGIN</Typography>
          <p
            style={{
              color: "red",
              fontSize: "12px",
            }}
          >
            {" "}
            {props.authenticated === false ? "Invalid Credentials" : ""}
          </p>
          <TextField
            label="Email Address"
            variant="standard"
            type={"email"}
            onChange={(e) => props.setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type={"password"}
            onChange={(e) => props.setPassword(e.target.value)}
          />
          <Button
            style={{ marginTop: "30px" }}
            variant="outlined"
            color="info"
            onClick={() => authLogin(props)}
          >
            Login
          </Button>
          <Typography variant="body2" style={{ marginTop: "65px", }}>
            Don't have an account?{" "}
            <Link
              to={"/register"}
              style={{
                textDecoration: "underline black",
                color: "#cbc0d3",
                fontWeight: "bold",
                fontSize: "15px",

              }}
            >
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
