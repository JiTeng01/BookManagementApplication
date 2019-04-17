
import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Text, Platform, TouchableOpacity, ScrollView, DatePickerAndroid, TouchableWithoutFeedback} from 'react-native';

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
         author: '',
         year: '',
         title: '',
         publisher: '',
         date: new Date(),
         dateText: 'Enter purchase date here',
         PurchasePrice:'',
         notes:'',
         categories:'',
         UserId: '',
         time: '',
         book:this.props.navigation.state.params.book,
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
      this.setState({
        author : this.state.book.author,
        year: this.state.book.year,
        title: this.state.book.title,
        publisher: this.state.book.publisher,
        PurchasePrice: this.state.book.PurchasePrice,
        notes: this.state.book.notes,
        categories: this.state.book.categories,
        UserId: this.state.book.UserId,
        BookId: this.state.book.BookId,
        time: this.state.book.time,
        dateText: this.state.book.DateOfPurchase,
        ActivityIndicator_Loading:true,
      })
     }

    static navigationOptions =
    {
       title: 'Edit Book Details',
    };

    UpdateRecord = () =>{
            fetch('https://bookmanagementapplication.000webhostapp.com/edit.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              UserId : this.props.navigation.state.params.UserId,

              author : this.state.book.author,

              year : this.state.year,

              title : this.state.title,

              publisher : this.state.publisher,

              DateOfPurchase: this.state.dateText,

              PurchasePrice: this.state.PurchasePrice,

              notes: this.state.notes,

              categories: this.state.categories,

              BookId : this.state.book.BookId,

              time: this.state.book.time,
            })
            }).then((response) => response.json())
                .then((responseJson) => {

                  Alert.alert(responseJson);
                  this.props.navigation.navigate('Bookshelf');
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

          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Book details </Text>

          <TextInput
            placeholder="Book author Shows Here"
            value={this.state.author}
            onChangeText={ TextInputValue => this.setState({ author : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Book publish year Shows Here"
            value={this.state.year}
            onChangeText={ TextInputValue => this.setState({ year : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

         <TextInput
            placeholder="Book title Number Shows Here"
            value={this.state.title}
            onChangeText={ TextInputValue => this.setState({ title : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Book Publisher Shows Here"
            value={this.state.publisher}
            onChangeText={ TextInputValue => this.setState({ publisher : TextInputValue }) }
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
        />

          <TouchableWithoutFeedback
          onPress={ this.openDatePicker }
          >
          <View style={{width: 392, marginLeft:40}}>       
            <TextInput
              placeholder='Enter purchase date'
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
            placeholder="Enter purchase price"
            value={this.state.PurchasePrice}
            onChangeText={ TextInputValue => this.setState({ PurchasePrice : TextInputValue }) }
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Enter notes"
            value={this.state.notes}
            onChangeText={ TextInputValue => this.setState({ notes : TextInputValue }) }
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
            style={styles.TextInputStyleClass}
          />

          <TextInput
            placeholder="Enter categories"
            value={this.state.categories}
            onChangeText={ TextInputValue => this.setState({ categories : TextInputValue }) }
            underlineColorAndroid='transparent'
            selectTextOnFocus={true}
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
