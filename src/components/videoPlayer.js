import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import useNextVideo from './useNextVideo';

const VideoPlayerComponent = ({navigation}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState(navigation.route.params.id);
  const videoArr = useSelector((state) => state.videoArr);
  const filteredArr = useSelector((state) => state.filteredArr);
  const isFiltered = useSelector((state) => state.isFiltered);

  useEffect(() => {
    const video = isFiltered
      ? filteredArr.filter((i) => i.id === videoId)
      : videoArr.filter((i) => i.id === videoId);
    setVideoUrl(video[0].videoSrc);
  }, []);

  useNextVideo(
    () => {
     !paused && nextVideo();
     !paused && setIsLoading(true);
    },
    !isLoading ? 10000 : null,
  );

  useEffect(() => {
    const Videos = isFiltered ? filteredArr : videoArr;
    const Arr = Videos.filter((i) => i.id === videoId);
    navigation.navigation.setOptions({title: Arr[0].videoTitle});
  }, [videoId]);

  const onSeek = (seek) => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    // nextVideo();
  };

  const nextVideo = () => {
    const Videos = isFiltered ? filteredArr : videoArr;
    const indexOfObj = Videos.findIndex((i) => i.id === videoId);
    if (indexOfObj != Videos.length - 1) {
      setVideoUrl(Videos[indexOfObj + 1].videoSrc);
      setVideoId(Videos[indexOfObj + 1].id);
    } else {
      setVideoUrl(Videos[0].videoSrc);
      setVideoId(Videos[0].id);
    }
  };

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}>toolbar</Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri: `${videoUrl}`,
        }}
        style={styles.mediaPlayer}
        volume={10}
      />

      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  }
});
