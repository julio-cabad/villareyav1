import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import Toast from 'react-native-toast-message';
import NavigationApp from './src/components/routes/Navigation';
import {CreateTable} from './src/database/Schemas';
import {StoreProvider} from './src/store/Provider';

const App = () => {

  useEffect(() => {
    let isMounted = true;

    const createTables = async () => {
      await CreateTable();
    };

    isMounted && createTables().catch(() => {
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
      <StoreProvider>
        <View style={{flex: 1}}>
          <StatusBar  hidden={true}/>
          <NavigationApp/>
          <Toast ref={(ref) => Toast.setRef(ref)}/>
        </View>
      </StoreProvider>
  );
};

export default App;
