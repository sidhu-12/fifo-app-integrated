import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height / 3;

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={item.url} />
      <View style={styles.descrip}>
        <Text style={styles.txt}>{item.desc1}</Text>
        <Text style={styles.txt}>{item.desc2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    margin: 10,
  },
  image: {
    resizeMode: "stretch",
    width: width - 20,
    height: height - 50,
    borderRadius: 10,
  },
  descrip: {
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  txt: {
    color: "white",
    fontSize: 17,
  },
});

export default CarouselItem;
