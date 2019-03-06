import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Text, PanResponder, Animated, Dimensions } from 'react-native';
import _Card from './Card'
import _MatcheeProfile from './MatcheeProfile'

const {width, height} = Dimensions.get('window')


class _Match extends Component {

  constructor() {
    super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    //animate top card, new animated value
    this.rotate = this.position.x.interpolate({
      inputRange:[-width/2, 0, width/2],  // half the screen width to the left and right
      outputRange: ['-10deg', '0deg', '10deg'], //rotatation
      extrapolate: 'clamp' // don't want animation to extrapolate automatically
    })

    //we want to add above property to our card. this will rotate the card when you swipe.
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
        },
        ...this.position.getTranslateTransform() //this will automatically convert the x and y values to x and y axes 
      ],
    } 

    this.likeOpacity = this.position.x.interpolate({
      inputRange:[-width/2, 0, width/2],  
      outputRange: [0, 0, 1], //opacity
      extrapolate: 'clamp' 
    })
 
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange:[-width/2, 0, width/2],  
      outputRange: [1, 0, 0], //opacity
      extrapolate: 'clamp' 
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange:[-width/2, 0, width/2],  
      outputRange: [1, 0, 1], //opacity
      extrapolate: 'clamp' 
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange:[-width/2, 0, width/2],  
      outputRange: [1, 0.8, 1], //opacity
      extrapolate: 'clamp' 
    })
  }



  onSwipeLeft = () => {	
    let i = this.state.currentIndex	
    let potential = this.props.potentials[i]	
    console.log('YOU SWIPED LEFT ON ID:', potential.id, potential.name)	
    this.props.addResponse(potential.id, false, this.props.user.id)	
  }	


  onSwipeRight = () => {	
    let i = this.state.currentIndex	
    let potential = this.props.potentials[i]	
    console.log('YOU SWIPED RIGHT ON ID:', potential.id, potential.name)	
    this.props.addResponse(potential.id, true, this.props.user.id)

  }


  componentWillMount(){
    this.PanResponder = PanResponder.create({
      //set true by default so panresponder is responsive when user clicks
      onStartShouldSetPanResponder: (event, gestureState) => true,

      //set gesture to a particular value
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },

      // what to do when released
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120){ // if it's moved to the RIGHT by a certain value 
          Animated.spring(this.position, {
            toValue: {x: width+100, y: gestureState.dy} //then spring it completely off the screen
          }).start(() => { //then once the card is off the screen, you want to "start...."
            this.onSwipeRight()
            this.setState({currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({x: 0, y:0 })
            })

          })
        }
        else if (gestureState.dx < -120){ // if it's moved to the LEFT by a certain value 
          Animated.spring(this.position, {
            toValue: {x: -width - 100, y: gestureState.dy} //then spring it completely off the screen
          }).start(() => { //then once the card is off the screen, you want to "start...."
            this.onSwipeLeft()
            this.setState({currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({x: 0, y: 0 })
            })

          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0},
            friction: 4
          }).start()
        } 
      }
    })
  }


  renderPotentials = () => {
    return this.props.potentials.map((user, i) => {
      if ( i < this.state.currentIndex){
        // console.log("YOU SHOULD RENDER FOR MORE")
        return null 
      } 
      else if ( i == this.state.currentIndex) {
        return (
          <Animated.View   
            key={user.id} 
            {...this.PanResponder.panHandlers}
           
            // style={[{transform:this.position.getTranslateTransform()},{height: height-120, width: width, borderColor: '#d6d7da',position: 'absolute'}]} 
            style={[ this.rotateAndTranslate,{height: height-120, width: width, borderColor: '#d6d7da',position: 'absolute'}]} 
          > 

            <Animated.View style={{opacity:this.likeOpacity, transform:[{rotate: '-30deg'}], position: 'absolute', top: 50, left: 40, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10}}>
                Like
              </Text> 
            </Animated.View>

            <Animated.View style={{opacity:this.dislikeOpacity, transform:[{rotate: '30deg'}], position: 'absolute', top: 50, right: 50, zIndex: 1000}}>
              <Text style={{borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10}}>
                Nah
              </Text> 
            </Animated.View>


            <_MatcheeProfile user={user} />
          </Animated.View> )
      } 
      else { // remove pan responder so cards below do not move
        return (
          <Animated.View   
            key={user.id} 
            style={[{
              opacity: this.nextCardOpacity, 
              transform: [{scale: this.nextCardScale}],
              height: height-120, width: width, 
              borderColor: '#d6d7da',position: 'absolute'}]} 
          > 
            <_MatcheeProfile user={user} />
          </Animated.View>
      )}
    }).reverse()
  }
  render() {
    return (
      <View style={{flex:1}}>
      
          <View style={{flex:1}}>{/*this is the Body*/}
           
           {this.renderPotentials()}

          </View>


        
      </View>
    )
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})



const mapStateToProps = state => { 
  let potentialMatchees  
  if (state.potentials) {
    potentialMatchees = state.potentials.filter( user => user.id !== state.user.id)
  } else { potentialMatchees = [] }

  return {
    user: state.user,
    potentials: potentialMatchees
  }
}

const mapDispatchToProps = (dispatch) => ({
   
    addResponse: (matchee_id, current_user_response, current_user_id) => 
      dispatch({ type: 'ADD_RESPONSE', matchee_id, current_user_response, current_user_id })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Match)

























/////////////////////////////////////////////////////////////////////////


// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { StyleSheet, View, Image, Text, PanResponder, Animated, Dimensions } from 'react-native';
// import _Card from './Card'




// class _Match extends Component {
//   state= {
//     profileIndex: 0
//   }

//   nextCard = () => {
//     this.setState({profileIndex: this.state.profileIndex + 1})
//   }

//   swipedRight = () => {
//     console.log('YOU SWIPED RIGHT')
//   }

//   swipedLeft = () => {
//     console.log('YOU SWIPED LEFT')
   

//   }

//   pressedRight = (id) => {
//     console.log('YOU PRESSED RIGHT', id)
//     this.props.addResponse(id, true, this.props.user.id)
//   }

//   pressedLeft = (id) => {
//     console.log('YOU PRESSED LEFT', id)
//     this.props.addResponse(id, false, this.props.user.id)
//   }


//   render() {
   
    
   
//     return (
//       <View style={{flex:1}}>
//         {this.props.potentials.map((profile) => {
//           return (
//             <_Card
//               key={profile.id}
//               profile={profile}
//               onSwipeOff={this.nextCard}
//               onSwipeRight={this.swipedRight}
//               onSwipeLeft={this.swipedLeft}
//               onPressLeft={this.pressedLeft}
//               onPressRight={this.pressedRight}
//             />
//           )
//         })}
         

//       </View>
//     )
//   }


// }



// const mapStateToProps = state => {
//     let potentialMatchees =  state.potentials.filter( user => user.id !== state.user.id)
//     // console.log('P HERE', p)

//     return {
//       user: state.user,
//       potentials: potentialMatchees
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
   
//     addResponse: (matchee_id, current_user_response, current_user_id) => 
//       dispatch({ type: 'ADD_RESPONSE', matchee_id, current_user_response, current_user_id })
// })


// export default connect(mapStateToProps, mapDispatchToProps)(_Match)






////////////////////////////////////////////////////////////////////








// import React, { Component } from 'react';
// import { Image } from 'react-native';
// import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
// import { connect } from 'react-redux'

// const cards = [
  //   {
  //     text: 'Card One',
  //     name: 'One',
  //     image: defaultImg
  //   },
  //   {
  //     text: 'Card TWO',
  //     name: 'TWO',
  //     image: defaultImg
  //   },
  //   {
  //     text: 'Card Three',
  //     name: 'Three',
  //     image: defaultImg
  //   },
  
    
  // ];
  
  
  // class _Match extends Component {
  
  //   state={
  //     current_card: {}
  //   }
  
  
  //   swipedRight = () => {
  //     console.log('YOU SWIPED RIGHT ON')
  //   }
  
  //   renderItemsForCards = (item) => {
  
  //    console.log('ITEM', item)
  
  //     return (
  //       <Card style={{ elevation: 3 }}>
  //         <CardItem>
  //           <Left>
  //             <Thumbnail source={defaultImg} />
  //             <Body>
  //               <Text>{item.name}</Text>
  //               <Text note>{item.email}</Text>
  //             </Body>
  //           </Left>
  //         </CardItem>
  //         <CardItem cardBody>
  //           <Image style={{ height: 300, flex: 1 }} source={defaultImg} />
  //         </CardItem>
  //         <CardItem>
  //           <Icon name="heart" style={{ color: '#ED4A6A' }} />
  //           <Text>{item.bio}</Text>
  //         </CardItem>
  //       </Card>
    
  //     )
  //   }
  
  //   render() {
      
  //     const cards = this.props.potentials
      
  //     // console.log("STATE in MATCH", this.state)
      
  //     return (
  //       <Container>
  //         {/* <Header /> */}
  //         <Text onPress={this.props.getMatchees} style={{fontSize: 25}}>
  
  //             GET MATCHEES
  
  //         </Text> 
         
  //         <View>
  //           <DeckSwiper
  //               // onSwipeRight={() => this.swipedRight()}
  //               // onSwipeLeft={this.swipedLeft}
  //               dataSource={cards}
  //               renderItem={(item) => this.renderItemsForCards(item)}
                  
  //               //   <Card 
  //               //     style={{ elevation: 3 }}
  //               //   >
  
  //               //   {/* <>{current_card=item}</>  */}
  
  
      
  //               //   <CardItem>
  //               //     <Left>
  //               //       <Thumbnail source={defaultImg} />
  //               //       <Body>
  //               //         <Text>{item.name}</Text>
  //               //         <Text note>{item.email}</Text>
  //               //       </Body>
  //               //     </Left>
  //               //   </CardItem>
  
  
  //               //   <CardItem cardBody>
  //               //     <Image style={{ height: 300, flex: 1 }} source={defaultImg} />
  //               //   </CardItem>
  
  
                  
  //               //   <CardItem>
  //               //     <Icon name="heart" style={{ color: '#ED4A6A' }} />
  //               //     <Text>{item.bio}</Text>
  //               //   </CardItem>
  //               // </Card>
                
              
  //           />
  
         
  //         </View> 
  
  //       </Container>
  //     );
  //   }
  // }
  
  



  

//   constructor(props) {
//     super(props);
//     this.position = new Animated.ValueXY();
//     const panResponder = PanResponder.create({
//        onStartShouldSetPanResponder: () => true,
//        onPanResponderMove: (event, gesture) => {
//          console.log('GESTURE', gesture)
//        }
//     });

//     this.state = { 
//       panResponder: panResponder,  
//       currentIndex: 0 
//     };
//  }