// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { server } from '../server'


// class _Chat extends Component {


//   componentDidMount () {
//     this.props.getMatches()
//   }

//   render() {
//     return (
//       <View>
//         {console.log('CHAT COMPONENT, SUCCESSFUL MATCHES', this.props.successfulMatches)

//         // .map(match => 
//         //     <Text>NAME: {match.name}</Text>)
//         } 
//       </View>
//     )
//   }
// }






import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { API_URL } from '../constants';


class _Chat extends Component {

  state = {
    matches: []
  }

  componentDidMount () {
    

      server.get(`${API_URL}/successful_matches`)
      .then(matches=> this.setState({matches}))      
      .catch(error => console.log('ERRRRORS IN CHAT', error))

      // let test = this.props.getSuccessfulMatches()
      // console.log('TESTING FUNCTION', test)  
  }

  render() {

    // let matches = (this.props.successfulMatches)
    // let mapped = matches.map(match => console.log(match))x
    // console.log(matches)
    // console.log(typeof(matches))
    // console.log(matches.keys())



    return (
      <>
      <Text>



      </Text>
      </>
    );
  }
}

const defaultImage = 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'

const CardThing = () => {
  <Container style={{marginTop: 100}}>
        <Header />
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: {defaultImage} }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={5}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
}






// const mapStateToProps = state => {

//     return {
//       user: state.user,
//       successfulMatches: state.matchsuccessfulMatches
//     }
// }





const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    getSuccessfulMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'})
 
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)

