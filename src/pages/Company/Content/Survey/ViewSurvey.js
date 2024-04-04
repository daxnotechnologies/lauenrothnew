import React from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { Typography, Button, Stack, Container, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const dummySurveyData = [
  {
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    userSelections: [10, 15, 8, 12], // Number of users who selected each option
  },
  {
    question: 'Which programming language do you prefer?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
    userSelections: [20, 18, 14, 10],
  },
];

export default function ViewSurvey() {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title> View Survey Result| Lauenroth</title>
      </Helmet>

      <Container>
        <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
          Back
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            Survey Result
          </Typography>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Survey Title</Typography>
          </div>
          {/* <div className="col-sm-2">
            <Link to="/dashboard/company/add_message/1">
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div> */}
        </div>

        <div className="d-flex flex-wrap my-5">
          {dummySurveyData.map((survey, index) => (
            <Card key={index} className="mb-4" style={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {survey.question}
                </Typography>
                <ul>
                  {survey.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      {option}: {survey.userSelections[optionIndex]} users (
                      {((survey.userSelections[optionIndex] / sum(survey.userSelections)) * 100).toFixed(2)}%)
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

function sum(array) {
  return array.reduce((acc, num) => acc + num, 0);
}
