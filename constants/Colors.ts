const white = "#FFFFFF"; // Pure white
const orange = "#FFA500"; // Vibrant orange
const lightOrange = "#FFD580"; // Lighter shade of orange for accents
const darkOrange = "#CC8400"; // Darker shade of orange for contrast
const gray = "#F5F5F5"; // Light gray for subtle backgrounds
const offWhite = "#FAFAFA"; // Off-white for softer backgrounds
const borderOrange = "#E59400"; // Slightly muted orange for borders
const lightBlack = "#666666"; // Light black for subtle dark elements

export default {
  background: white, // Main background color
  text: darkOrange, // Text color for high contrast on white
  primary: orange, // Primary color for buttons, highlights, and focus elements
  onPrimary: white, // Text or icons on top of primary elements
  lightAccent: lightOrange, // Use for secondary accents or subtle highlights
  darkAccent: darkOrange, // Use for hover states or contrast accents
  border: borderOrange, // Border color for outlines and separators
  mutedBackground: gray, // Background for muted sections
  subtleBackground: offWhite, // Subtle off-white background option
  lightBlack: lightBlack, // Subtle black for text or background
};
