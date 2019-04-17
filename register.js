import React, { Component } from 'react';
 
import { StyleSheet, View, TextInput, Button, Text, DatePickerAndroid, TouchableWithoutFeedback,Alert } from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

Date.prototype.formatted = function() {
    let day = this.getDay();
    let date = this.getDate();
    let month = this.getMonth();
    let year = this.getFullYear();
    let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let monthsText = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];
  
    return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
  }

let config=require('./config');
  

export default class Project extends Component {

    static navigationOptions =
    {
       title: 'Registration',
   
    };
 
constructor() {
 
    super()
 
    this.state = {
      UserName: '',
      UserEmail: '',
      UserPassword: '',
      UserContactNumber:'',
      UserGender:'',
      date: new Date(),
      dateText: '',
      UserDescription:'Hello, nice to meet you all!',
    }
  }

  openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: new Date(1930, 0, 1),
        maxDate: new Date(2099, 11, 31),
        mode: 'calendar', // try also with `spinner`
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let selectedDate = new Date(year, month, day);

        this.setState({
          date: selectedDate,
          dateText: selectedDate.formatted(),
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
 
UserRegistrationFunction = () =>{
 
  fetch('https://bookmanagementapplication.000webhostapp.com/register.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      nickname: this.state.UserName,
  
      email: this.state.UserEmail,
  
      password: this.state.UserPassword,

      contactNum: this.state.UserContactNumber,

      gender: this.state.UserGender,

      birthday: this.state.dateText,

      user_description: this.state.UserDescription,
    })
  }).then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson);
          //this.props.navigation.navigate('Login')
          if(responseJson==='User Registered Successfully'){
            this.props.navigation.navigate('Login');
          }
        }).catch((error) => {
          console.error(error);
        });
 
}

onSelect(index, value){
    this.setState({
      UserGender: value,
    })
  }
 
  render() {
    return (
 
<View style={styles.MainContainer}>
 
        <Text style= {styles.title}>User Registration Form</Text>
  
        <TextInput
          placeholder="Enter User Name"
          onChangeText={nickname => this.setState({UserName : nickname})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
 
        <TextInput
          placeholder="Enter User Email"
          onChangeText={email => this.setState({UserEmail : email})}
          underlineColorAndroid='transparent'
          keyboardType="email-address"
          style={styles.TextInputStyleClass}
          />
 
        <TextInput
          placeholder="Enter User Password"
          onChangeText={password => this.setState({UserPassword : password})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
          />

        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}
        style={{display: 'flex', flexDirection: 'row'}}
        >
        <RadioButton value={'F'} >
          <Text>Female</Text>
        </RadioButton>

        <RadioButton value={'M'}>
          <Text>Male</Text>
        </RadioButton>
      </RadioGroup>

        <TouchableWithoutFeedback
          onPress={ this.openDatePicker }
        >
          <View>
            <TextInput
              value={this.state.dateText}
              placeholder='Enter birth date'
              editable={false}
              underlineColorAndroid={'transparent'}
              style={styles.TextInputStyleClass}
            />
          </View>
        </TouchableWithoutFeedback>

        <TextInput
          placeholder="Enter User Contact Number"
          onChangeText={contactNum => this.setState({UserContactNumber : contactNum})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          keyboardType={'numeric'}
          />

          <TextInput
          placeholder="Enter User Description"
          onChangeText={user_description => this.setState({UserDescription : user_description})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
 
        <Button title="Sign Up" onPress={this.UserRegistrationFunction} color="#2196F3" />
      
  
 
</View>
            
    );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
  justifyContent: 'center',
  flex:1,
  margin: 10
},
 
TextInputStyleClass: {
 
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#2196F3',
  borderRadius: 5 ,
},

title:{

  fontSize: 22, 
  color: "#009688", 
  textAlign: 'center', 
  marginBottom: 15
},

input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
 
});