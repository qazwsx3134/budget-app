import React ,{useState} from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PersonIcon from '@material-ui/icons/Person';
import dayjs from "dayjs";

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 1015,
    },
    inline: {
      display: 'inline',
    },  
    avatar: {
        color: '#FF6868',
        backgroundColor:"#FFCECE",
      },
    
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grid:{
      marginLeft: 30
    }
  });

  export const Comment = (props)=> {

    const [open, setOpen] = React.useState(false);
     
    const classes = useStyles();
    
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div className={classes.grid}>
      
      <Grid container key={props._id} >
        <Grid  item xs={12} >
        <ListItem  alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="h6"
                    className={classes.inline}
                    color="primary"
                  >
                    {props.name}
                  </Typography>

                  <Typography
                    component="span"
                    variant="h6"
                    color="textPrimary"
                  >
                    
                  </Typography>

                  </React.Fragment>
                  }
              secondary={
                <React.Fragment>
                  <Typography
                    component="div"
                    className={classes.inline}
                    color="textPrimary"
                  >
                  {props.text.split('\n').map((i,key)=>{
                    return <Box key={key}  component="p" fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>&nbsp;&nbsp;{i}</Box>;
                  })}
                    {/* <Box component="div" fontSize="h6.fontSize" lineHeight={1} fontWeight="fontWeightRegular"  m={1}>
                    &nbsp;&nbsp;{props.text}
                    </Box> */}
                    <Box component="div" fontSize={14}  fontWeight="fontWeightLight"  >
                    －{dayjs(props.posted).format('MMMM D YYYY, h:mm a')}
                    </Box>
                    
                  </Typography>
                  
                </React.Fragment>
              }
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} >
        <div className="list-item__border__qanda">
        {(props.otherPic.map((otherPic)=>{
                        return (
                            <div key={otherPic._id}>
                            <input 
                                className="resize-image"
                                type="image"
                                src={`${otherPic.pictureURL}`}
                                alt="Image" 
                                name="Image_popup" 
                                onClick={handleOpen} />
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
                                <img className="responsive-image" src={`${otherPic.pictureURL}`}/>
                                </div>
                            </Fade>
                            </Modal>
                            </div>
                        )})) 
                         }
                </div>  
        </Grid>
      </Grid>

      
      <Divider  component="li" variant="inset"/>
          </div>
    );
  };

