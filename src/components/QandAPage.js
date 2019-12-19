import React ,{ useState } from 'react';
import { useDispatch,connect } from "react-redux";
import { Link,useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Comment } from "./Comment";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PersonIcon from '@material-ui/icons/Person';
import LoadingPage from './LoadingPage'
import dayjs from "dayjs";
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from '@material-ui/core/MenuItem';
import { apiUploadMulti, apiPushCommentQanda, apiFilteredGetQanda,apiLikeQanda,apiDislikeQanda,apiDeleteQanda,apiDeleteSingle } from "../api/api";
import { fetchQanda,removeQanda } from "../actions/qanda";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from "./Footer";

const useStyles = makeStyles(theme=>({
  root: {
    width: '100%',
    maxWidth: 1015,
    padding: 15,
  },
  inline: {
    display: 'inline',
  },  
  avatar: {
      color: '#fff',
      backgroundColor:"#fd868c",
    },
  textarea:{
    margin: 10,
    minHeight: 30,
    paddingLeft: 60,
    marginBottom: 20,
  },
  button:{
    margin: 10,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background:{
    borderRadius: 6,
      background: '#F2F3F5',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  title: {
    wordWrap: 'break-word'
  },
}));

export const QandAPage = (props)=> {
    const [selectedModal, setSelectedModal] = useState(null);
    const [errorMessage, setErrorMessage]= useState();
    const [openDel, setOpenDel] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [review, setReview] = useState('');
    const [otherPic ,setOtherPic] = useState([]);

    let history = useHistory();
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
    const onDelete = async(e)=>{

      if (props.qanda.otherPic) {
        props.qanda.otherPic.map(async(otherPic)=>{
          
          const deleData = await apiDeleteSingle({"key" : otherPic.key})
          
        })
        
      }
      setOpenDel(false);
      const deleteRes = await apiDeleteQanda(props.match.params.id)
      dispatch(removeQanda(props.match.params.id))
      history.goBack()
    }
    const onReviewChange = (e)=>{
      setReview(e.target.value)
    }
    const onTextChange = (e)=>{
      setText(e.target.value)
    }
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    // 把 上傳的檔案丟到API做上傳後 回傳array存在otherPic
    const onUploadMultiChange = async(e)=>{
      const multiFormData = new FormData()
      for (let index = 0; index < e.target.files.length; index++) {
        multiFormData.append('image',e.target.files[index])
        
      }
      const multiRes = await apiUploadMulti(multiFormData)
      setOtherPic(multiRes.data)
    }
  
    // 要登入後把auth 的 id 跟名字那些 組成data 而且如果沒有登入的話會有error message
    const onSubmit = async(e) =>{
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
      

      //表單送出邏輯
      if (props.auth.firstName) {
        // LIKE 或 BOO 
        if (review == "like") {
          console.log('like');
          const likeRes = await apiLikeQanda(userData,props.match.params.id)
          console.log(likeRes);
          
        }else if (review == "dislike") {
          console.log('dislike');
          const dislikeRes = await apiDislikeQanda(userData,props.match.params.id)
          console.log(dislikeRes);
          
        }
        const patchRes = await apiPushCommentQanda(commentData,props.match.params.id)
        console.log(patchRes);
        setText('')
        const qandaRes = await apiFilteredGetQanda(props.city)
        setOtherPic([])
        
        
        return
      }
      setErrorMessage('You have to login to comment')
    }
    return (
      <div className="content-container">
      {props.qanda
        ?
        <div className="list-header">
        
        <List className={classes.root}>
        <Grid container key={props.qanda._id} >
          <Grid item xs={12} >
          {props.auth.isAdmin || props.auth._id==props.qanda.author[0].user
                            ?
                            
                            <Link className={classes.button} className="header__title"  to={`/${props.city}/edit/qanda/${props.match.params.id}`} >
                            <Button color="primary" variant="outlined">
                                Edit
                              </Button>
                            </Link>
                            
                            : null}
              
            {props.auth.isAdmin || props.auth._id==props.qanda.author[0].user
                            ?
                            
                            <span>
                            <Button  className={classes.button} onClick={handleClickDialogOpen} color="primary" variant="outlined">
                              Delete
                              </Button>
                              <Dialog 
                                open={openDel}
                                onClose={handleClickDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"You sure want to delete this Question?"}</DialogTitle>
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
          <ListItem alignItems="flex-start">
          
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              color="primary"
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="h6"
                    className={classes.inline}
                    color="primary"
                  >
                    {props.qanda.author[0].name}
                  </Typography>
                  </React.Fragment>
                  }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="h6"
                    className={classes.title}
                    color="textPrimary"
                  >
                    {props.qanda.title}
                  </Typography>
                  －{dayjs(props.qanda.posted).format('MMMM D YYYY, h:mm a')}
                </React.Fragment>
              }
            />
          </ListItem>
            <Typography component="div" className={classes.textarea} >
              <Box  fontSize="h6.fontSize" lineHeight={1} fontWeight="fontWeightRegular"  m={1}>
              {props.qanda.text}
              </Box>
            </Typography>
            
            </Grid>
            <Grid item xs={12} >
            <div className="list-item__border__qanda">
            {(props.qanda.otherPic.map((otherPic)=>{
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
                                <img className="responsive-image" src={`${selectedModal}`}/>
                                </div>
                            </Fade>
                            </Modal>
                         </div>
            </Grid>
            </Grid>
          <Divider  component="li" />
          {/* form */}
          <form className={classes.form} onSubmit={onSubmit}>
          {/* Comment with icon */}
          <ListItem >
            <CommentIcon  fontSize="large"/>
            <ListItemText primary={
                    <React.Fragment>
                    
                      <Typography  component="div" color="textPrimary">
                        <Box  component="div" fontSize={20} fontWeight="fontWeightBold" >
                        &nbsp;&nbsp;Leave your comment
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
          helperText="How do you like this Question"
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

        {/* submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          </form>
          <Divider  component="li" />
          {
            (props.qanda.comment.map((comment) => {
              return <Comment key={comment._id} {...comment} />;
            }))
          }
          
          
        </List>
        
        </div>
        : <LoadingPage/>
        }
        <Footer/> 
      </div>
    );
  };


const mapStateToProps = (state, props) => ({
  qanda: state.qanda.find((qanda) => qanda._id === props.match.params.id),
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  fetchQanda: (qanda) => dispatch(fetchQanda(qanda)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QandAPage);
