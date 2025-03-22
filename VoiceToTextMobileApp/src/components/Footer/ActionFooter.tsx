import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../styles/theme';
import {ActionFooterProps} from '../../types/app';

export const ActionFooter: React.FC<ActionFooterProps> = ({actions}) => {
  return (
    <View style={styles.footer}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={`action-${index}`}
          style={styles.button}
          onPress={action.onPress}>
          <Text style={styles.buttonText}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  button: {
    backgroundColor: theme.colors.info,
    borderRadius: theme.borderRadius.medium,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default ActionFooter;
