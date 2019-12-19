
import React,{ useState,useEffect } from 'react';
import { useDispatch,connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiUserLogin } from "../api/api";
import { login } from "../actions/auth";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import { apiUploadSingle,apiUploadMulti,apiUpdateEvent,apiDeleteSingle } from "../api/api";



  

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
    color: '#FF0000'
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

  function CreateFoodForm(props) {

    const cities = [
        {
          value: 'hualien',
          label: 'Hualien',
        },
        {
          value: 'yilan',
          label: 'Yilan',
        },
        {
          value: 'taipei',
          label: 'Taipei',
        },
        
      ];
    

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage]= useState();
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('event');
  const [website, setWebsite]= useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [map, setMap] = useState('');
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [eventFee, setEventFee] = useState('');
  const [pictureURL, setPictureURL ] = useState('');
  const [otherPic ,setOtherPic] = useState([]);
  
  useEffect(() => {
    setTitle(props.event ? props.event.title : '')
    setOrganizer(props.event ? props.event.organizer : '')
    setStartDate(props.event ? props.event.startDate : '')
    setEndDate(props.event ? props.event.endDate : '')
  setCity(props.event ? props.event.city : '')
  setAddress(props.event ? props.event.address : '')
  setMap(props.event ? props.event.map : '')
  setText(props.event ? props.event.text : '')
  setWebsite(props.event ? props.event.website : '')
  setNote(props.event ? props.event.note : '')
  setEventFee(props.event ? props.event.eventFee : '')
  setPictureURL(props.event ? props.event.pictureURL : '')
  setOtherPic(props.event ? props.event.otherPic : [])
    
    

  }, [])
  
  const onDeletePicture = async(e)=>{
    
    const data = {"key":e.currentTarget.id}
    
    const deleteRes = await apiDeleteSingle(data)
    
    setPictureURL('')
    
  }
 

  const onDeleteOtherPicture = async(e)=>{

    
    const data = {"key":e.currentTarget.id}
    
    const result = otherPic.filter((url)=> url.pictureURL !== e.currentTarget.value)
    const deleteRes = await apiDeleteSingle(data)

    setOtherPic(result)
  }
  
  
  const onCityChange = (e)=>{
    setCity(e.target.value)
  }
  const onTitleChange = (e)=>{
    setTitle(e.target.value)
  }
  const onOrganizerChange = (e)=>{
    setOrganizer(e.target.value)
  }
  const onStartDateChange = (e)=>{
    setStartDate(e.target.value)
  }
  const onEndDateChange = (e)=>{
    setEndDate(e.target.value)
  }
  const onWebsiteChange = (e)=>{
    setWebsite(e.target.value)
  }
  const onAddressChange = (e)=>{
    setAddress(e.target.value)
  }
  const onMapChange = (e)=>{
    setMap(e.target.value)
  }
  const onTextChange = (e)=>{
    setText(e.target.value)
  }
  const onNoteChange = (e)=>{
    setNote(e.target.value)
  }
  const onEventFeeChange = (e)=>{
    setEventFee(e.target.value)
  }
  const onUploadSingleChange = async(e)=>{
    // single pic uplaod
    const formData = new FormData();
    formData.append('image',e.target.files[0])
    const picRes = await apiUploadSingle(formData)
    setPictureURL(picRes.data)

  }
  const onUploadMultiChange = async(e)=>{
    const multiFormData = new FormData()
    for (let index = 0; index < e.target.files.length; index++) {
      multiFormData.append('image',e.target.files[index])
      
    }
    const multiRes = await apiUploadMulti(multiFormData)
    setOtherPic(otherPic.concat(multiRes.data) )
  }

  const onSubmit = async(e) =>{
    event.preventDefault();


    
    
    const eventdata= {
      "title": title,
      "organizer":organizer,
      "city":city,
      "type": "event",
      "startDate":startDate,
      "endDate":endDate,
      "address":address,
      "website":website,
      "map":map,
      "text":text,
      "notes":note,
      "eventFee":eventFee,
      "pictureURL":pictureURL,
      "otherPic":otherPic
    }

    const postRes = await apiUpdateEvent(eventdata,props.match.params.id)
    console.log(postRes);
    
    history.goBack()
    
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CloudUploadIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Event Form
        </Typography>
        <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>

        {/* City selector */}
        <TextField
          id="standard-select-city"
          select
          label="City"
          value={city}
          className={classes.textField}
          onChange={onCityChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select city"
          margin="normal"
        >
          {cities.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* Time */}
        <TextField
            id="startdate"
            label="Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            onChange={onStartDateChange}
            InputLabelProps={{
            shrink: true,
            }}
            required
        />
        <TextField
            id="enddate"
            label="End Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            onChange={onEndDateChange}
            InputLabelProps={{
            shrink: true,
            }}
            required
        />
        {/* Event title */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Event title"
            name="title"
            autoComplete="title"
            value={title}
            autoFocus
            onChange={onTitleChange}
          />
          {/* organizer */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="organizer"
            label="organizer"
            type="organizer"
            id="organizer"
            value={organizer}
            autoComplete="current-organizer"
            onChange={onOrganizerChange}
          />
        {/* website */}
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="website"
            label="Website URL"
            name="website"
            value={website}
            autoFocus
            onChange={onWebsiteChange}
          />
        {/* Address and GoogleMap */}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Address"
            label="Address"
            name="Address"
            value={address}
            autoFocus
            onChange={onAddressChange}
          />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="map"
            label="Map URL"
            name="map"
            value={map}
            autoFocus
            onChange={onMapChange}
          />
        {/* note */}
        <TextField
          id="note"
          name="note"
          label="Event Note"
          variant="outlined"
          margin="normal"
          fullWidth
          value={note}
          onChange={onNoteChange}
          multiline
          rowsMax="4"
        />
        {/* text */}
        <TextField
          id="text"
          name="text"
          label="Event Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={text}
          onChange={onTextChange}
          multiline
          rowsMax="4"
        />
        {/* Event fee */}
        <TextField
            variant="outlined"
            margin="normal"
            id="eventfee"
            label="Event fee"
            name="eventfee"
            value={eventFee}
            autoFocus
            onChange={onEventFeeChange}
          />
        {/* Upload Picture */}
        <input
            name="image"
            accept="image/jpg,image/jpeg"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={onUploadSingleChange}
        />
        <label htmlFor="contained-button-file">
        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            component="span"
        >
            Upload Picture (1200X640)
        </Button>
        
        </label>
        {pictureURL && (
                        <div key={`${pictureURL.key}`}>
                        <img src={`${pictureURL.pictureURL}`}/>
                        <Button
                          
                          variant="contained"
                          color="primary"
                          value={pictureURL.pictureURL}
                          id={pictureURL.key}
                          className={classes.submit}
                          onClick={onDeletePicture}
                        >
                          Delete Picture
                        </Button>
                        </div>)}
        {/* otherPic */}
        <input
            name="image"
            accept="image/*"
            className={classes.input}
            id="contained-button-multifile"
            type="file"
            multiple
            onChange={onUploadMultiChange}
        />
        <label htmlFor="contained-button-multifile">
        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            component="span"
        >
            Upload other Pictures
        </Button>
        </label>
        
        { otherPic && otherPic.map((otherPic)=>{
                        return(
                        <div key={`${otherPic.key}`}>
                          <img src={`${otherPic.pictureURL}`}/>
                          <Button
                          variant="contained"
                          color="primary"
                          id={`${otherPic.key}`}
                          value={`${otherPic.pictureURL}`}
                          className={classes.submit}
                          onClick={onDeleteOtherPicture}
                        >
                        Delete Picture
                        </Button>
                        </div>)
        })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state, props) => ({
  event: state.event.find((event) => event._id == props.match.params.id),
});


export default connect(mapStateToProps)(CreateFoodForm);