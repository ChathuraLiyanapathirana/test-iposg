import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';
import {ScreenHeaderProps} from '../../types/app';

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: theme.colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.s + 2,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.card,
  },
});

export default ScreenHeader;
