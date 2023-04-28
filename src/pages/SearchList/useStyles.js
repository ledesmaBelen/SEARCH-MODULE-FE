import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  boxMenuFilter: {
    color: '#028B7E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    cursor: 'pointer'
  },
  buttonSearchInput: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    fontSize: '0.9em',
    letterSpacing: '0.03em',
    color: '#028B7E',
    cursor: 'pointer',
    '&:hover': {
      fontSize: 15,
      color: '#028B7E',
      textShadow: '0px 0px 1px #00FFAC'
    }
  },
  boxFormControl: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    marginLeft: 2,
    color: '#026873',
    '&.Mui-checked': {
      color: '#03A696'
    }
  },
  typographyBox: { width: 240, height: 50, paddingLeft: 1 },
  typography: {
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    fontSize: '0.9em',
    letterSpacing: '0.03em',
    color: '#028B7E'
  },
  gridContainerInputSearch: {
    width: '100%',
    height: 33,
    paddingLeft: 1,
    boxShadow: 'inset 1px 1px 0 #BFBFBF,inset -1px 1px 0px #BFBFBF'
  },
  gridCointanerInputSearch2: {
    display: 'flex',
    alignItems: 'center',
    '@media all and (max-width: 900px)': {
      width: '70%'
    }
  },
  input: {
    display: 'flex',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    width: '100%',
    height: 30,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0px 0px 3px 0px #0B7F75',
      WebkitBoxShadow: '0px 0px 3px 0px #0B7F75',
      MozBoxShadow: '0px 0px 3px 0px #0B7F75'
    }
  },
  gridMenuType: {
    paddingLeft: '0.5rem',
    display: 'flex'
  },
  menuType: {
    width: '35%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  gridAddIcon: {
    width: '9%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  addIcon: { color: '#026873', cursor: 'pointer' },
  buttonResetFilter: {
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
    border: '2px solid #028B7E',
    borderRadius: '23px',
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  closeIconButtonReset: {
    fontSize: '1em',
    paddingLeft: 5,
    color: '#028B7E'
  },
  typographyButton: {
    paddingLeft: 5,
    fontFamily: 'Raleway',
    fontSize: '1em',
    letterSpacing: '0.05em',
    color: '#028B7E'
  }
}))

export default useStyles
