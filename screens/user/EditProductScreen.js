import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "../../store/actions/Product";
import HeaderButton from "../../components/ui/HeaderButton";
import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("itemId");

  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  //   const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  //   const [titleIsValid, setTitleIsValid] = useState(false);

  //   const [imageUrl, setImageUrl] = useState(
  //     editedProduct ? editedProduct.imageUrl : ""
  //   );
  //   const [price, setPrice] = useState("");
  //   const [description, setDescription] = useState(
  //     editedProduct ? editedProduct.description : ""
  //   );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check your inputs.", [
        { text: "OK" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      if (editedProduct) {
        // console.log(editedProduct);
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }

      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, prodId, formState]);
  //   if (editedProduct) {
  //     dispatch(
  //       productsActions.updateProduct(prodId, title, description, imageUrl)
  //     );
  //   } else {
  //     dispatch(
  //       productsActions.createProduct(title, description, imageUrl, +price)
  //     );
  //   }
  //   props.navigation.goBack();
  // }, [dispatch, prodId, title, description, imageUrl, price]);
  //
  //

  useEffect(() => {
    if (Error) {
      Alert.alert("Error", Error, [{ text: "Ok" }]);
    }
  }, [Error]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // const textChangeHandler = (inputIdentifier, text) => {
  //   let isValid = false;
  //   if (text.trim().length > 0) {
  //     isValid = true;
  //   }
  //   dispatchFormState({
  //     type: FORM_INPUT_UPDATE,
  //     value: text,
  //     isValid: isValid,
  //     input: inputIdentifier,
  //   });
  // };

  //
  //
  // const titleChangeHandler = (text) => {
  //   if (text.trim().length === 0) {
  //     setTitleIsValid(false);
  //   } else {
  //     setTitleIsValid(true);
  //   }
  //   setTitle(text);
  // };

  //   return (
  //     <ScrollView>
  //       <View style={styles.form}>
  //         <View style={styles.formControl}>
  //           <Text style={styles.label}>Title</Text>
  //           <TextInput
  //             style={styles.input}
  //             value={formState.inputValues.title}
  //             onChangeText={textChangeHandler.bind(this, "title")}
  //             keyboardType="default"
  //             autoCapitalize="sentences"
  //             autoCorrect
  //             returnKeyType="next"
  //             onEndEditing={() => console.log("onEndEditing")}
  //             onSubmitEditing={() => console.log("onSubmitEditing")}
  //           />
  //           {!formState.inputValidities.title && (
  //             <Text>Enter a valid title!!!!</Text>
  //           )}
  //         </View>
  //         <View style={styles.formControl}>
  //           <Text style={styles.label}>Image URL</Text>
  //           <TextInput
  //             style={styles.input}
  //             value={formState.inputValues.imageUrl}
  //             onChangeText={textChangeHandler.bind(this, "imageUrl")}
  //           />
  //         </View>
  //         {editedProduct ? null : (
  //           <View style={styles.formControl}>
  //             <Text style={styles.label}>Price</Text>
  //             <TextInput
  //               style={styles.input}
  //               value={formState.inputValues.price}
  //               onChangeText={textChangeHandler.bind(this, "price")}
  //               keyboardType="decimal-pad"
  //             />
  //           </View>
  //         )}
  //         <View style={styles.formControl}>
  //           <Text style={styles.label}>Description</Text>
  //           <TextInput
  //             style={styles.input}
  //             value={formState.inputValues.description}
  //             onChangeText={textChangeHandler.bind(this, "description")}
  //           />
  //         </View>
  //       </View>
  //     </ScrollView>
  //   );

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("itemId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
