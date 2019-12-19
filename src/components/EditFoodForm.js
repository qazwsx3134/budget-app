
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
import { apiUploadSingle,apiUploadMulti,apiUpdateFood,apiDeleteSingle } from "../api/api";



  

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
    const labels = [
      {
        value: 'Animals-Allow',
      },
      {
        value: 'AfternoonTea',
      },
      {
        value: 'AboriginalFood',
      },
      {
        value: 'Bar',
      },
      {
        value: 'BreakFast',
      },
      {
        value: 'Brunch',
      },
      {
        value: 'café',
      },
      {
        value: 'ChineseStyle',
      },
      {
        value: 'Desserts',
      },
      {
        value: 'DimSum',
      },
      {
        value: 'FastFood',
      },
      {
        value: 'GoodForDating',
      },
      {
        value: 'High-End',
      },
      {
        value: 'HotPot',
      },
      {
        value: 'ItalianFood',
      },
      {
        value: 'JapaneseStyle',
      },
      {
        value: 'KoreanStyle',
      },
      {
        value: 'MidNight',
      },
      {
        value: 'SeaFood',
      },
      {
        value: 'VegetarianFood',
      },
    ]

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage]= useState();
  const [name, setName] = useState('');
  const [englishname, setEnglishname] = useState('');
  const [label, setLabel]= useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [map, setMap] = useState('');
  const [description, setDescription] = useState('');
  const [instaURL, setInstaURL] = useState('');
  const [website, setWebsite]= useState('');
  const [hourstay, setHourstay] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [pictureURL, setPictureURL ] = useState('');
  const [otherPic ,setOtherPic] = useState([]);
  
  useEffect(() => {
  setName(props.food ? props.food.name : '')
  setEnglishname(props.food ? props.food.englishname : '')
  setLabel(props.food ? props.food.label : [])
  setCity(props.food ? props.food.city : '')
  setAddress(props.food ? props.food.address : '')
  setMap(props.food ? props.food.map : '')
  setDescription(props.food ? props.food.description : '')
  setInstaURL(props.food ? props.food.instaURL : '')
  setWebsite(props.food ? props.food.website : '')
  setHourstay(props.food ? props.food.hourstay : '')
  setBusinessHours(props.food ? props.food.businessHours : '')
  setAveragePrice(props.food ? props.food.averagePrice : '')
  setPictureURL(props.food ? props.food.pictureURL : '')
  setOtherPic(props.food ? props.food.otherPic : [])
    
    

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
  
  const onLabelChange = (e)=>{
    setLabel((label)=>[...label, {"subLabel": e.target.value}])
  }
  const onCityChange = (e)=>{
    setCity(e.target.value)
  }
  const onNameChange = (e)=>{
    setName(e.target.value)
  }
  const onEnglishnameChange = (e)=>{
    setEnglishname(e.target.value)
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
  const onDescriptionChange = (e)=>{
    setDescription(e.target.value)
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
    event.preventDefault();


    
    
    const eventdata= {
      "name": name,
      "englishname":englishname,
      "city":city,
      "type": "food",
      "label":label,
      "hourstay":hourstay,
      "address":address,
      "website":website,
      "instaURL":instaURL,
      "map":map,
      "description":description,
      "businessHours":businessHours ,
      "averagePrice":averagePrice,
      "pictureURL":pictureURL,
      "otherPic":otherPic
    }
    const postRes = await apiUpdateFood(eventdata,props.match.params.id)
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
          Food Form
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

        {/* Label selector */}
        <TextField
          id="standard-select-city"
          select
          label="Label"
          className={classes.textField}
          onChange={onLabelChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select label"
          margin="normal"
        >
          {labels.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        {/* Label selector */}
        <TextField
          id="standard-select-city"
          select
          label="Label"
          className={classes.textField}
          onChange={onLabelChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select label"
          margin="normal"
        >
          {labels.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        {/* Label selector */}
        <TextField
          id="standard-select-city"
          select
          label="Label"
          className={classes.textField}
          onChange={onLabelChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select label"
          margin="normal"
        >
          {labels.map(option => (
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
            value={name}
            id="name"
            label="Chinese Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onNameChange}
          />
          {/* Englishname */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={englishname}
            name="englishname"
            label="Englishname"
            type="englishname"
            id="englishname"
            autoComplete="current-organizer"
            onChange={onEnglishnameChange}
          />
          
        {/* Address and GoogleMap */}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={address}
            id="Address"
            label="Address"
            name="Address"
            autoFocus
            onChange={onAddressChange}
          />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="map"
            label="Map URL"
            value={map}
            name="map"
            autoFocus
            onChange={onMapChange}
          />
        {/* website */}
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={website}
            id="website"
            label="Website URL"
            name="website"
            autoFocus
            onChange={onWebsiteChange}
          />
        {/* instaURL */}
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={instaURL}
            id="instaURL"
            label="Instagram URL"
            name="instaURL"
            autoFocus
            onChange={onInstaURLChange}
          />
        {/* Description */}
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={description}
          onChange={onDescriptionChange}
          multiline
          rowsMax="4"
        />
        {/* BusinessHours */}
        <TextField
          id="BusinessHours"
          name="BusinessHours"
          label="BusinessHours"
          variant="outlined"
          margin="normal"
          fullWidth
          value={businessHours}
          onChange={onBusinessHoursChange}
          multiline
          rowsMax="4"
        />
          {/* onHourstayChange */}
          <TextField
          type="number"
          id="hourstay"
          name="hourstay"
          label="Hour Stay (number only)"
          variant="outlined"
          margin="normal"
          fullWidth
          value={hourstay}
          onChange={onHourstayChange}
        />
        {/* averagePrice */}
        <TextField
            type="number"
            variant="outlined"
            margin="normal"
            id="averagePrice"
            label="AveragePrice (number only)"
            name="averagePrice"
            fullWidth
            value={averagePrice}
            autoFocus
            onChange={onAveragePriceChange}
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
  food: state.food.find((food) => food._id == props.match.params.id),
});


export default connect(mapStateToProps)(CreateFoodForm);