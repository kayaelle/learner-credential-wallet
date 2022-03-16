import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  containerMiddle: {
    justifyContent: 'center',
  },
  image: {
    height: 72,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.title,
    color: theme.color.textPrimary,
    padding: 16,
    textAlign: 'center',
  },
  paragraph: {
    ...mixins.paragraphText,
    fontSize: theme.fontSize.medium,
    textAlign: 'center',
    marginBottom: 48,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    color: theme.color.iconInactive,
    fontSize: theme.fontSize.small,
    fontFamily: theme.fontFamily.bold,
  },
  stepTextActive: {
    color: theme.color.textPrimary,
  },
  stepDivider: {
    borderBottomColor: theme.color.iconInactive,
    borderBottomWidth: 1,
    width: 24,
    height: 1,
    marginHorizontal: 12,
  },
  header: {
    fontSize: theme.fontSize.header,
    fontFamily: theme.fontFamily.bold,
    color: theme.color.textHeader,
    marginTop: 32,
  },
  paragraphRegular: {
    ...mixins.paragraphText,
    textAlign: 'center',
    margin: 8,
  },
  arrowIcon: {
    marginLeft: 20,
  },
  buttonClear: {
    backgroundColor: theme.color.transparent,
  },
  buttonClearContainer: {
    flex: 1,
  },
  buttonClearTitle: {
    color: theme.color.textSecondary,
  },
  buttonDisabled: {
    backgroundColor: theme.color.buttonDisabled,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  inputSeparator: {
    height: 20,
  },
});
