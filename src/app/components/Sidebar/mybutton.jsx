import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';

import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import TvIcon from '@material-ui/icons/Tv';
import EmojiPeopleTwoToneIcon from '@material-ui/icons/EmojiPeopleTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EventSeatIcon from '@material-ui/icons/EventSeat';

import LineStyleIcon from '@material-ui/icons/LineStyle';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import AppsIcon from '@material-ui/icons/Apps';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RedditIcon from '@material-ui/icons/Reddit';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import './Sidebar.css';

const Mybutton = props => {
  return (
    <ListItem
      button
      onClick={() => {
        props.onClick(props.label);
      }}
      className="listItem"
    >
      <ListItemIcon>
        {props.label === 'Dasboard' ? (
          <LineStyleIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Administrator' ? (
          <GpsFixedIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Vendors' ? (
          <StorefrontIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Tags' ? (
          <LocalOfferIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Users' ? (
          <PersonPinCircleIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Events' ? (
          <EventSeatIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Music On Demand' ? (
          <MusicVideoIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'App TV' ? (
          <TvIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Statistics' ? (
          <BarChartIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Customer Support' ? (
          <EmojiPeopleTwoToneIcon style={{ color: '#DC7633' }} />
        ) : (
          <RedditIcon style={{ color: '#DC7633' }} />
        )}
      </ListItemIcon>
      <ListItemText primary={props.label} />
      {props.expand ? <RemoveCircleOutlineIcon /> : <AddIcon />}
    </ListItem>
  );
};

export default Mybutton;
