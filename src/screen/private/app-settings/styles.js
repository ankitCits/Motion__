import { screenHeight, screenWidth, colors, fontFamily } from '../../../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexRow: { flexDirection: 'row' },
    container: {
        marginLeft: screenWidth(6),
    },
    subContainer: {
        marginVertical: 16,
    },
    toggleContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 20
    },
    titleText: {
        fontSize: 16,
        color: '#333333',
        fontFamily: fontFamily.AVENIR_HEAVY,
    },
    subText: {
        color: '#A1A1A1',
        fontSize: 14,
        fontFamily: fontFamily.AVENIR_BOOK
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
        textAlign: 'center',
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
      closeBack:{
        backgroundColor:colors.SKY_BLUE
      }
});

export { styles };