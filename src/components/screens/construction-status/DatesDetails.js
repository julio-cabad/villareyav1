import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import {Layout} from '../../../styled-components/StyledComponents';
import Label from '../../../palette/Label';
import Divider from '../../../palette/Divider';

const DatesDetails = (props) => {

    const {detailConstructionDates} = props

    return (
        <View style={styles.detailContainer}>
          {detailConstructionDates.map(items => {
            return (
                <View key={items.id}>
                  <Layout row center space padding={3}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.dotStyle}/>
                      <Label text={items.text} left={3} color={'#055782'} size={11}/>
                    </View>
                    <Label text={items.date}  color={'#333'} size={10} weight={'700'}/>
                  </Layout>
                  <Divider height={1}/>
                </View>
            );
          })}
        </View>
    );
};

export default DatesDetails;

const styles = StyleSheet.create({

  detailContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },

  dotStyle: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.appColor
  }
});

