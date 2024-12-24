import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import Layout from 'app/components/Layout';
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
} from 'recharts';
import useStyles from './styles';
import Yes from "../../assets/Line Graph 1.svg";
import Graph from "../../assets/Overall Earning.svg";
import Growth from "../../assets/Line Graph 2.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faStarOfDavid, faCircleExclamation, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Dashboard() {
  const classes = useStyles();
  const [dashboard, setDashboard] = useState([]);

  const getDashboard = () => {
    apis.getDashboard().then(res => {
      setDashboard(res?.data);
    });
  };

  useEffect(() => {
    getDashboard();
  }, [])

  return (
    <Layout>
      <Container component="main" maxWidth="xlg" className='container-fluid' style={{ backgroundColor: "#EFF3FD" }}>
        <CssBaseline />
        <div className={classes.paper_main}>
          <Grid container spacing={2} style={{ justifyContent: "space-between" }}>

            {/* <ResponsiveContainer width="22%" height="100%">
              <Paper className={classes.paper}>
                <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "30px", color: "#dc7633" }} />
                  <div style={{ display: "flex" }}>
                    <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                    <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}>CUSTOMERS</text>
                  </div>
                  <text className={classes.text}>{dashboard.all_customers}</text>
                </div>
                <div>
                  <img className={classes.img} src={Yes} style={{ marginLeft: "60%" }} width="100px"></img>
                </div>
              </Paper>
            </ResponsiveContainer> */}


            <ResponsiveContainer width="22%" height="100%">
              <Paper className={classes.paper}>
                <Link to="/ViewUsers" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      style={{ fontSize: "30px", color: "#dc7633" }}
                    />
                    <div style={{ display: "flex" }}>
                      <span style={{ fontSize: "18px", marginTop: "5px" }} className={classes.total}>
                        TOTAL
                      </span>
                      <span style={{ fontSize: "18px", marginTop: "5px", marginLeft: "4px" }} className={classes.users}>
                        CUSTOMERS
                      </span>
                    </div>
                    <span className={classes.text}>{dashboard.all_customers}</span>
                  </div>
                </Link>
                <div>
                  <img
                    className={classes.img}
                    src={Yes}
                    style={{ marginLeft: "60%" }}
                    width="100px"
                    alt="Yes"
                  />
                </div>
              </Paper>
            </ResponsiveContainer>

            <ResponsiveContainer width="24%" height="100%">
              <Paper className={classes.paper}>
                <Link to="/ListAllVendors" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faShopify} style={{ fontSize: "30px", color: "#dc7633" }} />
                    <div style={{ display: "flex" }}>
                      <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                      <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}> VENDORS</text>
                    </div>
                    <text className={classes.text}>{dashboard.all_vendors}</text>
                  </div>
                  <div>
                    <img className={classes.img} src={Growth} style={{ marginLeft: "60%" }} width="100px"></img>
                  </div>
                </Link>
              </Paper>
            </ResponsiveContainer>

            <ResponsiveContainer width="22%" height="100%">
              <Paper className={classes.paper}>
                <Link to="/ViewBlockListUsers" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faUserLock} style={{ fontSize: "30px", color: "#dc7633" }} />
                    <div style={{ display: "flex" }}>
                      <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>BLOCKED</text>
                      <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}> USERS</text>
                    </div>
                    <text className={classes.text}>{dashboard.blocked_customers}</text>
                  </div>
                  <div>
                    <img className={classes.img2} src={Growth} style={{ marginLeft: "70%" }} width="100px"></img>
                  </div>
                </Link>
              </Paper>
            </ResponsiveContainer>

            <Grid item xs={12} md={9}>
              <Paper className={classes.feedback}>
                <div className={classes.chartHeader}>
                  <Typography style={{ fontSize: '27px' }}>Active user Deactive user</Typography>
                  <div className={classes.chartButtons}>
                    <Button className={classes.buttonSmall}>All</Button>
                    <Button className={classes.buttonSmall}>1M</Button>
                    <Button className={classes.buttonSmall}>6M</Button>
                    <Button className={classes.buttonSmall}>1Y</Button>
                    <Button className={classes.buttonSmall}>YTD</Button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <img src={Graph} className={classes.chartImage} alt="Overall Earning Graph" />
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper className={classes.feedbackBlood}>
                <Link to="/ListPendingVendors" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className={classes.divDonor}>
                    <div className={classes.donorInfo}>
                      <text className={classes.blood}>Pending</text>
                      <text className={classes.donor} style={{ marginLeft: "4px" }}> Vendors</text>
                    </div>
                    <div className={classes.donorDetails}>
                      <FontAwesomeIcon icon={faStarOfDavid} style={{ color: "#dc7633" }} />
                      <text className={classes.donorCount}>{dashboard.verified_vendors}</text>
                    </div>
                  </div>
                </Link>

                <Divider className={classes.divider} />

                <Link to="/ListVerifiedVendors" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className={classes.divDonor}>
                    <div className={classes.donorInfo}>
                      <text className={classes.blood}>Approved</text>
                      <text className={classes.donor} style={{ marginLeft: "4px" }}> Vendors</text>
                    </div>
                    <div className={classes.donorDetails}>
                      <FontAwesomeIcon icon={faCircleExclamation} style={{ fontSize: "25px", color: "#dc7633" }} />
                      <text className={classes.donorCount}>{dashboard.pending_vendors}</text>
                    </div>
                  </div>
                </Link>
                
                <Divider className={classes.divider} />

                <Link to="/ListRejectedVendors" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className={classes.divDonor}>
                    <div className={classes.donorInfo}>
                      <text className={classes.blood}>Reject</text>
                      <text className={classes.donor} style={{ marginLeft: "4px" }}>Vendor </text>
                    </div>
                    <div className={classes.donorDetails}>
                      <FontAwesomeIcon icon={faRectangleXmark} style={{ fontSize: "25px", color: "#dc7633" }} />
                      <text className={classes.donorCount}>{dashboard.rejected_vendors}</text>
                    </div>
                  </div>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ backgroundColor: '#a4b1b5' }}
              ></Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}

export default Dashboard;
