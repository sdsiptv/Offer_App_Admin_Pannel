import React from 'react';
import './Sidebar.css';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';

import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import TvIcon from '@material-ui/icons/Tv';
import EmojiPeopleTwoToneIcon from '@material-ui/icons/EmojiPeopleTwoTone';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EventSeatIcon from '@material-ui/icons/EventSeat';

import LineStyleIcon from '@material-ui/icons/LineStyle';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RedditIcon from '@material-ui/icons/Reddit';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AddIcon from '@material-ui/icons/Add';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import FormatShapesOutlinedIcon from '@material-ui/icons/FormatShapesOutlined';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

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
        ) : props.label === 'Management' ? (
          <PermDataSettingIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Location' ? (
          <AddLocationIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Advertisement' ? (
          <FormatShapesOutlinedIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Vendors' ? (
          <StorefrontIcon style={{ color: '#DC7633' }} />
        ) : props.label === 'Tags' ? (
          <LoyaltyIcon style={{ color: '#DC7633' }} />
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
        ) : props.label === 'App Support' ? (
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
