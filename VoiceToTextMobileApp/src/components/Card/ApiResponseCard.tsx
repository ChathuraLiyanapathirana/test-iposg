import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {theme} from '../../styles/theme';
import {ApiResponseCardProps} from '../../types/app';

export const ApiResponseCard: React.FC<ApiResponseCardProps> = ({response}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>API Response</Text>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{response.data.message}</Text>
      </View>

      {response.data.items && response.data.items.length > 0 && (
        <FlatList
          data={response.data.items}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {typeof item === 'object'
                  ? JSON.stringify(item, null, 2)
                  : String(item)}
              </Text>
            </View>
          )}
          style={styles.listContainer}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.m - 4,
    color: theme.colors.text,
  },
  messageContainer: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m - 4,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
  },
  messageText: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
    lineHeight: 22,
  },
  listContainer: {
    maxHeight: 300,
  },
  listContentContainer: {
    paddingVertical: theme.spacing.s,
  },
  itemContainer: {
    padding: theme.spacing.m - 4,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.xs,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.info,
  },
  itemText: {
    fontSize: theme.typography.fontSize.regular,
    color: theme.colors.text,
  },
});

export default ApiResponseCard;
