import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';


const useStyles = makeStyles({
  text: {
    marginTop: 20,
    height: 80,
    maxHeight: 100,
    overflow: 'hidden',
  },
});

export const ListEvent = (props) => {
  const classes = useStyles();
  return ( //解構props 抓很重要
        <Grid item key={props._id} xs={12} >
          <Link className="list-item__event" to={`${props.history.location.pathname}/${props._id}`}>

          <Grid container  spacing={2}>

            <Grid item xs={12} md={8}>
              <div>
                {props.pictureURL.pictureURL && <img className="event-image" src={`${props.pictureURL.pictureURL}`}/>}
              </div>
            </Grid>


            <Grid item xs={12} md={4}>
              <div>
              <Typography component="div" color="textSecondary">
                <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                  {props.city.toUpperCase()}
                </Box>
              </Typography>

              <Typography component="div">
                <Box  fontSize="h3.fontSize"   lineHeight={1}  fontWeight="fontWeightBold" m={1}>
                  {props.title}
                </Box>
              </Typography>

              
                <Typography component="div" >
                  <Box className={classes.text} fontSize="subtitle1" fontWeight="fontWeightMedium"  m={1}>
                    {props.text}
                  </Box>
                </Typography>

                <Typography component="div">
                  
                  <Box fontFamily="fontFamily" fontSize="subtitle1" fontWeight="fontWeightMedium" m={1}>
                  <LocationOnIcon/>
                  {props.address}
                  </Box>
                </Typography>

                <Typography component="div">
                  <Box  fontSize="subtitle1" fontWeight="fontWeightMedium" m={1}>
                  <EventIcon/>
                  {dayjs(props.startDate).format('MMM D')}&nbsp;-&nbsp;{dayjs(props.endDate).format('MMM D')}
                  </Box>
                </Typography>

                

              </div>
            </Grid>
            
          </Grid>
          
            


            
            
          </Link>
        </Grid>
        
)};



export default connect()(ListEvent);