import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import SettingsIcon from "@material-ui/icons/Settings";

const DynamicIcon = ({ classes, name }) => {
    switch (name) {
    case "settings": return <SettingsIcon />;
    case "phone": return <PhoneIcon />;
    default: return <HelpIcon />;
    }

};

const styles = {
    root: {},
};

export default withStyles(styles)(
    DynamicIcon
);
