  
import React,{ useState } from 'react';
import { useDispatch,connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiUserLogin } from "../api/api";
import { login } from "../actions/auth";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wayfarer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
    color: '#FF0000'
  },
  facebook: {
    backgroundColor: '#4267B2',
    margin: theme.spacing(3, 0, 2),
  },
}));

  function SignIn() {

  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage]= useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const onEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const onPasswordChange = (e)=>{
    setPwd(e.target.value)
  }
  const onSubmit = (e) =>{
    event.preventDefault();
    apiUserLogin({
      email,
      password: pwd
    }).then((response)=>{
      dispatch(login(response.data))
      history.push("/")
    }).catch((e)=>{
      setErrorMessage(' Incorrect username or password')
      
    })
    
    
    
    
    
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Typography component="h5" variant="subtitle2" className={classes.errorMessage}>
          {errorMessage 
            ? errorMessage
            : null}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="http://localhost:3000/auth/facebook" >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.facebook}
          >
            Sign In with Facebook
          </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              
              Login to Explore Taiwan
              
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default connect()(SignIn);