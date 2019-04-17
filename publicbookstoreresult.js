import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    ScaleAnimation,
  } from 'react-native-popup-dialog';
import Button from 'apsl-react-native-button';
let config=require('./config');
import call from 'react-native-phone-call';

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
      customBackgroundDialog: false,
      defaultAnimationDialog: false,
      scaleAnimationDialog: false,
      slideAnimationDialog: false,
      email:'',
      user_id:'',
      gender:'',
      contactNum:'',
      nickname:'',
      user_description:'',
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
    return fetch('https://bookmanagementapplication.000webhostapp.com/publicbookstoreresult.php', {
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
          author: responseJson[0].author,
          BookId: responseJson[0].BookId,
          title:responseJson[0].title,
          year: responseJson[0].year,
          image: responseJson[0].image,
          isbn: responseJson[0].isbn,
          publisher: responseJson[0].publisher,
          page: responseJson[0].page,
          language: responseJson[0].language,
          BookInfo: responseJson[0].BookInfo,
          DateOfPurchase: responseJson[0].DateOfPurchase,
          PurchasePrice: responseJson[0].PurchasePrice,
          notes: responseJson[0].notes,
          categories: responseJson[0].categories,
          UserId: this.props.navigation.state.params.UserId,
          time:responseJson[0].time,
        })
      }).catch((error) => {
        console.error(error);
        console.log(this.state.book.BookId);
      });
  }

  _userInfo() {
    return fetch('https://bookmanagementapplication.000webhostapp.com/userInfo.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Getting the id.
          BookId: this.state.book.BookId,
          UserId: this.state.book.UserId,
          user_id: this.state.book.UserId,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            user_id: responseJson[0].user_id,
            email: responseJson[0].email,
            gender: responseJson[0].gender,
            contactNum: responseJson[0].contactNum,
            nickname: responseJson[0].nickname,
            user_description: responseJson[0].user_description,
          })
        }).catch((error) => {
          console.error(error);
        });
  }
  
  call = () => {
    const args = {
      number: this.state.contactNum,
      prompt: false,
    };
    call(args).catch(console.error);
  };



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

          <Text style={styles.textViewContainer} > {'Date of purchase = ' +this.state.DateOfPurchase} </Text>

          <Text style={styles.textViewContainer} > {'Purchase price = ' +this.state.PurchasePrice} </Text>

          <Text style={styles.textViewContainer} > {'Notes = ' +this.state.notes} </Text>

          <Text style={styles.textViewContainer} > {'Categories = ' +this.state.categories} </Text>

          <Button style={styles.buttonStyle3} onPress={() => {
                this.setState({ scaleAnimationDialog: true });
                this._userInfo();}}>
            <View>
              <Text style={styles.textStyle}>Contact</Text>
            </View>
          </Button>

          <Dialog
          onTouchOutside={() => {
            this.setState({ scaleAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          dialogTitle={
            <DialogTitle
              title="User information"
              hasTitleBar={false}
            />
          }
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.setState({ scaleAnimationDialog: false });
              }}
              key="button-1"
            />,
          ]}
        >
          <DialogContent>
          <Image style={styles.image} source={require('./image/user.png')} />
            <Text style={styles.TextStyle2}>{'Email = ' +this.state.email}</Text>
            <Text style={styles.TextStyle2}>{'Name = ' +this.state.nickname}</Text>
            <Text style={styles.TextStyle2}>{'Gender = ' +this.state.gender}</Text>
            <Text style={styles.TextStyle2}>{'Contact Number = ' +this.state.contactNum}</Text>
            <Text style={styles.TextStyle2}>{'User Description = ' +this.state.user_description}</Text>
            <Button style={styles.buttonStyle4} onPress={this.call}>
            <View>
              <Text style={styles.textStyle}>Call me</Text>
            </View>
          </Button>
          <Button style={styles.buttonStyle5} onPress={()=>Linking.openURL('mailto:'+this.state.email)}>
            <View>
              <Text style={styles.textStyle}>Email me</Text>
            </View>
          </Button>
          </DialogContent>
        </Dialog>

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
    TextStyle:
    {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18
    },
    TextStyle2:
    {
      color: '#000',
      //textAlign: 'center',
      fontSize: 18
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

    TextInputStyleClass: {

      textAlign: 'center',
      height: 40,
      borderWidth: 1,
      borderColor: '#009688',
      borderRadius: 7,
      backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
      },
      navigationTitle: {
        padding: 10,
      },
      navigationButton: {
        padding: 10,
      },
      navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
      },
      navigator: {
        flex: 1,
        // backgroundColor: '#000000',
      },
      customBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
      },
      image:{
        alignSelf: 'center',
        height: 100,
        width: 100,
    //borderWidth: 1,
    //borderRadius: 75
      },
      image2:{
        alignItems: 'center',
        height: 50,
        width: 50,
    //borderWidth: 1,
    //borderRadius: 75
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
