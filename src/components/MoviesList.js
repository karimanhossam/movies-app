import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View, Alert, Modal, Pressable } from "react-native";
import { FlatList, TouchableOpacity, Dimensions } from "react-native";
let { width, height } = Dimensions.get("screen");

const MoviesList = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemClicked, setItemClicked] = useState({});
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setPage(page + 1);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=009f42f04d2a1ff2ac7a45e7e704b7bd&language=en-US&page=${page}`
      )
      .then(({ data }) => {
        setMovies(movies.concat(data.results));
        setLoading(false);
      });
  };
  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(flase);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={
                itemClicked.backdrop_path
                  ? {
                      uri: `http://image.tmdb.org/t/p/w185${itemClicked.backdrop_path}`,
                    }
                  : null
              }
              style={{
                height: "30%",
                resizeMode: "cover",
              }}
            />
            <View style={styles.modalDescriptionView}>
              <Text style={styles.modalText}>{itemClicked.title}</Text>
              <Text style={styles.modalText}>{itemClicked.release_date}</Text>
              <Text style={styles.modalText}>{itemClicked.vote_average}</Text>
              <Text style={styles.modalText}>{itemClicked.overview}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{ flex: 1 }}
        onScrollEndDrag={() => {
          fetchData();
        }}
        data={movies}
        keyExtractor={(item, index) => item.title + ""}
        numColumns={2}
        ListFooterComponent={
          loading && (
            <View>
              <ActivityIndicator />
            </View>
          )
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                margin: 10,
                flex: 1,
              }}
              onPress={() => {
                setItemClicked(item);
                setModalVisible(true);
              }}
            >
              <Image
                source={
                  item.poster_path
                    ? {
                        uri: `http://image.tmdb.org/t/p/w185${item.poster_path}`,
                      }
                    : null
                }
                style={{
                  height: 200,
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  backgroundColor: "black",
                  borderBottomStartRadius: 8,
                  borderBottomEndRadius: 8,
                }}
              >
                <Text
                  style={styles.titleStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.original_title}
                </Text>
                <Text style={styles.dateStyle}>{item.release_date}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.moviesTitle}>Movies List</Text>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 5,
    maxWidth: width / 3,
    paddingTop: 10,
  },
  dateStyle: {
    fontSize: 12,
    color: "grey",
    fontWeight: "600",
    paddingHorizontal: 5,
    paddingVertical: 2,
    paddingBottom: 8,
    textAlign: "right",
  },
  moviesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 4,
    color: "yellow",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalDescriptionView: {
    justifyContent: "flex-end",
    padding: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
});

export default MoviesList;
