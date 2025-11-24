import { StyleSheet } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  RADIUS,
  SHADOWS,
  SPACING,
  globalStyles,
} from ".";

export default StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.massive,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "600",
    marginBottom: SPACING.xs,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  permissionContainer: {
    backgroundColor: COLORS.backgroundGray,
    padding: SPACING.base,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  permissionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    fontFamily: FONTS.regular,
  },
  permissionButton: {
    ...globalStyles.buttonPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    minHeight: 40,
  },
  permissionButtonText: {
    ...globalStyles.buttonPrimaryText,
    fontSize: FONT_SIZES.sm,
  },
  locationLoading: {
    ...globalStyles.row,
    justifyContent: "center",
    padding: SPACING.base,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  locationLoadingText: {
    marginLeft: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  notificationButton: {
    ...globalStyles.buttonPrimary,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  notificationButtonText: {
    ...globalStyles.buttonPrimaryText,
  },
  disabledButton: {
    ...globalStyles.buttonDisabled,
  },
  button: {
    ...globalStyles.buttonSecondary,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  buttonText: {
    ...globalStyles.buttonSecondaryText,
  },
});
