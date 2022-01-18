import React from "react";
import { FlatList, Text, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      itemId: id,
      itemTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          // onViewDetail={() => {
          //   // console.log(props);
          //   props.navigation.navigate("ProductDetails", {
          //     itemId: itemData.item.id,
          //     itemTitle: itemData.item.title,
          //   });
          // }}
          // onAddToCart={() => {
          //   dispatch(cartActions.addToCart(itemData.item));
          // }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navdata) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title="menu"
          onPress={() => {
            navdata.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          title="Cart"
          onPress={() => {
            navdata.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;
