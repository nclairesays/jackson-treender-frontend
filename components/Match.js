import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Text, PanResponder, Animated, Dimensions } from 'react-native';
import _Card from './Card'


class _Match extends Component {
  state= {
    profileIndex: 0
  }

  nextCard = () => {
    this.setState({profileIndex: this.state.profileIndex + 1})
  }

  swipedRight = () => {
    console.log('YOU SWIPED RIGHT')
  }

  swipedLeft = () => {
    console.log('YOU SWIPED LEFT')
   

  }

  pressedRight = (id) => {
    console.log('YOU PRESSED RIGHT', id)
    this.props.addResponse(id, true, this.props.user.id)
  }

  pressedLeft = (id) => {
    console.log('YOU PRESSED LEFT', id)
    this.props.addResponse(id, false, this.props.user.id)
  }


  render() {
    
   
    return (
      <View style={{flex:1}}>
        {this.props.potentials.map((profile) => {
          return (
            <_Card
              key={profile.id}
              profile={profile}
              onSwipeOff={this.nextCard}
              onSwipeRight={this.swipedRight}
              onSwipeLeft={this.swipedLeft}
              onPressLeft={this.pressedLeft}
              onPressRight={this.pressedRight}
            />
          )
        })}
         

      </View>
    )
  }


}



const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials
    }
}

const mapDispatchToProps = (dispatch) => ({
   
    addResponse: (matchee_id, current_user_response, current_user_id) => 
      dispatch({ type: 'ADD_RESPONSE', matchee_id, current_user_response, current_user_id })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Match)















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
  
  



  
