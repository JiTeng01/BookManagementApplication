import React, { Component } from 'react';

import { StyleSheet, Text, View, ListView, ActivityIndicator, TextInput, Image, Alert,TouchableOpacity,TouchableHighlight, AsyncStorage} from 'react-native';
import Menu, {
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

let config=require('./config');

export default class MainActivity extends Component {

    static navigationOptions =
    {
       title: 'My BookShelf',
    };

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
        }
        this.arrayholder=[];
      }

      componentDidMount() {
        this._load();
      }

      _load(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf.php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              isFetching:false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadAsc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(ASC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadDesc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(DESC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadDateAsc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(DATE_ASC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadDateDesc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(DATE_DESC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadAuthorAsc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(AUTHOR_ASC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadAuthorDesc(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(AUTHOR_DESC).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      _loadCategories(){
        return fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf(CATEGORIES).php',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Pass id to php
            UserId: this.props.navigation.state.params.UserId
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            }, function() {
              this.arrayholder=responseJson;
            });
          })
          .catch((error) => {
            Alert.alert("error occur");
          });
      }

      SearchFilterFunction(text){
         const newData = this.arrayholder.filter(function(item){
         const itemData = item.title.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }
 pressRow(book){
    this.props.navigation.navigate('Home')
  }

  renderRow(book){
    if (book)
    {
      return(
        <TouchableHighlight onPress={() => {
          this.pressRow(book);
        }}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: book.image}} />
            <View style={styles.bookInfo}>
              <Text style={styles.title}>
                {book.title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )

    }

  }

      ListViewItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }

      render() {
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
            </View>
          );
        }

        return (
          <MenuProvider style={{flex: 1}}>
          <View style={styles.MainContainer}>
          <TextInput
            style={styles.TextInputStyleClass}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid='transparent'
            placeholder="Search Here"
          />
            <TouchableOpacity>
            <View style={styles.topbar}>
            <View style={{flex:1}}></View>
            <Menu>
            <MenuTrigger style={styles.trigger}>
              <Image style={styles.image} source={require('./image/sort.png')} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionText: styles.text }}>
                <MenuOption onSelect={()=>this._loadAsc()} text='Alphabetical order(A-Z)' />
                <MenuOption onSelect={()=>this._loadDesc()} text='Alphabetical order(Z-A)' />
                <MenuOption onSelect={()=>this._loadDateAsc()} text='Date Ascending Order' />
                <MenuOption onSelect={()=>this._loadDateDesc()} text='Date Descending Order' />
                <MenuOption onSelect={()=>this._loadAuthorAsc()} text='Author Ascending Order' />
                <MenuOption onSelect={()=>this._loadAuthorDesc()} text='Author Descending Order' />
                <MenuOption onSelect={()=>this._loadCategories()} text='Categories'/>
                <MenuOption onSelect={()=>this._load()} text='Default' />
              </MenuOptions>
            </Menu>
          </View>
            </TouchableOpacity>

            <ListView
        enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(book)=>
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Bookshelfresult',{book:book, UserId:this.props.navigation.state.params.UserId,refresh:()=>this._load()})
              }}>
                <View style={styles.row}>
                  <Image style={styles.thumb} source={{uri: book.image}} />
                  <View style={styles.bookInfo}>
                    <Text style={styles.title}>
                      {book.title}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
        }
        />
        </View>
      </MenuProvider>
        );
      }
    }

const styles = StyleSheet.create(
{
 MainContainer:
 {
    justifyContent: 'center',
    flex:1,
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
    fontSize: 20,
    color: '#000',
    textAlign:'center',
  },

  TextInputStyleClass:{

   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
   },

   image:{
    alignItems: 'flex-end',
    
   },
   trigger: {
    padding: 5,
    margin: 5,
  },
  row: {
    flexDirection:'row',
    justifyContent:'center',
    padding:12,
    backgroundColor:'#666666',
    marginBottom:5
  },
  bookInfo:{
    flex:1,
    marginLeft:5
  },
  title:{
    color:'#ffffff',
    fontSize:18
  },
  thumb:{
    width:90,
    height:120
  },
});
