import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const quotes = [
    {
        text: "If you don't like the road you're walking, start paving another one.",
        author: "Dolly Parton",
        x: "10%",
        y: "20%",
        font: "'Luckiest Guy', cursive",
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        x: "70%",
        y: "15%",
        font: "'Gloria Hallelujah', cursive",
    },
    {
        text: "The most effective way to do it, is to do it.",
        author: null,
        x: "30%",
        y: "50%",
        font: "'Luckiest Guy', cursive",
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
        x: "5%",
        y: "70%",
        font: "'Gloria Hallelujah', cursive",
    },
    {
        text: "If you're not positive energy, you're negative energy.",
        author: "Mark Cuban",
        x: "60%",
        y: "80%",
        font: "'Luckiest Guy', cursive",
    },
    {
        text: "It is never too late to be what you might have been.",
        author: "George Eliot",
        x: "20%",
        y: "35%",
        font: "'Gloria Hallelujah', cursive",
    },
    {
        text: "If you cannot do great things, do small things in a great way.",
        author: "Martin Luther King Jr.",
        x: "75%",
        y: "60%",
        font: "'Luckiest Guy', cursive",
    },
    {
        text: "The elevator to success is out of order. You'll have to use the stairs, one step at a time.",
        author: "Joe Girard",
        x: "15%",
        y: "85%",
        font: "'Gloria Hallelujah', cursive",
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        x: "50%",
        y: "25%",
        font: "'Luckiest Guy', cursive",
    },
    {
        text: "Hard times don't create heroes. It is during the hard times when the 'hero' within us is revealed.",
        author: "Bob Riley",
        x: "40%",
        y: "65%",
        font: "'Gloria Hallelujah', cursive",
    },
];

export default function FloatingQuotes() {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {quotes.map((quote, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.5, duration: 1 }}
                    style={{
                        position: "absolute",
                        left: quote.x,
                        top: quote.y,
                        maxWidth: "30ch",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: quote.font,
                            fontSize: "1.4rem",
                            color: "white",
                            textShadow: "0 0 8px rgba(0, 0, 0, 0.6)",
                        }}
                    >
                        “{quote.text}”
                    </Typography>
                    {quote.author && (
                        <Typography
                            sx={{
                                fontFamily: "'Architects Daughter', cursive",
                                fontSize: "0.9rem",
                                color: "#ccc",
                                mt: 1,
                            }}
                        >
                            – {quote.author}
                        </Typography>
                    )}
                </motion.div>
            ))}
        </Box>
    );
}
