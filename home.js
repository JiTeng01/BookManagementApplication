import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import Button from 'apsl-react-native-button'
let config=require('./config');
export default class AfterLoginActivity extends Component {

  static navigationOptions =
 {
    title: 'Choose action',

 };

  constructor(props) {
    super(props);
    this.state = {
      nickname:'',
    }
  }

clearAsyncStorage = async() => {
 Alert.alert('Alert', 'Are you sure you want to logout?',[
   {
     text:'No',
     onPress:()=>{},
   },
   {
     text:'Yes',
     onPress:()=>{
      AsyncStorage.clear();
      this.props.navigation.navigate('Login');
      Alert.alert("You have successfully logout");
     }
   }

 ],{cancelable:false});
}

componentDidMount(){
  this._userInfo();
 }

_userInfo() {
  return fetch('https://bookmanagementapplication.000webhostapp.com/accountInfo.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Getting the id.
        user_id: this.props.navigation.state.params.UserId,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          nickname: responseJson[0].nickname,
        })
      }).catch((error) => {
        console.error(error);
      });
}

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.buttonStyle7} 
        onPress={() => {this.props.navigation.navigate('Search',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>Search Book Information</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle3} onPress={() => {this.props.navigation.navigate('Search_Isbn',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>Search Book Information Using ISBN</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle4} onPress={() => {this.props.navigation.navigate('Bookshelf',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>My Bookshelf</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle5} onPress={() => {this.props.navigation.navigate('Bookstore',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>My Bookstore</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle9} onPress={() => {this.props.navigation.navigate('Wishlist',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>My Wishlist</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle6} onPress={() => {this.props.navigation.navigate('Publicbookstore',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>Public Bookstore</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle10} onPress={() => {this.props.navigation.navigate('AccountSetting',{UserId:this.props.navigation.state.params.UserId})}}>
        <View>
          <Text style={styles.textStyle}>Account Setting</Text>
        </View>
        </Button>

        <Button style={styles.buttonStyle2} onPress={this.clearAsyncStorage}>
        <View>
          <Text style={styles.textStyle}>Log Out</Text>
        </View>
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    justifyContent: "space-around"
  },
  buttonStylePressing: {
    borderColor: 'red',
    backgroundColor: 'red'
  },
  buttonStyle: {
    borderColor: '#f39c12',
    backgroundColor: '#f1c40f'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonStyle: {
    borderColor: '#f39c12',
    backgroundColor: '#f1c40f'
  },
  buttonStyle1: {
    borderColor: '#d35400',
    backgroundColor: '#e98b39'
  },
  buttonStyle2: {
    borderColor: '#c0392b',
    backgroundColor: '#e74c3c'
  },
  buttonStyle3: {
    borderColor: '#16a085',
    backgroundColor: '#1abc9c'
  },
  buttonStyle4: {
    borderColor: '#27ae60',
    backgroundColor: '#2ecc71'
  },
  buttonStyle5: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db'
  },
  buttonStyle6: {
    borderColor: '#8e44ad',
    backgroundColor: '#9b59b6'
  },
  buttonStyle7: {
    borderColor: '#4eccdb',
    backgroundColor: '#33b0bf',
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22,
  },
  buttonStyle9:{
    borderColor:'#fcff60',
    backgroundColor:'#c7c94e'
  },
  buttonStyle10:{
    borderColor:'#77f9c8',
    backgroundColor:'#67e5b5'
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17,
  },
});



