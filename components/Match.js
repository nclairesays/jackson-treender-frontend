import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { connect } from 'react-redux'

const defaultImg = {uri: 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'}

const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: defaultImg
  },
  {
    text: 'Card TWO',
    name: 'TWO',
    image: defaultImg
  },
  {
    text: 'Card Three',
    name: 'Three',
    image: defaultImg
  },

  
];


// const cards = this.props.potentials
// console.log('THISSSS', this.props.potentials)


class _Match extends Component {


  render() {
    
   
    return (
      <Container>
        {/* <Header /> */}
        <Text onPress={this.props.getMatchees}>
            GET MATCHEES
           
        </Text>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card 
                style={{ elevation: 3 }}
                onSwipeRight={() => console.log('YOU SWIPED RIGHT ON', item)}
                onSwipeLeft={() => console.log('YOU SWIPED LEFT ON', item)}
              >
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>


                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>


                
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}



const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMatchees: () => 
        dispatch({ type: 'GET_POTENTIALS' })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Match)