import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Chip,
  IconButton,
  Card,
  Tooltip,
  Fab,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResponsiveAppBar from "../comp/Appbar";
import { DeleteOutline, PhotoCamera } from "@mui/icons-material";
import axios from "axios";
export default function EditRecipe(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    steps: [],
    images: [],
  });
  const [images, setImages] = useState([]);
  const [rmv, setRmv] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: process.env.REACT_APP_API + "recipe/",
      data: {
        id,
      },
    })
      .then((res) => {
        setRecipe({ ...res.data.recipe, images: [] });
        setRmv(res.data.recipe.images);
        console.log(res.data.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  async function uploadImages() {
    if (
      recipe.name === "" ||
      recipe.description === "" ||
      recipe.ingredients.length === 0 ||
      recipe.steps.length === 0 ||
      imgFiles.length === 0
    ) {
      alert("Please fill all fields");
      return;
    } else {
      try {
        await Promise.all(
          imgFiles.map(async (file) => {
            let formData = new FormData();
            formData.append("image", file);
            const result = await axios({
              method: "post",
              url: process.env.REACT_APP_API + "addImage/",
              data: formData,
            });

            recipe.images.push({
              cloudinary_id: result.data.cloudinary_id,
              url: result.data.url,
            });
          })
        );
        uploadRecipe();
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function uploadRecipe() {
    try {
      await Promise.all(
        rmv.map(async (item) => {
          axios({
            method: "post",
            url: process.env.REACT_APP_API + "removeImage/",
            data: {
              cloudinary_id: item.cloudinary_id,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
    } catch (err) {
      console.log(err);
    }

    console.log(recipe);
    await axios({
      method: "post",
      url: process.env.REACT_APP_API + "editRecipe/",
      data: recipe,
    })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res);
        alert("Internal server error");
      });
  }
  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#cc5577",
        backgroundImage: `url("dhttps://vapa.vn/wp-content/uploads/2022/12/anh-phong-nen-dep-001.jpg")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ResponsiveAppBar />
      <Paper
        sx={{
          m: 1,
          p: 1,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <TextField
          sx={{ mb: 1 }}
          fullWidth
          size={"small"}
          value={recipe?.name}
          placeholder="Name"
          onChange={(event) => {
            setRecipe({ ...recipe, name: event.target.value });
          }}
        />
        <br />
        <TextField
          size={"small"}
          sx={{ mb: 1 }}
          fullWidth
          placeholder="Description"
          value={recipe?.description}
          onChange={(event) => {
            setRecipe({ ...recipe, description: event.target.value });
          }}
        />
        <Box sx={{ m: 1, flexWrap: "wrap" }}>
          {recipe?.ingredients?.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              sx={{ m: 0.4 }}
              onDelete={() => {
                setRecipe({
                  ...recipe,
                  ingredients: recipe.ingredients.filter((_, i) => i !== index),
                });
              }}
            />
          ))}
        </Box>
        <TextField
          variant="outlined"
          placeholder="Add ingredients"
          sx={{
            width: "fit-content",
            margin: "0 auto",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setRecipe({
                ...recipe,
                ingredients: [...recipe.ingredients, e.target.value],
              });
              e.target.value = "";
            }
          }}
        />
        <Box sx={{ m: 1, flexWrap: "wrap", border: "1px solid, yellow" }}>
          {recipe?.steps?.length > 0 ? "METHOD :" : ""}
          {recipe.steps.map((step, index) => (
            <Typography key={index} sx={{ m: 0.4 }}>
              {index + 1}.{step}
              <IconButton
                onClick={() => {
                  setRecipe({
                    ...recipe,
                    steps: recipe.steps.filter((_, i) => i !== index),
                  });
                }}
              >
                <DeleteOutline />
              </IconButton>
            </Typography>
          ))}
        </Box>
        <TextField
          variant="outlined"
          placeholder="Add Steps"
          sx={{
            width: "fit-content",
            margin: "0 auto",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setRecipe({
                ...recipe,
                steps: [...recipe.steps, e.target.value],
              });
              e.target.value = "";
            }
          }}
        />
        <Box sx={{ m: 1, flexWrap: "wrap", display: "flex", margin: "0 auto" }}>
          {images?.map((image, index) => (
            <Card
              key={index}
              sx={{
                m: 0.4,
                p: 0.4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <img
                width="200px"
                height="200px"
                src={image}
                key={index}
                alt="recipe"
                sx={{
                  objectFit: "cover",
                }}
              />
              <Button
                onClick={() => {
                  setImages(images.filter((_, i) => i !== index));
                  setImgFiles(imgFiles.filter((_, i) => i !== index));
                }}
              >
                <DeleteOutline />
              </Button>
            </Card>
          ))}{" "}
        </Box>
        <Tooltip title="Upload Images">
          <Fab
            color={images?.length > 2 ? "disabled" : "success"}
            aria-label="upload picture"
            component="label"
            sx={{
              margin: "auto",
              marginTop: "20px",
              backgroundColor: "tomato",
              marginBottom: "20px",
            }}
          >
            <input
              hidden
              accept=".jpg, .jpeg, .png"
              type="file"
              onChange={(e) => {
                console.log("upload");
                const reader = new FileReader();
                reader.onload = (em) => {
                  if (reader.readyState === 2) {
                    setImages([...images, reader.result]);
                    setImgFiles([...imgFiles, e.target.files[0]]);
                  }
                };
                let size = e.target.files[0].size;
                size = size / 1024 / 1024;
                if (size > 2) {
                  alert("Image size should be less than 2MB");
                } else {
                  //   console.log(e.target.files[0].size);
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
            <PhotoCamera />
          </Fab>
        </Tooltip>
        <Button
          disableRipple={true}
          variant="contained"
          color="warning"
          onClick={() => {
            uploadImages((cb) => {
              uploadRecipe();
            });
          }}
        >
          SAVE
        </Button>
      </Paper>
    </Box>
  );
}
