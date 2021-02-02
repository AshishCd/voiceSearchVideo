import React, {useEffect} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import VideoPlayer from './videoPlayer';
import {useSelector} from 'react-redux';

const DetailsScreen = (navigation) => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <VideoPlayer navigation={navigation} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  goBack: {
    width: 30,
    height: 20,
    marginRight: 20,
  },
});
