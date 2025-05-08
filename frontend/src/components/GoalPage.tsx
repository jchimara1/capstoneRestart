import { useEffect, useState } from "react";
import {deleteGoal, fetchGoals} from "./GoalService";
import { Goal } from "./Goal";
import myImage from "../assets/shortTerm.png";

import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    CardMedia,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import Toolbar from "@mui/material/Toolbar";

const GoalPage = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [render,setRender] = useState(false)
    const navigate = useNavigate();



    useEffect(() => {
        let isMounted = true;

        fetchGoals().then(data => {
            if (isMounted) {
                setGoals(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [render]);



    const reload = () => {
        fetchGoals().then(setGoals)
        setRender(prev => !prev)
    }


    const deleteHandler = (id: any) => {
        deleteGoal(id)
        reload()
    }

    const editHandler = (goal: Goal) => {
        navigate("/ViewProgress", { state: { goal } });
    };



    return (

        <>

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

        <Box sx={{ mt: 10, px: 4, pb: 6 }}>
            <Typography color="white" variant="h4" gutterBottom>
                Goal List
            </Typography>

            <Grid container spacing={4}>
                {goals.map((goal, index) => (
                    <Grid item xs={12} sm={6} md={4} key={goal.id ?? `temp-${index}`}>
                        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", height: "100%" }}>
                            <CardMedia
                                sx={{ height: 140, backgroundColor: "#f5f5f5" }}
                                title="Goal Image"
                                image={myImage}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {goal.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {goal.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Start:</strong> {goal.startDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Deadline:</strong> {goal.deadline}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Completed:</strong> {goal.complete ? "Yes" : "No"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Long Term:</strong> {goal.longterm ? "Yes" : "No"}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end" }}>
                                <Button size="small" onClick={() => editHandler(goal)}>Edit</Button>
                                <Button size="small" onClick={async () => {deleteHandler(goal.id)} }>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

            </>
    );
};

export default GoalPage;
