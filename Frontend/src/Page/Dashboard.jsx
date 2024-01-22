import React, {useEffect} from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("authToken")) {
        navigate("/");
      }
    }, []);
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
        <Typography variant='h4'>
            Welcome to Dashboard
        </Typography>
        <Typography paragraph>
          Content to be added here for the dashboard ...
        </Typography>
      </Box>
    </Box>
  )
}
