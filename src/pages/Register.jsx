import {
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Register(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  function ValidateEmail(mail) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(// eslint-disable-line
        mail
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }
  async function register() {
    if (user.username === "" || user.email === "" || user.password === "") {
      alert("Please fill all the fields");
      return;
    }
    if (ValidateEmail(user.email) === false) {
      return;
    }
    await axios({
      method: "post",
      url: process.env.REACT_APP_API + "register/",
      data: user,
    })
      .then(function (response) {
        if (response.status === 200) {
          alert("Registration Successful");
          navigate("/login");
        } else if (response.status === 400) {
          alert(response.data.message);
        } else {
          alert("Registration Failed");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Registration Failed");
      });
  }
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
          <Typography variant="h5">REGISTER</Typography>
          <p
            style={{
              color: "red",
              fontSize: "12px",
            }}
          ></p>
          <TextField
            label="Username"
            variant="standard"
            autoComplete="off"
            type={"username"}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            label="Email Address"
            variant="standard"
            autoComplete="off"
            type={"email"}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="Password"
            variant="standard"
            autoComplete="new-password"
            type={"password"}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            style={{ marginTop: "30px" }}
            variant="outlined"
            color="primary"
            onClick={() => register()}
          >
            Register
          </Button>
          <Typography variant="body2 " style={{ marginTop: "30px" }}>
            Already an User?{" "}
            <Link
              to={"/"}
              style={{
                textDecoration: "underline black",
                color: "#cbc0d3",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
