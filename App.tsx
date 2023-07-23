
import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import MyStack from './app/routes/RouteNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
