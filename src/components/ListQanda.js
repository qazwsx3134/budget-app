import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor:"#fd868c",
  },
  title: {
    wordWrap: 'break-word'
  },
  
});

export const ListQanda = (props) => {
  const classes = useStyles();
  return ( //解構props 抓很重要
        <Grid item key={props._id} xs={12} >
      <Link className="list-item" to={`${props.history.location.pathname}/${props._id}`}>
        <Grid item xs={12} md={3} >
            <div>
              {props.otherPic[0] && <img className="resize-image" src={`${props.otherPic[0].pictureURL}`}/>}
            </div>
        </Grid>

        <Grid item xs={12} md={7} >
          <div>
            <Typography component="div" color="textSecondary">
              <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                {props.city.toUpperCase()}&nbsp;&nbsp;|&nbsp;&nbsp;Topic&nbsp;:&nbsp;{props.topic}&nbsp;&nbsp;|
              </Box>
            </Typography>

            <Typography component="div">
              <Box className={classes.title} fontSize="h4.fontSize" fontWeight="fontWeightBold" m={1}>
                {props.title}
              </Box>
            </Typography>

          </div>
        </Grid>
        <Grid item xs={12} md={2} >
          <div>
              <Typography component="div">
                <Box  fontSize="h6.fontSize" lineHeight={2.5} fontWeight="fontWeightMedium" fontStyle="oblique" m={1}>
                &nbsp;&nbsp;&nbsp;{props.likeby ? props.likeby.length : 0}&nbsp;&nbsp;LIKES<br/>&nbsp;&nbsp;&nbsp;{props.dislikeby ? props.dislikeby.length : 0}&nbsp;&nbsp;BOO
                </Box>
              </Typography>
              <Typography component="div" color="textSecondary">
                <Box  fontSize={18} fontWeight="fontWeightRegular" m={1}>
                {props.author.name}&nbsp;&nbsp;&nbsp;&nbsp;{dayjs(props.posted).format('YYYY/MM/DD')}
                </Box>
              </Typography>

            </div>
        </Grid>
          
            
            


            

            
            
          </Link>
        </Grid>
        
)};



export default connect()(ListQanda);