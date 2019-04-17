
import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Text, Platform, TouchableOpacity, ScrollView, DatePickerAndroid, TouchableWithoutFeedback} from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

let config=require('./config');

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

export default class EditActivity extends Component {

  constructor(props) {
       super(props)
       this.state = {
         user_id:this.props.navigation.state.params.UserId,
         email:'',
         gender:'',
         contactNum:'',
         nickname:'',
         dateText:'',
         date:new Date(),
         user_description:'',
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

     componentDidMount(){
      this._userInfo();
     }

    static navigationOptions =
    {
       title: 'Account Setting',
    };

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
                email:responseJson[0].email,
                gender: responseJson[0].gender,
                contactNum: responseJson[0].contactNum,
                nickname: responseJson[0].nickname,
                dateText: responseJson[0].birthday,
                user_description: responseJson[0].user_description,
              })
            }).catch((error) => {
              console.error(error);
            });
      }

    UpdateRecord = () =>{
            fetch('https://bookmanagementapplication.000webhostapp.com/accountSetting.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              user_id : this.props.navigation.state.params.UserId,

              contactNum : this.state.contactNum,

              nickname : this.state.nickname,

              birthday : this.state.dateText,

              user_description : this.state.user_description,
            })
            }).then((response) => response.json())
                .then((responseJson) => {
                  Alert.alert(responseJson);
                  if(responseJson==='Account information updated successfully'){
                    this.props.navigation.navigate('Home',{UserId:this.props.navigation.state.params.UserId});
                  }
                }).catch((error) => {
                  console.error(error);
                });
      }

    render() {

      return (
<ScrollView
  keyboardShouldPersistTaps={true}
  ref = 'scrollView'
  automaticallyAdjustContentInsets={false}
>
   <View style={styles.MainContainer}>

          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit User Details </Text>

          <TextInput
            placeholder="User Email Shows Here"
            value={this.state.email}
            onChangeText={ TextInputValue => this.setState({ email : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            editable={false}
          />

          <TextInput
            placeholder="User Nickname Shows Here"
            value={this.state.nickname}
            onChangeText={ TextInputValue => this.setState({ nickname : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="User Gender Shows Here"
            value={this.state.gender}
            onChangeText={ TextInputValue => this.setState({ gender : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            editable={false}
          />

         <TextInput
            placeholder="User Contact Number Shows Here"
            value={this.state.contactNum}
            onChangeText={ TextInputValue => this.setState({ contactNum : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            keyboardType="numeric"
          />

          <TouchableWithoutFeedback
          onPress={ this.openDatePicker }
          >
          <View style={{width: 392, marginLeft:40}}>       
            <TextInput
              placeholder='User Birth Date Shows here'
              value={this.state.dateText}      
              onChangeText={ TextInputValue => this.setState({ dateText : TextInputValue }) }       
              underlineColorAndroid={'transparent'}
              onPress={ this.openDatePicker }
              editable={false}
              style={styles.TextInputStyleClass}
            />
          </View>
        </TouchableWithoutFeedback>

        <TextInput
            placeholder="User Description Number Shows Here"
            value={this.state.user_description}
            onChangeText={ TextInputValue => this.setState({ user_description : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateRecord} >
            <Text style={styles.TextStyle}> UPDATE </Text>
         </TouchableOpacity>
   </View>
   </ScrollView>
   
      );
    }
}

const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#DCDCDC'

  },

  MainContainer_For_Show_StudentList_Activity :{

    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5

    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  datePickerBox:{
    marginTop: 9,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#121212',
  },

});
