import React, { useContext, useEffect, useState } from "react";
import { storage, db } from "../Firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";

const GalleryContext = React.createContext();

export function useGalleryContext() {
  return useContext(GalleryContext);
}

export function GalleryProvider({ children }) {
  const [continentGalleryData, setContinentGalleryData] = useState([]);

  const getContinentGalleryData = async (continent) => {
    const querySnapshot = await getDocs(
      collection(db, "travel", "gallery", continent)
    );
    let countries = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      countries.push(doc.data());
    });
    function aToZ(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    setContinentGalleryData(countries.sort(aToZ));
  };

  const getContinentCollections = (continent) => {
    const collectionRef = ref(storage, `travel/${continent}`);
    let galleryItems = [];
    listAll(collectionRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          getCountryCollections(folderRef.fullPath);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });
  };

  const getCountryCollections = (countryPath) => {
    const collectionRef = ref(storage, countryPath);
    listAll(collectionRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          getCityImages(folderRef.fullPath);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });
  };

  const getCityImages = (cityPath) => {
    const collectionRef = ref(storage, cityPath);
    listAll(collectionRef)
      .then(async (res) => {
        let city = {};
        const { images } = res;
        const urls = await Promise.all(
          images.map((item) => getDownloadURL(item))
        );
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  useEffect(() => {
    // getContinentCollections("north-america");
  }, []);

  const value = {
    continentGalleryData,
    setContinentGalleryData,
    getContinentGalleryData,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
