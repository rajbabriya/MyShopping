import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Products",
      // headerBackground: Platform.OS === "android" ? "blue" : "white",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "blue" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "blue",
    },
  }
);

export default createAppContainer(ProductsNavigator);
