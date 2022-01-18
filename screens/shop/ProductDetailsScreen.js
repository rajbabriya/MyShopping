import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const itemId = props.navigation.getParam("itemId");
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === itemId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />

      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.btn}>
        <Button
          color={Colors.primaryColor}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(item));
          }}
        />
      </View>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (data) => {
  return { headerTitle: data.navigation.getParam("itemTitle") };
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height > 700 ? 500 : 350,
  },
  price: {
    textAlign: "center",
    marginVertical: 15,
    color: "#888",
    fontSize: 18,
  },
  desc: {
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 14,
  },
});
