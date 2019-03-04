import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


class _Chat extends Component {


  componentDidMount () {
    this.props.getMatches()
  }

  render() {
    let matches = this.props.successfulMatches
    console.log('SUCESSFUL MATCHES', matches) //returns Array of Objects (capitalized Array &Object) see below in the return for example, sometimes will return null
    console.log('TYPEOF(MATCHES)', typeof(matches)) //returns object (lowercase object)

    let matches2 = JSON.stringify(this.props.successfulMatches)
    console.log('SUCESSFUL MATCHES2', matches2) // returns it into a string
    console.log('TYPEOF(MATCHES2)', typeof(matches2)) //returns string


    console.log('INDEX or KEY 0', this.props.sucessfulMatches[0] ) //Cannot read property '0' of undefined





   
    // let names = matches.map( user => (user.name))   // returns TypeError: Cannot read property 'map' of null
    // console.log('NAMES', names) //does not return anything because error above
    // console.log('TYPEOF(NAMES)', typeof(names)) //does not return anything because error above


    return (
      <View>
        {/* {console.log('PROPS', this.props.successfulMatches) } */}

        {/* {
          LOGS THIS: 
            PROPS Array [
              Object {
                "birthday": null,
                "created_at": "2019-02-27T20:53:38.394Z",
                "email": "ruth@flatiron.com",
                "gender": "female",
                "id": 6,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacQBMGvS6Js7ja912qKfvit47jh-NziVq6NtvcB4rlA0KR4ko",
                "name": "Ruth",
                "password_digest": "$2a$10$WPVxp4Av/lhANkEHmsPvz.4Zl9jgVjUxaT1il2DgYqld3dFu7dcBe",
                "updated_at": "2019-02-27T20:53:38.394Z",
              },
               Object {
                "birthday": null,
                ... more data
              },
            ]

        } */}


        {/* {if i include the following console.log where i start mapping through it, then the console.log('PROPS',..) above will return null} */}
        {/* {console.log("TESTING THIS", this.props.succhessfulMatches.map( m => m))} */}
        {/* {
          LOGS:
          TypeError: Cannot read property 'map' of undefined
        } */}





      </View>
    )
  }
}



const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials,
      successfulMatches: state.successfulMatches
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'})
 
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)