import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 50,
    paddingBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing.lg,
    top: 50,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  backButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: theme.fontSizes.xxxl,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    margin: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  primaryButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  secondaryButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
  },
  card: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  list: {
    flex: 1,
  },
});