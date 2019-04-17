import React, { Component } from 'react';

import { StyleSheet, Alert, Text, View, Image, ScrollView } from 'react-native';
import Button from 'apsl-react-native-button';
let config=require('./config');

export default class SecondActivity extends Component {
  static navigationOptions =
    {
      title: 'Book details',
    };

  constructor(props) {
    super(props)
    this.state = {
      BookId: '',
      title: '',
      author: '',
      year: '',
      isbn: '',
      publisher: '',
      UserId: '',
      image: '',
      page:'',
      language:'',
      BookInfo:'',
      DateOfPurchase:'',
      PurchasePrice:'',
      notes:'',
      categories:'',
      time:'',
      book: this.props.navigation.state.params.book,
    };
    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  componentWillUnmount() {
    this.props.navigation.state.params.refresh()
  }

  _load() {
    return fetch('https://bookmanagementapplication.000webhostapp.com/wishlistresult.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Getting the id.
        BookId: this.state.book.BookId,
        UserId: this.props.navigation.state.params.UserId,
        time: this.state.book.time,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          title: responseJson[0].title,
          BookId: responseJson[0].BookId,
          author: responseJson[0].author,
          year: responseJson[0].year,
          image: responseJson[0].image,
          isbn: responseJson[0].isbn,
          publisher: responseJson[0].publisher,
          page: responseJson[0].page,
          language: responseJson[0].language,
          BookInfo: responseJson[0].BookInfo,
          notes: responseJson[0].notes,
          UserId: this.props.navigation.state.params.UserId,
          time:responseJson[0].time,
        })

      }).catch((error) => {
        console.error(error);
        console.log(this.state.book.BookId);
      });
  }

  DeleteRecord = () => {
    Alert.alert('Alert', 'Are you sure you want to delete?', [
      {
        text: 'No',
        onPress: () => { },
      },
      {
        text: 'Yes',
        onPress: () => {
          fetch('https://bookmanagementapplication.000webhostapp.com/deleteWishlist.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              BookId: this.state.book.BookId,
              UserId: this.props.navigation.state.params.UserId,
              title: this.state.book.title,
              time: this.state.book.time,
            })

          }).then((response) => response.json())
            .then((responseJson) => {
              Alert.alert(responseJson);
              this.props.navigation.goBack();
            }).catch((error) => {
              Alert.alert("Opps, error");
            })
        },
      },
    ], { cancelable: false });
  }


  render() {
    return (
      <ScrollView>
      <View style={styles.MainContainer}>

        <View style={{ flex: 1, flexDirection: 'column' }} >

        <Image
        style={{width: 130, height: 165, alignSelf: 'center'}}
        source={{uri:this.state.image}}
      />

          <Text style={styles.textViewContainer} > {'Title = ' + this.state.title} </Text>

          <Text style={styles.textViewContainer} > {'Author = ' + this.state.author} </Text>

          <Text style={styles.textViewContainer} > {'Year = ' + this.state.year} </Text>

          <Text style={styles.textViewContainer} > {'ISBN = ' + this.state.isbn} </Text>

          <Text style={styles.textViewContainer} > {'Publisher = ' + this.state.publisher} </Text>

          <Text style={styles.textViewContainer} > {'Page = ' +this.state.page} </Text>

          <Text style={styles.textViewContainer} > {'Language = ' +this.state.language} </Text>

          <Text style={styles.textViewContainer} > {'Description = ' +this.state.BookInfo} </Text>

          <Text style={styles.textViewContainer} > {'Notes = ' +this.state.notes} </Text>


          <Button style={styles.buttonStyle3}  onPress={() => { this.props.navigation.navigate('EditWishlist', {book:this.state.book, UserId:this.props.navigation.state.params.UserId})}}>
            <View>
              <Text style={styles.textStyle}>Edit</Text>
            </View>
          </Button>

          <Button style={styles.buttonStyle2}  onPress={this.DeleteRecord}>
            <View>
              <Text style={styles.textStyle}>Delete</Text>
            </View>
          </Button>


        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create(
  {
    TouchableOpacityStyle:
    {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#009688',
      marginBottom: 20,
      width: '90%'

    },
   
    MainContainer:
    {
      justifyContent: 'center',
      flex: 1,
      margin: 10

    },

    rowViewContainer: {
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },

    textViewContainer: {
        padding:5,
        fontSize: 22,
        color: '#000',
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
    textStyle: {
      color: 'white',
      fontFamily: 'Avenir',
      fontWeight: 'bold',
      fontSize: 17,
    },
  });
