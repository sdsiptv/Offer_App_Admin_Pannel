import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper_main: {
    // marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#EFF3FD",
    paddingTop: "18px"
  },

  paper: {
    //padding: theme.spacing(3),
    display: '-webkit-box',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: "10px",
    // borderColor:""
    //alignItems: 'center',
  },

  title: {
    backgroundColor: '#0088FE',
    color: '#212121',
    fontSize: 20,
    boxShadow: '1px 3px 1px #9E9E9E',
    padding: 10,
  },

  text: {
    fontSize: 24,
  },

  total: {
    color: "#333333",
  },

  users: {
    color: "#5a55d2"
  },

  DivDonor: {
    padding: "10px",
  },
  
  Blood: {
    fontSize: 24,
    color: "#333333",
    marginTop: "5px",
  },

  Donor: {
    fontSize: 24,
    color: "#5a55d2",
    marginTop: "5px",
  },

  Totaldonor: {
    color: "#00EAAC",
    marginTop: "5px",
  },
  img: {
    width: "118px",
    height: "57px",
  },

  img2: {
    width: "97px",
    height: "57px",
  },

  Feedback: {
    fontSize: 24,
    color: "#00261C",
    fontWeight: 400,
    marginTop: "19px",
    borderRadius: "10px"
  },

  FeedbackBlood: {
    fontSize: 21,
    color: "#00261C",
    fontWeight: 400,
    marginTop: "19px",
    borderRadius: "10px"
  },

  Button: {
    backgroundColor: "#B9FFEC",
    borderRadius: "12px",
    '&:hover': {
      backgroundColor: "#00DEA3",
    },
  },



  Buttonsmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    outline: "auto",
    outlineColor: " #AEB6CF",
    fontSize: "small",
    '&:hover': {
      backgroundColor: "#00DEA3",
    },
  },

  Admin: {
    marginTop: "10px",
    backgroundColor: "#C2B2E7",
    borderRadius: "8px",
    paddingTop: "10px",
    padding: "10px",
  },

  Download: {
    marginTop: "10px",
    backgroundColor: "#B9FFEC",
    borderRadius: "8px",
    paddingTop: "10px",
    padding: "10px",
  },

  FeedbackAdmin: {
    marginTop: "19px",
    borderRadius: "10px",
    padding: "10px",
    
  },

}));
export default useStyles;
