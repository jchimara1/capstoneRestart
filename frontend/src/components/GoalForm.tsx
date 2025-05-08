import { useState } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Typography
} from "@mui/material";
import { postNewGoal } from "./GoalService";
import { Goal } from "./Goal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";

const GoalForm = () => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const initialFormData: Goal = {
        id: null,
        title: "",
        description: "",
        startDate: "2025-04-28T08:00:00",
        deadline: "2025-05-10T23:59:59",
        complete: false,
        longterm: false,
        notes: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newGoal: Goal = formData;
        setGoals([...goals, newGoal]);
        postNewGoal(newGoal).catch(console.error);
        console.log(newGoal);
        setFormData(initialFormData);
    };

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
            </Box>
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 8,
                p: 4,
                py: 5,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3
            }}
        >
            <Typography variant="h5" gutterBottom>
                Create New Goal
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />

            <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>  setFormData({ ...formData, description: e.target.value })}

            />

            <TextField
                fullWidth
                margin="normal"
                type="datetime-local"
                label="Start Date"
                name="startDate"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                }
            />

            <TextField
                fullWidth
                margin="normal"
                type="datetime-local"
                label="Deadline"
                name="deadline"
                InputLabelProps={{ shrink: true }}
                value={formData.deadline}
                onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                }
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Completed</InputLabel>
                <Select
                    name="complete"
                    value={formData.complete.toString()}
                    label="Completed"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            complete: e.target.value === "true"
                        })
                    }
                >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Long Term</InputLabel>
                <Select
                    name="longterm"
                    value={formData.longterm.toString()}
                    label="Long Term"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            longterm: e.target.value === "true"
                        })
                    }
                >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Plan to achieve this goal"
                name="notes"
                value={formData.notes}
                onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                }
            />

            <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
        </Box>

            </>
    );
};

export default GoalForm;
