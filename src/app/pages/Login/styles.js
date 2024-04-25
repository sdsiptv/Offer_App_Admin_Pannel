import { makeStyles } from '@material-ui/core';
import { BLUE, LIGHT_GREY, YELLOW, RADIUM } from 'utils/constant/color';
import backgroundImage from "../../assets/DashboardLogin.jpg"
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(9),
    height: '67vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
    justifyContent: 'center',
    borderRadius: "20px",
    border: '3px solid #9EEFE5',
    boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.13)',
    width: '95%',
    marginLeft: '20px'
  },

  backgroundImage: {
    background: `url(${backgroundImage})`,
    height: "800px",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '470px',
  },
  login: {
    marginLeft: "280px",
    paddingTop: "50px",
    fontWeight: 700
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginLeft: '140px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  responsive: {
    // backgroundColor: "#AAF9FF",
    marginTop: "140px"
  }
}));
export default useStyles;
