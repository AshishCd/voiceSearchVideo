export const actionTypes = {
  SET_VIDEO_TITLE: 'SET_VIDEO_TITLE',
  SET_FILTERED_ARR:'SET_FILTERED_ARR',
  CLEAR_FILTERED_ARR:'CLEAR_FILTERED_ARR'
};

export default {
  setVideoTitle: (title) => ({
    type: actionTypes.SET_VIDEO_TITLE,
    payload: title,
  }),
  setFilteredArr: (arr) => ({
    type: actionTypes.SET_FILTERED_ARR,
    filteredArr: arr,
  }),
  clearFiltered: (val) => ({
    type: actionTypes.CLEAR_FILTERED_ARR,
    isFiltered: val,
  }),
};
