import React ,{ useEffect }from "react";
import { connect,useDispatch,useSelector  } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation 
  } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { setCityFilter,setTitleFilter, sortByDate, sortByAmount, sortByLike } from "../actions/filters";
import selectViewpoint from "../selectors/viewpoint.js";
import selectFood from "../selectors/food";
import selectQanda from "../selectors/qanda";
import selectEvent from "../selectors/event";
import { ListRenderLogic } from "./ListRenderLogic";
import ListView from "./ListView";
import { viewpoint,qanda,food,event } from "../store/store";
import { fetchViewpoints } from "../actions/viewpoint";
import { fetchQanda } from "../actions/qanda";
import { fetchFood } from "../actions/food";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';




const useStyles = makeStyles(theme =>({
    nested: {
        paddingLeft: theme.spacing(4),
      },
    text: {
      marginTop: 20,
      height: 80,
      maxHeight: 100,
      overflow: 'hidden',
    },
    city:{
        marginTop: 8,
    },
    card: {
        borderRadius: 8,
        marginTop: 10,
        maxWidth: 550,
      },
      media: {
        borderRadius: 8,
        marginBottom: 6,
        position: 'static',
        height: '100%',
        width: '100%',
        objectfit: 'cover',
        paddingTop: '75%', // 4:3
      },
      textalign:{
        margin: 2,
        paddingLeft:5,
      },
      pixel:{
        marginTop: 55,
    },
    icon:{
        maxWidth: 270
    },
    iconPad:{
        paddingLeft: 35  
    }
    
  }));

// import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

const dashboardInfo = [
    {
        city : "hualien",
        pictureURL: {
            pictureURL : "https://wayfarertwbucket.s3-ap-northeast-1.amazonaws.com/photo-1560348666-eda3c6ee17c7.jpg",
            key : "photo-1560348666-eda3c6ee17c7.jpg"
                    },
        label :[
            {subLabel : "Nature"},
            {subLabel : "Pacific Ocean"},
            {subLabel : "Taroko Gorge"}
                ],
            
    },
    {
        
        city : "taipei",
        pictureURL: {
            pictureURL : "https://wayfarertwbucket.s3-ap-northeast-1.amazonaws.com/photo-1470004914212-05527e49370b.jpg",
            key : "photo-1470004914212-05527e49370b.jpg"
            },
            label :[
                {subLabel : "Capital"},
                {subLabel : "City"},
                {subLabel : "Taipei 101"}
                    ],
        
    },
    {
        
        city : "newtaipei",
        pictureURL: {
            pictureURL : "https://wayfarertwbucket.s3-ap-northeast-1.amazonaws.com/pictureURL/1576217867380-eventpic1.jpg",
            key : "pictureURL/1576217867380-eventpic1.jpg"
            },
            label :[
                {subLabel : "Jiufen"},
                {subLabel : "Coastline"},
                {subLabel : "Hot Spring"}
                    ],
        
    },
    {
        
        city : "yilan",
        pictureURL: {
            pictureURL :"https://wayfarertwbucket.s3-ap-northeast-1.amazonaws.com/S__42311695.jpg",
            key : "S__42311695.jpg"
            },
            label :[
                {subLabel : "Forest"},
                {subLabel : "Lanyang Museum"},
                {subLabel : "Surfing"}
                    ],
        
    }
]


export const DashBoardList = (props)=> {
    
      
    const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        
        
    },[]);

    
    
    
    return(
    <div className="content-container">
        <div className="list-body">
            <Grid container  spacing={2}>
            <Grid item className={classes.city} xs={12}  >
            {/* 這邊可以有橫版廣告 */}
                <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    &nbsp;&nbsp;Explore the Beauty of Taiwan
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Every city has it's own unique DNA
                    </Box>
                </Typography>
            </Grid>
            { props.city && props.city.map((city)=>{
                return (<Grid item className={classes.city} key={city.city} xs={12} md={4}  >


                <Card className={classes.card} elevation={0}>
                    <Link className="button-no-deco" to={`/${city.city}`}>
                    <CardActionArea >
                    
                        
                        <CardMedia
                        className={classes.media}
                        image={`${city.pictureURL.pictureURL}`}
                        title={city.city}
                        />
                    <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                        <Box fontSize={14}  component="span" fontWeight="fontWeightBold" >
                            {city.city.toUpperCase()}&nbsp;&nbsp;
                        </Box>
                    </Typography>
                    <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                            
                            {city.label.map((subLabel)=>{
                                return (<Box fontSize={14} key={subLabel.subLabel} component="span" fontWeight="fontWeightBold" >
                                            <Chip label={subLabel.subLabel} variant="outlined" />&nbsp;
                                        </Box>)
                            })}
                            {/* <Box fontSize={14} alignItems="center" component="span" fontWeight="fontWeightBold"  >    
                            &nbsp;|&nbsp;
                            {likeby.length}&nbsp;LIKES
                            &nbsp;
                            {dislikeby.length}&nbsp;BOO!&nbsp;|
                            </Box> */}
                            
                    </Typography>
                    </CardActionArea>
                    </Link>

                    </Card>
                    


                    
                    
                </Grid>
                )
            })}
            <Grid item className={classes.pixel} xs={12} >
                <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    &nbsp;Feature of website
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prepare your trip
                    </Box>
                </Typography>
                <Grid container  spacing={0} spacing={2}>

                    <Grid item  xs={12} md={3} className={classes.icon} >
                        <div className={classes.iconPad}>
                            <SvgIcon color="primary" style={{ fontSize: 200 }}>
                                <LiveHelpOutlinedIcon/>
                            </SvgIcon>
                        </div>
                        
                        <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                            <Box fontSize={16}  component="div" textAlign="center" fontWeight="fontWeightBold" >
                            Question and Answer
                            </Box>
                            <Box fontSize={16} textAlign="center"  component="div"  >
                            &nbsp;&nbsp;You can ask any kind of question (Ex: ask for travel buddy, or where to surf...)
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item  xs={12} md={3} className={classes.icon}>
                        <div className={classes.iconPad}>
                            <SvgIcon  color="primary" style={{ fontSize: 200 }}>
                                <PlaceOutlinedIcon/>
                            </SvgIcon>
                        </div>
                        
                        <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                            <Box fontSize={16} textAlign="center"  component="div"  fontWeight="fontWeightBold" >
                            Place
                            </Box>
                            <Box fontSize={16} textAlign="center"  component="div"  >
                            &nbsp;&nbsp;You can explore the place that recommend by local 
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item  xs={12} md={3} className={classes.icon}>
                        <div className={classes.iconPad}>
                            <SvgIcon color="primary"  style={{ fontSize: 200 }}>
                                <FastfoodIcon/>
                            </SvgIcon>
                        </div>
                        
                        <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                            <Box fontSize={16} textAlign="center"  component="div"  fontWeight="fontWeightBold" >
                            Food
                            </Box>
                            <Box fontSize={16} textAlign="center"  component="div"  >
                            &nbsp;&nbsp;Small eats, and a lot of them, are the big thing in Taiwan.
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item  xs={12} md={3} className={classes.icon}>
                        <div className={classes.iconPad}>
                            <SvgIcon color="primary"  style={{ fontSize: 200 }}>
                                <EventAvailableOutlinedIcon/>
                            </SvgIcon>
                        </div>
                        
                        <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                            <Box fontSize={16} textAlign="center"  component="div"  fontWeight="fontWeightBold" >
                            Event
                            </Box>
                            <Box fontSize={16} textAlign="center"  component="div"  >
                            &nbsp;&nbsp;We're gathering the information of the event host by govenment and civilian
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid item className={classes.pixel} xs={12} >
            {/* 這邊可以有橫版廣告 */}
                <Typography className={classes.textalign} display="block" color="textPrimary" component="div" gutterBottom>
                    <Box fontSize={30}  component="div" fontWeight="fontWeightBold" >
                    &nbsp;10 things NOT to do in Taiwan!
                    </Box>
                    <Box fontSize={16}  component="div"  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Culture & Etiquette
                    </Box>
                </Typography>
                <div className="list-item__border__event" >
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Etiquette Tips for First-Time Travellers
                    </ListSubheader>
                }
                className={classes.root}
                >
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                        <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary=" A little effort in learning the culture is always appreciated. Right?" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <AccessibilityNewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Although not common in our own tradition, handshakes are the most usual form of greeting with foreigners. Taiwanese people are not so much into hugging. When friends and acquaintances meet, a slight head bow or a wave and a friendly “hi” will do." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <AccessibilityNewIcon />
                            </ListItemIcon>
                            <ListItemText primary="A few Chinese greeting phrases that may come in handy: “ni hao ma?” (how are you?), “hai!” (hey!), “hao jiu bu jian!” (it’s been a while!) or “chi bao le ma?” (have you eaten?)." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chopsticks are placed either on the table or across the top of the bowl. NEVER EVER stick them vertically into the bowl – it is a huge taboo." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Remember to use the shared pair of chopsticks when taking food from the plates." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hosts often place food on the guest’s plate. Don’t be surprised and don’t refuse when this happens." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Plates remain on the table while your rice bowl should be brought close to the mouth when eating." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Don’t start eating as soon as the food gets on the table.The host usually tells people when to start eating." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FeedbackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Do remove your shoes when entering someone’s house, even if they say it’s okay to keep it on." />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FeedbackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Do offer your seat to the elderly, kids and pregnant women, whether it is on the bus, MRT or train. You might get stared at or even scolded if you let a grandma remain standing in front of you!" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <FeedbackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Don’t step on the extra step (the higher stage that separates the inside and outside of the temple) while entering/leaving a temple." />
                        </ListItem>
                        </List>
                    </Collapse>
                </List>
                </div>
            </Grid>
                
            </Grid>
        </div>
    </div>
)};

const mapStateToProps = (state)=>{
    return {
        viewpoint: selectViewpoint(state.viewpoint,state.filters), //用selector搭配filter去把state map 到 props
        filters: state.filters,
        qanda: selectQanda(state.qanda,state.filters),
        food: selectFood(state.food,state.filters),
        event: selectEvent(state.event,state.filters),
        city: dashboardInfo
    };
}



  

export default connect(mapStateToProps)(DashBoardList); //前面放用arrow func return的object(從物件裡挑的) 後面放要連結的component 然後對於後面的component就能用props 擷取資料

