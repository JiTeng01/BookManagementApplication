
import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Text, Platform, TouchableOpacity, ScrollView} from 'react-native';

let config=require('./config');

export default class EditActivity extends Component {

  constructor(props) {
       super(props)
       this.state = {
         author: '',
         year: '',
         title: '',
         publisher: '',
         notes:'',
         UserId: '',
         time: '',
         book:this.props.navigation.state.params.book,
       }
     }

     componentDidMount(){
      this.setState({
        author : this.state.book.author,
        year: this.state.book.year,
        title: this.state.book.title,
        publisher: this.state.book.publisher,
        notes: this.state.book.notes,
        UserId: this.state.book.UserId,
        BookId: this.state.book.BookId,
        time: this.state.book.time,
        ActivityIndicator_Loading:true,
      })
     }

    static navigationOptions =
    {
       title: 'Edit Book Details',
    };

    UpdateRecord = () =>{
            fetch('https://bookmanagementapplication.000webhostapp.com/editwishlist.php', {
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

              notes: this.state.notes,

              BookId : this.state.book.BookId,

              time: this.state.book.time,
            })
            }).then((response) => response.json())
                .then((responseJson) => {

                  Alert.alert(responseJson);
                  this.props.navigation.navigate('Wishlist');
                }).catch((error) => {
                  console.error(error);
                });
      }

      

    render() {

      return (
<ScrollView>
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

          <TextInput
            placeholder="Enter notes"
            value={this.state.notes}
            onChangeText={ TextInputValue => this.setState({ notes : TextInputValue }) }
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
  }

});
