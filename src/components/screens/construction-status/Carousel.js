import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from './Animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}


const {width: windowWidth} = Dimensions.get('window');

const data = [
  {
    uri: 'https://i.imgur.com/GImvG4q.jpg',
    title: 'Lorem ipsum dolor sit amet',
    content:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  },
  {
    uri: 'https://i.imgur.com/Pz2WYAc.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum ',
  },
  {
    uri: 'https://i.imgur.com/IGRuEAa.jpg',
    title: 'Lorem ipsum dolor',
    content:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  },
  {
    uri: 'https://i.imgur.com/fRGHItn.jpg',
    title: 'Lorem ipsum dolor',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
  },
  {
    uri: 'https://i.imgur.com/WmenvXr.jpg',
    title: 'Lorem ipsum ',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor ',
  },
];

const INITIAL_INDEX = 0;

export default class CustomCarousel extends Component {

  state = {
    index: 0
  }

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item }) {
    return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
        </View>
    );
  }

  render() {
    return (
        <View>
          <Carousel
              ref={(c) => this.carousel = c}
              data={DATA}
              renderItem={this._renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              containerCustomStyle={styles.carouselContainer}
              inactiveSlideShift={0}
              onSnapToItem={(index) => this.setState({ index })}
              scrollInterpolator={scrollInterpolator}
              slideInterpolatedStyle={animatedStyles}
              useScrollView={true}
          />
          <Text style={styles.counter}
          >
            {this.state.index}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
   // marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
