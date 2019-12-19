import React ,{ useState }from 'react';
import { connect,useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { Comment } from "./Comment";
import {  makeStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RateReviewIcon from '@material-ui/icons/RateReview';
import InstagramIcon from '@material-ui/icons/Instagram';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CommentIcon from '@material-ui/icons/Comment';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LoadingPage from './LoadingPage'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { apiPushCommentFood, apiUploadMulti,apiFilteredGetFood,apiDislikeFood,apiLikeFood,apiDeleteFood,apiDeleteSingle } from "../api/api";
import { fetchFood,removeFood } from "../actions/food";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  paper: {
    background: '#fefefd',
    margin: 'auto',
    maxHeight: 470,
  },
  card: {
    maxWidth: 505,
    maxHeight: 470,
  },
  img: {
    borderRadius: 5,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  description: {
    marginTop: 30,
    marginBottom:30,
    maxHeight: 150,
  },
  
  location:{
    padding: 0,
    paddingTop: 5,
    paddingLeft: 8,
    
  },
  list:{
    padding: 0,
    paddingLeft: 8,
    
  },
  align:{
    display: 'flex',
  },
  alignlabel:{
    display: 'flex',
    justifyContent: 'center'
  },
  rootlist: {
    width: '100%',
    maxWidth: 360,
    paddingTop: 0,
  },
  sublist:{
    padding:0,
    paddingLeft: 45,
  },
  span: {
    display: 'inline-block',
    width: '50%',
    
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(1, 3, 2),
  },
  errorMessage:{
    color: '#FF0000'
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button:{
    margin: 10,
  },
  
}));

 function PixelPageFood  (props)  {
    const [selectedModal, setSelectedModal] = useState(null);
    const [errorMessage, setErrorMessage]= useState();
    const [openDel, setOpenDel] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [listopen, setListOpen] = React.useState(true);
    const [review, setReview] = useState('');
    const [text, setText] = useState('');
    const [otherPic ,setOtherPic] = useState([]);

    const dispatch = useDispatch()

    const classes = useStyles();

    const onDeleteOtherPicture = async(e)=>{

    
      const data = {"key":e.currentTarget.id}
      
      const result = otherPic.filter((url)=> url.pictureURL !== e.currentTarget.value)
      const deleteRes = await apiDeleteSingle(data)
  
      setOtherPic(result)
    }
    const handleClickOpen = (e) => {
      setSelectedModal(e.target.value);
      setOpen(true);
    };
    const handleClickDialogOpen = () => {
      setOpenDel(true);
    };
    const handleClickDialogClose = () => {
      setOpenDel(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const onDelete = async(e)=>{

      if (props.food.pictureURL) {
        
          
        const deleData = await apiDeleteSingle({"key" : props.food.pictureURL.key})
        console.log(deleData);
        
      }
        
      if (props.food.otherPic) {
        props.food.otherPic.map(async(otherPic)=>{
          
          const deleData = await apiDeleteSingle({"key" : otherPic.key})
          console.log(deleData);
        })
        
      }
      setOpenDel(false);
      const deleteRes = await apiDeleteFood(props.match.params.id)
      dispatch(removeFood(props.match.params.id))
      
    }
    const handleClose = () => {
      setOpen(false);
    };
    const handleClick = () => {
      setListOpen(!listopen);
    };

    
    const onReviewChange = (e)=>{
      setReview(e.target.value)
    }
    const onTextChange = (e)=>{
      setText(e.target.value)
    }

    const onUploadMultiChange = async(e)=>{
      const multiFormData = new FormData()
      for (let index = 0; index < e.target.files.length; index++) {
        multiFormData.append('image',e.target.files[index])
        
      }
      const multiRes = await apiUploadMulti(multiFormData)
      setOtherPic(multiRes.data)
    }
  
    const onSubmit = async(e) =>{
      event.preventDefault();
      const userData = {
        "likeby":[{"user": props.auth._id}],
        "dislikeby":[{"user": props.auth._id}]
      }
      const fullName = `${props.auth.firstName} ${props.auth.lastName}`
      const commentData = {
        "comment" : [{
            "user" : props.auth._id,
            "name" : fullName,
            "text" : text,
            "otherPic" : otherPic
        }]
      }
      

      if (props.auth.firstName) {

        if (review == "like") {
        
          const likeRes = await apiLikeFood(userData,props.match.params.id)
          
          
        }else if (review == "dislike") {
          
          const dislikeRes = await apiDislikeFood(userData,props.match.params.id)
          
          
        }
        const patchRes = await apiPushCommentFood(commentData,props.match.params.id)
        
        setText('')
        const foodRes = await apiFilteredGetFood(props.city)
        dispatch(fetchFood(foodRes.data))
        setOtherPic([])
        return
      }
      setErrorMessage('You have to login to comment')
    }


    return (
      <div>
      {/*fetch還是有時間差 所以要接loading page等待api */}
      {props.food
        ?
        <div>
        <div className="show-for-desktop">
        <Grid container spacing={0}>

          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={2}>
              <Grid container spacing={0}>
              <Grid item xs={12}>
                <div className="responsive-image-div">
                  <img className="responsive-image" src={`${props.food.pictureURL.pictureURL}`}/>
                </div>
              </Grid>
              
              {/*左半邊圖片部分 */}
                <Grid item xs={7}>
                   
                <List >
                      {/*title名稱 */}
                      <ListItem alignItems="flex-start">
                        
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                <Box  fontSize="h3.fontSize"  textAlign="center" fontWeight="fontWeightBold" >
                                  {props.food.englishname}&nbsp;&nbsp;(&nbsp;{props.food.name}&nbsp;)
                                </Box>

                                <Box  fontSize="h6.fontSize" textAlign="center" fontWeight="fontWeightRegular" >
                                  {props.food.city.toUpperCase()}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>
                          {/*label */}
                      <ListItem button className={classes.list}>
                          
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.alignlabel} component="div" color="textPrimary">
                                    {props.food.label.map((label)=>{
                                      return(
                                      <Box className="list-item__border__label" key={label.subLabel} component="span" fontSize={16} fontWeight="fontWeightBold" m={1}>
                                      &nbsp;&nbsp;{label.subLabel}&nbsp;&nbsp;  
                                      </Box>)
                                    })}
                                      
                                      
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>

                          
                          
                    <div className="list-item__border__event">
                    {(props.food.otherPic.map((otherPic)=>{
                        return (
                            <div key={otherPic._id}>
                            <input 
                                className="resize-image"
                                type="image"
                                src={`${otherPic.pictureURL}`}
                                alt="Image" 
                                name="Image_popup" 
                                value={`${otherPic.pictureURL}`}
                                onClick={handleClickOpen} />
                            
                            </div>
                        )})) 
                         }
                         <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 300,
                                }}
                            >
                            <Fade in={open}>
                                <div >
                                <img className="responsive-image" src={selectedModal}/>
                                </div>
                            </Fade>
                            </Modal>
                         </div>
                         
                

                          <ListItem>
                          <ListItemText primary={
                                  <React.Fragment>
                                  
                                    <Typography  component="div" color="textPrimary">
                                      
                                      <Box  component="div" textAlign="center" fontSize={20} fontWeight="fontWeightMedium" >
                                        {props.food.description}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>


                          <Divider variant="middle" component="li" />
                                {/*交通方式 */}
                          <ListItem >
                          <QueryBuilderIcon fontSize="large"/>
                          <ListItemText primary={
                                  <React.Fragment>
                                  
                                    <Typography  component="div" color="textPrimary">
                                      <Box  component="div" fontSize={20} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Business Hours
                                      </Box>
                                      
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <ListItem className={classes.list}>
                          <ListItemText primary={
                                  <React.Fragment>
                                  
                                    <Typography  component="div" color="textPrimary">
                                      
                                      <Box  component="div" fontSize={20} fontWeight="fontWeightMedium" >
                                        {props.food.businessHours}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider variant="middle" component="li" />
                          {/* Comment */}
                          <form className={classes.form} onSubmit={onSubmit}>
          <ListItem >
                          <CommentIcon  fontSize="large"/>
                          <ListItemText primary={
                                  <React.Fragment>
                                  
                                    <Typography  component="div" color="textPrimary">
                                      <Box  component="div" fontSize={20} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Comment
                                      </Box>
                                      
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
            {/* Name */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={props.auth.firstName ? props.auth.firstName : 'Login for comment'}
            disabled
          />
          {/* like or dislike */}
        <TextField
          id="standard-select-city"
          select
          label="Review"
          variant="outlined"
          className={classes.textField}
          value={review}
          onChange={onReviewChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="How do you like this food"
          margin="normal"
        >
          <MenuItem value="">
            Neutral
          </MenuItem>
          <MenuItem value="like">
          <ThumbUpIcon/>
            &nbsp;&nbsp;Like
          </MenuItem>
          <MenuItem value="dislike">
          <FlashOnIcon/>
          &nbsp;&nbsp;Boo
          </MenuItem>
        </TextField>
          {/* text */}
          <TextField
            required
            id="text"
            name="text"
            label="Text"
            variant="outlined"
            margin="normal"
            fullWidth
            value={text}
            onChange={onTextChange}
            multiline
            rows="3"
            
          />
          <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>

        {/* otherPic */}
        <input
            name="image"
            accept="image/*"
            className={classes.input}
            id="contained-button-multifile"
            type="file"
            multiple
            onChange={onUploadMultiChange}
            disabled={props.auth.firstName ? false : true}
        />
        <label htmlFor="contained-button-multifile">
        <Button
            variant="contained"
            color="default"
            className={classes.submit}
            startIcon={<CloudUploadIcon />}
            component="span"
            disabled={props.auth.firstName ? false : true}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          </form>
                          <Divider variant="inset" component="li" />
                          <div>
                          {
                        (props.food.comment.map((comment) => {
                          return <Comment key={comment._id} {...comment} />;
                        }))
                      }
                      </div>
                    </List>
                    
                    <Footer/>
                </Grid>

                {/*右半邊
                 */}
                <Grid item xs={5} >
                  <div className="sticky">
                  <div className={classes.location}>
                  <div className="list-item__border__event">
                  <Grid container  spacing={0}>
                  
                  <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          className={classes.rootlist}
                          
                        >
                        {/*Instagram link*/}

                        <ListItem button className={classes.location}>
                          <InstagramIcon/>
                          <a className="button-no-deco" target="_blank" href={`${props.food.instaURL}`}>
                            <ListItemText primary={
                                    <React.Fragment>
                                      <Typography component="div" color="textPrimary">
                                        <Box  fontSize={20} fontWeight="fontWeightBold" m={1}>
                                          Instagram
                                        </Box>
                                      </Typography>
                                    </React.Fragment>
                                  } />
                          </a>
                          </ListItem>
                          <Divider  component="li" />
                        
                        {/*webpage link*/}

                          <ListItem button className={classes.location}>
                          <MapIcon/>
                          <a className="button-no-deco" target="_blank" href={`${props.food.map}`}>
                            <ListItemText primary={
                                    <React.Fragment>
                                      <Typography component="div" color="textPrimary">
                                        <Box  fontSize={20} fontWeight="fontWeightBold" m={1}>
                                          Google map 
                                        </Box>
                                      </Typography>
                                    </React.Fragment>
                                  } />
                          </a>
                          </ListItem>
                          {/* <Divider  component="li" /> */}
                          {/*日期可折疊的list*/}

                          
                          {/*list unit */}

                          {/* <ListItem button className={classes.list}>
                          <QueryBuilderIcon/>
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Hour stay
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                       {props.food.hourstay} {"hr"}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem> */}
                          <Divider  component="li" />
                          {/*list unit */}
                          <ListItem button className={classes.list}>
                          <AttachMoneyIcon/>
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Average price
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                      {"NTD$"} {props.food.averagePrice}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider  component="li" />
                          <ListItem className={classes.list}>
                          <LocationOnIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;Address
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                        {props.food.address}
                                      </Box>
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider  component="li" />
                          {/*list unit */}
                          <ListItem className={classes.list}>
                          <RateReviewIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box  component="div" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Review
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider variant="middle" component="li" />
                          <ListItem className={classes.sublist}>
                          <ThumbUpIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="span" color="textPrimary">
                                      <Box  component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;&nbsp;{props.food.likeby.length}&nbsp;&nbsp;LIKES
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <ListItem className={classes.sublist}>
                          <FlashOnIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="span" color="textPrimary">
                                      <Box  component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;&nbsp;{props.food.dislikeby.length}&nbsp;&nbsp;BOO!
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            {/* edit */}
                          </ListItem>
                          {props.auth.isAdmin
                            ?
                            <Link  className="header__title"  to={`/${props.city}/edit/food/${props.match.params.id}`} >
                            <Button className={classes.button} color="primary" fullWidth variant="outlined">
                                Edit
                              </Button>
                            </Link>
                            : null}

                            {/* delete */}
                            {props.auth.isAdmin 
                            ?
                            
                            <span>
                            <Button fullWidth className={classes.button} onClick={handleClickDialogOpen} color="primary" variant="outlined">
                              Delete
                              </Button>
                              <Dialog 
                                open={openDel}
                                onClose={handleClickDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"You sure want to delete this?"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    After deleted all comment and images will be gone! 
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClickDialogClose} color="primary">
                                    Disagree
                                  </Button>
                                  <Button onClick={onDelete} color="primary" autoFocus>
                                    Agree
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              </span>
                            : null}
                          
                        </List>
                        
                    </Grid>
                  </div>
                  
                  </div>
                  </div>


                  


                      

                      

                  
                
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          </Grid>
          
        </div>
        <div className="show-for-mobile">
{/* 手機板 */}
<Grid container spacing={0}>
              <Grid item xs={12}>
              
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div className="responsive-image-div">
                      <img className="responsive-image" src={`${props.food.pictureURL.pictureURL}`}/>
                    </div>
                  </Grid>
                </Grid>
                <List key={props.food._id}>
                {/*title名稱 */}
                <ListItem key={props.food.englishname} alignItems="flex-start">
                        
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                color="textPrimary"
                              >
                                <Box  fontSize="h6.fontSize"  textAlign="center" fontWeight="fontWeightBold" >
                                  {props.food.englishname}&nbsp;&nbsp;(&nbsp;{props.food.name}&nbsp;)
                                </Box>

                                <Box  fontSize={16} textAlign="center" fontWeight="fontWeightRegular" >
                                  {props.food.city.toUpperCase()}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>

                      {/*label */}
                      <ListItem button className={classes.list} >
                          
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.alignlabel} component="div" color="textPrimary">
                                    {props.food.label.map((label)=>{
                                      return(
                                      <Box className="list-item__border__label" key={label.subLabel} component="span" fontSize={16} fontWeight="fontWeightBold" m={1}>
                                      &nbsp;&nbsp;{label.subLabel}&nbsp;&nbsp;  
                                      </Box>)
                                    })}
                                      
                                      
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <div className="list-item__border__event">
                    {(props.food.otherPic.map((otherPic)=>{
                        return (
                            <div key={otherPic._id}>
                            <input 
                                className="resize-image"
                                type="image"
                                src={`${otherPic.pictureURL}`}
                                alt="Image" 
                                name="Image_popup" 
                                value={`${otherPic.pictureURL}`}
                                onClick={handleClickOpen} />
                            
                            </div>
                        )})) 
                         }
                         <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 300,
                                }}
                            >
                            <Fade in={open}>
                                <div >
                                <img className="responsive-image" src={selectedModal}/>
                                </div>
                            </Fade>
                            </Modal>
                         </div>

                         {/*Instagram link*/}

                         <ListItem button className={classes.location}>
                          <InstagramIcon/>
                          <a className="button-no-deco" target="_blank" href={`${props.food.instaURL}`}>
                            <ListItemText primary={
                                    <React.Fragment>
                                      <Typography component="div" color="textPrimary">
                                        <Box  fontSize={20} fontWeight="fontWeightBold" m={1}>
                                          Instagram
                                        </Box>
                                      </Typography>
                                    </React.Fragment>
                                  } />
                          </a>
                          </ListItem>
                          <Divider  component="li" />
                        {/*webpage link*/}

                        <ListItem button className={classes.location}>
                          <MapIcon/>
                          <a className="button-no-deco" target="_blank" href={`${props.food.map}`}>
                            <ListItemText primary={
                                    <React.Fragment>
                                      <Typography component="div" color="textPrimary">
                                        <Box  fontSize={20} fontWeight="fontWeightBold" m={1}>
                                          Google map 
                                        </Box>
                                      </Typography>
                                    </React.Fragment>
                                  } />
                          </a>
                          </ListItem>
                          <Divider  component="li" />
                          {/*日期可折疊的list*/}

                          
                          {/*list unit */}

                          <ListItem button className={classes.list}>
                          <QueryBuilderIcon/>
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Hour stay
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                       {props.food.hourstay} {"hr"}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider  component="li" />
                          {/*list unit */}
                          <ListItem button className={classes.list}>
                          <AttachMoneyIcon/>
                          <ListItemText primary={
                                  <React.Fragment>
                                    <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Average price
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                      {"NTD$"} {props.food.averagePrice}
                                      </Box>
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider  component="li" />
                          <ListItem className={classes.list}>
                          <LocationOnIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;Address
                                      </Box>
                                      <Box className={classes.span} component="span" fontSize={16} fontWeight="fontWeightMedium" >
                                        {props.food.address}
                                      </Box>
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider  component="li" />
                          {/*list unit */}
                          <ListItem className={classes.list}>
                          <RateReviewIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="div" color="textPrimary">
                                      <Box  component="div" fontSize={16} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Review
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <Divider variant="middle" component="li" />
                          <ListItem className={classes.sublist}>
                          <ThumbUpIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="span" color="textPrimary">
                                      <Box  component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;&nbsp;{props.food.likeby.length}&nbsp;&nbsp;LIKES
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          <ListItem className={classes.sublist}>
                          <FlashOnIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                  
                                  <Typography className={classes.align} component="span" color="textPrimary">
                                      <Box  component="span" fontSize={16} fontWeight="fontWeightBold" >
                                        &nbsp;&nbsp;&nbsp;{props.food.dislikeby.length}&nbsp;&nbsp;BOO!
                                      </Box>

                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
                          {props.auth.isAdmin
                            ?
                            <Link  className="header__title" to={`/${props.city}/edit/place/${props.match.params.id}`} >
                            <Button color="primary" className={classes.button} fullWidth variant="outlined">
                                Edit
                              </Button>
                            </Link>
                            : null}
                            {/* delete */}
                            {props.auth.isAdmin 
                            ?
                            
                            <span>
                            <Button fullWidth className={classes.button} onClick={handleClickDialogOpen} color="primary" variant="outlined">
                              Delete
                              </Button>
                              <Dialog 
                                open={openDel}
                                onClose={handleClickDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"You sure want to delete this?"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    After deleted all comment and images will be gone! 
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClickDialogClose} color="primary">
                                    Disagree
                                  </Button>
                                  <Button onClick={onDelete} color="primary" autoFocus>
                                    Agree
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              </span>
                            : null}
                            <Divider variant="middle" component="li" />
                        
                              
                          
                          <Divider variant="middle" component="li" />
                          {/* Comment */}
                          <form className={classes.form} onSubmit={onSubmit}>
          <ListItem >
                          <CommentIcon  fontSize="large"/>
                          <ListItemText primary={
                                  <React.Fragment>
                                  
                                    <Typography  component="div" color="textPrimary">
                                      <Box  component="div" fontSize={20} fontWeight="fontWeightBold" >
                                      &nbsp;&nbsp;Comment
                                      </Box>
                                      
                                    
                                    </Typography>
                                  </React.Fragment>
                                } />
                            
                          </ListItem>
            {/* Name */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={props.auth.firstName ? props.auth.firstName : 'Login for comment'}
            disabled
          />
          {/* like or dislike */}
        <TextField
          id="standard-select-city"
          select
          label="Review"
          variant="outlined"
          value={review}
          onChange={onReviewChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="How do you like this Place"
          margin="normal"
        >
          <MenuItem value="">
            Neutral
          </MenuItem>
          <MenuItem value="like">
          <ThumbUpIcon/>
            &nbsp;&nbsp;Like
          </MenuItem>
          <MenuItem value="dislike">
          <FlashOnIcon/>
          &nbsp;&nbsp;Boo
          </MenuItem>
        </TextField>
          {/* text */}
          <TextField
            required
            id="text"
            name="text"
            label="Text"
            variant="outlined"
            margin="normal"
            fullWidth
            value={text}
            onChange={onTextChange}
            multiline
            rows="3"
            
          />
          <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>

        {/* otherPic */}
        <input
            name="image"
            accept="image/*"
            className={classes.input}
            id="contained-button-multifile"
            type="file"
            multiple
            onChange={onUploadMultiChange}
            disabled={props.auth.firstName ? false : true}
        />
        <label htmlFor="contained-button-multifile">
        <Button
            variant="contained"
            color="default"
            className={classes.submit}
            startIcon={<CloudUploadIcon />}
            component="span"
            disabled={props.auth.firstName ? false : true}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          </form>
                          <Divider variant="inset" component="li" />
                          <div >
                          {
                        (props.food.comment.map((comment) => {
                          return <Comment key={comment._id} {...comment} />;
                        }))
                      }
                      </div>
                    
                </List>
              </Grid>
            </Grid>
        </div>
        </div>
        : <LoadingPage/>
        }
        
      </div>
      
    );
    
};

const mapStateToProps = (state, props) => ({
  food: state.food.find((food) => food._id == props.match.params.id),
  auth: state.auth
});



export default connect(mapStateToProps)(PixelPageFood);
