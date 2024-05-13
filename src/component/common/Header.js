import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Sizes, Fonts } from "../../assets/style";
import AntDesign from 'react-native-vector-icons/AntDesign'

function Header({ navigation, heading }) {
    return (
        <View
            style={{
                padding: Sizes.fixPadding * 1.5,
                ...styles.row,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: Colors.grayLight,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign
                    name="leftcircleo"
                    color={Colors.primaryLight}
                    size={Sizes.fixPadding * 2.2}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...Fonts.primaryLight15RobotoMedium,
                    textAlign: 'center',
                    flex: 1,
                }}>
                {heading}
            </Text>
        </View>
    );
}

export default Header


const styles = StyleSheet.create({
    row: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });