import { Platform, StyleSheet } from "react-native";

// FONTS - Uber style uses clean, sans-serif fonts
export const FONTS = {
  regular: Platform.OS === "ios" ? "System" : "Poppins-Regular",
  semiBold: Platform.OS === "ios" ? "System" : "Poppins-SemiBold",
  bold: Platform.OS === "ios" ? "System" : "Poppins-Bold",
};

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 34,
  huge: 42,
};

// COLORS - Uber's minimalist black & white aesthetic with subtle grays
export const COLORS = {
  // Primary
  primary: "#000000",
  primaryLight: "#333333",

  // Background
  background: "#FFFFFF",
  backgroundGray: "#F6F6F6",
  backgroundDark: "#EEEEEE",

  // Text
  textPrimary: "#000000",
  textSecondary: "#545454",
  textTertiary: "#8A8A8A",
  textDisabled: "#CACACA",
  textInverse: "#FFFFFF",

  // Input
  inputBorder: "#E2E2E2",
  inputBorderFocus: "#000000",
  inputBg: "#FFFFFF",
  inputBgDisabled: "#F6F6F6",

  // Button
  buttonPrimary: "#000000",
  buttonSecondary: "#EEEEEE",
  buttonDisabled: "#E2E2E2",

  // Status
  success: "#05A357",
  error: "#CD0A0A",
  warning: "#F9A825",
  info: "#276EF1",

  // Divider
  divider: "#E2E2E2",

  // Shadow
  shadow: "rgba(0, 0, 0, 0.1)",
};

// SPACING - Uber uses consistent 4px grid
export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
};

// BORDER RADIUS - Uber uses subtle, consistent radius
export const RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// SHADOWS - Subtle elevation, Uber style
export const SHADOWS = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 5,
  },
};

// GLOBAL STYLES
export const globalStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
  },

  // Card - Clean white surface with subtle shadow
  card: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },

  // Typography
  heading1: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    marginBottom: SPACING.sm,
  },

  heading2: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    marginBottom: SPACING.sm,
  },

  heading3: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    marginBottom: SPACING.xs,
  },

  body: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    lineHeight: 22,
  },

  bodySmall: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    fontFamily: FONTS.regular,
    lineHeight: 18,
  },

  // Input Container
  inputContainer: {
    marginBottom: SPACING.lg,
  },

  // Label
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "500",
    marginBottom: SPACING.xs,
    color: COLORS.textPrimary,
    fontFamily: FONTS.regular,
  },

  // Input - Clean, minimal border
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.inputBg,
    fontFamily: FONTS.regular,
  },

  inputFocused: {
    borderColor: COLORS.inputBorderFocus,
    borderWidth: 2,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  inputMultiline: {
    paddingTop: SPACING.md,
    height: 100,
    textAlignVertical: "top",
  },

  // Error Text
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
    fontFamily: FONTS.regular,
  },

  // Button - Primary (Black)
  buttonPrimary: {
    backgroundColor: COLORS.buttonPrimary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },

  buttonPrimaryText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    fontFamily: FONTS.semiBold,
  },

  // Button - Secondary (Gray)
  buttonSecondary: {
    backgroundColor: COLORS.buttonSecondary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },

  buttonSecondaryText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    fontFamily: FONTS.semiBold,
  },

  // Button - Disabled
  buttonDisabled: {
    backgroundColor: COLORS.buttonDisabled,
    opacity: 0.5,
  },

  buttonDisabledText: {
    color: COLORS.textDisabled,
  },

  // Link
  link: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.base,
    fontWeight: "500",
    fontFamily: FONTS.regular,
    textDecorationLine: "underline",
  },

  linkSmall: {
    fontSize: FONT_SIZES.sm,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.lg,
  },

  // Centered Row
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

// Helper function to create spacing styles
export const createSpacing = (value: keyof typeof SPACING) => ({
  margin: SPACING[value],
});

export const createPadding = (value: keyof typeof SPACING) => ({
  padding: SPACING[value],
});
