import { makeStyles } from '@material-ui/core';
import { LIGHT_GREY } from 'utils/constant/color';
import backgroundImage from '../../assets/DashboardLogin.jpg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
    borderRadius: '20px',
    padding: theme.spacing(4),
    boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.13)',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(6),
    },
  },
  backgroundImage: {
    background: `url(${backgroundImage})`,
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginTop:"10px",
    marginLeft:'-22px',
    [theme.breakpoints.up('sm')]: {
      marginLeft:'-15px',
      width: '420px',
      height: '400px',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  login: {
    marginTop: theme.spacing(2),
    fontWeight: 700,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
