
import React,{ useState } from 'react';
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
import HelpIcon from '@material-ui/icons/Help';
import { apiUploadSingle,apiUploadMulti,apiPostQanda,apiDeleteSingle } from "../api/api";
import { addQanda } from "../actions/qanda";



  

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wayfarer
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

  function CreateQandaForm(props) {

    const topics = [
      {
        value: 'For-Sale',
      },
      {
        value: 'Question',
      },
      {
        value: 'Team-Up',
      },
      {
        value: 'Discussion',
      },
      {
        value: 'Chat',
      },
    ]

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage]= useState();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic]= useState('');
  const [city, setCity] = useState('');
  const [text, setText] = useState('');
  const [pictureURL, setPictureURL ] = useState('');
  const [otherPic ,setOtherPic] = useState([]);
  
  
  
  const onDeleteOtherPicture = async(e)=>{

    
    const data = {"key":e.currentTarget.id}
    
    const result = otherPic.filter((url)=> url.pictureURL !== e.currentTarget.value)
    const deleteRes = await apiDeleteSingle(data)

    setOtherPic(result)
  }

  const onTopicChange = (e)=>{
    setTopic(e.target.value)
  }
  const onCityChange = (e)=>{
    setCity(e.target.value)
  }
  const onNameChange = (e)=>{
    setName(e.target.value)
  }
  const onTitleChange = (e)=>{
    setTitle(e.target.value)
  }
  const onAddressChange = (e)=>{
    setAddress(e.target.value)
  }
  const onInstaURLChange = (e)=>{
    setInstaURL(e.target.value)
  }
  const onWebsiteChange = (e)=>{
    setWebsite(e.target.value)
  }
  const onMapChange = (e)=>{
    setMap(e.target.value)
  }
  const onTextChange = (e)=>{
    setText(e.target.value)
  }
  const onHourstayChange = (e)=>{
    setHourstay(e.target.value)
  }
  const onBusinessHoursChange = (e)=>{
    setBusinessHours(e.target.value)
  }
  const onAveragePriceChange = (e)=>{
    setAveragePrice(e.target.value)
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
    


    const fullName = `${props.auth.firstName} ${props.auth.lastName}`
    
    const eventdata= {
      "name": props.auth.firstName,
      "title":title,
      "city":props.city,
      "type": "qanda",
      "topic":topic,
      "text":text,
      "author":[{user:props.auth._id,"name": fullName}],
      "otherPic":otherPic,
      
    }
    if (!topic) {
      setErrorMessage('You have to choose a topic')
      event.preventDefault();
    }
    if (props.auth.firstName) {
        
      const postRes = await apiPostQanda(eventdata)

        console.log(postRes);
      dispatch(addQanda(eventdata))
      
      return
    }
    setErrorMessage('You have to login to comment')
    
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HelpIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ask a Question
        </Typography>
        <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>

        {/* Label selector */}
        <TextField
          id="standard-select-city"
          select
          variant="outlined"
          label="Topic"
          required
          className={classes.textField}
          onChange={onTopicChange}
          value={topic}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select Topic"
          margin="normal"
        >
          {topics.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        
    
        {/* Name */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={props.auth.firstName ? props.auth.firstName : 'You must login for submit'}
            disabled
            onChange={onNameChange}
          />
          {/* Title */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Title"
            label="Title"
            type="Title"
            id="Title"
            autoComplete="current-organizer"
            onChange={onTitleChange}
          />
        {/* text */}
        <TextField
          id="text"
          name="text"
          label="Text"
          variant="outlined"
          margin="normal"
          fullWidth
          value={text}
          onChange={onTextChange}
          multiline
          rows="4"
        />
        
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
            Upload Pictures
        </Button>
        </label>
        
        { otherPic && otherPic.map((otherPic)=>{
                        return(
                        <div key={`${otherPic.key}`}>
                          <img className="responsive-image" src={`${otherPic.pictureURL}`}/>
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
        <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>
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

const mapStateToProps = (state)=>{
  return {
      auth: state.auth
  };
}
export default connect(mapStateToProps)(CreateQandaForm);