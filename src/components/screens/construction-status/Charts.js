import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg from 'react-native-svg';
import {
    VictoryAxis,
    VictoryChart, VictoryLegend,
    VictoryPie,
    VictoryTooltip,
} from 'victory-native';
import {colors} from '../../../utils/Colors';
import Label from '../../../palette/Label';
import format from 'date-fns/format';


const Charts = (props) => {

    const {title, data} = props;

    console.log(data)

    return (
        <View style={styles.chartContainer}>
            <View style={styles.titleContainer}>
                <Label text={title} color={'white'} size={12} weight={'bold'}/>
            </View>
            <View style={styles.bodyContainer}>
                <Label text={format(new Date(), 'yyyy-MM-dd')} color={'#333'} weight={'700'}/>
            </View>
            <View>
                <Svg>
                    <VictoryChart
                        width={270}
                        height={230}
                        //padding={{ paddingRight: 10 }}
                    >
                        <VictoryLegend x={1} y={1}
                                       centerTitle
                                       orientation="horizontal"
                                       gutter={40}
                                       data={[
                                           {name: 'Por completar', symbol: {fill: '#F0453E'}},
                                           {name: 'Completado', symbol: {fill: '#027260'}},
                                       ]}
                        />
                        <VictoryPie
                            colorScale={['#027260', '#F0453E']}
                            style={{labels: {fill: 'white', fontSize: 14, fontWeight: '600'}}}
                            labels={({datum}) =>
                                datum.x === '1' ?
                                    `${datum.y}%` : `${datum.y}%`
                            }

                            innerRadius={51}
                            data={data}
                            labelPosition={'centroid'}
                            labelRadius={50}
                            labelComponent={
                                <VictoryTooltip
                                    dy={0}
                                    horizontal
                                    active={true}
                                    flyoutHeight={15}
                                    flyoutWidth={55}
                                    cornerRadius={7}
                                    centerOffset={{y: 1}}
                                    pointerLength={28}
                                    renderInPortal={false}
                                    flyoutStyle={{
                                        stroke: 'none',
                                        fill: ({datum}) => datum.x === '1' ? '#027260' : '#F0453E',
                                    }}
                                    flyoutPadding={({text}) =>
                                        text.length > 1
                                            ? {top: 0, bottom: 0, left: 17, right: 17}
                                            : 17
                                    }
                                />
                            }
                        />
                        <VictoryAxis style={{
                            axis: {stroke: 'transparent'},
                            ticks: {stroke: 'transparent'},
                            tickLabels: {fill: 'transparent'},
                        }}/>
                    </VictoryChart>
                </Svg>
            </View>
        </View>
    );
};

export default Charts;

const styles = StyleSheet.create({
    chartContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 20,
        borderRadius: 10,
    },
    titleContainer: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: colors.appColor,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodySVGContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        zIndex: 1000,
    },

    bodyContainer: {
        top: 35,
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },


});
