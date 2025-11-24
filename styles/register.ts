import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, FONTS, globalStyles, SPACING } from ".";

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  keyboardView: {
    ...globalStyles.keyboardView,
  },
  scrollContent: {
    ...globalStyles.scrollContent,
  },
  formContainer: {
    ...globalStyles.card,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    marginBottom: SPACING.xxl,
  },
  inputContainer: {
    ...globalStyles.inputContainer,
  },
  errorContainer: {
    backgroundColor: COLORS.error + "15",
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  label: {
    ...globalStyles.label,
  },
  labelError: {
    ...globalStyles.errorText,
  },
  input: {
    ...globalStyles.input,
  },
  multilineInput: {
    ...globalStyles.inputMultiline,
  },
  registerButton: {
    ...globalStyles.buttonPrimary,
    marginTop: SPACING.base,
  },
  disabledButton: {
    ...globalStyles.buttonDisabled,
  },
  registerButtonText: {
    ...globalStyles.buttonPrimaryText,
  },
  loginContainer: {
    ...globalStyles.rowCenter,
    marginTop: SPACING.xl,
  },
  loginText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  loginLink: {
    fontSize: FONT_SIZES.sm,
  },
  loginLinkText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    textDecorationLine: "underline",
  },
});
