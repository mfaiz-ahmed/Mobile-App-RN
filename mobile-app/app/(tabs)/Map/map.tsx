import styles from "@/Style/Styles";
import React from "react";
import { View, Platform, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function map() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

    //   let location = await Location.getCurrentPositionAsync({});
    //   console.log("location", location);
    //   setLocation(location);
const options = {accuracy: 6 , distanceInterval : 0.3}
    Location.watchPositionAsync(options , (location)=>{
        setLocation(location)
    })

    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0001,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            image={require('../../../Images/images.png')}
            
            title={"Home"}
            description={"Yahi rehta hun mai"}
          />
        </MapView>
      )}
    </View>
  );
}
