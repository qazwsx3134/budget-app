import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import tabsprops from '../reducers/tabsprops';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function ButtonItemLink(props) {

    //把需要用到的props定義出來
  const { icon, primary, to ,name} = props;

    //把Link funtion寫好
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );
        //製造組件
  return (
    // <li>
    //   <ListItem button component={renderLink}>
    //     {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
    //     <ListItemText primary={primary} />
    //   </ListItem>
    // </li>
    <Button
        component={renderLink}
        startIcon={icon}
        variant='outlined'
    >
        {name}
    </Button>
  );
}

ButtonItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 360,
  },
});

export default function ButtonRouter() {
  const classes = useStyles();

  return (
            <ButtonItemLink to="/" name="Attractions" icon={<LocationOnIcon/>}/>
  );
}