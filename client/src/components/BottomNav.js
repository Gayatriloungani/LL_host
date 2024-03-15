import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
  } from '@mui/material';
  import { AddLocationAlt, LocationOn, School } from '@mui/icons-material';
  import { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import Coachings from './coachings/Coachings';
import AddCoaching from './addcoaching/AddCoaching';
import Protected from './protected/Protected';

  const BottomNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(() => {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
    return (
      <Box 
     ref={ref}
     >
        {
          {
            0: <ClusterMap />,
            1: <Coachings />,
            2: (
            <Protected>
              <AddCoaching  setPage={setValue}/>
              </Protected>
            ),
          }[value]
        }
        <Paper
          elevation={3}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Map" icon={<LocationOn />} />
            <BottomNavigationAction label="Coachings" icon={<School />} />
            <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  };
  
  export default BottomNav;