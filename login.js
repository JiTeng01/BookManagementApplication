import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

let config=require('./config');

export default class LoginActivity extends Component {

  static navigationOptions =
 {
    title: 'Book management App',
 };

 constructor(props) {
  super(props);
  this.state = {
    UserEmail: '',
    UserPassword: '',
    UserId:'',
  }
}

componentDidMount() {
  this._readSettings();
}

async _saveSettings(UserId) {
  try {
    await AsyncStorage.setItem('UserId', UserId);
  } catch (error) {
    console.log('## ERROR SAVING ITEM ##: ', error);
  }
}

async _readSettings() {
  try {
    let UserId = await AsyncStorage.getItem('UserId');
    if (UserId !== null) {
      console.log(UserId)
      this.props.navigation.navigate('Home',{UserId:UserId});
    }
  } catch (error) {
    console.log('## ERROR READING ITEM ##: ', error);
  }
}


UserLoginFunction = () =>{
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;

fetch('https://bookmanagementapplication.000webhostapp.com/login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: UserEmail,
    password: UserPassword
  })
}).then((response) => response.json())
      .then((responseJson) => {
       if(responseJson.msg === 'Data Matched')
        {
          this.setState({
            UserEmail:responseJson.email,
            UserId:responseJson.user_id,
          });
            this._saveSettings(responseJson.user_id);
            this.props.navigation.navigate('Home',{UserId:responseJson.user_id});
        }
        else{
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        console.error(error);
      });
  }

render() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(UserEmail) => {this.setState({UserEmail});
            }}/>
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(UserPassword) =>{ this.setState({UserPassword});
            }}/>
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
            <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Register</Text>
      </TouchableHighlight>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
