import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';
//import { createCoaching } from '../../actions/coaching';

const Coachings = () => {
  const {
    state: { filterCoachings },
    dispatch
  } = useValue();
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filterCoachings.map((coaching) => (
          <Card key={coaching._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={coaching.price === 0 ? 'Free Stay' : 'Rs' + coaching.price}
                actionIcon={
                  <Tooltip title={coaching.uName} sx={{ mr: '5px' }}>
                    <Avatar src={coaching.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={coaching.images[0]}
                alt={coaching.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({type:'UPDATE_COACHING' , payload:coaching})}
              />
              <ImageListItemBar
                title={coaching.title}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name="coaching-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Coachings;