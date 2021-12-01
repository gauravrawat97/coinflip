import React, {useRef, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
const CoinFlip = () => {
  const flipAnimX = useRef(new Animated.Value(0)).current;
  const flipAnimY = useRef(new Animated.Value(0)).current;
  const coinAnim = useRef(new Animated.Value(0)).current;

  const {width, height} = Dimensions.get('window');
  const head = require('./assets/heads.jpeg');
  const tail = require('./assets/tail.jpeg');
  const [answer, setAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  //0 means Head 1 = Tail
  tossAnswer = () => {
    const selectedAnswer = Math.floor(Math.random() * 2);
    setAnswer(selectedAnswer);
    if (userAnswer === selectedAnswer) {
      Alert.alert('Result', 'Wow ! You got it right');
    } else {
      Alert.alert('Result', 'Booh ! You got it wrong');
    }
    setUserAnswer(null);
  };
  onFlip = () => {
    setAnswer(null);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(flipAnimX, {
          toValue: 10,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnimY, {
          toValue: 10,
          duration: 5000,

          useNativeDriver: true,
        }),
      ]),
      Animated.timing(coinAnim, {
        duration: 3000,
        toValue: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      flipAnimY.setValue(0),
        flipAnimX.setValue(0),
        coinAnim.setValue(0),
        tossAnswer();
    });
  };
  const flipedCoinX = flipAnimX.interpolate({
    inputRange: [0, 5, 10],
    outputRange: ['0deg', '1800deg', '0deg'],
  });
  const flipedCoinY = flipAnimY.interpolate({
    inputRange: [0, 5, 10],
    outputRange: [0, -height / 2, 0],
  });
  const flipedCoinZ = coinAnim.interpolate({
    inputRange: [0, 5, 10],
    outputRange: ['0deg', '450deg', '0deg'],
  });
  const userSelection = userAnswer => {
    switch (userAnswer) {
      case 'head':
        setUserAnswer(0);
        break;
      case 'tail':
        setUserAnswer(1);
        break;
    }
    onFlip();
  };
  const modalShow = () => (
    <Modal transparent={true} visible={true} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Text style={styles.headingText}>Choose your option</Text>
          <View
            style={{
              flexShrink: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={() => userSelection('head')}>
              <View style={styles.alignItems}>
                <Image
                  source={head}
                  style={styles.img}
                  resizeMode={'contain'}
                />
                <Text style={styles.text}>Head</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => userSelection('tail')}>
              <View style={styles.alignItems}>
                <Image
                  source={tail}
                  style={styles.img}
                  resizeMode={'contain'}
                />
                <Text style={styles.text}>Tails</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
  return (
    <SafeAreaView style={styles.alignContainer}>
      <Animated.View
        style={[
          styles.coin,
          {
            transform: [
              {translateY: flipedCoinY},
              {rotateX: flipedCoinX},
              {rotateY: flipedCoinZ},
            ],
          },
        ]}>
        {answer === 0 && (
          <Image source={head} style={styles.imageStyle} resizeMode="contain" />
        )}
        {answer === 1 && (
          <Image source={tail} resizeMode="contain" style={styles.imageStyle} />
        )}
      </Animated.View>
      {userAnswer === null && modalShow()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  coin: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: 'grey',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 200,
    borderTopColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  alignContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  modalBody: {marginHorizontal: 10, marginTop: 5},
  alignItems: {flexDirection: 'row', alignSelf: 'center'},
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '200',
    paddingVertical: 10,
  },
  img: {width: 30, height: 30, alignSelf: 'flex-start'},
  text: {fontWeight: '200', fontSize: 20, marginLeft: 10},
  imageStyle: {
    width: 100,
    height: 100,
  },
  centeredView: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CoinFlip;
