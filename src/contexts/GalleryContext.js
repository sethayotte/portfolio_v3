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
    console.log("running");
    let countries = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      countries.push(doc.data());
    });
    function aToZ(a, b) {
      console.log(a.title, b.title);
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
          console.log("countries: ", folderRef.fullPath);
          getCountryCollections(folderRef.fullPath);
          //   let countryRef = ref(storage, folderRef.fullPath);
          //   let images = [];
          //   listAll(countryRef).then((res) => {
          //     res.items.forEach((image) => {
          //       console.log("image", image);
          //     });
          //   });
          //   let country = {
          //     title: continent,
          //     slug: continent,
          //     images: images,
          //   };
        });
        // res.items.forEach((itemRef) => {
        //   // All the items under listRef.
        // });
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
          console.log("cities: ", folderRef.fullPath);
          getCityImages(folderRef.fullPath);
          //   let countryRef = ref(storage, folderRef.fullPath);
          //   let images = [];
          //   listAll(countryRef).then((res) => {
          //     res.items.forEach((image) => {
          //       console.log("image", image);
          //     });
          //   });
          //   let country = {
          //     title: continent,
          //     slug: continent,
          //     images: images,
          //   };
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
        // if (!urls) {
        //     city = {
        //         title:
        //     }
        // }
        // Array of download URLs of all files in that folder
        console.log(urls);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  useEffect(() => {
    // getContinentCollections("north-america");
    getContinentGalleryData("north-america");
  }, []);

  const value = {
    continentGalleryData,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
