import React, { FC, useRef } from 'react'
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList, SafeAreaView } from 'react-native'


const { width, height } = Dimensions.get('screen')

const COLORS = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']
const DATA = [
  {
    'key': '3571572',
    'title': 'Multi-lateral intermediate moratorium',
    'description': 'I\'ll back up the multi-byte XSS matrix, that should feed the SCSI application!',
    'image': 'https://image.flaticon.com/icons/png/256/3571/3571572.png'
  },
  {
    'key': '3571747',
    'title': 'Automated radical data warehouse',
    'description': 'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    'image': 'https://image.flaticon.com/icons/png/256/3571/3571747.png'
  },
  {
    'key': '3571680',
    'title': 'Inverse attitude oriented system engine',
    'description': 'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    'image': 'https://image.flaticon.com/icons/png/256/3571/3571680.png'
  },
  {
    'key': '3571603',
    'title': 'Monitored global data warehouse',
    'description': 'We need to program the open-source IB interface!',
    'image': 'https://image.flaticon.com/icons/png/256/3571/3571603.png'
  }
]


export default function App<FC>() {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        horizontal
        data={DATA}
        pagingEnabled
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={item => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center' }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: width / 2, height: height / 2, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ flex: 0.3, paddingHorizontal: 20 }}>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 28, marginBottom: 10 }}>
                {item.title}
              </Text>
              <Text style={{ color: 'white', fontWeight: '300', fontSize: 18 }}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
    </View>
  )
}

type SquareProps = {
  scrollX: any
}


const Square: FC<SquareProps> = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width), new Animated.Value(width)
    ),
    1
  )

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  })

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: 'white',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }]

      }}
    />
  )
}

type IndicatorProps =
  {
    scrollX: any
  }

const Indicator: FC<IndicatorProps> = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {
        DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp'
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.9, 0.6],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'white',
                margin: 10,
                opacity,
                transform: [{ scale }]
              }}
            />
          )
        })
      }
    </View>
  )
}

type BackdropProps = {
  scrollX: any
}

const Backdrop: FC<BackdropProps> = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: DATA.map((_, i) => i * width),
    outputRange: COLORS.map(bg => bg)
  })
  return <Animated.View
    style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
  />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
