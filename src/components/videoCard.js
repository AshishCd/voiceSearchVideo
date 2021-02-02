import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import actionTypes from '../actions/actions';

const VideoCard = ({data, navigation}) => {
  const dispatch = useDispatch();
  const navigateToDetails = (id) => {
    const filetrTitle = data.filter((i) => i.id === id);
    navigation.navigation.navigate('Details', {id});
    dispatch(actionTypes.setVideoTitle(filetrTitle[0].videoTitle));
  };

  return data.map((i) => {
    return (
      <TouchableOpacity key={i.id} onPress={() => navigateToDetails(i.id)}>
        <View style={styles.cardWarpper}>
          <Image style={styles.tinyLogo} source={i.imgSrc} />
          <View style={{width:'65%', padding:10}}>
            <Text numberOfLines={2} style={styles.title}>{i.videoTitle}</Text>
            <Text style={styles.description}>{'Title Description'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
};

export default VideoCard;

const styles = StyleSheet.create({
  cardWarpper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#C0C0C0',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    // flexWrap:'wrap'
  },
  tinyLogo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    flexWrap:'wrap',
    fontWeight: '900',
    marginBottom: 10,
  },
});
