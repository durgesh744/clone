import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors, Sizes, Fonts } from "../../assets/style";
import { FlatList } from "react-native";
import { SCREEN_WIDTH } from "../../config/Screen";

const EcommerceInfo = ({ navigation }) => {
    const ecommerceData = [
        {
            name: "Crystal Bracelets",
            image: "pooja.jpg",
            type: "products"
        },
        {
            name: "Book a Pooja",
            image: "pooja.jpg",
            type: "book_a_pooja"
        },
        {
            name: "Spell",
            image: "spell.jpg",
            type: "spell"
        },
        {
            name: "Product 1",
            image: "product1.jpg",
            type: "products"
        },
    ];

    const navigate_to = (type, item) => {
        switch (type) {
            case 'book a pooja': {
                navigation.navigate('bookPooja', {
                    categoryData: item,
                    type: 'book_a_pooja',
                });
                break;
            }
            case 'spell': {
                navigation.navigate('bookPooja', { categoryData: item, type: 'spell' });
                break;
            }
            default: {
                navigation.navigate('products', {
                    categoryData: item,
                    type: 'products',
                });
            }
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigate_to(item?.name.toLowerCase(), item)}
                style={{
                    width: SCREEN_WIDTH * 0.4,
                    marginLeft: Sizes.fixPadding * 1.5,
                    borderRadius: Sizes.fixPadding,
                    overflow: 'hidden',
                    marginBottom: Sizes.fixPadding * 1.5,
                    padding: Sizes.fixPadding * 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: Sizes.fixPadding * 2,
                }}>
                <Image
                    source={require("../../assets/images/users/user2.jpg")}
                    style={{
                        width: '90%',
                        height: SCREEN_WIDTH * 0.4,
                        borderTopLeftRadius: Sizes.fixPadding,
                        borderTopRightRadius: Sizes.fixPadding,
                    }}
                />
                <View
                    style={{
                        width: '100%',
                        backgroundColor: Colors.whiteDark,
                        elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        position: 'absolute',
                        bottom: Sizes.fixPadding,
                        paddingVertical: Sizes.fixPadding * 0.3,
                        borderRadius: Sizes.fixPadding * 0.7,
                        shadowColor: Colors.blackLight,
                    }}>
                    <Text style={{ ...Fonts.black14InterMedium, textAlign: 'center' }}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
            <View
                style={{
                    ...styles.row,
                    justifyContent: 'space-between',
                    paddingHorizontal: Sizes.fixPadding * 1.5,
                    paddingVertical: Sizes.fixPadding,
                }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Fortune Store</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('eCommerce')}>
                    <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={ecommerceData}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
            />
        </View>
    );
}

export default EcommerceInfo


const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});