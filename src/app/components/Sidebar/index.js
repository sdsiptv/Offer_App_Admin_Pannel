import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Mybutton from './mybutton';
import './Sidebar.css';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import LineStyleIcon from '@material-ui/icons/LineStyle';


export default function Sidebar() {
  let history = useHistory();
  let isSelfSigned = process.env.REACT_APP_SELF;
  const Role = localStorage.getItem("roles")

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);


  const options = [
    { name: 'Administrator', open: open, setOpen: setOpen },
    { name: 'Vendors', open: open1, setOpen: setOpen1 },
    { name: 'Tags', open: open2, setOpen: setOpen2 },
    { name: 'Customer Support', open: open3, setOpen: setOpen3 },
    { name: 'Users', open: open4, setOpen: setOpen4 },
    { name: 'Events', open: open5, setOpen: setOpen5 },
  ];

  let SubscribersMenu = [
    { name: 'Subscribers', link: '/Subscribers' },
    { name: 'Subscriber Package Details', link: '/UserPackageDetails' },
  ];

  if (isSelfSigned === 'true') {
    SubscribersMenu.push({ name: 'Assign Package', link: '/AssignPackage' });
  }

  let SubscribersMenuSms = [
    { name: 'Subscribers', link: '/Subscribers' },
    { name: 'Subscriber Package Details', link: '/UserPackageDetails' },
  ];


  const handleClick = name => {
    const selectedOption = options.find(option => option.name === name);
    options.forEach(option => option.setOpen(false));
    selectedOption.setOpen(!selectedOption.open);
  };

  return (
    <List
      style={{ width: '90%', paddingRight: '0px' }}
      sx={{ width: '100%', maxWidth: 340, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="listNav"
    >
      <div>
        <NavLink to="/dashboard" className="linkitem">
          <ListItem button className="listItem">
            <ListItemIcon>
              <LineStyleIcon style={{ color: '#DC7633' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: 'black' }} />
          </ListItem>
        </NavLink>

        <Mybutton label="Administrator" onClick={handleClick} expand={open} style={{ color: 'black' }} />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'Admin SignUp', link: '/AdminSignUp' },
              { name: 'Subscription', link: '/Subscription' },
              { name: 'Category', link: '/ListCategory' },
              { name: 'Advertisement', link: '/advertisement' },
              { name: 'States', link: '/ListStates' },
              { name: 'District', link: '/ListDistrict' },
              { name: 'City', link: '/ListCity' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <Mybutton label="Vendors" onClick={handleClick} expand={open1} style={{ color: 'black' }} />
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'All Vendors', link: '/ListAllVendors' },
              { name: 'Pending Vendors', link: '/ListPendingVendors' },
              { name: 'Verifed Vendors', link: '/ListVerifiedVendors' },
              { name: 'Reject Vendors', link: '/ListRejectedVendors' },
              // { name: 'Vendors Level', link: '/ListRejectedVendors' },
              { name: 'Vendor Push Notification', link: '/AddVendorPushNotification' },
              { name: 'Vendor Subscription', link: '/VendorSubscription' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <Mybutton label="Tags" onClick={handleClick} expand={open2} style={{ color: 'black' }} />
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'Offer Tags', link: '/ViewOfferTags' },
              { name: 'Product Tags', link: '/ViewProductTags' },
              { name: 'Vendor Tags', link: '/ViewVendorTags' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <Mybutton label="Users" onClick={handleClick} expand={open4} style={{ color: 'black' }} />
        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'Show Users', link: '/ViewUsers' },
              { name: 'BlockList Users', link: '/ViewBlockListUsers' },
              { name: 'User Push Notification', link: '/AddUserPushNotification' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <Mybutton label="Events" onClick={handleClick} expand={open5} style={{ color: 'black' }} />
        <Collapse in={open5} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'Handle Events', link: '/ViewEvents' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <Mybutton label="Customer Support" onClick={handleClick} expand={open3} style={{ color: 'black' }} />
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: 'white' }}
          >
            {[
              { name: 'Customer Support', link: '/ViewCustomerSupport' },
            ].map((value, index) => {
              return (
                <ListItem
                  buttons
                  sx={{ pl: 2 }}
                  key={value.name}
                  className="listItem"
                  onClick={() => {
                    history.push(value.link);
                  }}
                >
                  <ListItemText primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>

      </div>
    </List>
  );
}
