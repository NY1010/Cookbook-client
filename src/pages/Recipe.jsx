import { Box, Chip, Paper, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../comp/Appbar";
import axios from "axios";
export default function Recipe(props) {
  const { id } = useParams();
  const [data, setData] = useState();
  const [imgs, setImgs] = useState([]);//eslint-disable-line
  useEffect(() => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "recipe/",
      data: {
        id,
      },
    })
      .then((res) => {
        setData(res.data.recipe);
        console.log(props.uid._id)
        console.log(res.data.recipe.userId)
        res.data?.recipe.images.map((img) => {//eslint-disable-line
          let cld = new Cloudinary({
            cloud: {
              cloudName: "dcwy8miit",
            },
          });
          console.log(cld.image(img.cloudinary_id).toURL());
          imgs.push(cld.image(img.cloudinary_id).toURL());
        });
        // console.log(imgs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);//eslint-disable-line
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
      <Paper sx={{ m: 1, p: 1 }}>
        <Typography variant="h4" component="h3">
          {data?.name}
        </Typography>
        <Typography>{new Date(data?.createdAt).toDateString()}</Typography>
      </Paper>
      <Paper sx={{ m: 1, p: 1 }}>
        <Typography variant="body1" component="h3" color="text.secondary">
          {data?.description}
        </Typography>
      </Paper>
      <Paper sx={{ m: 1, p: 1, display: 'flex', backgroundColor: '#ffffff00', justifyContent: 'space-around', flexWrap: "wrap" }}>
        {imgs?.map((img, index) => (
          <img key={index} alt={data?.name} src={img} style={{
            width: "250px",
            height: "250px",
            borderRadius: "25px",
            padding: '10px',
            backgroundColor: '#fff',
            margin: '5px',
            boxShadow: `rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px`
          }} />
        ))}
      </Paper>
      <Paper sx={{ m: 1, p: 1 }}>
        {data?.ingredients.map((ingredient, index) => (
          <Chip
            key={index}
            color="success"
            sx={{ width: "fit-content", m: 2 }}
            label={ingredient}
          ></Chip>
        ))}
        <Typography variant="h6">STEPS :</Typography>
        {data?.steps.map((step, index) => (
          <Typography key={index}>
            {index + 1}.{step}
          </Typography>
        ))}
      </Paper>
      <Button disabled={props.uid._id !== data?.userId} variant="contained" sx={{
        m: 2,
        p: 1,
        width: 'fit-content',

      }}>
        <Link style={{
          textDecoration: "none",
          color: 'white'
        }} to={"/editRecipe/" + data?._id}>EDIT RECIPE</Link>
      </Button>
    </Box>
  );
}
