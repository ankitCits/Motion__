import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const componentWrapper = props => {
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {props.children}
      </SafeAreaView>
    </>
  );
};
export default componentWrapper;
