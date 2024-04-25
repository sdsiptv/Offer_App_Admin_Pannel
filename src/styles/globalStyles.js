import { BLUE, LIGHT_GREY, YELLOW } from 'utils/constant/color';

import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#EFF3FD",
    padding: 30,
    margin: 10,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#0088FE',
  },

  title: {
    backgroundColor: '#E59866',
    padding: 10,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    boxShadow: '1px 3px 1px #9E9E9E',
  },

  button: {
    backgroundColor: YELLOW,
  },

  SubmitButton: {
    backgroundColor: "#00DEA3",
    '&:hover': {
      backgroundColor: "#00DEA3",
      outline: "2px solid #000000",
    },
  },

  modalDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },

  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  DivDonor: {
    padding: "10px",
  },

  Blood: {
    fontSize: 24,
    color: "#333333",
    marginTop: "5px",
  },

}));

const topNotification = {
  position: 'top-right',
  autoClose: 2000,
};

export { topNotification };
export default useStyles;
