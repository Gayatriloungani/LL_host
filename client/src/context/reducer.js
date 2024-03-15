const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_USER":
      // localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, action.payload] };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };

    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "RESET_COACHING":
      return {
        ...state,
        images: [],
        details: { title: "", description: "", price: 0 },
        location: { lng: 0, lat: 0 },
      };
    case "UPDATE_COACHINGS":
      return {
        ...state,
        coachings: action.payload,
        addressFilter: null,
        priceFilter: 0,
        filterCoachings: action.payload,
      };
    case "FILTER_PRICE":
      return {
        ...state,
        priceFilter: action.payload,
        filterCoachings: applyfilter(
          state.coachings,
          state.addressFilter,
          action.payload
        ),
      };
    case "FILTER_ADDRESS":
      return {
        ...state,
        addressFilter: action.payload,
        filterCoachings: applyfilter(
          state.coachings,
          state.priceFilter,
          action.payload
        ),
      };
    case "CLEAR_ADDRESS":
      return {
        ...state,
        addressFilter: null,
        priceFilter: 0,
        filterCoachings: state.coachings,
      };
    case 'UPDATE_COACHING':
      return {...state , coaching:action.payload};
    default:
      throw new Error("No matched action");
  }
};
export default reducer;
const applyfilter = (coachings, address, price) => {
  let filterCoachings = coachings;
  if (address) {
    const { lng, lat } = address;
    filterCoachings = filterCoachings.filter((coaching) => {
      const lngDifference =
        lng > coaching.lng ? lng - coaching.lng : coaching.lng - lng;
      const latDifference =
        lat > coaching.lat ? lat - coaching.lat : coaching.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }
  if (price < 500000) {
    filterCoachings = filterCoachings.filter(
      (coaching) => coaching.price <= price
    );
  }
  return filterCoachings;
};
