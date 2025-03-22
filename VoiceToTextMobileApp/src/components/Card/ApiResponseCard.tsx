import React from 'react';
import {Text, StyleSheet, FlatList, View} from 'react-native';
import {theme} from '../../styles/theme';
import {ApiResponseCardProps} from '../../types/app';

export const ApiResponseCard: React.FC<ApiResponseCardProps> = ({response}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Transcription Results</Text>

      <View style={[styles.messageContainer]}>
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
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.card,
    ...theme.shadows.large,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.m,
    color: theme.colors.text,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,
  },
  messageText: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  listContainer: {
    maxHeight: 300,
  },
  listContentContainer: {
    paddingVertical: theme.spacing.s,
  },
  itemContainer: {
    padding: theme.spacing.m - 2,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.card,
    marginVertical: theme.spacing.xs,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
    ...theme.shadows.small,
  },
  itemText: {
    fontSize: theme.typography.fontSize.regular,
    color: theme.colors.text,
  },
});

export default ApiResponseCard;
