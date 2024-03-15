import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { forwardRef, useEffect, useState } from "react";
import { Close, StarBorder } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});
const Coaching = () => {
  const {
    state: { coaching },
    dispatch,
  } = useValue();

  const [place,setPlace] = useState(null);

  useEffect(() => {
    if(coaching){
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coaching.lng},${coaching.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  },[coaching]);

  const handleClose = () => {
    dispatch({ type: "UPDATE_COACHING", payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(coaching)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {coaching?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {coaching?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="coaching" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={coaching?.uName || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar title={coaching?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>

{/* 1st row */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h5" component="span">
                {"Price per night: "}
              </Typography>
              <Typography component="span" variant="h5">
                {coaching?.price === 0 ? "FreeStay" : "Rs." + coaching?.price}
              </Typography>
            </Box>
            <Box
            sx={{
              display:"flex",
              alignItems:'center'
            }}
            >
              <Typography variant="h5" component="span">
                {"Ratings : "}
              </Typography>
              <Rating
               name = 'coaching-ratings'
               defaultValue={3.5}
               precision={0.5}
               emptyIcon={<StarBorder/>}
              >

              </Rating>
            </Box>
          </Stack>


{/* 2nd row */}

          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h5" component="span">
                {"Place Name : "}
              </Typography>
              <Typography component="span" variant="h7">
                {place?.text}
              </Typography>
            </Box>
            <Box
            sx={{
              display:"flex",
              alignItems:'center'
            }}
            >
              <Typography variant="h5" component="span">
                {"Address : "}
              </Typography>
              <Typography component="span" variant="h7">
                {place?.place_name}
              </Typography>
            </Box>
          </Stack>

{/* 3rd row */}


          <Stack>
          <Typography variant="h5" component="span">
                {"Details : "}
              </Typography>
              <Typography variant="h7" components="span">{coaching?.description}</Typography>
          </Stack>

        </Stack>


       
      </Container>
    </Dialog>
  );
};

export default Coaching;
