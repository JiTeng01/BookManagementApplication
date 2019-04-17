import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';

export default class SearchBooks extends Component {

  static navigationOptions =
  {
     title: 'Book search',
  };

  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      bookDataSource:ds,
      text:''
    }

    this.pressRow = this.pressRow.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

httpToHttps(text){
  if (text)
  {
    return text.toString().replace("http", "https");
  }
 
}
  fetchBooks(){
    fetch('https://www.googleapis.com/books/v1/volumes?q='+this.state.text+'&key=AIzaSyBYaACMW0evJ6Nc6bufNWmRdGIhJ2-kwX4')
      .then((response) => response.json())
      .then((response) => {
        
        if (typeof response.items == 'undefined')
          return;
        if (response.items.hasOwnProperty('error'))
          return;
        if (response.totalItems != 0)
        {
          this.setState({
            bookDataSource: this.state.bookDataSource.cloneWithRows(response.items)
          })
        }
    
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onTextChange(text){
    if (text)
    {
      this.setState({
        text:text
      }, function(){
        console.log(this.state.text);
        this.fetchBooks()
      });
    }

  }

  pressRow(book){
    this.props.navigation.navigate('SearchResult', {book: book, UserId:this.props.navigation.state.params.UserId})
  }

  renderRow(book){
    if (book)
    {
      var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png'; 
      return(
        <TouchableHighlight onPress={() => {
          this.pressRow(book);
        }}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: this.httpToHttps(imageURI)}} />
            <View style={styles.bookInfo}>
              <Text style={styles.title}>
                {book.volumeInfo.title}
              </Text>
              <Text style={styles.subtitle}>
                {book.volumeInfo.subtitle}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )

    }

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.TextInputStyleClass}
          placeholder="Search Books"
          onChangeText={(text) => this.onTextChange(text)}
          underlineColorAndroid='transparent'
          selectTextOnFocus={true}
        />
        <ListView
        enableEmptySections={true}
          dataSource={this.state.bookDataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  textInput: {
    marginTop: 20,
    fontSize: 15
  },
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5 ,
    backgroundColor:'#ffffff'
    },
});