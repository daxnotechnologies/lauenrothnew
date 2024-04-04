import React, { useState } from 'react';
import { Typography, Button, Stack, Container, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { toast } from 'react-toastify';

const dummySurveyData = [
  {
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  {
    question: 'Which programming language do you prefer?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
  },
];

export default function SurveyForm() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);

  const handleInputChange = (questionIndex, optionIndex, event) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = event.target.value;
    setResponses(newResponses);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    toast.success('Survey submitted thank You.');
    // Redirect to a thank you page or any other appropriate action
    navigate(-1);
  };

  return (
    <div>
      <Helmet>
        <title>Survey Form | Lauenroth</title>
      </Helmet>

      <Container>
        <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
          Back
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            Survey Title
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          {dummySurveyData.map((survey, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <Typography variant="h5" gutterBottom>
                {survey.question}
              </Typography>
              <RadioGroup
                aria-label={`question-${questionIndex}`}
                name={`question-${questionIndex}`}
                value={responses[questionIndex] || ''}
                onChange={(event) => handleInputChange(questionIndex, 0, event)}
              >
                {survey.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                    onChange={(event) => handleInputChange(questionIndex, optionIndex, event)}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
