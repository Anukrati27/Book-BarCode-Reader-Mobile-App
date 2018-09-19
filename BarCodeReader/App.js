import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './Home';
import { AboutScreen } from './About';
import { ScannerScreen } from './Scanner';
import { ShowAllDataScreen } from './ShowAllData';


const App = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: {
    title: 'Home',
  },},
  About: { screen: AboutScreen, navigationOptions: {
    title: 'About', 
  },},
  Scanner: { screen: ScannerScreen, navigationOptions: {
    title: 'Scanner',
  },},
  ShowAllData: { screen: ShowAllDataScreen, navigationOptions: {
    title: 'ShowAllData',
  },}
});


export default App;
