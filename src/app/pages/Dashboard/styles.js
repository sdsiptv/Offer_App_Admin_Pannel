import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper_main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFF3FD',
    paddingTop: '18px',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'auto',
  },

  title: {
    backgroundColor: '#0088FE',
    color: '#212121',
    fontSize: 20,
    boxShadow: '1px 3px 1px #9E9E9E',
    padding: 10,
  },

  img: {
    width: "118px",
    height: "57px",
  },

  img2: {
    width: "97px",
    height: "57px",
  },

  text: {
    fontSize: 24,
  },

  total: {
    color: '#333333',
  },

  users: {
    color: '#5a55d2',
  },

  divDonor: {
    padding: '10px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },

  blood: {
    fontSize: 24,
    color: '#333333',
    marginTop: '5px',
  },

  donor: {
    fontSize: 24,
    color: '#5a55d2',
    marginTop: '5px',
  },

  totalDonor: {
    color: '#00EAAC',
    marginTop: '5px',
  },

  icon: {
    width: '45px',
    [theme.breakpoints.down('xs')]: {
      width: '35px',
    },
  },

  donorInfo: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },

  donorDetails: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      marginTop: '5px',
    },
  },

  donorCount: {
    fontSize: '24px',
    marginLeft: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      marginLeft: '10px',
    },
  },

  divider: {
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0',
    },
  },

  feedback: {
    fontSize: 24,
    color: "#00261C",
    fontWeight: 400,
    marginTop: "19px",
    borderRadius: "10px",
    padding: theme.spacing(2),
  },

  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },

  chartButtons: {
    display: 'flex',
    gap: theme.spacing(1),
  },

  buttonSmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    outline: "auto",
    outlineColor: " #AEB6CF",
    fontSize: "small",
    '&:hover': {
      backgroundColor: "#00DEA3",
    },
  },

  feedbackBlood: {
    fontSize: 21,
    color: '#00261C',
    fontWeight: 400,
    marginTop: '19px',
    borderRadius: '10px',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '40%',
    },
  },

}));

export default useStyles;
