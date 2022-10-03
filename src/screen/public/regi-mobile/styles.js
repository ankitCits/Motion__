import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputViewContainer: {
    marginBottom: screenHeight(8),
  },
  titleText: {
    marginBottom: screenHeight(5),
  },
  textDetail: {
    fontFamily: fontFamily.SF_PRO_Regular,
    fontSize: 18,
    color: colors.CLR_WHITE,
    lineHeight: 24,
    marginBottom: screenHeight(4),
    width: screenWidth(80),
  },
  containerView: {
    width: screenWidth(80),
    height: 62,
    borderRadius: 30,
    backgroundColor: colors.CLR_WHITE,
    paddingLeft: 27,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  modalOuterContainer:{
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.CLR_WHITE,
    marginTop:'20%'
  },
  modalHeader: {
    flexDirection: 'row',
    marginVertical: 20
  },
  modelTitle: {
    fontWeight: '700',
    fontSize: 13,
    width: screenWidth(80),
    textAlign: 'center'
  },
  backButton: {
    fontWeight: '700',
    fontSize: 13,
    width: screenWidth(20),
    textAlign: 'center'
  },
  searchContainer: {
    backgroundColor: colors.Light_GRAY,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: screenHeight(8),
    borderColor: 'white',
    paddingVertical: 10
  },
  searchBox: {
    backgroundColor: colors.CLR_WHITE,
    width: screenWidth(90),
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    borderBottomColor: '#E8E8E8',
  },
  flag: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 13,
    left: 10,
    flexDirection: 'row',
    color: '#000',
  },

});
export { styles };
