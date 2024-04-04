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
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import { useAuth } from 'src/Context/AuthContext';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'src/firebase';
import { addDoc, collection, deleteField, doc, updateDoc } from 'firebase/firestore';

export default function AddMessages() {
  const navigate = useNavigate();
  const { companyid, id } = useParams();
  const { currentUser } = useAuth();
  const location = useLocation();
  console.log(location);
  const { state } = location;
  const { selectedMsg, PollingOptions } = state || {};
  const [category, setCategory] = useState(false);
  const milliseconds = selectedMsg?.release_date?.seconds * 1000 + selectedMsg?.release_date?.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [saveDraftDialogOpen, setSaveDraftDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(id ? dayjs(date) : dayjs());
  const [selectedTime, setSelectedTime] = useState(id ? dayjs(date) : dayjs());
  const [postNow, setPostNow] = useState(false);
  const [poll_question, setPollQuestion] = useState(
    id ? (selectedMsg?.poll_question ? selectedMsg?.poll_question : '') : ''
  );
  const [poll_options, setPollOptions] = useState(id ? PollingOptions?.map((item) => item.option) ?? [''] : ['']);
  const [selectedOption, setSelectedOption] = useState(id ? (selectedMsg?.is_polling ? 'poll' : 'message') : 'message');
  const [msg, setmsg] = useState(id ? selectedMsg?.msg : '');
  const [fieldValues, setFieldValues] = useState({
    name: id ? selectedMsg?.name : '',
    content_url: id ? selectedMsg?.content_url : '',
    release_date: id ? selectedMsg?.release_date : '',
    status: id ? selectedMsg?.status : '',
    posted_by: id ? selectedMsg?.posted_by : currentUser.role,
  });

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handlePostNowChange = (event) => {
    const isChecked = event.target.checked;
    setPostNow(isChecked);
    if (isChecked) {
      setSelectedTime(dayjs());
      setSelectedDate(dayjs());
    } else {
      setSelectedDate(id ? dayjs(date) : dayjs());
      setSelectedTime(id ? dayjs(date) : dayjs());
    }
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
  const handleOpenSaveDraftDialog = () => {
    setSaveDraftDialogOpen(true);
  };

  const handleCloseSaveDraftDialog = () => {
    setSaveDraftDialogOpen(false);
  };

  const handleOpenSendDialog = () => {
    setSendDialogOpen(true);
  };

  const handleCloseSendDialog = () => {
    setSendDialogOpen(false);
  };

  const saveDraft = () => {
    handleCloseSaveDraftDialog();
    const data = POST_Img_Api('draft');

    if (data) {
      navigate(-1);
      return toast.success('Draft saved successfully');
    } else {
      navigate(-1);
      return toast.error('Error Occuerd While saving Post Draft');
    }
  };

  const send = () => {
    handleCloseSendDialog();
    let data;
    if (postNow) {
      data = POST_Img_Api('online');
    } else {
      data = POST_Img_Api('upcoming');
    }
    if (data) {
      navigate(-1);

      return toast.success('Post published successfully');
    } else {
      navigate(-1);

      return toast.error('Error Occuerd While saving Posting the Post');
    }
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFile(selectedMsg?.content_url);
  }, [selectedMsg?.content_url]);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  console.log(file);
  const uploadNewfile = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Get the file name
      const fileName = selectedFile.name;

      // Use FileReader to read the file and get a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the preview image URL to the result of FileReader
        setFile(reader.result);

        // Use the fileName variable as needed, for example, store it in state
        setFileName(fileName);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const deleteFile = () => {
    setFile(null);
    toast.success('File Deleted Successfully');
    handleCloseCancelDialog();
  };
  const handleAddOption = () => {
    setPollOptions([...poll_options, '']);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...poll_options];
    updatedOptions.splice(index, 1);
    setPollOptions(updatedOptions);
  };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...poll_options];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };
  const OnHandleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function determineMediaType(base64String) {
    // Check if it starts with 'data:image'
    if (base64String.startsWith('data:image')) {
      return 'image';
    }
    // Check if it starts with 'data:video'
    else if (base64String.startsWith('data:video')) {
      return 'video';
    } else if (base64String.startsWith('data:application')) {
      return 'file';
    }
    // If neither, return null or handle as needed
    else {
      return null;
    }
  }
  const POST_Img_Api = async (status) => {
    if (file && !/^https:\/\/\S+$/.test(file)) {
      const timestampInMilliseconds = Date.now();
      const storageRef = ref(storage, `messages/${companyid}/${fieldValues.name}_${timestampInMilliseconds}`);
      console.log(storageRef);
      const uploadTask = await uploadString(storageRef, file, 'data_url');
      console.log(uploadTask);
      const downloadURL = await getDownloadURL(storageRef);
      const fileType = determineMediaType(file);
      // Call POST_Posts_Api with the obtained image URL
      if (id) {
        return await UPDATE_Posts_Api(downloadURL, status, fileType);
      } else {
        return await POST_Posts_Api(downloadURL, status, fileType);
      }
    } else {
      if (id) {
        return await UPDATE_Posts_Api('', status, '');
      } else {
        return await POST_Posts_Api('', status, '');
      }
    }
  };
  const UPDATE_Posts_Api = async (imageUrl, status, fileType) => {
    try {
      const dateTimeTimestamp = selectedDate
        .set('hour', selectedTime.hour())
        .set('minute', selectedTime.minute())
        .set('second', selectedTime.second())
        .valueOf();

      console.log(dateTimeTimestamp);
      try {
        fieldValues.createdAt = new Date();
        fieldValues.status = status;
        fieldValues.release_date = new Date(dateTimeTimestamp);
        if (fileType === 'image') {
          fieldValues.isImg = true;
          fieldValues.isVideo = false;
          fieldValues.isFile = false;
        } else if (fileType === 'video') {
          fieldValues.isImg = false;
          fieldValues.isVideo = true;
          fieldValues.isFile = false;
        } else if (fileType === 'file') {
          fieldValues.isImg = false;
          fieldValues.isVideo = false;
          fieldValues.isFile = true;
        }

        if (selectedOption === 'message') {
          fieldValues.msg = msg;
          fieldValues.is_polling = false;
        } else {
          fieldValues.poll_question = poll_question;
          fieldValues.is_polling = true;
        }

        fieldValues.content_url = imageUrl || fieldValues.content_url;
        // fieldValues.poster_name = currentUser.displayName;
        const CompanyRef = doc(db, 'companies', companyid);
        const PostsRef = doc(CompanyRef, 'messages', id);
        await updateDoc(PostsRef, fieldValues);

        const pollOptionsSet = new Set(poll_options);
        const pollingOptionsSet = new Set(PollingOptions.map((option) => option.option));
        const optionsEqual = JSON.stringify([...pollOptionsSet]) !== JSON.stringify([...pollingOptionsSet]);
        if (selectedOption !== 'message' && optionsEqual) {
          if (poll_options && Array.isArray(poll_options)) {
            const ValuesChanged = findChangedValues(poll_options, PollingOptions);
            for (const val of ValuesChanged) {
              const AddPolling = doc(PostsRef, 'polling_option', val.id);
              const PollingresponseFirestore = await updateDoc(AddPolling, { option: val.newValue });
            }
          } else {
            console.log('poll_options is not an array or is undefined');
          }
        }
        return true;
      } catch (Error) {
        console.log(Error);
        return Error;
      }
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };
  function findChangedValues(arr1, arr2) {
    const changedValues = [];

    arr1.forEach((value, index) => {
      if (value !== arr2[index].option) {
        changedValues.push({ id: arr2[index].id, newValue: value });
      }
    });

    return changedValues;
  }
  console.log(file);

  const POST_Posts_Api = async (imageUrl, status, fileType) => {
    const dateTimeTimestamp = selectedDate
      .set('hour', selectedTime.hour())
      .set('minute', selectedTime.minute())
      .set('second', selectedTime.second())
      .valueOf();

    console.log(dateTimeTimestamp);
    try {
      fieldValues.createdAt = new Date();
      fieldValues.status = status;
      fieldValues.release_date = new Date(dateTimeTimestamp);
      fieldValues.content_url = imageUrl; // Use the provided image URL
      if (fileType === 'image') {
        fieldValues.isImg = true;
        fieldValues.isVideo = false;
        fieldValues.isFile = false;
      }
      if (fileType === 'video') {
        fieldValues.isImg = false;
        fieldValues.isVideo = true;
        fieldValues.isFile = false;
      }
      if (fileType === 'file') {
        fieldValues.isImg = false;
        fieldValues.isVideo = false;
        fieldValues.isFile = true;
      }
      if (selectedOption === 'message') {
        fieldValues.msg = msg;
        fieldValues.is_polling = false;
      } else {
        fieldValues.poll_question = poll_question;
        fieldValues.is_polling = true;
      }
      fieldValues.company_ref = doc(db, 'companies', companyid);
      fieldValues.posted_by_name = currentUser.displayName;
      const MsgRefernce = collection(fieldValues.company_ref, 'messages');
      const responseFirestore = await addDoc(MsgRefernce, fieldValues);
      console.log(responseFirestore.id);
      const msgRef = doc(fieldValues.company_ref, 'messages', responseFirestore.id);
      await updateDoc(msgRef, { msg_ref: msgRef });

      const AddPolling = collection(msgRef, 'polling_option');
      if (selectedOption !== 'message') {
        if (poll_options && Array.isArray(poll_options)) {
          for (const val of poll_options) {
            const PollingresponseFirestore = await addDoc(AddPolling, { option: val });
            const OptionsRef = doc(msgRef, 'polling_option', PollingresponseFirestore.id);
            await updateDoc(OptionsRef, { option_ref: OptionsRef });
          }
        } else {
          console.log('poll_options is not an array or is undefined');
        }
      }

      return responseFirestore.id;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };
  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add'} Message | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save changes as draft?"
        subtitle={'Changes will be saved as draft.'}
        open={saveDraftDialogOpen}
        onClose={handleCloseSaveDraftDialog}
        onConfirm={saveDraft}
      />
      <Confirm
        title="Are you sure you want to send this message?"
        subtitle={'The message will be sent.'}
        open={sendDialogOpen}
        onClose={handleCloseSendDialog}
        onConfirm={send}
      />
      <Confirm
        title="Are you sure you want to cancel?"
        subtitle={'Changes will not be saved.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={() => navigate(-1)}
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
            <Typography variant="h4">Messages</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} message
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Message Name:</b>
            </div>
            <TextField
              value={fieldValues.name}
              name="name"
              onChange={OnHandleChange}
              className="my-2 col-md col-12 mx-1"
              label="Headline Message"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Category:</b>
            </div>
            <FormControl className="my-2 col mx-1">
              <InputLabel id="messageOrPollLabel">Select Option</InputLabel>
              <Select
                labelId="messageOrPollLabel"
                id="messageOrPoll"
                value={selectedOption}
                label="Select Option"
                onChange={handleChange}
                // readOnly={id ? true : false}
                disabled={id ? true : false}
              >
                <MenuItem value="message">Message</MenuItem>
                <MenuItem value="poll">Poll</MenuItem>
              </Select>
            </FormControl>
          </div>

          {selectedOption === 'message' ? (
            <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
              <div className="col-md-3 col-12 text-muted">
                <b>Message:</b>
              </div>
              <TextField
                multiline
                rows={4}
                className="my-2 col-md col-12 mx-1"
                label="Add message here"
                variant="outlined"
                fullWidth
                onChange={(e) => setmsg(e.target.value)}
                value={msg}
                name="msg"
              />
            </div>
          ) : (
            <>
              <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
                <div className="col-md-3 col-12 text-muted">
                  <b>Poll:</b>
                </div>
                <TextField
                  fullWidth
                  id="pollQuestion"
                  label="Poll Question"
                  className="my-2 col-md col-12 mx-1"
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter your poll question"
                  onChange={(e) => setPollQuestion(e.target.value)}
                  value={poll_question}
                  name="poll_question"
                />
              </div>
              <div className=" my-2 col-md-8 d-flex align-items-start justify-content-end flex-wrap">
                <div className="col-md-3 col-12 text-muted">
                  <b>Options</b>

                  {!id ? (
                    <IconButton onClick={handleAddOption} variant="contained">
                      <Iconify className="text-blue" icon="pepicons-pop:plus-circle" />
                    </IconButton>
                  ) : null}
                </div>

                {poll_options.map((option, index) => (
                  <div key={index} className="col-md-9">
                    <TextField
                      fullWidth
                      label={`Option ${index + 1}`}
                      variant="outlined"
                      margin="normal"
                      className="my-2 col-md col-12 mx-1"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    {!id
                      ? poll_options.length > 1 && (
                          <IconButton onClick={() => handleRemoveOption(index)}>
                            <Iconify className="text-blue" icon="pepicons-pop:minus-circle" />
                          </IconButton>
                        )
                      : null}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>
                Image/video/file:
                <br />
                (optional)
              </b>
            </div>
            <div className="col d-flex flex-wrap align-items-center">
              {(id && file) || file ? (
                <>
                  <img src={file} width={'55px'} />

                  <Button
                    className="mx-2"
                    onClick={handleButtonClick}
                    startIcon={<Iconify icon="material-symbols:upload" />}
                  >
                    Upload new file
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => handleCancelDialogOpen()}
                    color="error"
                    startIcon={<Iconify icon="material-symbols:delete" />}
                  >
                    Delete
                  </Button>
                  {/* Hidden file input element */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="*"
                    style={{ display: 'none' }}
                    onChange={(file) => uploadNewfile(file)}
                  />
                </>
              ) : (
                <div className="uploader-wrapper text-muted w-100">
                  <FileUploader className="col-12" handleChange={(file) => handleFileChange(file)} name="file">
                    <div
                      className="rounded-3 w-100 d-flex flex-wrap align-items-center justify-content-center  p-5"
                      style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#797979' }}
                      role="button"
                    >
                      <div className="w-100 text-center">
                        <Iconify style={{ opacity: '0.3' }} icon="material-symbols:upload" width="50px" height="50px" />
                      </div>
                      <Typography className="text-center w-100">Drag & drop your file here</Typography>
                      <b className="w-100 text-center">
                        Or browse files <Iconify className="text-primary" icon="ep:right" />
                      </b>
                    </div>
                  </FileUploader>
                </div>
              )}
            </div>
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Release date:</b>
            </div>
            <div className="col d-flex flex-wrap align-items-center justify-content-between">
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <DatePicker label="Date" value={selectedDate} onChange={handleDateChange} disabled={postNow} />
              </LocalizationProvider>
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <MobileTimePicker label="Time" value={selectedTime} onChange={handleTimeChange} disabled={postNow} />
              </LocalizationProvider>
            </div>
          </div>

          <div className="row my-2">
            <div>
              <FormControlLabel control={<Checkbox onChange={handlePostNowChange} />} label="Post now" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <Button variant="outlined" onClick={() => handleCancelDialogOpen()} className="me-3">
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleOpenSaveDraftDialog()} className="me-3">
              Save draft
            </Button>
            <Button variant="contained" onClick={() => handleOpenSendDialog()}>
              Send
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
