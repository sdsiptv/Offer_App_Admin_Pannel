import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  AccountBox,
  DesktopWindows,
  Group,
  HighlightOff,
  LiveTv,
  MusicVideo,
  PersonAddDisabled,
  Timelapse,
  Videocam,
} from '@material-ui/icons';
import apis from 'app/api';
import Layout from 'app/components/Layout';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BLUE, GREEN, ORANGE, YELLOW } from 'utils/constant/color';
import LineGraph from '../../components/Charts/Linechart/index';
import useStyles from './styles';
import Coins from "../../assets/rating.png";
import Yes from "../../assets/Yesss.png";
import Cashier from "../../assets/cashier.png";
import Likes from "../../assets/like.png";
import Download from "../../assets/download.png";
import Graph from "../../assets/Graph.png";
import Growth from "../../assets/Growth.png";
import Blood from "../../assets/approved.png";
import Eco from "../../assets/waiting.png";
import Message from "../../assets/rejected.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faArrowsDownToPeople, faStarOfDavid, faCircleExclamation, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { faFaceGrinHearts } from '@fortawesome/free-regular-svg-icons';

const data_month_wise = [
  { name: 'JAN', au: 4, du: 2 },
  { name: 'FEB', au: 6, du: 2 },
  { name: 'MAR', au: 1, du: 5 },
  { name: 'API', au: 10, du: 3 },
  { name: 'MAY', au: 7, du: 1 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Dashboard() {
  const classes = useStyles();
  const [totalUser, setTotalUser] = useState(0);
  const [active_cus, setActive_cus] = useState(0);
  const [deac_cus, setDeac_cus] = useState(0);
  const [sus_cus, setSus_cus] = useState(0);
  const [black_cus, setBlack_cus] = useState(0);
  const [total_cha, setTotal_cha] = useState(0);
  const [vod, setVod] = useState(0);
  const [mod, setMod] = useState(0);
  const [sod, setSod] = useState(0);
  const Role = localStorage.getItem("roles")

  const data = [
    { name: 'Total Users', user: totalUser },
    { name: 'Active Users', user: active_cus },
    { name: 'Deactive Users', user: deac_cus },
    { name: 'Suspended Customer', user: sus_cus },
    { name: 'BlackListed Customer', user: black_cus },
  ];

  const data_pie = [
    { name: 'Total Channel', value: total_cha },
    { name: 'VOD', value: vod },
    { name: 'SOD', value: sod },
    { name: 'MOD', value: mod },
  ];
  const COLORS = [GREEN, BLUE, ORANGE, YELLOW];

  return (
    <Layout>
      <Container component="main" maxWidth="xlg" className='container-fluid' style={{ backgroundColor: "#EFF3FD" }}>
        <CssBaseline />
        <div className={classes.paper_main}>
          <Grid container spacing={2} style={{ justifyContent: "space-evenly" }}>
            {/* <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Dashboard
              </Typography>
            </Grid> */}
            <ResponsiveContainer width="22%" height="100%">
              <Paper className={classes.paper}>
                <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "30px", color: "#dc7633" }} />
                  <div style={{ display: "flex" }}>
                    <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                    <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}>CUSTOMERS</text>
                  </div>
                  <text className={classes.text}>200</text>
                </div>
                <div>
                  <img className={classes.img} src={Yes} style={{ marginLeft: "50%" }} width="100px"></img>
                </div>
              </Paper>
            </ResponsiveContainer>

            <ResponsiveContainer width="24%" height="100%">
              <Paper className={classes.paper}>
                <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faShopify} style={{ fontSize: "30px", color: "#dc7633" }} />
                  {/* <img src={Cashier} width="30px"></img> */}
                  <div style={{ display: "flex" }}>
                    <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                    <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}> VENDORS</text>
                  </div>
                  <text className={classes.text}>800</text>
                </div>
                <div>
                  <img className={classes.img} src={Growth} style={{ marginLeft: "50%" }} width="100px"></img>
                </div>
              </Paper>
            </ResponsiveContainer>

            <ResponsiveContainer width="25%" height="100%">
              <Paper className={classes.paper}>
                <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faFaceGrinHearts} style={{ fontSize: "30px", color: "#dc7633" }} />
                  {/* <img src={Likes} width="30px"></img> */}
                  <div style={{ display: "flex" }}>
                    <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                    <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}> LIKES</text>
                  </div>
                  <text className={classes.text}>400</text>
                </div>
                <div>
                  <img className={classes.img} src={Yes} style={{ marginLeft: "50%" }} width="100px"></img>
                </div>
              </Paper>
            </ResponsiveContainer>

            <ResponsiveContainer width="25%" height="100%">
              <Paper className={classes.paper}>
                <div style={{ display: "grid", marginTop: "10px", marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faArrowsDownToPeople} style={{ fontSize: "30px", color: "#dc7633" }} />
                  {/* <img src={Download} width="30px"></img> */}
                  <div style={{ display: "flex" }}>
                    <text style={{ fontSize: "18", marginTop: "5px" }} className={classes.total}>TOTAL</text>
                    <text style={{ fontSize: "18", marginTop: "5px", marginLeft: "4px" }} className={classes.users}> DOWNLOADS</text>
                  </div>
                  <text className={classes.text}>100</text>
                </div>
                <div>
                  <img className={classes.img2} src={Yes} style={{ marginLeft: "50%" }} width="100px"></img>
                </div>
              </Paper>
            </ResponsiveContainer>

            <Grid item xs={12} md={9}>
              <Paper className={classes.feedback}>
                <div className={classes.chartHeader}>
                  <text style={{ fontSize: '27px' }}>Active user Deactive user</text>
                  <div className={classes.chartButtons}>
                    <Button className={classes.buttonSmall}>All</Button>
                    <Button className={classes.buttonSmall}>1M</Button>
                    <Button className={classes.buttonSmall}>6M</Button>
                    <Button className={classes.buttonSmall}>1Y</Button>
                    <Button className={classes.buttonSmall}>YTD</Button>
                  </div>
                </div>
                <img src={Graph} className={classes.chartImage} alt="Graph" />
              </Paper>
            </Grid>

            {/* <Grid item xs={9}>
              <Paper className={classes.Feedback}  >
                <div className={classes.chartHeader}>
                  <text style={{ fontSize: "27px" }}>Active user Deactive user</text>
                  <div className={classes.chartButtons}>
                    <Button className={classes.Buttonsmall}>All</Button>
                    <Button className={classes.Buttonsmall}>1M</Button>
                    <Button className={classes.Buttonsmall}>6M</Button>
                    <Button className={classes.Buttonsmall}>1Y</Button>
                    <Button className={classes.Buttonsmall}>YTD</Button>
                  </div>
                </div>
                <img src={Graph} width="100%"></img>
              </Paper>
            </Grid> */}

            <Grid item xs={12} md={3}>
              <Paper className={classes.feedbackBlood}>
                <div className={classes.divDonor}>
                  <div className={classes.donorInfo}>
                    <text className={classes.blood}>Total</text>
                    <text className={classes.donor} style={{ marginLeft: "4px" }}> Verified</text>
                  </div>
                  <div className={classes.donorDetails}>
                    <FontAwesomeIcon icon={faStarOfDavid} style={{ color: "#dc7633" }} />
                    {/* <img src={Blood} className={classes.icon} alt="Blood Icon" /> */}
                    <text className={classes.donorCount}>978</text>
                  </div>
                </div>

                <Divider className={classes.divider} />

                <div className={classes.divDonor}>
                  <div className={classes.donorInfo}>
                    <text className={classes.blood}>Total</text>
                    <text className={classes.donor} style={{ marginLeft: "4px" }}> Unverified</text>
                  </div>
                  <div className={classes.donorDetails}>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{ fontSize: "25px", color: "#dc7633" }} />
                    {/* <img src={Eco} className={classes.icon} alt="Eco Icon" /> */}
                    <text className={classes.donorCount}>978</text>
                  </div>
                </div>

                <Divider className={classes.divider} />

                <div className={classes.divDonor}>
                  <div className={classes.donorInfo}>
                    <text className={classes.blood}>Total</text>
                    <text className={classes.donor} style={{ marginLeft: "4px" }}> Reject</text>
                  </div>
                  <div className={classes.donorDetails}>
                    <FontAwesomeIcon icon={faRectangleXmark} style={{ fontSize: "25px", color: "#dc7633" }}/>
                    {/* <img src={Message} className={classes.icon} alt="Message Icon" /> */}
                    <text className={classes.donorCount}>978</text>
                  </div>
                </div>
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
