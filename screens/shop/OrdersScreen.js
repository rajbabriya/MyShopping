import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = (navdata) => {
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
    headerTitle: "Your Orders",
  };
};

export default OrderScreen;
