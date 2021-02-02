import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Voice from 'react-native-voice';
import VideoCard from './components/videoCard';
import actionsType from './actions/actions';

const SimpleVideos = (navigation) => {
  const [recognized, setRecognize] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [startSpeaking, setStartSpeacking] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [clearSearch, setClearSearch] = useState(false);
  const videoArr = useSelector((state) => state.videoArr);
  const dispatch = useDispatch();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    setVideoData(videoArr);
    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

  const onSpeechStart = (e) => {
    setStartSpeacking(true);
    setStarted('√');
  };

  const onSpeechRecognized = (e) => {
    setRecognize('√');
  };
  const onSpeechResults = (e) => {
    setResults(e.value);
    _stopRecognizing();
    setFilterArr(e.value);
  };

  const onSpeechEnd = (e) => {
    setStartSpeacking(false);
  };

  const _startRecognition = async (e) => {
    setRecognize('');
    setStarted('');
    setResults([]);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const setFilterArr = (resultArr) => {
    let newResult = [];
    const searchString = resultArr.join(' ');
    const arr = [...videoArr];
    for (let i of arr) {
      i.tags.map((tag) => {
        let patt = new RegExp(tag);
        let res = patt.test(searchString);
        if (res) {
          const found = newResult.some((el) => el.id === i.id);
          if (!found) newResult.push(i);
        }
      });
    }
    setVideoData(newResult);
    setClearSearch(true);
    dispatch(actionsType.setFilteredArr(newResult));
  };

  const clearData = () => {
    setVideoData(videoArr);
    setClearSearch(false);
    setResults([]);
    dispatch(actionsType.clearFiltered(false));
  };

  return (
    <View style={{flex: 1, marginHorizontal: 15}}>
     {clearSearch && <View>
        <View>
          <Text style={styles.resultText}>Showing Result for :</Text>
          <View style={styles.searchKeyWords}>
            {results &&
              results.map((i, index) => {
                return (
                  <Text
                    key={index}
                    style={{marginRight: 5, fontSize: 16}}>{`"${i}"`}</Text>
                );
              })}
          </View>
        </View>
      </View>}
      <ScrollView style={styles.scrollStyle}>
        {videoData.length ? (
          <VideoCard data={videoData} navigation={navigation} />
        ) : (
          <View style={styles.notFoundWrapper}>
            <Text style={styles.notFound}>
              Nothing found, please search again.
            </Text>
          </View>
        )}
        <View style={{alignItems: 'center'}}>
          {clearSearch && (
            <Button title="Clear Search" onPress={() => clearData()} />
          )}
        </View>
      </ScrollView>
      {!clearSearch && <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={(e) => _startRecognition(e)}>
          <Image
            source={
              startSpeaking
                ? require('./assets/images/speak.png')
                : require('./assets/images/mic.png')
            }
            style={styles.micImage}
          />
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    // flex: 1,
    // backgroundColor:'red',
    height: '100%',
  },

  textStyle: {
    textAlign: 'center',
    color: 'red',
  },

  transcript: {},

  micImage: {
    width: 64,
    height: 64,
  },

  notFoundWrapper: {
    marginVertical: 10,
    backgroundColor: '#d3d3d3',
    padding: 10,
  },

  notFound: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
  },
  searchKeyWords: {
    backgroundColor: '#d3d3d3',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    flexWrap:'wrap'
  },

  resultText: {
      fontSize:17,
      fontWeight:'800'
  }
});

export default SimpleVideos;
