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
    justifyContent: "center",
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
    marginBottom: SPACING.xxxl,
  },
  inputContainer: {
    ...globalStyles.inputContainer,
  },
  label: {
    ...globalStyles.label,
  },
  input: {
    ...globalStyles.input,
  },
  loginButton: {
    ...globalStyles.buttonPrimary,
    marginTop: SPACING.lg,
  },
  disabledButton: {
    ...globalStyles.buttonDisabled,
  },
  loginButtonText: {
    ...globalStyles.buttonPrimaryText,
  },
  registerContainer: {
    ...globalStyles.rowCenter,
    marginTop: SPACING.xxl,
  },
  registerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  registerLink: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    textDecorationLine: "underline",
  },
});
