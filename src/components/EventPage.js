import React ,{ useState } from 'react';
import { connect,useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import dayjs from "dayjs";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LoadingPage from './LoadingPage'
import Dialog from '@material-ui/core/Dialog';
import { apiDeleteEvent,apiDeleteSingle } from "../api/api";
import { removeEvent } from "../actions/event";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from './Footer'

const useStyles = makeStyles({
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootlist: {
    width: '100%',
    maxWidth: 360,
  },
  nestedlist: {
    paddingLeft: 20,
  },
  button:{
    margin: 10,
  },
  
});

export const EventPage = (props)=> {
    const [selectedModal, setSelectedModal] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [listopen, setListOpen] = React.useState(true);
    const [openDel, setOpenDel] = useState(false);


    const dispatch = useDispatch()

    const classes = useStyles();
    
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

      if (props.event.pictureURL) {
        
          
        const deleData = await apiDeleteSingle({"key" : props.event.pictureURL.key})
        console.log(deleData);
        
      }
        
      if (props.event.otherPic) {
        props.event.otherPic.map(async(otherPic)=>{
          
          const deleData = await apiDeleteSingle({"key" : otherPic.key})
          console.log(deleData);
        })
        
      }
      setOpenDel(false);
      const deleteRes = await apiDeleteEvent(props.match.params.id)
      dispatch(removeEvent(props.match.params.id))
      
    }
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleClick = () => {
      setListOpen(!listopen);
    };

    return (
        <div className="content-container">
        {/*fetch還是有時間差 所以要接loading page等待api */}
        {props.event
          ?
            <div>
            <div >
                <img className="responsive-event-image" src={`${props.event.pictureURL.pictureURL}`}/>
            </div>
            {/*圖的modal */}
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className="list-item__border__event">
                    {(props.event.otherPic.map((otherPic)=>{
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
                                <img src={selectedModal}/>
                                </div>
                            </Fade>
                            </Modal>
                         </div>
                         
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                      
                  <List >
                      
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
                                  {props.event.title}
                                </Box>

                                <Box  fontSize="h6.fontSize" textAlign="center" fontWeight="fontWeightRegular" >
                                  {props.event.city.toUpperCase()}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>
                      
                    </List>
                    </Grid>
                      
                  
                  <Grid item xs={12}>
                    <Grid container spacing={0}>
                        {/*左半部*/}
                      <Grid item xs={12} md={8} >
                      <Divider variant="middle" component="div" />
                      <List >
                      
                      
                      
                      <ListItem >
                        
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                <Box  fontSize={20} textAlign="center" fontWeight="fontWeightRegular" m={2} >
                                  {props.event.text}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                      <ListItem >
                        
                        <ListItemText
                          
                          primary={
                            <React.Fragment>
                              <Typography
                                
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                <Box  fontSize="h5.fontSize"  component="span" textAlign="center" fontWeight="fontWeightBold" m={1} >
                                  Announcements&nbsp;:
                                </Box>

                                <Box  fontSize="h6.fontSize" component="span" textAlign="center" fontWeight="fontWeightRegular" m={1} >
                                  {props.event.notes}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>
                      <ListItem >
                        
                        <ListItemText
                          
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                <Box  fontSize="h5.fontSize" component="span" textAlign="center" fontWeight="fontWeightBold" m={1} >
                                  Organizer&nbsp;:&nbsp;{props.event.organizer}
                                </Box>

                              </Typography>
                            </React.Fragment>
                          }
                          
                        />
                      </ListItem>
                    </List>
                        
                    
                      </Grid>
                      

                      {/*右半部*/}
                      <Grid item xs={12} md={4}>
                      {/*灰色class+border*/}
                      <div className="list-item__border__event">

                      <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Event Information
                            </ListSubheader>
                          }
                          className={classes.rootlist}
                        >

                        {/*webpage link*/}

                          <ListItem button>
                          <LanguageIcon/>
                          <a className="button-no-deco" target="_blank" href={props.event.website}>
                            <ListItemText primary={
                                    <React.Fragment>
                                      <Typography component="div" color="textPrimary">
                                        <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                                          &nbsp;WEBSITE
                                        </Box>
                                      </Typography>
                                    </React.Fragment>
                                  } />
                          </a>
                          </ListItem>

                          {/*日期可折疊的list*/}

                          <ListItem button onClick={handleClick}>
                              <EventIcon/>  
                            <ListItemText primary={
                                  <React.Fragment>
                                    <Typography component="div" color="textPrimary">
                                      <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                                        &nbsp;DATE
                                      </Box>
                                    </Typography>
                                  </React.Fragment>
                                } />
                            {listopen ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                          <Collapse in={listopen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem button className={classes.nestedlist}>
                                <ListItemText primary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      className={classes.inline}
                                    >
                                      <Box fontFamily="fontFamily" textAlign="right" fontSize={18} fontWeight="fontWeightMedium" >
                                      {dayjs(props.event.startDate).format('MMM D')}&nbsp;-&nbsp;{dayjs(props.event.endDate).format('MMM D')}
                                      </Box>
                                    </Typography>
                                      
                                  </React.Fragment>
                                } />
                              </ListItem>
                            </List>
                          </Collapse>

                          {/*地址伸縮欄*/}
                          <ListItem button onClick={handleClick}>
                              <LocationOnIcon />
                            <ListItemText primary={
                                  <React.Fragment>
                                    <Typography component="div" color="textPrimary">
                                      <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                                        &nbsp;ADDRESS
                                      </Box>
                                    </Typography>
                                  </React.Fragment>
                                } />
                            {listopen ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                          <Collapse in={listopen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            <a className="button-no-deco" target="_blank" href={props.event.googleMapUrl}>
                              <ListItem button className={classes.nestedlist}>
                                <ListItemText primary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      className={classes.inline}
                                      
                                    >
                                      <Box fontFamily="fontFamily" textAlign="right" fontSize={18} fontWeight="fontWeightMedium" >
                                      {props.event.address}
                                      </Box>
                                    </Typography>
                                      
                                  </React.Fragment>
                                } />
                              </ListItem>
                              </a>
                              {props.auth.isAdmin
                            ?
                            <Link  className="header__title" to={`/${props.city}/edit/event/${props.match.params.id}`} >
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
                          </Collapse>
                          
                        </List>
                        
                        </div>
                      </Grid>
                      
                    </Grid>
                  </Grid>

                </Grid>

            </Grid>
            <Footer/>
            </div>
            : <LoadingPage/>
        }
        </div>
        
      
    );
  };


const mapStateToProps = (state, props) => ({
  event: state.event.find((event) => event._id === props.match.params.id),
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  fetchQanda: (qanda) => dispatch(fetchQanda(qanda)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
