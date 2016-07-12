import {
  white,
  blueGrey500,
  darkBlack,
  red500
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
import typography from 'material-ui/styles/typography';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const FlatTurtleBlue = "#22B1D7";

const Palette = {
  primary1Color: FlatTurtleBlue,
  primary2Color: white,
  primary3Color: blueGrey500,
  accent1Color: FlatTurtleBlue,
  accent2Color: FlatTurtleBlue,
  accent3Color: FlatTurtleBlue,
  textColor: white,
  alternateTextColor: FlatTurtleBlue,
  canvasColor: FlatTurtleBlue,
  disabledColor: blueGrey500,
  pickerHeaderColor: FlatTurtleBlue
};

const Theme = getMuiTheme({
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Soho Gothic W01 Light, sans-serif',
  palette: Palette,
  textField: {
    floatingLabelColor: Palette.primary1Color,
    focusColor: Palette.primary1Color,
    textColor: Palette.textColor,
    hintColor: fade(Palette.textColor, 0.75),
    disabledTextColor: Palette.disabledColor,
    errorColor: red500,
    backgroundColor: 'transparent',
    borderColor: Palette.borderColor
  },
  raisedButton: {
    primaryColor: Palette.primary1Color,
    primaryTextColor: Palette.textColor,
    secondaryColor: Palette.primary2Color,
    secondaryTextColor: Palette.alternateTextColor
  },
  floatingActionButton: {
    buttonSize: 70,
    miniSize: 40,
    color: Palette.primary2Color,
    iconColor: Palette.alternateTextColor,
    secondaryColor: Palette.accent1Color,
    secondaryIconColor: Palette.textColor,
    disabledTextColor: Palette.disabledColor
  },
  tabs: {
    backgroundColor: Palette.primary2Color,
    selectedTextColor: Palette.alternateTextColor
  },
  stepper: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: fade(darkBlack, 0.06),
    iconColor: Palette.primary1Color,
    hoveredIconColor: blueGrey500,
    inactiveIconColor: Palette.primary3Color,
    textColor: Palette.textColor,
    disabledTextColor: fade(Palette.textColor, 0.4),
    connectorLineColor: Palette.textColor
  },
  paper: {
    color: Palette.alternateTextColor,
    backgroundColor: Palette.primary2Color
  },
  dialog: {
    titleFontSize: 22,
    bodyFontSize: 16,
    bodyColor: Palette.alternateTextColor
  },
  flatButton: {
    color: 'transparent',
    buttonFilterColor: '#999999',
    disabledTextColor: fade(Palette.alternateTextColor, 0.3),
    textColor: Palette.textColor,
    primaryTextColor: Palette.alternateTextColor,
    secondaryTextColor: Palette.alternateTextColor,
    fontSize: typography.fontStyleButtonFontSize,
    fontWeight: typography.fontWeightMedium
  }
});

module.exports = {
  Theme,
  Palette
};
