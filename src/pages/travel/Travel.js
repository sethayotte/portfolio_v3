import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { IoIosArrowRoundDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Travel = ({ darkMode, isMobileSafari }) => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, updateZoom] = useState(window.innerWidth > 640 ? 1.5 : 0.9);
  let style;

  if (darkMode) {
    style = "mapbox://styles/sethmitchell/clsmjrmm3041m01pfgqyy9e4h";
  } else {
    style = "mapbox://styles/sethmitchell/clsmjggkd003j01qwgx6g1ngp";
  }

  const handleGlobeSize = () => {
    if (window.innerWidth > 640) {
      updateZoom(1.5);
      map.current?.setZoom(1.5); //set map zoom level for desktop size
    } else {
      updateZoom(0.9);
      map.current?.setZoom(0.9); //set map zoom level for mobile size
    }
    if (window.innerWidth - 1400 > 0) {
    }
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    handleGlobeSize();
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      pitch: 0,
    });
    // Disable scroll zoom
    map.current.scrollZoom.disable();
    // Pause spinning on interaction
    map.current.on("mousedown", () => {
      userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.current.on("mouseup", () => {
      userInteracting = false;
      spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.current.on("dragend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on("pitchend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on("rotateend", () => {
      userInteracting = false;
      spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.current.on("moveend", () => {
      spinGlobe();
    });

    spinGlobe();
  }, []);

  // At low zooms, complete a revolution every two minutes.
  const secondsPerRevolution = 60;
  // Above zoom level 3, do not rotate.
  const maxSpinZoom = 3;
  // Rotate at intermediate speeds between zoom levels 2 and 3.
  const slowSpinZoom = 2;

  let userInteracting = false;
  let spinEnabled = true;

  const spinGlobe = () => {
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        // Slow spinning at higher zooms
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.current.getCenter();
      center.lng -= distancePerSecond;
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      map.current.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  };

  const fadeHero = () => {
    let windowHeight = window.innerHeight;
    let currScrollPos2 =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (currScrollPos2 >= 100) {
      let percentComplete = (currScrollPos2 - 100) / (windowHeight / 2 - 100);
      let blurAmount = percentComplete * 7;
      if (window.innerWidth > 640) {
        updateZoom(percentComplete / 3.5 + 1.5);
        map.current.setZoom(percentComplete / 4.4 + 1.5);
      } else {
        updateZoom(percentComplete / 3.5 + 0.9);
        map.current.setZoom(percentComplete / 3.5 + 0.9);
      }
      let opacity = Math.abs(percentComplete - 1);
      document.getElementById("hero-content-wrapper").style.opacity = opacity;
      document.getElementById("hero-content-wrapper").style.filter =
        "blur(" + blurAmount + "px)";
    } else {
      document.getElementById("hero-content-wrapper").style.opacity = 1;
      document.getElementById("hero-content-wrapper").style.filter =
        "blur(0px)";
    }
  };

  useEffect(() => {
    let scrollPoint =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    document.addEventListener("scroll", fadeHero, true);
    window.addEventListener("resize", handleGlobeSize);
    return () => {
      document.removeEventListener("scroll", fadeHero, true);
      window.removeEventListener("resize", handleGlobeSize);
    };
  }, []);

  return (
    <div className="travel">
      <div className="travel-hero-text" id="hero-block">
        <div className="travel-hero-blur-layer">
          <div id="hero-content-wrapper">
            <h2>EXPLORE</h2>
            <div className="travel-hero-buttons">
              <Link to="/travel/stats">view stats</Link>
              <Link to="/travel/gallery">visit gallery</Link>
            </div>
          </div>
          {isMobileSafari ? (
            <a
              className="fold-arrow safari"
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            >
              <IoIosArrowRoundDown />
            </a>
          ) : (
            <a
              className="fold-arrow"
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            >
              <IoIosArrowRoundDown />
            </a>
          )}
        </div>
      </div>
      <div ref={mapContainer} id="map-container" className="map-container" />
    </div>
  );
};

export { Travel };
