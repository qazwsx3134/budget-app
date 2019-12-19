import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch  } from "react-redux";
import { sortByLike} from "../actions/filters";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import {
  useParams,
  Link,
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles({
  card: {
    borderRadius: 8,
    marginTop: 10,
    maxWidth: 320,
  },
  cardDetails: {
    margin: 5,
  },
  media: {
    borderRadius: 8,
    marginBottom: 6,
    position: 'static',
    height: '100%',
    width: '100%',
    objectfit: 'cover',
    paddingTop: '133.33%', // 16:9
  },
  nopadding:{
    padding:0,
  },
  textalign:{
    margin: 2,
    paddingLeft:5,
  }
});

export default function DashboardListView({history,pictureURL,name, _id, city, englishname, description,label,address,website,type,likeby,dislikeby}) {
  
  const classes = useStyles();
  
  
  return (
    <Grid item key={_id} xs={6} md={3}>
    <Card className={classes.card} elevation={0}>
      <Link className="button-no-deco" to={`${history.location.pathname}/${type}/${_id}`}>
      <CardActionArea >
        
        <CardMedia
        className={classes.media}
        image={`${pictureURL.pictureURL}`}
        title={englishname}
      />
      <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
            <Box fontSize={14}  component="span" fontWeight="fontWeightBold" >
              {city.toUpperCase()}&nbsp;&nbsp;
            </Box>
            <Box fontSize={14} alignItems="center" component="span" fontWeight="fontWeightBold"  >    
              &nbsp;|&nbsp;
              {likeby.length}&nbsp;LIKES
              &nbsp;
              {dislikeby.length}&nbsp;BOO!&nbsp;|
            </Box>
            
      </Typography>

      <Typography className={classes.textalign}  display="block" color="textPrimary" component="div"  >
          <Box fontFamily="fontFamily"  fontSize={18} fontWeight="fontWeightBold" >
          {englishname}
          </Box>
      </Typography>
 
        
      </CardActionArea>
      </Link>

    </Card>
    </Grid>
  );
}