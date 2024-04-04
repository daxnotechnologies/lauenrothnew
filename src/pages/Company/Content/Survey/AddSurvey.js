import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify/Iconify';
import {
  Typography,
  Button,
  Stack,
  IconButton,
  FormControl,
  InputAdornment,
  Container,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';

export default function AddSurvey() {
  const [category, setCategory] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([{ text: '', options: [''] }]);

  useEffect(() => {
    if (id) {
      setQuestions([
        { text: 'What is your favorite color?', options: ['Red', 'Blue', 'Green', 'Yellow'] },
        { text: 'Which programming language do you prefer?', options: ['JavaScript', 'Python', 'Java', 'C++'] },
      ]);
    }
  }, [id]);

  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };

  const saveData = () => {
    handleCloseSaveDialog();
    return toast.success('Changes Saved Successfully');
  };

  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  const cancelSave = () => {
    handleCancelDialogOpen();
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [''] }]);
  };

  const deleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add new'} survey | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save changes?"
        subtitle={'Changes will be saved.'}
        open={deleteDialogOpen}
        onClose={handleCloseSaveDialog}
        onConfirm={saveData}
      />
      <Confirm
        title="Are you sure you want to cancel?"
        subtitle={'Changes will not be saved.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
         onConfirm={()=>navigate(-1)}
      />
      <Container>
        <div className="row my-4 text-start">
          <div>
            <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
              Back
            </Button>
          </div>
        </div>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Survey</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} survey
          </Typography>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Survey title:</b>
            </div>
            <TextField className="my-2 col-md col-12 mx-1" label="Survey title" variant="outlined" fullWidth />{' '}
          </div>

          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="my-2 col-md-8 d-flex align-items-center flex-wrap my-3 p-3"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <div className="col-md-12 d-flex justify-content-between col-12 text-muted mb-2">
                <b>Question: {questionIndex + 1}</b>
                {questions.length > 1 && (
                  <Button onClick={() => deleteQuestion(questionIndex)} size="small" className="bg-danger text-white">
                    <Iconify icon="material-symbols:delete" width={26} height={26} /> Delete question
                  </Button>
                )}
              </div>
              <TextField
                className="my-2 col-md-12 col-12 mx-1"
                label="Add question here"
                variant="outlined"
                fullWidth
                required
                value={question.text}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].text = e.target.value;
                  setQuestions(updatedQuestions);
                }}
              />

              <div className="col-md-12 col-12 text-muted mb-2">
                <b>Options:</b>
              </div>
              <div className="col-md-12 col-12 mx-1">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="d-flex align-items-center my-2">
                    <TextField
                      className="my-2 col-md-10 col-10"
                      label={`Option ${optionIndex + 1}`}
                      variant="outlined"
                      required
                      fullWidth
                      value={option}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                    {question.options.length > 1 ? (
                      <IconButton onClick={() => deleteOption(questionIndex, optionIndex)} color="secondary">
                        <Iconify icon="material-symbols:delete" className="text-danger" width={26} height={26} />
                      </IconButton>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => addOption(questionIndex)}
                  startIcon={<Iconify icon="ic:sharp-add" width={16} height={16} />}
                >
                  Add Option
                </Button>
              </div>
            </div>
          ))}
          <Button
            className="col-md-8 col-12"
            variant="contained"
            onClick={addQuestion}
            startIcon={<Iconify icon="ic:sharp-add" width={20} height={20} />}
          >
            Add More Question
          </Button>

          {/* <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Poste date:</b>
            </div>
            <div className="col d-flex flex-wrap align-items-center justify-content-between">
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date" />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <MobileTimePicker label="Time" defaultValue={dayjs('2022-04-17T15:30')} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <div className="row my-2">
            <div>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Post now" />
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <Button variant="outlined" onClick={() => handleCancelDialogOpen()} className="me-3">
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleOpenSaveDialog()} className="me-3">
              Save draft
            </Button>
            <Button variant="contained" onClick={() => handleOpenSaveDialog()}>
              Save
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
