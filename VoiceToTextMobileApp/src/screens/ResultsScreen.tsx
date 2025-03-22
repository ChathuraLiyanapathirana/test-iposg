import React from 'react';
import {View, StyleSheet, BackHandler, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApiStore} from '../store';
import {ApiSuccessResponse, ResultsScreenNavigationProp} from '../types/app';
import {theme} from '../styles/theme';
import {ApiResponseCard} from '../components/Card';
import {ActionFooter} from '../components/Footer';
import {GradientBackground} from '../components/Gradient/GradientBackground';

const ResultsScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const {response, resetResponse} = useApiStore();

  const handleGoBack = React.useCallback(() => {
    resetResponse();
    navigation.navigate('Record');
  }, [resetResponse, navigation]);

  React.useEffect(() => {
    if (!response) {
      navigation.replace('Record');
    }
  }, [response, navigation]);

  // Handle Android hardware back button
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          handleGoBack();
          return true;
        },
      );

      return () => backHandler.remove();
    }
  }, [handleGoBack]);

  if (!response || !response.success) {
    return null;
  }

  const successResponse = response as ApiSuccessResponse;

  return (
    <GradientBackground variant="card" style={styles.container}>
      <View style={styles.contentContainer}>
        <ApiResponseCard response={successResponse} />
      </View>

      <ActionFooter
        actions={[
          {
            label: 'Record Again',
            onPress: handleGoBack,
          },
        ]}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.l,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
});

export default ResultsScreen;
