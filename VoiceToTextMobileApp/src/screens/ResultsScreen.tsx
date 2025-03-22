import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApiStore} from '../store';
import {ApiSuccessResponse, ResultsScreenNavigationProp} from '../types/app';
import {theme} from '../styles/theme';
import {ScreenHeader} from '../components/Header';
import {ApiResponseCard} from '../components/Card';
import {ActionFooter} from '../components/Footer';

const ResultsScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const {response, resetResponse} = useApiStore();

  const handleGoBack = () => {
    resetResponse();
    navigation.navigate('Record');
  };

  React.useEffect(() => {
    if (!response) {
      navigation.replace('Record');
    }
  }, [response, navigation]);

  if (!response || !response.success) {
    return null;
  }

  const successResponse = response as ApiSuccessResponse;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Results" />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
});

export default ResultsScreen;
