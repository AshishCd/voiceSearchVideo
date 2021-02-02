import {actionTypes} from "../actions/actions";

const initialState = {
  navTitle: "",
  filteredArr:[],
  isFiltered: false,
  videoArr: [
    {
      id: 0,
      videoTitle: `Best FUNNY CAT videos`,
      tags: ['video', 'cats', 'cat video', 'cats video', 'cat', 'show cats'],
      imgSrc: require('../assets/images/cat1.jpg'),
      videoSrc:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 1,
      videoTitle: 'Ultimate Funny Dog, Funny Pet Videos',
      tags: ['video', 'dogs', 'dog video', 'dogs video', 'dog', 'show dogs'],
      imgSrc: require('../assets/images/dog2.jpg'),
      videoSrc:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 2,
      videoTitle: `It's TIME for SUPER LAUGH! Funny Cat`,
      tags: ['video', 'cats', 'cat video', 'cats video', 'cat', 'show cats'],
      imgSrc: require('../assets/images/cat1.jpg'),
      videoSrc:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 3,
      videoTitle: 'Ultimate 101 dogs compilation videos',
      tags: ['video', 'dogs', 'dog video', 'dogs video', 'dog', 'show dogs'],
      imgSrc: require('../assets/images/dog2.jpg'),
      videoSrc:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      id: 4,
      videoTitle: 'Cute Dogs and Babies are Best Friends',
      tags: ['video', 'dogs', 'dog video', 'dogs video', 'dog', 'show dogs'],
      imgSrc: require('../assets/images/dog1.jpg'),
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    },
    {
      id: 5,
      videoTitle: 'Baby Cats - Cute and Funny',
      tags: ['video', 'cats', 'cat video', 'cats video', 'cat', 'show cats'],
      imgSrc: require('../assets/images/cat2.jpg'),
      videoSrc:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    },
  ],
};

const videoReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_VIDEO_TITLE:
      return {
        ...state,
        navTitle: actions.payload
      }
      case actionTypes.SET_FILTERED_ARR:
      return {
        ...state,
        filteredArr: actions.filteredArr,
        isFiltered: true
      }
      case actionTypes.CLEAR_FILTERED_ARR:
        return {
          ...state,
        filteredArr: [],
        isFiltered: actions.isFiltered
        }
    default:
      return state;
  }
};

export default videoReducer;
