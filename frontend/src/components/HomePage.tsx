
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';


import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import FloatingQuotes from "./FloatingQuotes.tsx";


export default function HomePage() {
    // const [auth, setAuth] = React.useState(true);


    // const handleChange = (event:any) => {
    //     setAuth(event.target.checked);
    // };



    const navigate = useNavigate();







    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent
                        backdropFilter: 'blur(10px)',               // blur effect
                        WebkitBackdropFilter: 'blur(10px)',
                        zIndex: (theme: any) => theme.zIndex.drawer + 1,
                        boxShadow: 'none',
                        border: 'none',
                    }}
                >


                    <Toolbar>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 1 }}>
                            <Button color="inherit" onClick={() => navigate('/')} startIcon={<HomeIcon fontSize="small" />}>
                                Home
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/newGoal')} startIcon={<AddCircleOutlineIcon fontSize="small" />}>
                                New Goal
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/PreviousGoals')} startIcon={<ListAltIcon fontSize="small" />}>
                                View Goals
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/Assistant')} startIcon={<TipsAndUpdatesTwoToneIcon fontSize="small" />}>
                                AI Assistant
                            </Button>
                        </Box>
                    </Toolbar>


                </AppBar>
                <FloatingQuotes/>
            </Box>




        </>


    );

}
