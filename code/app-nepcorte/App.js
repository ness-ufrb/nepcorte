import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './src/screens/SplashScreen';

const navigator = createStackNavigator(
  {
    Splash: SplashScreen
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      title: 'app-nepcorte'
    }
  }
);

export default createAppContainer(navigator);
