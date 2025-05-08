import { Box, Button, IconButton, TextField, Typography, AppBar, Toolbar } from "@mui/material";
import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import { useNavigate } from "react-router-dom";

export default function AIAssistantPage() {
    const [userInput, setUserInput] = useState("");
    const [goalResponse, setGoalResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!userInput.trim()) return;

        setLoading(true);
        setGoalResponse("");

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an AI goal-setting assistant. Take a user's goal and rewrite it as a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).",
                        },
                        {
                            role: "user",
                            content: userInput.trim(),
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error status:", response.status, errorText);
                setGoalResponse("Error from OpenAI: " + errorText);
                setLoading(false);
                return;
            }

            const data = await response.json();
            const content = data.choices[0].message.content;
            setGoalResponse(content);
        } catch (error) {
            console.error("OpenAI request failed:", error);
            setGoalResponse("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    return (
        <>
            <Box   sx={{
                height: '100vh',
                overflow: showForm ? 'auto' : 'hidden',
            }}
            >
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
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

            <AnimatePresence mode="wait">
                {!showForm ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box
                            sx={{
                                mt: "64px",
                                height: "calc(100vh - 64px)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                p: 6,
                                px: 50,
                                py: -20,
                                color: "white",
                                backgroundImage: `url(/your-background.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <Box maxWidth="700px" >
                                <Typography variant="h3" fontWeight="bold" gutterBottom>
                                    Hi there, I’m Solay. Your AI Assistant
                                </Typography>
                                <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                    I’m really glad you’re here. My job is simple: to help you feel supported as you
                                    set goals and work toward them — one step at a time.
                                    <br />
                                    Whether you’re feeling motivated, overwhelmed, or somewhere in between, I’ve got
                                    your back. You don’t have to figure everything out today.
                                    <br />
                                    You can say things like: <br />• “I want to set a goal.” <br />• “Help me break
                                    this down.” <br />• “Can you remind me what I’ve already started?”
                                    <br />
                                    <br />
                                    Let’s take things at your pace. You’re not alone in this — I’m here for the
                                    journey.
                                </Typography>
                            </Box>
                            <Box textAlign="center" sx={{px:20}}>
                                <IconButton onClick={() => setShowForm(true)} sx={{ color: "white" }}>
                                    <KeyboardArrowDownIcon fontSize="large" />
                                </IconButton>
                            </Box>

                        </Box>


                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box
                            sx={{
                                mt: "64px",
                                minHeight: "calc(100vh - 64px)",
                                px: 10,
                                py: 20,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundImage: `url(/your-background.jpg)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                color: "white",
                            }}
                        >
                            <Box maxWidth="600px" width="100%">
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                                    Tell your Solay about your goal.
                                </Typography>

                                <TextField
                                    label="What is your goal?"
                                    placeholder="e.g. I want to get in shape, build a habit, etc."
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    sx={{
                                        mb: 3,
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        borderRadius: 1,
                                        input: { color: "white" },
                                        textarea: { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                                        },
                                    }}
                                />

                                <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Generating..." : "Generate SMART Goal"}
                                </Button>

                                {goalResponse && (
                                    <Box
                                        sx={{
                                            mt: 4,
                                            p: 3,
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            borderRadius: 2,
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            color: "white",
                                            backdropFilter: "blur(6px)",
                                            whiteSpace: "pre-line",
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ fontFamily: "monospace" }}>
                                            {goalResponse}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

                </Box>
        </>
    );
}
