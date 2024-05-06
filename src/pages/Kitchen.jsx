import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ResponsiveAppBar from "../comp/Appbar";
import RecipeReviewCard from "../comp/ItemCard";
export default function Kitchen(props) {
  const [myData, setMyData] = useState();
  useEffect(() => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "myrecipes/",
      data: {
        uid: props.uid,
      },
    })
      .then(async function (response) {
        setMyData(response.data.recipes);
        console.log(response.data.recipes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); //eslint-disable-line
  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#cc5577",
        backgroundImage: `url("https://vapa.vn/wp-content/uploads/2022/12/anh-phong-nen-dep-001.jpg")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ResponsiveAppBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {myData?.map((item, key) => (
          <RecipeReviewCard item={item} key={key} currentUid={props.uid._id} />
        ))}
      </div>
    </Box>
  );
}
