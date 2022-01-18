import { createAppContainer } from "react-navigation";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerTitle: "Products",
  // headerBackground: Platform.OS === "android" ? "blue" : "white",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.Blueee : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "blue",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

// const Drawer = createDrawerNavigator();

// export default function ShopNavigator() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Products">
//         <Drawer.Screen name="Products" component={ProductsNavigator} />
//         <Drawer.Screen name="Orders" component={OrdersNavigator} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
