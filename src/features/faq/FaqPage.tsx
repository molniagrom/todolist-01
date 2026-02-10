import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "What is a todo list?",
    answer: "A todo list is a tool to organize tasks and keep track of things you need to do."
  },
  {
    question: "How do I add a new task?",
    answer: "Click on the 'Add' button and enter your task in the input field."
  },
  {
    question: "Can I edit my tasks?",
    answer: "Yes, you can click on any task to edit its content."
  },
  {
    question: "How do I mark a task as completed?",
    answer: "Click the checkbox next to a task to mark it as completed."
  },
  {
    question: "Can I delete tasks?",
    answer: "Yes, you can delete tasks using the delete button associated with each task."
  }
];

export const FaqPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {faqData.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};