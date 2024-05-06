import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import ResponsiveAppBar from "../comp/Appbar";
import RecipeReviewCard from "../comp/ItemCard";
import { useParams, useNavigate } from "react-router-dom";
export default function Search(props) {
  const [myData, setMyData] = useState();
  const query = useParams();
  console.log(query.query);
  const navigate = useNavigate();
  useEffect(() => {
    if (query === "") {
      navigate("/kitchen");
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "fetchList/",
      data: {
        search: query.query,
      },
    })
      .then(async function (response) {
        setMyData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [query.query]); //eslint-disable-line
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
      '
    </Box>
  );
}
