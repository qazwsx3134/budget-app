import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
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
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  copyright: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    position: 'absolute',
    left: 0,
    minWidth:'100vw',
    padding: theme.spacing(3, 2),
    marginTop: 90,
    backgroundColor:
      theme.palette.grey[800],
    color: '#fff'
  },
    
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div >
      
      <footer className={classes.footer}>
        <Container maxWidth="lg">
        <Typography variant="body1">Any suggestion or bugs report &nbsp;&nbsp; Interesting in business partner</Typography>
          <Typography variant="body1">Contact me</Typography>
          <Typography variant="body1">qazwsx3134@gmail.com</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}