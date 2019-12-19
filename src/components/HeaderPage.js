import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TerrainIcon from '@material-ui/icons/Terrain';
import SearchIcon from '@material-ui/icons/Search';
import Popper from '@material-ui/core/Popper';
import PinDropIcon from '@material-ui/icons/PinDrop';

const useStyles = makeStyles(theme => ({
    root: {
      
      maxWidth: 1120,
    },
    marginbottom: {
        marginBottom: 10,
    },
    button: {
        background: '#f7f7f7',
    },
    inline:{
        maxWidth: 165
    }
    
  }));
  



export const Headerpage = ({expenseCount, expensesTotal }) =>{
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    const classes = useStyles();
    return (
        <div className="page-header">
             <Grid container spacing={1} className={classes.root}>
                <div className="button-span__container">
                    
                    <span className="button-span">
                            <Button 
                                className={classes.button}
                                variant="contained" 
                                size="large"
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                ref={anchorRef} 
                                onClick={handleToggle}>
                                <SearchIcon/>
                                &nbsp;&nbsp; Click to explore &nbsp;&nbsp;
                                <TerrainIcon/>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-start'} transition>
                                {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper >
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                                        <MenuItem onClick={handleClose}>
                                        <Link className="button-link__sub__router" id="outlined-button-link-Hualien" to="/hualien">
                                            <Typography
                                            component="div"
                                            className={classes.inline}
                                            
                                        >
                                            
                                            
                                            <Box  fontSize="h5.fontSize"  textAlign="left" fontWeight="fontWeightBold" >
                                            <PinDropIcon/>
                                            &nbsp;&nbsp;Hualien&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Box>    
                                                                     
                                        </Typography>
                                        </Link>  
                                        </MenuItem>
                                    
                                    
                                        <MenuItem onClick={handleClose}>
                                            <Typography
                                            component="div"
                                            className={classes.inline}
                                            
                                        >
                                            <Link className="button-link__sub__router" id="outlined-button-link-Hualien" to="/taipei">
                                            
                                            <Box  fontSize="h5.fontSize"  textAlign="left" fontWeight="fontWeightBold" >
                                            <PinDropIcon/>
                                            &nbsp;&nbsp;Taipei&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Box>    
                                            </Link>                           
                                        </Typography>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Typography
                                            component="div"
                                            className={classes.inline}
                                            
                                        >
                                            <Link className="button-link__sub__router" id="outlined-button-link-Hualien" to="/newtaipei">
                                            
                                            <Box  fontSize="h5.fontSize"  textAlign="left" fontWeight="fontWeightBold" >
                                            <PinDropIcon/>
                                            &nbsp;&nbsp;NewTaipei
                                            </Box>    
                                            </Link>                           
                                        </Typography>
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <Typography
                                            component="div"
                                            className={classes.inline}
                                            
                                        >
                                            <Link className="button-link__sub__router" id="outlined-button-link-Hualien" to="/yilan">
                                            
                                            <Box  fontSize="h5.fontSize"  textAlign="left" fontWeight="fontWeightBold" >
                                            <PinDropIcon/>
                                            &nbsp;&nbsp;Yilan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Box>    
                                            </Link>                           
                                        </Typography>
                                        </MenuItem>
                                    
                                    </MenuList>
                                    </Paper>
                                </Fade>
                                )}
                            </Popper>
                    </span>
                
                    
                </div>
             </Grid>
                
                
                
        </div>
    )
}


export default connect()(Headerpage)