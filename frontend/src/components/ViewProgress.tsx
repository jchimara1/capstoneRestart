// ViewProgress.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Goal } from "./Goal";
import { editGoal } from "./GoalService";
import {
    Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";

const ViewProgress = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goal: Goal = location.state.goal;



    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editGoal(formData, formData.id)
            .then(() => navigate("/PreviousGoals"))
            .catch(console.error);
    };

    const formatForDatetimeLocal = (dateString: string): string => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    };

    const [formData, setFormData] = useState<Goal>({
        ...goal,
        startDate: formatForDatetimeLocal(goal.startDate),
        deadline: formatForDatetimeLocal(goal.deadline),
    });



    return (
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 4, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>Edit Goal</Typography>

            <TextField fullWidth margin="normal" label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

            <TextField fullWidth margin="normal" label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <TextField fullWidth margin="normal" type="datetime-local" label="Start Date" InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />

            <TextField fullWidth margin="normal" type="datetime-local" label="Deadline" InputLabelProps={{ shrink: true }} value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />

            <FormControl fullWidth margin="normal">
                <InputLabel>Completed</InputLabel>
                <Select value={formData.complete.toString()} onChange={(e) => setFormData({ ...formData, complete: e.target.value === "true" })}>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Long Term</InputLabel>
                <Select value={formData.longterm.toString()} onChange={(e) => setFormData({ ...formData, longterm: e.target.value === "true" })}>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            <TextField fullWidth margin="normal" label="Plan to achieve this goal" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />

            <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary" type="submit">Save Changes</Button>
            </Box>
        </Box>
    );
};

export default ViewProgress;
