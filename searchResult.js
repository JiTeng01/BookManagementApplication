import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import Button from 'apsl-react-native-button';
let config=require('./config');
export default class BookDetails extends Component {

    static navigationOptions =
    {
       title: 'Book details',
    };

  constructor(props) {
    super(props)
    this.state = {
        book: this.props.navigation.state.params.book,
        x:false,
        BookId : '',
        title : '',
        author : '',
        year:'',
        isbn:'',
        publisher:'',
        UserId:'',
        image:'',
        page:'',
        language:'',
        BookInfo:'',
        time:'',
        books: []
    }
  }

  httpToHttps(text){
    return text.toString().replace("http", "https");
  }

  Insert = () =>
     {
         this.setState({ ActivityIndicator_Loading : true }, () =>
         {
             fetch('https://bookmanagementapplication.000webhostapp.com/bookshelf.php',
             {
                 method: 'POST',
                 headers:
                 {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(
                 {
                    UserId:this.props.navigation.state.params.UserId,
                    BookId:this.state.book.id,
                    isbn:this.state.book.volumeInfo.industryIdentifiers[0].identifier,
                    title:this.state.book.volumeInfo.title,
                    author:this.state.book.volumeInfo.authors[0],
                    year:this.state.book.volumeInfo.publishedDate,
                    publisher:this.state.book.volumeInfo.publisher,
                    image:this.state.book.volumeInfo.imageLinks.thumbnail,
                    page:this.state.book.volumeInfo.pageCount,
                    language:this.state.book.volumeInfo.language,
                    BookInfo:this.state.book.volumeInfo.description,
                    DateOfPurchase:'',
                    PurchasePrice:'',
                    notes:'',
                    categories:'',
                    time:new Date(),
                 })
             }).then((response) => response.json()).then((responseJson) =>
             {
                for(let i=0;i<responseJson.length;i++){
                  if(responseJson[i].BookId===this.state.book.id){
                    this.setState({
                      x:true,
                    });
                    Alert.alert('Alert','Looks like it already have the same book inside your bookshelf, are you sure you want to add it anyway?', [
                      {
                       text: 'No',
                        onPress: () => { },
                      },
                      {
                        text: 'Yes',
                          onPress: () => {
                          fetch('https://bookmanagementapplication.000webhostapp.com/add.php', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              UserId:this.props.navigation.state.params.UserId,
                              BookId:this.state.book.id,
                              isbn:(typeof this.state.book.volumeInfo.industryIdentifiers[0].identifier!== 'undefined') ? this.state.book.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN description',
                              title:this.state.book.volumeInfo.title,
                              author:(typeof this.state.book.volumeInfo.authors[0]!== 'undefined') ? this.state.book.volumeInfo.authors[0] : 'No author description',
                              year:(typeof this.state.book.volumeInfo.publishedDate!== 'undefined') ? this.state.book.volumeInfo.publishedDate : 'No publisher date description',
                              publisher:(typeof this.state.book.volumeInfo.publisher!== 'undefined') ? this.state.book.volumeInfo.publisher : 'No publisher description',
                              image:(typeof this.state.book.volumeInfo.imageLinks.thumbnail!== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png',
                              page:(typeof this.state.book.volumeInfo.pageCount!== 'undefined') ? this.state.book.volumeInfo.pageCount : 'No page description',
                              language:(typeof this.state.book.volumeInfo.language!== 'undefined') ? this.state.book.volumeInfo.language : 'No language description',
                              BookInfo:(typeof this.state.book.volumeInfo.description!== 'undefined') ? this.state.book.volumeInfo.description : 'No book information description',
                              DateOfPurchase:'',
                              PurchasePrice:'',
                              notes:'',
                              categories:'',
                              time:new Date(),
                            })
                
                          }).then((response) => response.json())
                            .then((responseJsonFromServer) => {
                              alert(responseJsonFromServer);
                              this.setState({ ActivityIndicator_Loading : false });
                            }).catch(error => {
                              console(error);
                              this.setState({ ActivityIndicator_Loading : false});
                            })
                        },
                      },
                    ], { cancelable: false });
                  }
                }
                if(this.state.x===false){
                  this.setState({ ActivityIndicator_Loading : true }, () =>
                    {
                      fetch('https://bookmanagementapplication.000webhostapp.com/add.php',
                      {
                        method: 'POST',
                        headers:
                        {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                        {
                          UserId:this.props.navigation.state.params.UserId,
                          BookId:this.state.book.id,
                          isbn:(typeof this.state.book.volumeInfo.industryIdentifiers[0].identifier!== 'undefined') ? this.state.book.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN description',
                          title:this.state.book.volumeInfo.title,
                          author:(typeof this.state.book.volumeInfo.authors[0]!== 'undefined') ? this.state.book.volumeInfo.authors[0] : 'No author description',
                          year:(typeof this.state.book.volumeInfo.publishedDate!== 'undefined') ? this.state.book.volumeInfo.publishedDate : 'No publisher date description',
                          publisher:(typeof this.state.book.volumeInfo.publisher!== 'undefined') ? this.state.book.volumeInfo.publisher : 'No publisher description',
                          image:(typeof this.state.book.volumeInfo.imageLinks.thumbnail!== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png',
                          page:(typeof this.state.book.volumeInfo.pageCount!== 'undefined') ? this.state.book.volumeInfo.pageCount : 'No page description',
                          language:(typeof this.state.book.volumeInfo.language!== 'undefined') ? this.state.book.volumeInfo.language : 'No language description',
                          BookInfo:(typeof this.state.book.volumeInfo.description!== 'undefined') ? this.state.book.volumeInfo.description : 'No book information description',
                          DateOfPurchase:'',
                          PurchasePrice:'',
                          notes:'',
                          categories:'',
                          time:new Date(),
                        })
                    }).then((response) => response.json()).then((responseJsonFromServer) =>
                    {
                      alert(responseJsonFromServer);
                      this.setState({ ActivityIndicator_Loading : false });

                    }).catch(error =>
                    {
                      console.warn(error);
                      this.setState({ ActivityIndicator_Loading : false});
                    });
                });
              }               
                 this.setState({ ActivityIndicator_Loading : false });
             }).catch(error =>
             {

                 console.warn(error);
                 this.setState({ ActivityIndicator_Loading : false});
             });
         });
     }

     insertWishlist=()=>
     {
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          fetch('https://bookmanagementapplication.000webhostapp.com/wishlist.php',
          {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                 UserId:this.props.navigation.state.params.UserId,
                 BookId:this.state.book.id,
                 isbn:this.state.book.volumeInfo.industryIdentifiers[0].identifier,
                 title:this.state.book.volumeInfo.title,
                 author:this.state.book.volumeInfo.authors[0],
                 year:this.state.book.volumeInfo.publishedDate,
                 publisher:this.state.book.volumeInfo.publisher,
                 image:this.state.book.volumeInfo.imageLinks.thumbnail,
                 page:this.state.book.volumeInfo.pageCount,
                 language:this.state.book.volumeInfo.language,
                 BookInfo:this.state.book.volumeInfo.description,
                 notes:'',
                 time:new Date(),
              })
          }).then((response) => response.json()).then((responseJson) =>
          {
             for(let i=0;i<responseJson.length;i++){
               if(responseJson[i].BookId===this.state.book.id){
                 this.setState({
                   x:true,
                 });
                 Alert.alert('Alert','Looks like it already have the same book inside your wishlist, are you sure you want to add it anyway?', [
                   {
                    text: 'No',
                     onPress: () => { },
                   },
                   {
                     text: 'Yes',
                       onPress: () => {
                       fetch('https://bookmanagementapplication.000webhostapp.com/addWishlist.php', {
                         method: 'POST',
                         headers: {
                           'Accept': 'application/json',
                           'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({
                          UserId:this.props.navigation.state.params.UserId,
                          BookId:this.state.book.id,
                          isbn:(typeof this.state.book.volumeInfo.industryIdentifiers[0].identifier!== 'undefined') ? this.state.book.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN description',
                          title:this.state.book.volumeInfo.title,
                          author:(typeof this.state.book.volumeInfo.authors[0]!== 'undefined') ? this.state.book.volumeInfo.authors[0] : 'No author description',
                          year:(typeof this.state.book.volumeInfo.publishedDate!== 'undefined') ? this.state.book.volumeInfo.publishedDate : 'No publisher date description',
                          publisher:(typeof this.state.book.volumeInfo.publisher!== 'undefined') ? this.state.book.volumeInfo.publisher : 'No publisher description',
                          image:(typeof this.state.book.volumeInfo.imageLinks.thumbnail!== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png',
                          page:(typeof this.state.book.volumeInfo.pageCount!== 'undefined') ? this.state.book.volumeInfo.pageCount : 'No page description',
                          language:(typeof this.state.book.volumeInfo.language!== 'undefined') ? this.state.book.volumeInfo.language : 'No language description',
                          BookInfo:(typeof this.state.book.volumeInfo.description!== 'undefined') ? this.state.book.volumeInfo.description : 'No book information description',
                           notes:'',
                           time:new Date(),
                         })
             
                       }).then((response) => response.json())
                         .then((responseJsonFromServer) => {
                           alert(responseJsonFromServer);
                           this.setState({ ActivityIndicator_Loading : false });
                         }).catch(error => {
                           console(error);
                           this.setState({ ActivityIndicator_Loading : false});
                         })
                     },
                   },
                 ], { cancelable: false });
               }
             }
             if(this.state.x===false){
               this.setState({ ActivityIndicator_Loading : true }, () =>
                 {
                   fetch('https://bookmanagementapplication.000webhostapp.com/addWishlist.php',
                   {
                     method: 'POST',
                     headers:
                     {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(
                     {
                       UserId:this.props.navigation.state.params.UserId,
                       BookId:this.state.book.id,
                       isbn:(typeof this.state.book.volumeInfo.industryIdentifiers[0].identifier!== 'undefined') ? this.state.book.volumeInfo.industryIdentifiers[0].identifier : 'No ISBN description',
                       title:this.state.book.volumeInfo.title,
                       author:(typeof this.state.book.volumeInfo.authors[0]!== 'undefined') ? this.state.book.volumeInfo.authors[0] : 'No author description',
                       year:(typeof this.state.book.volumeInfo.publishedDate!== 'undefined') ? this.state.book.volumeInfo.publishedDate : 'No publisher date description',
                       publisher:(typeof this.state.book.volumeInfo.publisher!== 'undefined') ? this.state.book.volumeInfo.publisher : 'No publisher description',
                       image:(typeof this.state.book.volumeInfo.imageLinks.thumbnail!== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png',
                       page:(typeof this.state.book.volumeInfo.pageCount!== 'undefined') ? this.state.book.volumeInfo.pageCount : 'No page description',
                       language:(typeof this.state.book.volumeInfo.language!== 'undefined') ? this.state.book.volumeInfo.language : 'No language description',
                       BookInfo:(typeof this.state.book.volumeInfo.description!== 'undefined') ? this.state.book.volumeInfo.description : 'No book information description',
                       notes:'',
                       time:new Date(),
                     })
                 }).then((response) => response.json()).then((responseJsonFromServer) =>
                 {
                   alert(responseJsonFromServer);
                   this.setState({ ActivityIndicator_Loading : false });

                 }).catch(error =>
                 {
                   console.warn(error);
                   this.setState({ ActivityIndicator_Loading : false});
                 });
             });
           }               
              this.setState({ ActivityIndicator_Loading : false });
          }).catch(error =>
          {
              console.warn(error);
              this.setState({ ActivityIndicator_Loading : false});
          });
      });
     }


  render() {
    var imageURI = (typeof this.state.book.volumeInfo.imageLinks !== 'undefined') ? this.state.book.volumeInfo.imageLinks.thumbnail : 'http://www.epl.ca/wp-content/themes/bibliocommons/images/icon-book.png'
    return (
      <ScrollView>
      <View style={styles.addForm}>
      <Image
        style={{width: 130, height: 165, alignSelf: 'center'}}
        source={{uri:  this.httpToHttps(imageURI)}}
      />
       
        <Text style={styles.textViewContainer}>
          {'Title = ' + this.state.book.volumeInfo.title}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Author = '+ this.state.book.volumeInfo.authors[0]}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Page = ' + this.state.book.volumeInfo.pageCount}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Publisher = ' + this.state.book.volumeInfo.publisher}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Published date = ' + this.state.book.volumeInfo.publishedDate}
        </Text>
        <Text style={styles.textViewContainer}>
          {'ISBN = ' + this.state.book.volumeInfo.industryIdentifiers[0].identifier}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Language = ' + this.state.book.volumeInfo.language}
        </Text>
        <Text style={styles.textViewContainer}>
          {'Description = ' + this.state.book.volumeInfo.description}
        </Text>
        <Button style={styles.buttonStyle7}  onPress = { this.Insert }>
        <View>
          <Text style={styles.textStyle}>Add</Text>
        </View>
        </Button>
        <Button style={styles.buttonStyle3}  onPress = { this.insertWishlist }>
        <View>
          <Text style={styles.textStyle}>Add to wishlist</Text>
        </View>
        </Button>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  addForm: {
    backgroundColor: "#B0d4ff",
    padding: 20
  },
  textViewContainer: {
    padding:5,
    fontSize: 22,
    color: '#000',
  },
  TouchableOpacityStyle:
  {
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#009688',
    marginBottom: 20,
    width: '90%'
 
  },
  buttonStyle7: {
    borderColor: '#4eccdb',
    backgroundColor: '#33b0bf',
  },
  buttonStyle3: {
    borderColor: '#16a085',
    backgroundColor: '#1abc9c'
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 17,
  },

});

