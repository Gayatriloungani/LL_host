import fetchData from './utils/fetchdata'
const url = process.env.REACT_APP_SERVER_URL + '/coaching';

export const createCoaching = async (coaching, currentUser, dispatch,setPage) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url, body: coaching, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The coaching has been added successfully',
      },
    });
    dispatch({ type: 'RESET_COACHING' });
    setPage(0);
    dispatch({type:'UPDATE_COACHING' , payload:result})
  }

  dispatch({ type: 'END_LOADING' });
};


export const getCoachings = async(dispatch) => {
  const result = await fetchData({url,method:'GET'},dispatch)
  if(result){
    dispatch({type:'UPDATE_COACHINGS', payload:result})
  }

}
