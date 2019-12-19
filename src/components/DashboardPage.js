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
import LoadingPage from './LoadingPage'
import DashboardListView from "./DashboardListView";
import Footer from "./Footer";

const useStyles = makeStyles({
  text: {
    marginTop: 20,
    height: 80,
    maxHeight: 100,
    overflow: 'hidden',
  },
  pixel:{
    marginTop: 55,
},
});

export const Dashboard = (props) => {
  const classes = useStyles();
  return ( //解構props 抓很重要
    
    <div className="content-container">
    <div >
    <Grid container  spacing={0}>
    {props.event[0]
        ?
        <div >
        <Grid container  >
            <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    Popular Events
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    the most popular Current Event
                    </Box>
            </Typography>
          <Grid item xs={12}>
          <Link className="list-item__event" to={`${props.history.location.pathname}/event/${props.event[0]._id}`}>

          <Grid container  spacing={1}>

            <Grid item xs={12} md={8}>
              <div>
                {props.event[0].pictureURL.pictureURL && <img className="event-image" src={`${props.event[0].pictureURL.pictureURL}`}/>}
              </div>
            </Grid>


            <Grid item xs={12} md={4}>
              <div>
              <Typography component="div" color="textSecondary">
                <Box  fontSize="h6.fontSize" fontWeight="fontWeightRegular" m={1}>
                  {props.event[0].city.toUpperCase()}
                </Box>
              </Typography>

              <Typography component="div">
                <Box  fontSize="h3.fontSize"   lineHeight={1}  fontWeight="fontWeightBold" m={1}>
                  {props.event.title}
                </Box>
              </Typography>

              
                <Typography component="div" >
                  <Box className={classes.text} fontSize="subtitle1" fontWeight="fontWeightMedium"  m={1}>
                    {props.event[0].text}
                  </Box>
                </Typography>

                <Typography component="div">
                  
                  <Box fontFamily="fontFamily" fontSize="subtitle1" fontWeight="fontWeightMedium" m={1}>
                  <LocationOnIcon/>
                  {props.event[0].address}
                  </Box>
                </Typography>

                <Typography component="div">
                  <Box  fontSize="subtitle1" fontWeight="fontWeightMedium" m={1}>
                  <EventIcon/>
                  {dayjs(props.event[0].startDate).format('MMM D')}&nbsp;-&nbsp;{dayjs(props.event[0].endDate).format('MMM D')}
                  </Box>
                </Typography>

                

              </div>
            </Grid>
            
          </Grid>
          
            


            
            
          </Link>
          </Grid>
          <Link className="list-item__event" to={`${props.history.location.pathname}/event`}>
            <Typography display="block" color="primary" component="div" gutterBottom>
              <Box fontSize={16}  component="div" fontWeight="fontWeightBold" >
              Show more event ->
              </Box>
            </Typography>
            </Link>
        </Grid>
        <Typography className={classes.pixel} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    Popular Place
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    the most popular places
                    </Box>
        </Typography>
        <Grid item xs={12} >
          

            <Grid container  spacing={2}>
              {
                (props.viewpoint.slice(0,4).map((viewpoint) => {
                return <DashboardListView key={viewpoint._id} {...viewpoint}{...props} />;
                }))
              }
            </Grid>
            <Link className="list-item__event" to={`${props.history.location.pathname}/places`}>
            <Typography display="block" color="primary" component="div" gutterBottom>
              <Box fontSize={16}  component="div" fontWeight="fontWeightBold" >
              Show more place ->
              </Box>
            </Typography>
            </Link>
          </Grid>
          <Typography className={classes.pixel} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    Popular food
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    the most popular food
                    </Box>
        </Typography>
        <Grid item xs={12} >
          

            <Grid container  spacing={2}>
              {
                (props.food.slice(0,4).map((food) => {
                return <DashboardListView key={food._id} {...food}{...props} />;
                }))
              }
            </Grid>
            <Link className="list-item__event" to={`${props.history.location.pathname}/food`}>
            <Typography display="block" color="primary" component="div" gutterBottom>
              <Box fontSize={16}  component="div" fontWeight="fontWeightBold" >
              Show more food ->
              </Box>
            </Typography>
            </Link>
          </Grid>
          </div>
        : <LoadingPage/>
        }
        </Grid>
        
        </div>
        <Footer />
        </div>

        
          
        
        
)};

const mapStateToProps = (state)=>{
  return {
      viewpoint: state.viewpoint, 
      filters: state.filters,
      qanda: state.qanda,
      food: state.food,
      event: state.event,
      auth: state.auth
  };
}


export default connect(mapStateToProps)(Dashboard);