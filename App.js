import {
  createStackNavigator,
} from 'react-navigation';
import login from './login';
import home from './home';
import search from './search';
import searchResult from './searchResult';
import search_isbn from './search_isbn';
import bookshelf from './bookshelf';
import bookshelfresult from './bookshelfresult';
import edit from './edit';
import bookstore from './bookstore';
import bookstoreresult from './bookstoreresult';
import editbookstore from './editbookstore';
import publicbookstore from './publicbookstore';
import publicbookstoreresult from './publicbookstoreresult';
import wishlist from './wishlist'
import wishlistresult from './wishlistresult';
import editwishlist from './editwishlist';
import barcodeScan from './barcodeScan';
import register from './register';
import accountSetting from './accountSetting';
console.disableYellowBox = true;
export default createStackNavigator({
  Login:{
    screen:login,
  },
  Home:{
    screen:home
  },
  Search:{
    screen:search,
  },
  SearchResult:{
    screen:searchResult,
  },
  Search_Isbn:{
    screen:search_isbn,
  },
  Bookshelf:{
    screen:bookshelf,
  },
  Bookshelfresult:{
    screen:bookshelfresult,
  },
  Edit:{
    screen:edit,
  },
  Bookstore:{
    screen:bookstore,
  },
  Bookstoreresult:{
    screen:bookstoreresult,
  },
  Editbookstore:{
    screen:editbookstore,
  },
  Publicbookstore:{
    screen:publicbookstore,
  },
  Publicbookstoreresult:{
    screen:publicbookstoreresult,
  },
  Wishlist:{
    screen:wishlist,
  },
  WishlistResult:{
    screen:wishlistresult,
  },
  EditWishlist:{
    screen:editwishlist,
  },
  BarcodeScan:{
    screen:barcodeScan,
  },
  Register:{
    screen:register,
  },
  AccountSetting:{
    screen:accountSetting,
  }

}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});
