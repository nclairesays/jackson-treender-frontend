import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, PanResponder, Animated, Dimensions,  TouchableHighlight, Icon } from 'react-native';



const {width, height} = Dimensions.get('window')

export default class _Card extends Component {
    componentWillMount() {
      this.pan = new Animated.ValueXY()
  
      this.cardPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
          null,
          {dx:this.pan.x, dy:this.pan.y},
        ]),
        onPanResponderRelease: (e, {dx}) => {
          const absDx = Math.abs(dx)
          const direction = absDx / dx
  
          if (absDx > 120) {
            Animated.decay(this.pan, {
              velocity: {x:3 * direction, y:0},
              deceleration: 0.995,
            }).start(
              this.props.onSwipeOff)
          } else {
            Animated.spring(this.pan, {
              toValue: {x:0, y:0},
              friction: 4.5,
            }).start()
          }
        },
      })
    }
    
   
    
    render() {
      const {name, bio, email, id} = this.props.profile
     
      const defaultImage = 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'

  
      const rotateCard = this.pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['10deg', '0deg', '-10deg'],
      })
      const animatedStyle = {
        transform: [
          {translateX: this.pan.x},
          {translateY: this.pan.y},
          {rotate: rotateCard},
        ],
      }
  
      return (
        <Animated.View
          {...this.cardPanResponder.panHandlers}
          style={[styles.card, animatedStyle]}>
          <Image
            style={{flex:1}}
            source={{uri: defaultImage}}
          />
          <View style={{margin:10}}>
            <Text style={{fontSize:20}}>{name}</Text>
            <Text style={{fontSize:15}} note>{email}</Text>
            <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
          </View>

          <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
          
                <TouchableHighlight onPress={()=>(this.props.onPressLeft(id))}>
                   <View style={{ backgroundColor: 'darkred'}}>
                        <Text>LEFT BUTTON</Text>
                   </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>(this.props.onPressRight(id))}>
                    <View style={{backgroundColor: 'forestgreen'}}>
                        <Text>Right BUTTON</Text>

                    </View>
                </TouchableHighlight>

          </View>
        </Animated.View>
      )
    }
}


const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: width - 40,
        height: height * 0.7,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
    },
    button: {
        flex: 2
    }
})
