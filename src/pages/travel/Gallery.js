import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { TbClick, TbCameraOff } from "react-icons/tb";
import { BsImages } from "react-icons/bs";
import { PiCaretLeftBold } from "react-icons/pi";
import north_america_light from "../../assets/continents/north-america-light.svg";
import south_america_light from "../../assets/continents/south-america-light.svg";
import antarctica_light from "../../assets/continents/antartica-light.svg";
import africa_light from "../../assets/continents/africa-light.svg";
import europe_light from "../../assets/continents/europe-light.svg";
import asia_light from "../../assets/continents/asia-light.svg";
import oceania_light from "../../assets/continents/oceania-light.svg";
import north_america_dark from "../../assets/continents/north-america-dark.svg";
import south_america_dark from "../../assets/continents/south-america-dark.svg";
import antarctica_dark from "../../assets/continents/antartica-dark.svg";
import africa_dark from "../../assets/continents/africa-dark.svg";
import europe_dark from "../../assets/continents/europe-dark.svg";
import asia_dark from "../../assets/continents/asia-dark.svg";
import oceania_dark from "../../assets/continents/oceania-dark.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useGalleryContext } from "../../contexts/GalleryContext";

const Gallery = ({ darkMode }) => {
  const {
    continentGalleryData,
    setContinentGalleryData,
    getContinentGalleryData,
  } = useGalleryContext();

  const location = useLocation();

  useEffect(() => {
    setIsDesktop(window.innerWidth > 740);
    window.addEventListener("resize", () => {
      setIsDesktop(window.innerWidth > 740);
    });
    if (
      !selectedContinent &&
      location &&
      (location.pathname.includes("/north-america") ||
        location.pathname.includes("/south-america") ||
        location.pathname.includes("/africa") ||
        location.pathname.includes("/europe") ||
        location.pathname.includes("/asia") ||
        location.pathname.includes("/oceania"))
    ) {
      handleDeepLink();
      let continent = document.querySelector(".continent-svg");
      console.log(continent);
      // continent?.fill = "var(--travel-continent-highlight)";
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    if (selectContinent && location.pathname === "/travel/gallery") {
      setSelectedContinent();
      setSelectedContinentImage();
    }
  }, [location]);

  const navigate = useNavigate();

  const [isDesktop, setIsDesktop] = useState();
  const [continentHover, setContinentHover] = useState();
  const [selectedContinent, setSelectedContinent] = useState();
  const [selectedContinentImage, setSelectedContinentImage] = useState();

  const selectContinent = (continent) => {
    if (!continent) {
      removeHighlight();
      setSelectedContinent();
      setSelectedContinentImage();
      navigate("/travel/gallery");
      return;
    }
    setContinentGalleryData([]);
    setSelectedContinent(continent);
    navigate("/travel/gallery/" + continent);
    getContinentGalleryData(continent);
    switch (continent) {
      case "north-america":
        darkMode
          ? setSelectedContinentImage(north_america_dark)
          : setSelectedContinentImage(north_america_light);
        break;
      case "south-america":
        darkMode
          ? setSelectedContinentImage(south_america_dark)
          : setSelectedContinentImage(south_america_light);
        break;
      case "africa":
        darkMode
          ? setSelectedContinentImage(africa_dark)
          : setSelectedContinentImage(africa_light);
        break;
      case "europe":
        darkMode
          ? setSelectedContinentImage(europe_dark)
          : setSelectedContinentImage(europe_light);
        break;
      case "asia":
        darkMode
          ? setSelectedContinentImage(asia_dark)
          : setSelectedContinentImage(asia_light);
        break;
      case "oceania":
        darkMode
          ? setSelectedContinentImage(oceania_dark)
          : setSelectedContinentImage(oceania_light);
        break;
      default:
        setSelectedContinentImage();
    }
  };

  const handleDeepLink = () => {
    let continent = location.pathname?.slice(16);
    selectContinent(continent);
  };

  const highlightContinent = (continent) => {
    let items = document.querySelectorAll("." + continent);
    let index = 0,
      length = items.length;
    for (; index < length; index++) {
      items[index].style.transition = "fill 0.3s ease";
      items[index].style.fill = "var(--travel-continent-highlight)";
    }
    setContinentHover(continent);
  };

  const removeHighlight = (continent) => {
    let items = document.querySelectorAll("." + continent);
    let index = 0,
      length = items.length;
    for (; index < length; index++) {
      items[index].style.fill = "var(--travel-continent-default-fill)";
    }
    setContinentHover();
  };

  const handleTitling = (label) => {
    return label
      .split("-")
      .map(function capitalize(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  };

  const renderCities = (cities) => {
    if (cities.length < 1) {
      return (
        <h4 className="upload-placeholder">
          <BsImages />
          images en route!
        </h4>
      );
    } else {
      return cities.map((city) => {
        return (
          <>
            <h4 key={city.slug}>{city.title}</h4>
            <PhotoProvider maskOpacity={0.7}>
              <div className="image-grid">
                {city.images.map((image, index) => (
                  <PhotoView key={index} src={image}>
                    <img src={image} alt="" />
                  </PhotoView>
                ))}
              </div>
            </PhotoProvider>
          </>
        );
      });
    }
  };

  const mobileContinents = [
    {
      id: "north-america",
      darkSrc: north_america_dark,
      lightSrc: north_america_light,
      title: "North America",
    },
    {
      id: "south-america",
      darkSrc: south_america_dark,
      lightSrc: south_america_light,
      title: "South America",
    },
    {
      id: "europe",
      darkSrc: europe_dark,
      lightSrc: europe_light,
      title: "Europe",
    },
    {
      id: "asia",
      darkSrc: asia_dark,
      lightSrc: asia_light,
      title: "Asia",
    },
    {
      id: "africa",
      darkSrc: africa_dark,
      lightSrc: africa_light,
      title: "Africa",
    },
    {
      id: "oceania",
      darkSrc: oceania_dark,
      lightSrc: oceania_light,
      title: "Oceania",
    },
    {
      id: "antarctica",
      darkSrc: antarctica_dark,
      lightSrc: antarctica_light,
      title: "Antarctica",
    },
  ];

  const renderMobileMaps = (darkMode) => {
    return mobileContinents.map((continent) => {
      return (
        <span
          className={
            continent.id === "antarctica"
              ? "mobile-continent-block"
              : "mobile-continent-block clickable"
          }
          onClick={
            continent.id !== "antarctica"
              ? () => {
                  selectContinent(continent.id);
                }
              : null
          }
        >
          <img
            src={darkMode ? continent.darkSrc : continent.lightSrc}
            id={continent.id}
          />
          <div className="title-text">
            <h2>{continent.title}</h2>
            {continent.id === "antarctica" ? (
              <span>
                <TbCameraOff /> no pictures ... yet!
              </span>
            ) : (
              <span>
                <TbClick /> click to select
              </span>
            )}
          </div>
        </span>
      );
    });
  };

  if (selectedContinent) {
    return (
      <div className="continent-gallery">
        <section className="continent-header">
          <img className="continent-svg" src={selectedContinentImage} />
          <PiCaretLeftBold onClick={() => selectContinent()} />
          <h2>{handleTitling(selectedContinent)}</h2>
        </section>
        <section className="all-photos">
          {continentGalleryData.map((item) => {
            return (
              <section className="country-section" key={item.slug}>
                <h3>{item.title}</h3>
                {renderCities(item.cities)}
                <div className="photo-grid"></div>
              </section>
            );
          })}
        </section>
      </div>
    );
  } else {
    return (
      <div className={isDesktop ? "gallery-landing" : "gallery-landing mobile"}>
        {isDesktop ? (
          <>
            <div className="desktop-gallery-map-box">
              <svg
                width="1400"
                height="1228"
                viewBox="0 0 1400 1228"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_338_3)">
                  <path
                    d="M318.78 569.277V570.144L320.883 571.381H323.234L325.584 570.948L324.099 570.02L322.677 569.648L321.997 569.277H318.78Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M336.346 564.574V563.893L337.892 564.017L339.624 564.574L341.418 564.759L342.16 564.017H344.51L346.242 564.326L347.665 565.44L348.654 566.863L351.561 567.235L353.355 568.782L352.242 570.144L351.499 569.277L347.726 569.463L346.675 570.144L345.809 569.525H344.572L342.716 571.938L341.232 570.515L339.686 570.329L335.542 570.02L334.181 570.515L332.264 569.401L332.82 568.534L335.171 569.091L337.212 569.277L339.377 568.968L338.944 567.916L338.14 566.121L337.954 565.069L336.841 564.945L336.346 564.574Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M357.994 569.587L357.623 571.01L360.468 571.196L361.953 570.948L362.88 569.834L362.324 569.277L360.221 569.525L357.994 569.277V569.587Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M367.333 432.069L368.199 432.75L369.56 433.183L370.24 434.607L371.91 435.226L373.394 436.092H376.549L376.178 435.164L375.064 434.359L372.961 433.245L370.92 432.379L369.127 432.069H367.333Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M393.373 426.561L392.136 428.356L391.27 430.708L390.342 432.688L390.095 434.05L389.167 435.35L389.724 436.587H389.167L388.301 436.092L387.745 437.949V439.125L388.054 439.744L385.642 442.095V443.952L386.013 444.2L387.621 443.952L389.538 443.581L391.703 443.89L394.424 444.2L396.156 443.395L397.579 443.766V444.633H398.383L399.187 443.766L400.981 444.385L399.434 446.18L397.331 446.985L397.517 448.099L399.806 447.356V446.428L400.981 445.437H401.785L403.269 443.271L404.073 443.766L404.444 444.942L403.826 446.242L403.578 447.851L404.444 448.099L404.939 447.108L405.62 448.099V449.275H407.042L407.599 447.913L407.97 446.366L408.588 445.561L408.279 443.705L406.98 445.252L406.857 443.766L407.537 442.652L407.413 441.848L406.176 442.343L405.558 443.705L405.496 444.571L405.001 444.2L404.259 443.086L404.939 442.157L405.558 440.672L406.671 440.363L406.176 439.558L404.754 439.434L404.506 438.692L403.764 437.578L405.001 436.525L405.372 435.473L403.888 434.421L402.403 435.04L401.847 434.545L400.733 435.411L399.434 435.35L399.187 434.731L397.703 434.297L396.775 433.183L397.393 432.379L398.445 432.069L397.455 431.698L396.527 431.327L395.414 431.76L394.115 433.431L393.992 432.503L394.239 430.832L395.476 429.223L396.527 427.056L397.517 425.633L397.641 424.89H396.713L396.651 424.148L397.579 423.653L397.95 424.024L398.816 423.653L398.94 422.291L397.455 422.6L395.909 423.157L394.301 424.395L393.373 426.561Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M119.496 381.506L120.3 384.044L120.609 386.334V387.324V389.614L121.475 388.685L122.094 387.448L123.022 386.952L122.774 385.529L121.723 384.044L121.475 383.115L122.279 382.868L121.97 381.878L120.609 382.063L120.053 381.259L119.496 381.506Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M126.238 392.646H127.29L126.733 391.532L125.867 390.604L124.94 389.614L123.517 389.304L122.527 389.614L123.393 390.975L123.022 391.656L122.527 391.532L122.156 390.975L121.229 391.223L121.661 392.275L122.218 393.141L121.538 394.503L123.022 395.307V393.575L123.455 392.275L123.95 393.265L124.754 392.77L125.682 392.894L124.94 391.656L125.063 391.099L125.744 391.78L126.238 392.646Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M128.774 404.219L129.702 403.91V401.434L128.527 400.073L128.774 399.145L127.846 397.474L126.115 395.803L125.249 394.07L123.95 394.379L124.259 395.926L123.641 396.483H125.249L125.867 396.917L125.063 397.597L124.259 397.35L123.95 397.969L125.311 398.711L125.991 399.516L125.434 400.63V401.434H126.671L127.599 401.868L128.651 402.982L128.774 404.219Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M120.114 394.503L118.197 390.975V389.614L116.775 388.376V387.448L115.97 386.272L115.537 385.405L114.177 383.982L113.806 382.93L114.795 381.878H116.96L117.393 382.435H118.939L118.63 383.301L118.877 384.106L116.96 383.425L117.207 384.106L118.197 384.786H119.125L119.496 385.405V386.457L118.568 386.086L117.64 385.405L116.527 384.724L116.96 385.405L117.331 386.148L118.197 386.519L119.125 387.138L119.496 388.438L119.867 390.047L120.362 391.594L120.114 394.503Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M126.052 407.995L125.619 409.666L126.671 410.532L127.289 411.832V413.317L128.155 414.307L128.835 415.669L130.134 416.783L131.186 418.578L132.114 419.444L132.608 417.959L130.753 416.845L130.444 415.174L130.258 414.184L130.444 413.379L129.701 412.574V410.78L130.505 408.49H129.083L128.341 407.995L127.289 408.304L126.052 407.995Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M51.8933 385.467L50.5326 386.334L49.9141 387.757L50.5326 389.119L51.2748 390.48L52.2026 389.49L52.9448 390.294L53.4396 389.799L53.6251 389.119L55.2951 388.066L55.6662 387.138L56.594 387.571L56.8414 387.138L56.594 386.457L57.2125 386.334L57.7692 386.891L58.3877 386.21L57.8928 385.467L57.5217 385.158L57.9547 384.229L56.8414 383.549L56.6558 382.62L57.398 381.939H58.9443L59.4391 381.382L58.5732 380.825H57.5217L57.0269 379.835L56.6558 381.135L55.9136 381.382L55.7899 382.063L54.491 382.373L56.161 383.115L56.0992 383.61L55.1096 383.858L54.3055 383.549V384.291L53.6251 384.106L52.7592 384.477L53.3159 385.343L52.9448 386.272L52.2644 386.21L51.8933 385.467Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M7.29843 408.675L9.46321 409.666L8.41175 410.78L7.29843 411.708H6.24696L4.57698 413.008H3.83477L3.1544 412.513L0.371106 414.926L0 413.812L0.804064 413.008L1.66998 412.884L2.22664 411.151L4.20587 411.77H5.38104L6.61806 410.965L6.74177 409.913L6.12326 409.418L7.29843 408.675Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M10.7626 367.272L11.3811 369.809L9.89664 370.614L7.97925 369.995L6.49483 369.314L5.44336 368.138L7.67 367.272L9.46368 366.777L10.7626 367.272Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M305.421 414.122L307.153 415.359L309.874 416.35L309.441 414.122L307.648 413.193H306.287L305.421 414.122Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M313.09 357.803L314.76 354.646L315.131 353.161L314.079 352.109H313.09L311.605 354.275L312.1 356.07L313.09 357.803Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M301.771 353.223L303.936 351.181V350.129L305.668 349.076V347.405L303.318 347.839L301.771 348.643H300.287L299.978 350.314L298.864 351.304L299.606 353.223L301.462 352.48L301.771 353.223Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M308.946 343.383L311.606 340.907L310.245 339.917L309.627 339.112H308.946L307.895 338.741L306.039 339.36L305.668 338.741L306.472 338.308V335.708L305.421 333.79L303.813 333.233L301.833 332.119L300.535 330.2L297.937 329.334V328.282L296.514 327.292L295.648 329.334L294.906 327.787L293.917 326.92L294.535 325.992L293.917 324.507L292.927 323.516L291.752 325.002L291.133 329.272L290.267 334.966L291.01 338.741L288.288 340.226L287.546 342.021L288.103 342.578L289.278 341.835L290.577 341.774L292.618 341.402L292.989 342.764L293.051 345.796L294.226 346.168L296.947 343.878L297.318 342.207L299.545 340.721L299.916 338.308L301.462 337.627L302.266 338.06L301.648 339.236L303.318 339.546L304.369 340.474L304.184 341.526L307.029 342.392L308.946 343.383Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M317.977 344.063L318.842 345.116L319.894 346.663L321.193 345.673V344.744L320.327 343.63H318.595L317.977 344.063Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M319.584 334.842L321.192 336.265L323.79 337.256L327.13 336.018V334.161L329.233 335.708H331.769V334.161L333.624 333.79V335.523L334.428 336.451L333.501 337.256L334.428 338.308H336.779L338.634 339.298L339.438 340.474L340.613 341.526H341.789L343.335 342.64L342.469 343.63L341.17 344.187L342.283 346.168H343.335L344.819 345.673V347.405L346.056 348.148L347.664 348.891H348.84L349.829 349.386L350.386 350.747L351.747 351.861L353.54 352.728L355.829 353.223L357.375 354.213L359.169 354.461L360.901 355.575L361.767 355.327L361.395 353.656L360.591 352.109L358.86 349.572L357.932 349.076L356.942 347.591L355.705 346.415L354.406 345.734L352.86 343.63L351.809 342.145L352.489 341.031L353.417 341.588L355.458 343.321L355.705 342.021L356.695 342.516L357.561 344.125L359.107 345.673L359.602 346.415L360.282 346.168L361.21 347.158L362.138 346.848L363.684 347.962L364.241 348.334L364.674 349.572L365.478 350.809L366.405 351.861L367.333 351.243L366.034 350.314L365.23 348.767L364.735 348.086L364.983 347.405L365.849 347.777L366.22 346.168L365.23 345.549L364.921 344.002L365.663 342.764L366.034 342.888L365.972 344.063L366.591 345.116L367.333 344.435V341.774L366.591 340.103L366.096 340.536L365.849 339.36L364.674 339.422L364.488 337.936L363.622 337.132L364.55 336.513L364.921 335.399L364.241 335.09L363.004 335.275L362.942 334.347L363.313 333.542L362.818 332.923H361.828L361.148 333.357L360.344 332.923L361.272 332.552L360.035 331.252L359.478 332.119L359.107 331.005L358.117 329.21L357.684 327.353L356.942 326.301H354.963L355.21 324.754L355.087 323.207H357.313L357.623 322.155L356.447 321.041L355.52 319.865L355.705 318.441L356.88 319.432L357.437 318.689L356.88 317.451L358.055 317.946L358.983 317.451L359.54 319.06L360.839 320.298L361.272 321.226L362.571 321.103L362.261 322.464L362.447 323.083L363.746 322.279L365.168 321.845L365.725 321.35L365.849 320.298L366.9 319.679L366.838 320.917L366.096 322.34L365.911 323.083L364.426 323.269L364.055 324.568L364.921 325.373L365.292 326.301L366.344 326.116L365.168 327.353L366.776 327.477L366.096 328.22L366.776 329.21L367.333 328.158L367.581 328.406V329.705L368.756 330.015L370.24 331.438L370.673 329.953V326.116L370.24 325.435L370.673 324.816L371.786 324.878L372.219 326.116H373.704V324.568L373.951 323.516H374.508L375.436 321.969L374.879 321.412L374.075 321.165L374.57 320.051L374.693 318.998H375.436L375.992 319.803H376.611L377.415 318.813L376.92 317.946L376.054 317.451L375.745 316.647H376.611L376.796 317.513L377.786 317.575L378.033 316.399L377.291 315.656L376.24 314.542L376.178 313.676H375.126L374.57 314.357L372.405 314.171L371.91 313.924L371.415 315.904L370.673 315.533L370.426 314.542L371.292 313.676L371.477 312.81L372.158 311.943H372.59L372.529 311.324H371.972L371.044 312.005L370.797 312.562L370.364 312.005L369.436 312.067L367.952 312.5L366.838 312.81L367.333 311.943L366.529 311.696L366.653 310.953L367.766 310.643L368.694 310.891L368.879 309.901L368.137 309.529L368.508 308.725L368.075 307.92L367.395 306.992L366.838 306.435L365.23 307.301L364.674 306.992L365.168 306.187L366.22 305.135L365.725 304.578H365.106L364.179 305.569L363.931 306.868L363.437 307.24L363.189 306.559L363.437 305.754L363.622 304.826L362.942 305.197L362.447 306.435L362.014 305.816L361.519 305.073H360.591L360.344 303.712L359.911 303.959L359.602 304.702L359.169 304.083L358.427 303.712L358.921 302.907L358.303 302.041H357.313L356.942 301.236L357.128 300.494L357.437 300.184L356.695 299.442L355.52 299.689L354.901 300.06L354.283 299.442H353.169L352.241 299.194L351.809 298.761L352.613 298.204L353.602 297.894L353.169 297.461H351.994L350.943 297.09H350.139L350.448 296.038L351.685 296.471H352.984L354.159 296.409L354.344 295.728L354.221 294.924H354.901L355.396 294.676L355.025 294.181L354.283 293.81L353.479 293.438L352.365 294.181L351.561 294.8L351.376 293.872L352.118 293.067L352.86 292.448L354.097 292.758L354.283 291.767L355.025 292.262L356.076 293.191L356.942 293.005L357.437 292.696L358.365 293.067L358.86 293.253L359.169 292.386L358.612 291.334L357.19 290.591H355.334L354.283 290.096L353.169 289.663L352.365 289.416L351.066 289.911L348.778 290.096L347.974 289.416L349.211 289.106H350.262H351.994L353.293 287.93L354.344 287.435L355.705 287.126L357.251 287.683L357.808 287.126L357.437 286.259L357.19 284.65L356.138 283.165L354.53 281.865L353.973 282.236L354.035 283.35L353.788 284.279L352.613 285.517L351.809 285.95L350.695 286.012L350.015 287.373L348.778 287.188L348.221 286.754L349.149 286.012L350.077 285.888L351.066 284.836L352.241 284.031L352.365 282.732L351.314 282.67L349.644 283.227L348.778 284.031L348.53 285.207L347.603 285.517L347.046 284.65L347.726 283.66L348.778 282.793L349.706 282.175L351.623 281.618L352.427 280.689L353.417 279.947V278.709L352.551 278.399L351.376 277.904L350.448 276.914L349.087 277.533L347.355 278.585L346.366 279.018L346.737 278.028L347.788 276.914L348.159 275.986H347.788L346.304 276.914L345.252 277.966L344.572 278.709L343.892 281.184L343.273 281.803L343.211 280.565L343.644 279.699L343.149 279.142L342.222 279.699L341.974 280.689L341.541 280.504L341.851 279.39L342.655 278.152L343.52 278.276L344.758 277.038L345.623 275.367L345.129 273.324L343.582 274.624L343.335 275.491L342.655 276.109L341.418 276.357L340.057 277.471L339.5 277.223L339.686 276.295L339.067 276.048L339.191 275.243L340.242 273.943L340.552 273.324L341.541 272.582L342.222 273.448L342.84 272.582L343.768 271.53L343.335 270.354L342.469 269.116L340.861 268.373L339.748 267.878H338.758L338.139 269.302L337.645 269.24L337.212 268.683L336.346 268.373L336.16 268.93L336.408 270.106L336.964 270.601L336.098 270.787L334.985 271.282L335.171 270.292L334.923 268.126L334.181 269.116L333.81 270.044L333.748 270.973L333.068 269.859L333.377 268.868L334.243 267.878L334.614 266.145H333.995L332.697 266.702L331.769 267.383L331.398 268.868L331.707 270.044L330.841 270.168L330.594 269.302L330.47 268.188L331.274 267.631L331.088 266.888L329.913 267.754L329.542 268.373L329.295 267.507L329.975 266.95L329.666 266.455L330.161 266.145H331.15L331.769 265.465L332.325 264.784H333.068L333.006 263.36L332.758 262.37H331.707H329.851L328.676 263.546L328.367 264.846L327.748 266.145L327.192 265.96L327.501 264.969L327.996 263.732L328.12 262.989L329.109 262.37L328.243 261.751L327.439 262.432L326.45 263.484L325.707 264.474L325.398 263.855L325.955 262.803L326.944 261.751L328.181 261.256H329.418L330.222 260.39L329.913 259.399L329.604 257.728L328.243 257.233L326.759 256.676V258.038L325.955 258.1L325.707 257.543L326.202 256.986L325.769 256.305H324.594L324.037 255.5L323.048 254.572L320.945 254.82L318.78 256.119L318.285 257.976L318.966 258.904L320.141 259.647L321.192 260.39L320.945 261.318L320.326 260.637L319.584 260.328L318.285 259.895L317.729 260.39V259.461L317.11 259.709V260.266L317.729 261.442L318.409 262.123L318.966 263.484L318.904 264.041L318.409 263.917L318.038 262.803L317.543 261.999L316.739 261.566L316.492 262.989L317.234 263.422L317.605 264.041L316.801 264.103L315.873 263.732L315.626 262.927L315.873 261.813L316.12 260.452L315.626 259.338L315.069 258.471L314.574 259.399L314.079 260.266L313.708 259.276L313.461 258.1L312.781 258.842L312.409 259.523L312.781 260.823L312.409 260.204L311.605 260.142V261.566V262.556L310.616 263.36L309.688 264.351L309.069 262.741L309.502 261.442L309.812 259.956L310.863 257.728L310.492 257.543L309.317 258.842L308.142 260.142L308.451 259.214L309.317 257.481L310.863 255.748L311.667 254.572L311.049 253.087L310.183 251.911L310.245 249.497L309.317 248.94L308.142 248.012L308.451 246.465L308.142 244.608L307.276 242.999L305.977 242.566H302.699L302.142 243.494L300.905 243.803L298.74 245.041L299.359 245.598L300.039 246.527L299.73 246.898L298.988 246.155L297.813 245.722L296.328 246.836L297.132 248.074L296.947 248.631L296.019 247.702L295.339 247.393L294.658 248.383L295.524 249.312L296.328 249.93L297.874 250.178L298.74 250.859L297.998 251.168L297.07 250.921L295.586 250.487L294.411 249.93L294.163 251.044L295.339 251.725L296.823 252.468L296.204 253.396L295.277 252.715L293.545 251.849L293.05 252.406L292.555 254.448L293.421 255.934L293.607 258.1L294.658 258.471L296.081 258.347L295.586 259.585L297.132 261.504L296.885 262.308L295.833 261.132L294.72 260.39L293.236 260.513L293.297 262.184L291.566 263.298L293.05 264.103L293.545 266.269L294.534 266.888L296.328 266.702L296.452 268.435V269.611L295.833 270.168L296.081 274.191L295.091 273.943L294.782 272.21L293.421 272.458V271.468L294.225 270.663L295.339 270.725L294.906 269.921L294.163 269.054L292.617 267.445L291.133 265.403L290.081 263.175L289.834 261.318L290.081 259.647L290.514 258.162L290.267 257.295L289.153 256.057V254.696V252.654L290.39 251.044L290.576 249.497L291.071 248.074L291.999 246.588L293.236 245.041L294.534 243.618L295.586 242.566L294.844 241.699L293.236 241.204L291.133 240.957H289.153L287.669 241.823L285.875 242.751L284.02 244.051L282.906 245.66L282.164 246.465V247.826L281.175 248.445L280.371 250.549L279.938 253.396L279.072 254.696L279.566 255.624L278.329 256.862L278.02 258.471L277.525 259.956L278.639 261.194L277.525 262.68V264.474L278.329 265.712L277.773 266.826L277.525 268.621L277.897 269.982L278.824 270.787L280.556 271.035L282.35 271.344L284.267 271.715L285.257 270.911V272.396L286.123 272.953L287.298 274.005L286.37 274.81L284.391 274.995L283.339 274.624L282.535 273.943H281.298L280.247 274.253L279.752 275.491L280.371 276.79L281.113 278.585L281.979 279.947L283.525 280.194L284.948 281.741L285.628 281.184L287.422 281.741L287.731 280.442L288.597 281.061L289.648 280.504L289.71 282.113L290.329 282.979L291.504 283.907L292.37 285.021L293.236 284.526L292.926 283.846L294.163 282.855V283.722L295.4 284.031L295.833 284.093L296.452 284.774L298.307 284.96L299.854 284.774L301.585 284.588L303.07 285.64L304.307 286.135L304.616 286.94L305.544 286.445L306.41 285.764L305.544 284.712L304.245 283.598L304.616 282.855L305.606 284.031L306.719 285.269L308.08 285.764L309.008 287.435L309.873 288.116L311.049 288.363L311.976 289.911L312.595 289.601L312.533 288.92L313.894 288.859L314.45 288.178L314.512 287.126L313.77 287.002L313.275 287.435H312.409L311.729 286.94L310.801 286.692L310.554 287.373L309.812 286.878L309.008 285.764L308.389 284.774L306.719 284.155L306.967 283.598H308.389L309.379 284.031L311.172 284.155L312.348 284.588L313.152 284.898L313.461 285.764L314.141 285.95H315.749L316.986 285.269V283.969L316.677 282.608L316.059 281.494L314.76 280.999L314.698 280.318L315.193 279.823L316.306 280.256L317.914 280.813L318.533 282.051L319.213 282.422L320.264 282.113L321.192 283.35L320.821 285.826L321.192 286.631L322.553 286.012L323.852 286.507V287.806L323.171 288.425L323.976 288.859L324.841 288.982L325.151 290.22L325.584 291.025L327.006 290.901L327.81 292.324L328.12 293.933L326.759 294.676L325.646 294.429L324.78 294.738L324.841 295.914L324.47 297.461L325.522 297.956L326.697 296.842L327.81 295.543L329.48 295.357L330.841 295.543L331.46 297.337L332.511 299.318L333.995 299.194L333.191 297.523L334.119 297.585L334.861 298.946L334.305 299.751L334.367 300.927L335.542 301.546L337.15 302.598L337.83 304.331L338.078 305.816L339.253 307.487L339.438 309.901L340.057 311.819L339.5 312.995L337.83 313.8L337.15 315.78L337.521 316.647L335.975 317.266L334.985 318.937L333.068 320.298L332.82 321.474L333.13 323.145L334.614 324.816L335.48 326.796H334.305L333.13 326.673L332.016 328.22L331.088 328.034H330.222L329.666 328.963L327.377 328.839L326.635 329.086L325.707 328.653L324.903 328.158L323.233 327.725L321.873 327.787L321.563 329.953L320.326 330.448L319.151 331.748L319.027 334.285L319.584 334.842Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M322.244 307.797L323.419 311.881L325.77 311.448L327.811 310.953L329.914 308.292V305.94V303.774L328.924 302.103L326.079 301.113L323.79 302.474L322.244 307.797Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M331.089 304.269L331.646 306.497H335.48V305.383L333.254 304.269H331.089Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M314.76 295.728L315.749 296.471L317.358 294.862L318.656 292.139L318.409 291.334L316.739 292.696L314.76 295.728Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M322.244 291.334V293.191H322.986L324.162 291.582L323.852 290.963L322.244 291.334Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M328.738 299.194L329.48 298.08L330.408 299.194L330.718 300.865H330.161L328.738 299.194Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M248.209 287.992L249.322 286.259L250.435 286.878L251.239 287.621L251.425 288.673L251.982 288.363L252.662 288.982L252.971 289.849L253.837 290.53L254.889 291.458L255.26 292.572L255.445 294.367L256.188 293.872L256.621 293.624V295.171L257.363 296.223L258.229 296.471L258.847 296.595L258.229 297.523H257.486L256.497 298.575L255.074 299.937H254.27L252.6 299.008L252.105 299.38L250.868 298.761L250.25 298.08L248.889 297.709L248.642 297.09L248.209 296.223H247.776L247.281 296.78L246.477 295.914L246.044 295.047L245.364 295.419V295.914L244.993 295.976L244.188 294.614L244.003 293.872L244.745 293.376L246.415 293.253L247.095 292.881L247.034 292.201L248.209 291.767L248.085 290.963L247.59 290.777L247.776 289.354L248.951 290.034L249.013 289.292L248.209 287.992Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M239.487 296.595L240.353 295.914V294.429L241.776 293.5H242.704L243.013 294.429L241.961 296.285V297.337L240.415 298.266L239.487 296.595Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M234.539 297.832L235.405 298.946L236.147 298.389V297.337L235.838 296.842L234.539 297.523V297.832Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M309.873 247.579L309.626 245.66L309.75 242.875L310.616 242.38L311.914 242.689L313.894 243.556L316.058 243.865L317.728 243.432L319.275 243.308L320.512 244.422L322.367 245.536L322.924 246.836L322.677 247.579L324.037 247.95L324.594 249.126L324.161 250.054L325.274 250.364V252.097L326.326 252.777V253.272H324.718H323.233L320.512 252.282L318.533 252.901L316.12 254.015L314.636 254.51L313.337 253.272L312.286 252.035L312.347 248.878L311.296 248.136L309.873 247.579Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M218.953 290.344L217.716 291.396L217.097 293.5L215.737 295.109L212.211 295.852L210.727 297.399L208.067 298.266L204.665 298.946L204.047 299.318L203.552 298.946L201.882 299.318H199.346L198.171 299.937H196.192L194.522 296.842V293.933L193.841 292.572L192.357 292.201L187.966 292.262L186.296 291.705L184.44 291.025L183.76 289.168L182.152 287.249L181.409 284.836L182.646 283.846L185.615 282.546L190.996 281.865L193.965 282.175L195.944 282.113L196.81 282.546L199.47 282.484L199.717 282.051L201.635 281.865L201.202 280.937L199.903 280.194L199.779 279.451L198.171 278.833L196.687 278.523L195.511 277.657H194.398L193.656 276.976L190.625 277.966L187.842 278.214L185.986 278.461L185.244 278.152H182.894L180.915 278.09L178.626 276.109L177.76 274.624L178.75 273.263L181.595 272.396L183.574 271.592L184.997 270.787L186.79 270.416L186.357 269.487L186.914 268.992L188.027 268.435L186.914 267.631L185.368 268.126L183.45 268.93L181.78 269.425L180.543 269.364L179.678 270.106L178.812 269.921L178.193 269.116L178.812 268.373L180.049 268.25L179.925 267.631L179.059 267.259L178.193 266.702L177.76 267.074L176.647 266.702L176.09 267.259L175.286 266.702V264.412L176.523 263.051L176.894 261.751L178.564 260.513L178.997 259.338L177.76 258.966L177.451 257.543L178.131 256.614L179.554 255.191L180.791 253.706L181.904 252.344L184.069 251.168L186.481 250.24L188.027 249.002L189.636 247.95L190.316 247.207H191.12L192.419 247.826L193.161 250.24L192.481 253.52L191.12 255.5L190.378 256.924L190.811 257.171L191.8 256.738L192.976 255.81L195.017 255.934L195.388 255.129L194.707 254.139L195.202 253.025L195.883 251.725L197.12 251.601L198.233 252.282L199.346 253.334L201.387 253.768L202.686 255.067V256.367L201.882 257.605L200.274 258.842L200.831 259.461L202.562 258.471L202.934 258.842L204.789 257.048H205.346L205.779 257.79L206.954 258.038L207.82 257.667L207.634 255.996L206.459 255.748L206.521 254.943L207.139 255.191L206.954 255.562L207.882 255.748L207.758 254.634L206.706 253.768L205.593 253.334L204.913 251.787L205.902 251.54L207.449 252.035L208.871 253.644L210.294 254.696L210.541 256.553L211.964 256.676L212.026 258.657L212.459 262.246L213.015 264.722L213.634 267.074L214.933 267.631L215.86 266.022L216.788 264.412L215.675 262.246L215.242 260.885L215.056 258.1L214.376 256.738L214.005 254.077L213.634 251.601L213.758 249.373L214.252 248.878L214.005 247.95L214.5 247.455L215.675 247.764L216.974 249.188L217.716 249.621V248.074L218.334 247.95L218.953 249.064L219.819 249.807L221.118 251.168L221.922 251.787L222.788 253.025L223.344 253.334L223.53 255.624L223.901 259.214L224.581 261.38L225.014 263.794L225.571 265.526L226.561 267.074V269.302L226.004 270.849L226.313 272.767L226.251 274.005L227.488 274.934L227.921 276.109L228.849 277.1L230.272 278.585L231.632 279.575L232.313 279.451L233.364 280.318L234.911 281.494L235.838 282.298L236.457 282.422L237.137 283.165L238.251 283.289V282.855L238.931 282.917L239.116 284.464V287.002L238.745 287.806L237.818 287.93L237.199 286.259L236.642 287.064L236.271 287.559L235.344 286.816L234.663 285.578L234.23 286.259L233.674 287.311L233.426 288.982L232.437 289.106L231.385 288.487L230.643 287.497L229.777 288.363L230.334 289.106L231.076 289.168L231.447 290.22L231.694 291.52L232.065 291.644L232.931 290.777L233.674 290.22L235.096 290.468L234.849 291.396L235.282 292.324L236.148 292.881L235.838 294.181L234.539 294.986L233.426 295.852L231.571 296.595L230.148 296.347L228.169 296.161L227.117 295.481L226.375 295.852H224.272L224.52 295.109L224.953 294.243L223.654 293.624L222.479 292.819L221.674 293.067L220.623 293.5L220.004 291.829L219.695 290.468L219.448 290.158"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M188.027 245.041L184.873 240.957L181.471 236.562L178.626 235.634L176.275 236.439V237.986L175.286 239.162V236.562H173.801L172.997 237.986V236.562L169.966 234.582L167.492 232.23H165.142L163.163 233.159L157.658 234.211L155.493 234.706L157.287 240.214L158.586 241.514L157.967 243.865L160.565 245.041H157.534L156.359 247.207L154.937 250.673L156.359 252.158L154.256 252.901V255.562L153.823 257.233L153.267 258.038L152.71 259.895L151.782 262.061V263.36H153.638L155.122 264.784L156.421 265.836L157.967 266.764L158.957 268.745L159.514 270.23L160.318 272.21L160.874 273.572L163.225 272.458L165.451 269.116L166.317 268.745L167.183 269.735L169.286 268.992L170.523 267.631L169.905 264.227L171.018 262.184L171.389 259.956L172.379 260.513L173.801 259.028L174.543 256.924L175.286 254.696L176.832 254.077L179.306 251.663L182.151 249.745L184.996 247.702L186.975 246.65"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M217.654 245.289L219.201 243.123L224.087 242.38L225.138 243.803L226.561 244.732V246.65L225.386 249.312L223.53 252.592L222.108 250.426L220.685 247.455L218.953 246.093"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M232.931 254.51V252.592L234.168 250.859H235.467L236.827 252.715V254.201L238.312 254.882H240.353L241.342 253.829V252.901H242.023V251.663L241.342 250.302H240.538L240.6 248.445L242.456 249.312V248.445L241.281 246.898L239.982 248.012L238.374 247.207L237.075 245.66L237.941 244.175H238.992L239.549 245.165L240.229 245.66L240.786 244.608L239.92 243.68L238.683 242.38L239.672 241.637L240.786 241.018L241.961 241.699L242.456 241.266L241.714 240.585L242.085 240.276L243.322 240.709L244.311 241.575L245.115 242.751L246.105 242.628L247.342 242.009L248.703 241.575L250.125 240.585L251.053 240.523L252.043 241.266L252.599 242.071L253.094 242.813L252.847 243.494L250.435 244.608V245.474L251.053 245.846L251.733 245.722L252.352 246.093L251.981 246.96L250.682 247.207L249.507 248.012L249.012 249.373L248.208 250.673L247.837 251.849L248.455 252.22L249.136 251.416L250.435 251.23L251.486 251.973L251.919 252.344L251.61 253.272L252.166 254.015L252.847 254.634L252.537 255.315L253.094 255.996L253.898 254.943L254.517 254.634L254.702 255.996L255.011 257.233L255.383 258.224L254.269 259.152L254.146 260.142L254.517 261.318L254.269 262.308L253.713 262.68L254.084 263.608L253.28 265.093L252.104 266.702L250.806 267.074L249.321 266.702L248.393 265.898L248.146 264.722L247.651 265.031L247.466 266.207L247.96 267.074L248.765 267.94L249.136 268.497L248.641 269.487L246.909 270.663L246.105 269.982L245.239 270.044L244.621 267.569L243.693 265.898L242.023 263.917L241.033 262.803L240.167 261.07L238.93 260.885L238.312 259.523L237.322 259.585L237.137 260.204L235.652 258.842L235.343 257.667L234.662 256.553L233.487 255.253"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M244.436 240.276L245.673 241.266L247.776 240.957L249.013 240.276L250.373 238.667V237.243L248.27 238.11L246.538 238.605L245.982 239.224L244.436 240.276Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M252.6 250.116L253.156 252.158L254.022 251.849V250.735V249.683L253.28 249.435L252.6 250.116Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M192.79 232.23L196.377 233.716L199.346 232.973L202.686 231.426L204.727 229.755V228.703L206.088 228.022L207.201 227.093L208.376 227.774L209.861 226.413L211.098 224.927H212.211L213.077 226.598L214.438 225.856L215.056 224.927L216.231 226.041L217.097 226.908L217.654 226.598L218.644 225.856L220.499 225.422L221.612 222.576L222.602 219.852L222.107 219.048L223.344 217.563V214.963L222.664 213.354L220.808 211.436L218.953 210.94L218.149 213.168L219.076 215.458L218.458 216.387L217.654 215.706L216.974 213.292L215.551 213.849L214.128 214.963L214.067 214.159L215.056 212.673V210.94H212.953L212.582 210.26L213.386 208.712L213.634 207.227L212.891 206.051L212.149 205.804L212.397 204.813L211.964 203.39L211.593 202.462L212.582 201.038L212.211 200.543L211.778 200.234V199.615H210.665L209.799 199.986L208.871 202.152L208.067 204.752L207.016 204.875L206.211 205.804L206.397 207.598L208.067 208.403L209.428 209.269L209.613 211.621L207.449 213.292L209.18 214.654L211.407 216.634L211.16 217.81L210.727 219.172L209.675 218.924L207.51 218.553L205.036 218.12L203.428 218.8L202.439 218.553L202.129 216.634L202.315 215.953L201.696 214.53L200.769 214.406L199.655 214.716L199.532 214.035L200.521 212.983L200.026 211.745L198.356 211.312L198.109 209.641L196.686 207.97L193.346 208.96L192.79 208.341V207.289L192.357 206.423L192.604 205.556L192.048 204.937L190.13 204.442L189.141 205.185L187.532 205.432L186.667 207.227L187.223 207.97L188.893 208.155L189.759 208.465L190.378 209.269L189.574 209.641L187.718 209.393L186.11 208.96L184.316 209.95L183.883 210.631L184.564 211.374L183.574 212.611V213.354L184.749 213.787L186.728 213.168L188.275 212.859H189.635L190.068 213.787L189.141 213.911L188.027 213.849L186.481 214.159L185.924 214.716L184.44 214.592L182.894 215.087L182.151 216.387L181.904 217.191L183.327 218.058L185.677 217.377L187.1 216.634L188.522 216.201L189.079 216.634L188.646 217.439H188.027L187.038 218.243L186.234 219.481L184.44 219.172L181.904 219.543L180.667 221.152V222.204L181.224 223.133L183.388 223.937L184.811 222.699H185.553L185.43 223.69L186.11 224.308L185.491 224.989L186.234 225.918L187.471 225.67L188.275 223.69L188.893 223.751L188.831 225.051L189.326 226.103L190.378 225.67L191.12 224.618L191.553 223.194L191.8 221.709L192.357 222.204L193.223 220.533L194.583 219.729L195.14 220.286L193.779 221.585L193.408 223.504V224.804L194.089 224.989L195.573 224.185L196.81 223.937L198.604 222.452L199.222 223.071L198.666 223.937L199.532 224.37L201.202 222.947L201.758 223.442L203.428 222.08L203.923 222.699L203.861 223.69L202.315 225.113L201.263 226.103L199.284 225.979L196.872 226.351L196.192 227.032L195.449 227.96L193.718 228.455L192.542 229.26L191.553 230.002L191.738 230.683L192.295 231.426L192.79 232.23Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M226.931 220.038L225.632 222.637L225.323 224.123L226.127 224.742H226.931L227.488 225.237L228.54 224.804L229.467 223.504V221.833L228.663 220.781L227.674 220.038H226.931Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M174.42 217.624L175.657 217.872L176.585 218.553L177.327 218.12L178.935 215.582L179.492 213.664L180.048 211.931L180.667 210.755L179.987 210.507L178.811 211.621L177.822 212.55L176.708 212.797L175.657 215.211L174.42 217.624Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M190.254 200.172L190.625 199.615L191.615 198.81H192.481L193.408 198.315L194.151 198.996L194.893 199.924V200.729L193.965 201.038L192.542 200.791L191.058 200.729L190.254 200.172Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M182.398 189.651L183.574 188.66L184.316 187.794L185.553 188.97L187.718 191.445L187.408 192.064L185.058 193.735L184.316 194.664L185.058 195.963L186.79 197.449L186.048 198.315L185.058 197.387L184.44 197.82L185.305 198.872L186.171 200.234L186.11 201.533L185.429 202.4L184.378 203.019H183.264L182.398 203.699V206.856L181.533 207.475L180.667 207.103L179.12 206.484L178.873 205.123L179.306 202.647L179.491 201.038L180.048 199.615L179.43 199.182L178.873 199.986L177.822 200.296V201.038L177.265 201.781L177.822 202.709L177.265 204.009L176.028 203.328L175.409 204.195L176.09 205.123L176.646 205.68L176.584 206.98L175.719 207.722V209.146L175.1 210.012L174.42 209.146L173.987 207.846L173.677 206.794L172.873 206.732L173.121 207.97L173.245 209.641L172.873 210.012L173.368 210.94L173.245 212.55L172.873 213.292L171.327 213.045V213.849L170.585 213.54V212.797V211.497L169.595 210.507V209.455L169.039 208.712L168.42 209.022V211.993L167.492 212.797L165.761 211.374L164.029 212.178L162.792 212.302V211.312L163.287 209.579L162.792 209.393L161.74 209.765L162.606 208.341L162.977 206.918L164.276 205.556L166.441 204.999L167.678 203.142V201.719L169.101 201.038L170.585 199.615L170.832 198.315L172.008 197.077V196.273L172.688 195.654L172.873 194.911L174.42 193.612V192.25L174.729 191.755L175.286 191.879L176.09 191.569L176.584 190.827L178.935 190.95L180.976 191.755L182.151 192.064L183.512 191.507L183.388 190.641"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M207.943 180.615L208.685 179.006L206.706 178.758L204.541 179.13H203.242L201.387 180.182L200.768 179.872L199.717 180.058L199.222 180.615H198.356L197.305 181.853H195.944L195.635 183.462L196.068 184.576L196.253 187.794L196.872 188.351L197.119 189.341H198.109L198.913 190.641L199.779 191.322L201.696 190.331L202.748 189.465L204.108 189.651L205.655 188.908L206.459 187.794L206.582 185.814L206.521 183.957L204.603 184.266L204.108 183.338L204.603 182.348L206.026 181.853L207.201 181.358"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M191.553 179.315L190.254 180.12V180.739L189.265 181.234L190.44 183.09L191.553 184.514L192.852 185.009L194.151 183.709V182.162L192.543 181.172L191.677 180.244L191.924 179.315H191.553Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M195.635 174.364L196.439 175.478L198.233 174.364L200.521 173.993L200.768 175.169L201.696 175.788L202.191 174.859L202.748 173.683H203.923L204.541 174.735L205.84 175.416L206.954 174.735L208.438 175.107L209.18 174.488V172.941L209.613 172.198L209.242 170.96L208.685 170.032H207.881L207.448 169.042L206.335 167.99L205.655 167.371H204.603L204.418 168.113L203.675 168.237L202.624 169.104L202.191 170.032L200.954 170.775H199.779L198.851 171.022L197.552 171.95L196.377 172.879L195.635 173.374V174.364Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M220.994 185.257L221.489 184.761L222.726 185.257L223.592 186.371L224.458 187.794V189.96H225.571L226.066 190.95L226.499 192.002L226.994 192.993L226.313 194.23L225.447 194.602L224.643 193.983L223.344 193.302L222.912 191.322L222.788 188.908L221.984 187.794L221.613 186.432L220.994 185.257Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M233.55 183.09L234.045 185.009L235.962 185.566L236.704 184.761H238.869L238.003 183.09L236.642 182.595L235.962 182.162L234.292 182.595L233.55 183.09Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M222.416 161.739V159.016L223.158 156.973L224.581 157.407L226.436 156.664L228.91 156.231L230.147 157.097L231.632 158.273L232.621 160.253V161.924V163.1L233.24 164.648L234.23 163.534V162.296L235.281 161.615L235.776 161.12L236.889 162.234L238.312 163.595V165.143L237.879 165.885L238.868 166.876L239.796 166.628L240.229 166.071L240.848 166.009L241.59 167.371L242.518 168.361V169.784H243.445L243.816 170.465L243.445 171.579L242.765 172.879L242.827 174.178L243.26 175.788H244.188L244.744 177.273L245.425 178.511L245.858 179.315L245.486 180.615L245.858 181.853L245.301 182.843L243.693 183.338L242.827 184.081L241.528 183.338L240.044 182.162L239.858 179.996L239.672 178.263L238.868 177.273L237.508 176.84L236.518 175.788H234.353H233.116V174.178L232.25 173.931L231.137 174.178L229.653 174.797L228.601 175.788H227.302L226.374 175.045L225.385 173.312L225.076 172.136L225.57 170.775L226.746 170.713L228.725 171.579H230.457L230.58 169.784L229.653 169.599L228.787 169.722L228.601 169.227L229.9 168.361L230.704 167.742L230.086 166.814L229.22 166.504L228.044 166.628L228.106 165.885L229.096 164.586L228.725 163.286L228.106 163.162L227.24 163.781L226.746 164.771L226.313 165.762L225.509 166.071L225.447 164.524L226.003 162.481L225.447 162.048L223.962 162.543L222.416 161.739Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M248.085 171.579V172.631L249.508 173.621V175.107L250.188 176.345L251.672 176.778L253.157 178.758L252.724 179.439L250.621 178.944V179.81L251.672 180.924L252.662 181.729L252.476 183.462L253.157 183.895L254.27 181.915L254.889 182.162L256.064 181.667L257.981 181.296L259.589 181.11L259.899 179.687L259.651 177.954L258.414 176.778L258.971 175.788L260.146 174.612L259.342 172.941L258.105 171.765L256.62 171.95L255.445 171.332V170.156L254.146 168.485L252.167 167.371L250.25 166.195H249.384L248.58 166.752L248.085 167.371V168.856L248.951 170.156L249.013 171.27L248.085 171.579Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M232.189 176.221L232.745 176.716L231.632 178.201H231.075V177.211L232.189 176.221Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M255.383 186.061L257.486 184.081L258.475 183.895L258.908 184.761L259.836 184.514L260.578 184.081L262.558 184.761H265.526L266.207 185.257L265.712 186.742L265.155 187.98L264.846 189.651L262.558 189.156H259.218L256.434 189.217L255.383 186.061Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M273.258 187.546V190.208L274.124 191.507L275.423 192.559L276.721 193.364L277.835 192.312L278.33 191.012L278.082 188.97L277.093 187.546L275.794 186.742L274.928 186.247L273.814 186.742L273.258 187.546Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M227.983 202.028L229.468 203.823L231.076 205.123L230.705 206.175L229.53 206.918H227.674L226.994 206.299V205.123L226.313 204.442V203.081L226.994 202.647L227.983 202.028Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M236.951 202.895L237.817 203.452L239.24 202.028L241.157 201.038L239.611 200.481L238.312 201.533L236.951 202.895Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M232.436 207.475L230.024 208.217L227.797 208.589L226.993 209.393V210.631L228.354 211.002L230.086 211.188L231.879 210.569L232.993 209.765L233.488 208.651L233.055 207.722L232.436 207.475Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M228.911 212.426V213.354L231.076 212.735L232.56 212.054L233.736 211.188L233.488 210.817L231.818 211.436L230.21 212.054L228.911 212.426Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M234.477 212.054L235.096 212.673L233.859 213.354L232.993 214.406L232.56 215.273H231.447L230.828 214.654L231.694 213.973L231.632 213.354L233.488 212.611L234.477 212.054Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M242.827 140.697L244.126 141.563L245.548 140.944L245.858 141.749L246.352 143.42V145.71L246.909 147.257L246.538 149.237L246.043 149.423L245.363 148.495L244.868 148.185L244.744 145.957L244.064 145.524L241.961 145.214V142.553L242.827 140.697Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M234.168 214.406L234.415 215.52L232.993 217.006L232.745 218.12L233.487 218.862L234.415 217.81L236.023 217.934L237.446 217.315L239.054 217.129L240.786 216.634L242.332 216.387L243.693 217.129L242.765 217.996L241.466 218.553L242.023 219.419L240.909 220.038L240.044 221.028L240.353 221.585H241.342L241.59 222.452L240.848 223.194L241.775 225.732L242.765 226.103L245.672 225.67L246.352 225.237L247.095 225.608L249.074 225.484V223.69L250.002 223.875V222.885L249.198 221.4L249.507 220.224V218.986L250.002 218.181L250.373 218.367L251.177 219.048L251.424 216.449L250.002 215.892L249.878 215.087L250.744 214.035L250.373 213.045L250.62 211.497L250.929 209.641L250.373 208.217L249.878 206.918L250.373 205.556L250.002 204.442L248.579 204.133L247.775 202.771L246.043 203.081L246.229 204.937L245.301 205.37L244.93 204.442L243.94 203.452L243.631 202.771H242.765L242.085 203.142L240.477 203.081L239.054 204.442L239.672 205.742L242.085 206.299L242.518 207.475L240.848 207.97L240.909 208.465L243.383 209.146L242.394 210.074L242.085 211.374L243.445 212.55L242.518 213.354L241.466 212.302L240.724 211.188L239.054 208.651L238.188 208.341L238.435 207.475L237.693 206.237L236.951 205.432L235.776 205.494L235.467 206.546L235.095 208.403L236.271 208.712L236.456 209.084L235.59 210.012L235.961 211.188L237.693 212.054L236.951 213.045L238.126 214.654L237.508 215.273L235.838 213.354L234.168 214.406Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M252.971 219.11L253.28 220.348L254.517 219.729L254.826 218.553L255.383 219.11L256.496 217.996L255.383 216.944L254.703 217.624L252.971 219.11Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M260.887 215.273L262.186 214.839L262.001 213.664L261.32 212.054L260.578 212.673V213.973L260.887 215.273Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M257.796 218.553L259.589 217.377L261.878 217.748L262.744 218.862L263.548 220.348L264.847 221.523V222.885V226.103L265.28 227.093V229.507L264.29 230.559H261.383L260.146 229.445L258.847 228.269L256.992 227.836L256.497 227.093L256.126 225.237L255.383 226.722L254.703 225.237V223.937L256.064 221.833L256.497 220.843L255.94 220.348L256.497 220.038H257.239L257.796 218.553Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M252.971 199.862V200.853L254.146 201.348L256.063 203.452L257.238 202.771L257.671 203.452L256.496 204.442L256.929 206.051L259.094 206.546L260.145 206.918L258.723 208.341L259.156 208.712L260.826 207.97L263.98 207.784L265.279 206.67L266.392 206.484L267.073 207.97L268.124 209.95L268.433 211.807L269.732 213.292L269.98 215.644L270.351 217.377L269.299 218.924L268.928 221.647V223.194L270.227 223.937L269.732 225.546L270.351 226.846V228.703L272.392 230.559L273.258 230.312V228.888L274.371 227.96V229.136L275.113 230.188L276.722 231.426L278.33 231.797L279.938 230.992L280.309 230.312L280.061 229.383L281.113 228.764L282.35 227.898L283.092 228.641L283.34 230.312L282.783 231.797L283.34 232.663H285.257L287.917 232.354L290.267 232.292L290.638 231.364L291.195 232.354L292.803 232.478L293.05 230.559L293.669 232.23L294.473 232.354V230.992L295.339 231.364L295.586 232.23H297.318L299.916 231.611L300.72 229.507L300.349 228.455L299.978 227.155L300.72 226.598L301.091 227.836L302.019 228.393V230.559L302.699 231.797L304.616 231.983L305.668 232.663L306.843 232.23L308.513 230.869L309.75 230.931L311.358 231.054L311.544 229.26L311.853 228.517V227.589L312.966 228.146L313.832 227.836L314.76 227.217L314.389 226.227L312.719 226.165L311.729 226.475L311.606 225.608L311.915 224.618L313.09 223.999L313.894 222.823L314.141 220.348L312.966 219.481L311.544 219.234L311.791 218.553L312.533 218.058L311.173 216.944L309.564 217.377L308.142 216.263L308.513 215.087L306.41 214.53L303.689 214.282L301.709 215.582L299.978 214.901L298.431 214.53L296.699 216.696L294.72 216.882L293.916 217.81L292.494 217.686L291.442 218.862L292.184 220.162L290.329 220.348L288.844 219.481L287.112 217.439L286.247 218.553L285.381 218.058L283.834 219.419L283.34 218.305L282.412 216.944L281.484 217.377L281.917 219.667L281.298 219.976L280.618 218.8L279.938 217.748L278.948 218.243L279.134 216.944H279.938L280.123 215.273L279.443 214.159L278.391 214.778L278.082 214.282L278.391 213.354L277.154 212.054L276.165 212.983L274.99 212.611L273.505 212.054L273.815 211.497L275.794 211.126L274.68 210.136L272.701 209.703V208.712L272.949 208.341L274.433 208.836L275.794 209.208L277.34 209.084H278.763L279.938 208.712L279.567 207.413L277.464 206.546L275.794 205.927L273.753 205.68L272.145 204.999L272.392 204.009L273.505 204.442L275.361 204.566L275.608 204.256L274.742 203.204L273.258 201.967L272.33 201.719L270.784 201.967L269.299 203.019L267.444 202.771L266.392 203.266L264.908 206.299L264.351 205.556L264.846 204.256L265.774 203.019L266.145 200.791L265.032 199.305L264.784 198.501L263.238 197.882L262.186 198.253L261.135 197.263H260.022L258.599 196.52L258.104 196.025H256.125L254.703 196.83L253.527 197.944L254.084 198.996L254.703 199.862L254.331 200.172L252.971 199.862Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M275.794 200.419L277.34 199.429L278.33 200.419L277.835 201.471L277.649 203.019L277.959 204.071L277.526 204.504L276.412 203.699L276.041 202.152L275.794 200.419Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M278.886 203.328L280.309 205.309H281.175L282.103 203.576L282.35 202.524H283.03L283.525 204.071L283.216 205.494L284.391 206.299H286.061L286.308 204.813L285.814 203.328L286.308 203.204L286.989 204.504L287.484 205.866L289.092 206.67V204.875L290.081 204.133L290.576 204.628L290.205 206.237L291.628 206.67L293.731 207.103H296.266H296.947L296.081 206.361L295.215 205.866L294.844 204.504L294.473 203.514H295.215L295.834 204.813L296.699 205.494L297.689 204.813L297.503 203.452L298.06 202.524L298.617 203.761L299.421 204.999L300.101 205.742L300.967 205.68L301.338 205.185L300.967 203.39L300.472 201.967L300.967 201.657L301.833 202.771V204.256L302.204 205.556L303.194 206.051L304.678 205.556V203.142L303.565 201.967L303.318 200.481L303.689 200.172L304.245 201.286L304.926 202.338L305.792 203.142V204.195L306.534 204.813L307.894 204.256L308.884 204.133L309.379 204.937L310.307 206.423L309.503 207.722L308.946 209.208L309.626 209.579L311.42 208.527L313.028 208.094L314.265 207.103L315.255 207.041L315.997 205.494L316.43 203.885L317.11 203.142L317.481 204.009L318.1 204.504L318.78 204.256L319.213 203.699V202.214L320.141 201.967V200.172L320.45 199.243L319.894 198.068L319.337 197.077L318.224 197.325L317.481 198.377L316.863 199.429L316.121 198.872L316.244 198.068L314.945 197.944L314.76 197.077L315.502 195.654L315.997 194.787L315.378 193.364L313.708 192.993L312.533 194.23L311.667 195.097L311.42 194.54L311.977 193.364L310.121 192.993L308.884 192.436L306.472 194.354L306.163 193.364V192.064L307.152 191.817L307.894 191.322L306.657 190.331L306.286 189.156L306.657 188.103L307.894 189.156L309.132 190.27L309.688 191.198L310.987 191.817L312.348 191.941L313.708 191.693L315.378 191.755L316.121 191.012L317.42 191.198L318.595 190.517L318.718 189.403L319.522 188.908L320.079 186.68L319.275 185.566L319.584 184.019L318.162 182.224L318.471 180.986L319.77 180.553L321.316 181.172L323.419 181.853L324.656 181.296L325.646 180.182L326.635 180.429L327.13 180.924L327.378 179.687L327.996 178.634L327.254 178.139L324.532 177.644L323.605 176.84L324.038 175.973L325.831 176.221L327.563 176.345L328.305 176.53L328.738 175.354L329.728 174.55L329.048 173.374L327.749 172.693L326.202 172.198L324.842 171.455L325.213 170.775L326.697 171.146L327.872 171.517L329.295 170.775L330.779 170.094L331.336 168.485L330.841 166.69L330.223 165.514L328.924 164.833L327.13 165.205L326.017 164.462L326.635 164.029L327.439 163.843L327.192 162.977L326.202 162.605L324.409 162.358L323.048 162.791L321.131 163.224L319.955 164.648L319.522 165.514V167.061L318.657 166.504L318.471 165.452L319.151 164.586L319.77 163.286L320.017 162.172L319.028 161.739L319.77 161.182L320.821 161.739L321.687 161.924L322.553 161.182L323.914 160.934H324.904L325.708 161.306L326.079 160.934L325.646 160.315H324.099L323.419 159.882H322.058L320.76 159.635H319.832L319.151 159.263L319.832 159.016L320.636 158.644L321.997 158.892L323.728 159.078L325.213 158.954L326.388 159.078L327.192 159.696L327.687 160.934L328.367 161.491L329.79 161.739L330.841 162.11L331.522 162.358L332.078 161.863V161.12L331.398 159.944L330.841 159.263L331.707 158.644L331.027 158.335H329.666H328.12L326.759 158.149L325.275 157.902L323.79 157.221L322.368 158.025L321.502 157.716L321.131 157.035L320.141 156.478L319.584 156.045L320.265 155.797L321.069 155.983L322.182 156.231L321.997 155.24L321.687 154.003L322.491 153.817L323.048 154.745L323.605 155.426L324.532 155.612L325.584 156.045L326.326 156.169L327.13 155.859L326.821 155.426L326.079 155.055L325.831 154.126L324.656 153.817L323.357 153.569L322.429 153.26L322.12 152.579L322.924 152.208L323.79 152.765H325.584L326.264 153.569L326.945 154.436L328.058 155.117L329.295 155.302L330.408 155.055V154.065L330.285 153.012L330.718 152.765L331.398 153.508L332.078 154.126L333.068 153.941L333.501 153.446L333.872 152.455L334.738 152.022L334.923 152.889L335.727 153.012L336.47 152.27V150.351L336.16 149.113L335.727 148.123L334.676 148.433L333.996 147.69H332.697L331.089 147.442L330.779 146.638L331.769 145.895L333.439 145.4L334.552 146.081L334.367 146.7L335.913 146.514L337.088 146.452L337.707 147.195L337.088 148.247L337.707 149.113L338.634 149.485L339.871 149.794L341.418 149.175L342.84 148.247L344.016 147.133L344.325 145.4L343.768 145.091L342.964 145.462L342.717 144.657L343.583 143.977L344.82 143.296L345.253 142.553L345.624 141.501L344.82 140.944L343.397 141.563L341.913 142.306H340.181L339.315 141.934L339.995 141.501L340.614 140.944L339.871 140.078L339.5 139.397L339.995 139.211L341.047 139.83L341.418 141.006L342.469 140.635L343.15 139.954L344.448 139.211L345.253 139.026L345.995 139.397L346.861 139.273L347.665 138.469L347.108 137.726L346.118 136.921L345.809 136.117L345.995 135.127L345.438 133.332L345.376 132.465L345.995 132.899L346.428 133.765L346.799 135.127L346.613 136.179L347.912 136.302L349.273 135.065L350.077 134.384L350.386 132.837L350.943 131.413L353.046 128.876L354.716 126.71L355.891 124.667L356.076 123.801L357.004 123.306L358.118 122.501L359.664 120.459L360.715 118.417L361.334 116.993H362.385L363.808 116.065L365.416 114.208L366.22 112.661L366.715 111.052V110L365.849 109.752L364.797 110.062L363.127 110.928L361.025 112.042L358.736 113.28L356.262 114.518L353.417 116.065L351.5 116.869L349.953 117.798L348.84 119.159L347.541 119.716L347.85 119.097L348.592 118.169L348.036 117.921L348.592 117.179L349.087 117.241L349.397 116.065L350.51 116.127L351.747 115.632L353.85 114.208L356.076 112.599L358.241 111.237L359.293 110.804L358.798 109.752L357.808 109.381H356.2L354.406 109.876L353.169 110.247L352.86 109.381L352.18 108.452L352.056 107.338L352.984 107.895L353.355 108.762L354.716 108.452L356.695 108.019L358.365 107.71L360.468 107.338L361.581 107.091L362.138 107.462L363.066 107.091L362.571 106.534L361.643 106.348L361.581 105.853L362.695 105.606L364.179 105.11L365.292 104.615L366.034 105.11L366.529 105.42L367.581 105.049L367.89 104.43L367.519 103.501L368.076 103.13L368.509 103.687L369.374 103.13L370.117 102.016L371.725 100.778L373.766 99.0453L375.065 97.0649L375.807 95.7652V94.7131L376.673 94.4656L377.724 93.2278L378.652 91.6806V89.2669L378.095 87.8434L377.539 86.2962L376.797 85.6154H375.003L374.879 84.749H373.58L372.591 85.9249L371.848 87.1008L371.354 86.3581L371.848 85.1822L372.096 84.3158L371.848 83.5112L370.859 82.7686L371.106 81.7783L370.426 81.3451L369.684 80.6024L369.807 79.6741L370.364 79.2409L370.488 77.6318L369.993 76.951H368.632L367.272 78.1269L366.962 78.7458L366.344 78.1269L365.973 77.2604L365.725 74.9706L364.303 75.7132L364.426 76.8272L363.993 77.5699L363.499 77.4461L363.375 76.8891L362.571 76.6416L361.272 77.6937L359.849 78.9314L358.365 80.293L357.128 81.1594L356.633 81.964L355.953 81.8402L354.592 81.7164L352.984 82.1497L352.613 81.7164L353.417 80.9119L354.53 79.736L355.891 79.2409L357.19 78.3744L358.551 77.1986L359.602 75.7751L360.159 75.3419L359.973 74.2279H358.551L357.994 73.5471L357.437 74.1041L356.757 73.5471H354.221L353.912 73.9184L353.726 73.1758L353.788 72.2474L353.293 71.7523L352.304 72.6188L351.871 73.7947L351.252 73.4852L350.819 71.381L349.458 72.4331L349.211 71.381L348.469 70.7002L348.902 70.2051V69.0911L346.984 68.9054L345.253 69.2768L343.459 70.5146L342.531 71.6286L343.521 73.3614L344.572 74.4136L344.387 75.2181L343.521 74.8468L342.16 73.9184L341.665 72.7426L341.418 71.6904L341.851 70.5146V69.4006H340.243L338.387 69.6481L337.212 70.7002L336.284 72.4331L335.295 74.0422L335.789 76.0846L337.645 78.3744L338.944 79.5503L338.82 80.7881L337.769 80.4168L336.532 78.8696L335.109 77.1986L334.181 75.7751L333.934 74.2279L333.192 72.5569L332.14 71.6286L330.718 71.0716L329.419 71.4429L328.305 71.1334L327.13 70.0194L322.924 69.9576L321.935 70.7621L322.739 71.6286L321.502 72.3712L322.491 74.0422L324.161 75.5276L325.089 77.5699L325.955 80.6643L328.491 82.7067L328.367 83.5112L326.821 84.6252V83.5112L325.584 82.521L324.78 81.6546L323.976 79.8598L323.543 78.065L322.368 75.9608L321.131 75.2181L319.955 74.6611L318.842 76.1464L318.285 75.7132L317.481 74.2279L316.244 76.0227L315.997 75.3419L315.873 74.3517L315.378 73.4233L314.574 73.3614L313.337 73.9184L312.286 74.4136L311.482 75.4038L312.1 76.4559L313.894 77.3842L312.904 77.8174V78.8077L313.894 79.4884L315.935 80.6024L317.296 81.0976L317.048 81.8402L315.502 81.2213L313.832 80.4787H313.337L313.399 82.1497L312.657 81.7164L311.915 80.7881L312.039 79.6741L311.606 78.4982L310.863 77.5699L309.997 77.2604L308.142 77.3842L307.585 77.9412L308.08 79.1171L309.132 80.4787L309.317 81.5308L310.801 84.192L309.688 84.9966L309.132 83.8826L308.142 82.8304L306.843 81.8402L305.049 81.2213L304.555 81.964L304.493 82.9542L305.235 84.192L306.657 84.8109L307.214 85.7392L306.224 85.8011L304.987 85.5536L303.75 85.9249L303.503 87.2864L303.256 89.0812L304.678 90.6284L306.472 92.4851L308.204 94.2799L309.441 94.6512L309.132 95.5177L310.74 96.9411L310.492 97.6219L308.822 97.2506L306.781 95.332L304.926 93.5372L303.627 91.7424L302.575 91.433L302.08 92.547L303.256 93.9086L303.379 95.7033L305.668 96.2603L306.657 97.7457L305.297 97.003L304.06 96.6317L302.885 96.7554L301.957 97.0649L301.895 96.3841L302.39 95.6414L302.019 94.4037L301.276 93.2897L300.967 92.6089L300.658 90.9379L299.73 89.762L297.936 88.8337L296.576 88.7718L295.339 87.7197L295.462 87.0389L296.328 87.1627L296.761 86.6057L295.091 86.1724H293.421L292.246 86.8532L291.999 87.534H293.236L293.174 89.8239L293.792 91.3092L293.05 92.2376L291.38 92.4851L288.968 92.9183L289.092 94.4656L289.958 95.4558L291.937 95.8271L292.927 97.0649L295.71 97.56L296.514 98.9834L296.328 100.531L295.524 101.15L294.968 100.221L294.287 98.6121L292.617 98.4883L293.483 100.036L293.916 101.768L293.359 101.707L292.741 100.097L291.69 98.4264L290.638 97.3743L288.535 97.1268L288.597 98.4883L287.236 99.4786L287.36 98.117L286.865 96.8792L285.133 96.3841H283.463L281.979 97.1887L280.804 98.7359L280.433 101.026L279.69 102.511L279.072 101.83L278.639 100.778L277.464 100.407L275.608 101.211L275.175 102.202L274.062 102.573L273.505 103.254L274.433 103.625L273.32 104.368L272.578 104.058L271.65 104.801V106.348L270.846 107.277L272.392 108.267L272.578 109.628L273.876 108.886L274.309 106.843L275.856 105.729L277.031 105.544L277.155 106.781L278.948 107.153L277.464 108.576L275.732 110.123L274.619 111.609L276.041 112.97L279.443 110.433L282.659 108.514L284.267 108.638L286.123 109.69L285.257 110.062L284.02 109.752L282.164 110.185L280.618 111.733L279.072 113.465L277.711 114.579L279.567 116.189L279.257 117.055L278.33 116.807L277.526 116.498L276.412 117.426V119.84L277.278 121.14H280L283.278 120.211L286.123 120.026L289.648 118.85L290.267 118.355L292.184 116.374L295.029 114.641L296.019 114.951L295.648 116.003L293.916 116.993L292.494 118.478L291.751 119.84L290.638 120.83L289.154 121.697L286.927 122.254L285.69 122.316L284.515 121.387L281.731 122.377L279.567 123.491L279.69 124.544L281.175 126.029L282.783 127.638L283.773 128.628H284.886L285.443 129.804L286.989 129.495L287.669 127.205L288.782 125.967L290.081 123.801L291.442 121.202L293.298 120.645L296.019 119.84L298.988 119.159L301.895 118.293L304.307 117.364L304.74 118.54L301.029 119.531L297.998 120.83L295.091 121.511L293.05 122.254L291.999 123.863L291.195 125.905L290.081 127.514L289.277 129.742L289.587 130.856L291.195 131.475L292.246 130.114L292.927 129.928L292.555 131.599L294.04 131.785L296.514 132.032L298.555 131.289L299.483 129.247L299.359 127.143L300.472 126.215L301.524 125.719L301.153 126.524L300.163 127.7L300.72 128.566L303.318 126.772L305.235 125.41L306.224 125.843L306.101 127.019L301.833 129.68L301.709 131.537L302.575 131.723L306.472 130.299L308.946 129L312.595 126.276L314.265 124.605L314.945 122.563L314.636 121.697L315.688 119.902L314.636 117.921H315.131L316.244 119.159L317.42 117.55L318.038 116.065L318.904 114.518L320.203 114.084L321.687 113.094L322.429 111.918L323.419 112.228L323.295 113.28L322.244 114.27L320.698 115.013L320.079 116.498L318.471 118.107L318.285 119.964L316.121 122.377L316.615 123.244L316.306 125.039L317.667 124.667L319.522 124.172L320.883 123.43L321.935 124.172L323.481 124.048L324.78 124.42V125.719L322.924 126.029L320.265 126.091L317.791 126.772L316.183 127.7L314.574 128.876L312.904 130.114L313.832 130.423L315.255 130.175L316.677 129.928L318.162 130.423L319.213 130.856L318.347 131.723H315.378L311.915 132.28L311.234 133.394L308.946 133.889L306.534 134.755L303.874 135.374L302.266 135.931L301.462 136.674L302.452 138.097L303.565 140.14L304.74 142.863L305.915 143.42L307.338 144.1L306.657 145.153L307.152 147.257L307.276 148.928L309.07 149.237L309.255 149.98H310.245L311.173 149.299L313.028 149.113L313.337 149.918L310.616 151.094L310.245 152.146L309.441 151.589L307.4 150.661L306.472 150.846L306.41 149.423L305.544 149.052L305.111 147.504L304.555 145.771L303.812 144.905L302.761 143.729L302.575 142.801L301.215 141.377L300.349 140.016L299.854 139.211L298.617 137.912L293.731 137.85L292.617 136.983L291.751 136.736L290.205 137.107L289.834 138.345L289.525 140.14L289.896 142.677L290.762 143.42L292.308 143.482L293.236 144.162L293.854 145.214L293.359 145.524L292.494 144.781L291.38 144.534L290.205 144.781L290.081 146.576L290.452 148.061L291.566 148.618L293.05 149.113L293.916 149.856L294.968 151.218L295.339 152.765L295.834 153.322L296.885 154.003L297.38 156.045V158.025L297.875 158.768L298.988 158.582V160.068L299.978 161.12L301.029 161.367V162.543L299.545 162.172L298.617 162.11L298.06 160.934L297.318 160.377L296.143 160.625L295.895 161.801L296.514 162.667L297.503 163.1L299.173 163.41L301.091 163.595L302.823 163.905L304.369 164.276L305.668 163.038L306.781 161.924L307.4 162.048L307.152 163.224L306.472 165.576L304.555 165.7L303.318 165.514L301.524 165.7L302.204 166.752L303.132 167.433L304.555 167.309L303.874 168.175L304.616 170.156L303.318 169.97L302.575 168.547L301.771 168.175L300.225 166.69L299.235 165.762L297.009 165.823L295.834 165.576L294.658 164.276L293.05 165.7L291.195 166.133L289.896 166.319L288.721 167.99L287.607 169.97L287.36 171.455L286.432 173.25L286.494 176.406L287.422 176.902L286.308 177.706L286.618 178.263L288.597 178.201L289.339 177.273L289.958 176.345L290.329 176.84L290.7 176.159L291.257 174.797L291.751 174.859L291.813 176.159L291.38 177.211L290.576 178.325L290.824 179.253L291.999 179.13L293.359 178.077L294.164 176.778L294.906 175.045L295.029 172.569L295.586 171.27L295.957 169.97L296.205 170.156L296.143 171.579L295.71 173.25L295.895 175.107L295.401 176.778L295.153 177.892L295.215 178.882L295.401 179.439L294.411 179.872L292.741 181.296L293.359 182.1L294.782 181.419L296.081 181.358L295.957 182.348L293.916 182.657V183.524L294.597 183.833L294.225 184.823L294.287 186.247L294.968 186.742L295.957 185.566L296.576 185.69L296.885 186.247L295.71 187.175L295.957 188.165L297.132 188.227H298.988L300.472 187.237L300.905 185.38L301.462 184.081L302.204 182.348L302.637 181.481L302.823 179.253L304.245 178.758L304.431 179.439L303.75 179.934V180.862L303.627 182.348L302.699 184.576L301.771 186.928L300.905 188.475L299.235 189.527L299.792 190.579L298.802 190.703L298.06 190.208L296.452 190.703L296.947 191.693L295.71 191.879L294.411 190.517L293.421 190.703L292.741 189.836H291.937L291.999 188.042L291.566 185.628L290.452 183.895L288.535 182.719L286.989 182.348L284.144 183.647L283.896 186.247L285.566 188.103L285.257 189.836L285.628 190.888L286.803 191.26L287.607 190.517L288.411 190.641L288.35 191.384L287.422 192.002L287.298 193.364L288.968 193.735L289.03 194.478L287.298 194.973L285.071 195.035L284.453 194.664L282.969 194.849L282.783 196.273L281.113 197.263L279.505 198.934L279.629 200.234L280 200.976L279.567 201.967L278.886 203.328Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M290.205 164.338L290.638 162.543L292.555 161.553L294.287 162.42L293.112 163.41L290.205 164.338Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M288.907 163.286L290.144 160.749L292.185 159.758L295.216 157.407L294.226 155.612L293.36 153.384L292.185 150.784V153.136L291.381 153.384L291.133 151.775L290.082 150.784L288.845 150.351L288.35 151.218L287.67 151.341L287.051 152.765L286.247 151.775L287.113 150.289L287.732 148.123L288.103 144.905L286.247 146.514L287.67 144.1L287.299 142.863L286.989 141.872L285.567 142.306L284.392 141.315L284.021 140.325L285.258 139.768L285.814 139.149V136.426L285.196 135.188L283.649 134.446L282.536 135.127L282.041 136.179V137.664L282.722 139.087L283.649 140.387L283.526 141.625L282.041 141.439L280.619 140.14L280.124 138.221L279.938 136.117V134.755L280.681 134.013L280.062 132.837L278.268 132.713L277.464 132.96L276.97 132.28L274.743 131.785V130.918L275.176 130.547V129.061L274.001 128.009L273.258 126.957L272.949 125.224L272.145 123.244L271.279 121.016L270.846 118.478L269.671 116.622L268.125 115.446L266.826 114.332L265.527 113.837L265.28 115.075L264.599 114.518L263.733 114.022L262.806 114.394L262.496 115.508L262.311 116.374L263.239 116.807L264.352 117.117H265.527L266.64 117.612L266.826 119.283L265.898 120.459H264.723L264.29 119.964H262.496L263.424 121.078L263.857 121.635L262.806 121.511L261.816 122.254L261.507 121.325L260.888 120.706L260.084 120.521L259.218 121.511L258.785 122.749L258.352 123.863L259.589 124.482L258.105 125.905L259.095 126.276L259.837 126.4L260.332 127.267L262.806 128.195L261.445 128.814L261.569 130.299L263.733 131.042L263.486 131.908L261.569 131.661L260.27 131.413L259.589 130.732H258.414L256.497 131.289L256.002 132.713L256.806 133.889L258.043 135.003L258.785 135.312L257.734 136.488L257.301 135.498L255.878 135.25L254.641 135.684L254.147 136.426L254.456 137.416L255.507 138.469L256.682 138.654L258.476 137.912L258.723 138.345L257.239 139.459L257.981 140.263L258.6 140.635L260.27 139.149L261.259 138.035L261.878 138.592L263.115 139.211L262.125 139.83L261.321 140.201L260.455 141.315L260.579 141.811L261.383 142.677L261.136 143.358L260.455 142.801H258.414L257.177 142.429L255.94 141.563L255.26 140.758H253.899L253.775 141.749L254.641 142.368L254.456 143.358V144.967L254.765 146.762L255.693 148.123L256.435 149.361L257.363 150.351H258.6L259.775 149.794L260.765 149.67L261.94 148.123L262.558 148.618V149.918L261.445 150.784L260.084 151.898L257.796 152.394L257.425 153.446L257.796 154.993L259.095 156.107L259.899 157.221L260.888 156.293L262.063 155.426L262.682 154.56L263.424 154.931L263.919 155.426L263.239 156.478L263.424 157.716L264.537 157.097L265.094 155.797L265.589 154.622L265.898 154.931V155.859L266.95 155.302L267.197 154.436H268.001L269.238 153.755L269.857 154.126L268.991 155.24L269.609 155.859L270.661 156.169L272.021 155.488L273.506 154.993L274.124 155.426L273.815 156.293C273.815 156.293 272.021 156.788 272.083 156.788C272.145 156.788 270.846 157.097 270.846 157.097L269.486 156.911L268.743 157.221L268.62 157.964L269.547 158.644H271.156L273.011 158.025L274.805 157.778L275.98 158.087L275.733 158.644L273.939 159.325L271.65 159.882H269.609L267.877 160.006L267.383 160.501L266.517 160.13L265.713 159.82L265.589 161.244L264.29 162.296L262.806 162.915V164.091L263.919 165.823L265.96 166.133L266.888 167.247L266.64 167.804L265.342 166.999H264.352L264.476 167.618L265.218 168.732L266.022 170.032L267.321 169.784L268.496 169.537L269.176 170.465L271.836 170.279L272.083 171.022L271.65 171.765H269.053L267.383 172.384L267.816 173.621L268.681 174.859L269.671 176.097L270.413 176.468L271.341 176.221L272.083 177.273L273.32 177.397L274.31 177.954H275.98L276.66 176.963L276.351 175.788L275.98 174.921L276.537 174.674L277.464 175.169L278.083 176.592L278.701 176.468L278.392 173.683L277.526 172.26L277.341 170.589L277.588 169.846L278.145 170.156L278.64 171.827L279.32 173.436L280.062 174.921L280.495 176.778L281.114 177.335L281.979 177.52L282.412 175.973L282.784 173.621L281.918 171.703V169.908L282.66 170.094L283.155 171.332L283.773 172.198H284.515L285.258 170.775L284.639 169.289L284.082 168.113L283.835 166.442L284.021 162.791L284.948 162.234L285.443 162.667L285.01 163.348L284.886 165.452L284.701 167.247C284.701 167.247 285.319 168.299 285.196 168.299C285.072 168.299 286.062 168.918 286.062 168.918L286.804 167.494V166.38L287.917 165.266L288.226 163.472L288.845 162.543"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M313.646 214.097L314.512 214.53L314.76 213.664L316.306 214.097L315.688 212.735L315.316 212.24L316.677 211.064L315.997 209.765L315.688 210.074L315.564 210.755L314.512 212.178L313.646 214.097Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M255.816 129.247L256.497 128.504H259.156L260.084 129.68L259.404 130.423L257.363 129.928L255.816 129.247Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M338.449 171.393L341.48 170.898L344.016 169.537H345.129L345.624 168.485L347.912 167.494L348.531 166.566H349.83L351.128 164.152L353.046 162.048H355.891L357.561 160.439H358.983H360.097L361.89 161.244L362.385 159.387L363.932 157.778V156.664L365.602 155.179L366.22 152.827L365.54 150.166L364.983 147.133L365.663 143.791L368.323 142.677L369.127 140.449L368.632 138.345L368.014 140.449L367.148 142.12L366.035 141.996L364.797 141.501L363.499 143.234L361.89 143.048L360.653 141.934L358.427 141.749L356.942 139.644L357.437 136.426L359.478 133.703L359.355 132.218L360.777 131.661L361.767 129.68L363.066 128.814L363.746 127.7L365.973 127.329L365.602 125.101L366.715 124.42L366.529 123.306L369.127 120.211L369.746 122.687L370.735 125.101L371.539 125.224V124.296L370.488 122.563L370.117 120.211L369.746 119.469L371.539 117.86H373.209L374.384 119.283L375.683 120.892L376.487 123.12L376.858 124.358L377.539 124.667L379.332 124.172L380.693 123.553L380.013 121.944L378.652 118.726L377.23 116.869L377.106 114.827L376.487 113.713L378.157 111.856L378.652 110.185L377.23 107.71L376.425 105.791L377.786 104.12L379.456 102.511L380.693 102.202L381.807 103.625L382.301 105.791L383.353 107.895L384.281 109.195L385.765 109.628L386.878 108.7L388.486 108.638L389.043 109.628L390.033 110.619L390.342 110.371L390.033 109.381L389.167 108.081L387.744 107.524L385.889 106.534L384.775 105.234L383.971 103.13L382.796 101.521L381.497 101.088L381.312 100.345L382.549 99.0453L384.59 97.3124L386.631 95.6414L389.291 95.0844L391.455 94.5274L392.136 94.8369V93.9704L392.816 93.4134L394.239 93.9704L394.919 92.9802L396.156 91.6806H398.63L399.496 93.5991L400.486 95.889V99.1072L400.795 101.707V103.935L399.929 106.039L400.362 106.967L402.094 106.781L403.207 104.801V102.759L402.774 100.593L403.454 100.159L405.001 100.531L406.361 100.593L407.413 101.273L408.155 101.892L409.825 102.14L411 103.439L411.619 104.553L412.114 105.791L412.918 106.348L413.66 107.71L414.649 109.195L415.392 108.886L414.897 107.772L414.649 106.224L413.536 105.544L412.546 105.11L412.237 103.811L411.309 102.635L410.753 101.459L410.815 100.716L411.804 101.335L412.794 102.449L414.031 102.14L415.021 102.944L416.134 102.573V100.345L415.206 99.788L414.031 97.9313L412.608 96.3841L411.557 94.0942L411.742 93.4134L411.495 91.433L411.186 89.7001L410.32 88.1529V86.4819L411.371 85.9868L412.732 86.2343L414.526 86.3581L415.825 87.2864L416.814 87.9053L417.804 89.762L418.546 91.5568L419.659 91.8662L421.144 92.547L422.133 94.3418L421.824 95.1463L422.814 95.4558L424.298 96.0747L425.968 96.6317L426.587 97.6219L427.453 99.0453L427.7 101.026L429.246 101.707L429.927 102.821L430.607 104.244V105.049L432.03 105.172L432.277 105.791L433.205 105.544L433.885 104.058L432.957 102.387L432.834 101.335L433.267 100.283L431.906 99.788L430.978 98.5502L430.174 95.889L429.432 94.1561L428.133 93.7229L426.401 91.5568L425.164 90.1952H424.669L424.422 87.9053L423.927 86.42L422.752 84.5014L422.628 83.1399L423.185 82.6448L424.669 83.0161L425.288 82.6448L424.793 81.964L425.288 81.7164H426.401L427.453 82.2734L428.504 83.5731L429.617 84.749L430.854 85.7392L431.287 86.7913L431.349 88.3386L432.339 88.7099L432.896 89.762L432.586 90.9379L431.287 92.4851L430.421 93.4134L430.793 94.4656L431.349 95.889L431.968 97.3124L433.452 97.1887L433.205 96.3841L432.339 95.889L431.844 94.3418L431.906 93.4134L432.834 92.1757L433.885 91.8043L435.184 92.2994L436.174 92.7946L437.72 93.1659L438.524 93.5991L439.328 94.0942L439.761 93.5372L439.514 92.9183H438.895L438.215 92.2376L436.916 92.2994L435.864 91.8043L434.875 90.7522L434.937 88.5861L433.885 87.3483L432.277 85.863L432.463 84.5633L431.04 83.6969L430.669 82.3972L429.308 80.6643L428.751 79.9217L429.061 78.9933L430.174 78.7458H431.287L432.03 79.5503L433.885 79.6741L434.689 79.2409L436.235 79.0552L438.771 79.4266L440.256 79.2409L440.627 80.4168V81.9021L441.617 82.5829V83.8207L441.122 84.9347L441.617 86.5438L442.173 86.7294L442.421 84.9347V83.6969L442.73 82.7067L442.111 81.1594L441.493 80.1692L442.421 80.0454L443.286 80.85L443.905 82.0878L444.833 82.8304L445.575 84.0063L446.379 85.0584L446.874 85.1822L447.554 86.2343V88.1529V89.1431L448.482 89.4526V88.2767V86.2343L447.678 84.749L447.863 84.0063L448.049 82.6448L447.492 80.2311L445.451 80.1692L444.647 79.4884L444.276 78.7458L443.101 78.3126L442.049 77.6318L441.184 76.7653H439.081L436.73 77.0129L433.947 77.0748L434.071 75.3419L433.638 74.6611L432.896 73.2996L431.287 71.9999L430.174 71.381L430.05 70.0813L430.731 69.4624H431.906L432.153 68.6579L433.143 68.2866L434.504 68.596L436.05 69.153L437.349 69.8338L437.844 69.5862L437.349 68.8436L436.545 67.8533L435.617 67.6058L434.442 66.925L434.751 66.6774H435.988L437.287 66.8631L437.782 66.6774L438.648 66.925L439.514 67.3582L440.936 67.2344L441.369 67.6058L440.936 68.7817L441.122 69.2768L442.359 68.8436L443.101 69.7719L443.41 71.0097L444.524 71.938L445.575 73.2377L447.245 74.1041L448.915 73.9184L450.337 74.723L451.08 75.2181L451.389 74.2898L450.832 73.6709L451.018 72.6807L451.76 72.2474L453.987 72.4331L456.213 72.1856L457.265 72.9282V72.1856L455.966 71.6286L455.286 71.0097H453.987L453.368 71.5048L451.389 71.5667L450.77 71.1953L451.327 70.1432L453.43 69.5243L454.915 69.2768L456.646 69.0911L458.378 68.4103L459.801 67.8533L462.151 66.925L461.223 65.9348L460.048 64.9446H459.059L457.327 64.697L457.079 63.7068L457.636 62.7784L457.389 59.2508H458.007L458.687 60.0553L459.182 59.8697L459.306 58.6319L460.357 57.6417L460.481 56.4658L461.409 55.9088L462.646 57.1466L464.316 58.4462L465.058 58.7557V57.7036L464.192 56.7752L463.945 55.0423L465.058 54.4853H466.233L467.903 54.114L469.326 54.7948L470.687 54.114L471.676 53L472.109 53.8664L473.037 54.4853L473.965 54.5472V53.6189L474.831 54.6091L475.573 55.2899L476.068 54.5472L477.305 55.1042L478.603 54.9804L479.964 54.671L482.191 55.1042L483.242 56.2801L484.789 57.456L486.211 57.3941L487.015 57.5179L486.706 58.9413V59.684L487.386 59.7459L488.561 58.6319L490.479 58.4462L491.592 58.5081L493.324 59.2508L495.056 60.3648L496.478 61.2312L497.53 61.7263L498.396 62.4071V63.7068L497.592 64.8827L497.097 65.9348L495.612 66.6774L494.375 67.482L495.056 67.7914L494.499 68.3484L492.149 68.2866L488.994 68.1009L486.891 67.5439L484.356 66.9869L481.201 66.925L479.717 67.6677L477.614 69.0292L476.253 69.8957L474.645 69.7719L472.542 68.2866L470.439 67.9152L466.542 67.8533L466.357 68.4722L467.408 68.596L469.078 68.7817L470.748 69.0911L472.109 69.6481L473.037 70.7002L471.243 72.1237L469.635 72.495L467.408 73.9803L465.677 74.1041L463.264 74.4136L462.955 76.1464L462.646 78.3126L462.398 80.4168H462.955L463.697 78.8077L464.192 75.837L465.305 75.1562L467.347 75.5276H469.264L469.882 73.8566L471.058 73.2377L473.47 73.4233L474.088 72.9901L476.191 72.7426L477.49 71.4429L479.593 71.1953L481.882 68.9673L484.85 68.596L487.015 69.4006L488.438 70.1432L489.984 70.2051L491.716 70.5146L493.881 70.7002L495.612 69.6481L498.272 69.4624L500.004 69.2768L500.746 68.2866L501.674 68.596L501.241 69.8957L501.426 71.4429L502.169 72.7426L500.87 74.8468L500.066 76.2702V77.1986L499.385 78.1888L500.004 78.3744L501.179 77.3842L502.169 75.3419L502.911 75.5276L504.828 75.2181L505.199 75.8989L504.705 76.7653L505.199 77.2604L505.756 77.9412L506.251 76.8272L507.117 76.8891L508.106 77.7556L509.343 78.6839L509.9 78.9933L510.209 78.4363L511.137 79.3028L512.683 80.9738L513.859 82.2734L515.157 83.0161L515.343 84.5014L515.096 85.3679L513.797 85.8011L513.611 86.7294L512.003 87.8434L511.57 88.8956L511.323 90.2571L509.096 92.0519H506.56L502.973 93.4134L497.035 93.4753L493.386 94.0942L489.304 94.7131L486.087 95.7033L482.809 96.3841L482.253 96.5079L481.077 98.117L478.851 99.1072L475.758 101.211L473.284 102.759L471.862 104.182L472.171 105.667L472.109 107.772L473.779 107.834L474.583 106.41L475.882 104.553L478.109 103.625L480.335 103.254L482.438 101.707L483.057 102.016L484.541 102.078L485.531 101.211L487.324 100.159L489.799 99.1691L493.448 99.0453L496.355 99.2929L498.767 99.9737L500.375 99.9118L500.313 100.964V102.387L500.87 103.316L502.849 103.13L504.828 102.821L505.323 102.202L505.076 100.84L505.509 99.5404L506.622 98.8597L507.241 98.674L507.179 100.593L507.364 102.202L507.426 103.254L506.746 104.43L505.323 105.544L504.086 106.72L502.663 107.462L500.87 108.886L500.128 109.505L499.942 111.299L500.499 111.794L501.612 112.166L502.54 111.176L504.024 109.752L505.138 109.566L505.88 108.638L507.302 108.081L508.045 107.153L509.22 106.224L510.209 105.606L511.632 105.791L512.25 105.358L511.941 103.563L512.127 101.583V100.097L512.003 99.2929L512.683 98.3646L514.601 97.1887L516.704 96.5079L518.807 96.2603L519.487 97.003L519.92 99.1072V101.707V106.348L519.363 109.009L518.93 111.733L518.312 113.527L517.075 115.384L515.776 117.364L515.343 119.097L514.168 121.14L512.931 123.058L512.189 125.039L512.065 126.648L511.446 127.886L510.457 129.371L509.591 129.68L510.148 130.361L510.828 130.98L511.446 129.804L513.116 128.257L513.24 127.019L513.859 125.967V124.667L514.848 124.234L516.394 122.934L516.642 121.82L517.57 120.768L518.25 119.531L518.93 118.293L520.229 117.179L521.528 115.755V113.775L522.456 112.537L523.569 111.052L524.311 109.938L525.672 109.257L526.043 109.443V110.804L525.548 112.599L525.363 113.713L526.538 113.837L526.971 112.661L528.579 111.052L530.311 111.237L531.177 112.475L532.105 113.032L533.156 113.775L534.208 113.156L533.775 111.299L534.579 111.114V109.814L534.269 109.009L534.579 107.524L536.001 107.338V106.41L536.31 104.492L537.053 104.801L537.238 103.873L538.29 104.306L538.785 102.697L539.65 102.944L541.073 103.501L542.99 103.625L544.537 103.13L545.65 103.625L547.073 104.492L548.371 105.729L549.918 106.72L551.526 107.648L552.33 109.009L552.948 110.557L554 111.485L553.381 113.032L551.155 115.384L549.856 116.993L549.794 117.798L548.31 118.355L548.371 120.026L546.887 121.387L546.269 121.759L543.794 121.573L543.176 122.192L543.114 122.934L543.547 123.491L544.104 122.687H545.403L546.454 122.934L545.403 123.987L544.722 125.286L544.042 126.338L542.867 127.576L542.001 128.071L540.269 128.319L539.774 129.433L539.65 130.299L537.609 130.361L536.62 130.052L534.702 129.618L534.022 129L533.589 127.514L532.971 128.009L532.847 129.123V129.804L531.548 130.175L530.744 131.228L530.064 131.599L528.703 131.475L527.899 130.918L526.167 129.618L524.93 129.866L523.322 131.537H521.466L520.91 131.908L522.518 132.589L522.394 133.456L523.136 133.517L525.796 130.732L527.28 131.785L528.084 131.723L528.765 132.589L531.115 133.146H532.971L534.208 132.218L535.135 132.28L535.506 133.208L536.991 133.765L538.537 134.384V135.56L536.496 136.798L536.249 138.097L535.506 139.273L534.084 139.706L531.919 139.335L530.558 140.016L528.394 139.149L526.167 137.788L525.363 138.345L524.806 139.706L523.198 141.006V142.368L523.074 144.41L522.023 146.514L523.136 147.133L523.507 148.371L524.126 147.814L523.878 146.452L524.559 145.276L524.806 144.162L525.672 143.605L527.342 142.429L528.208 142.553L530.064 142.12L532.661 142.058L533.589 143.358L532.661 145.524L531.795 147.628L530.868 149.175L529.754 149.547L528.332 149.052L526.971 148.742L526.291 149.67L525.672 150.908V153.446L525.177 154.869L525.672 155.859L525.177 158.273L524.93 159.635L525.61 159.573L525.981 157.902L527.218 158.087L526.724 159.016L526.6 160.501L525.92 160.377L525.239 160.996L524.064 161.553L524.002 162.915L524.435 164.029V165.514L523.878 165.947L523.198 165.823L522.518 165.328L521.837 165.514L521.219 166.442L520.167 166.69L519.858 167.433L520.724 169.104L519.425 169.413L519.734 170.094L520.724 170.156L520.538 171.641L519.92 173.312L519.054 175.045L518.992 176.778L518.745 178.882L518.188 180.615L517.817 182.472L517.322 184.39L516.704 186.123L517.26 186.618L518.374 186.742L518.559 187.794L519.301 187.485L519.178 186.247L518.93 184.39L519.673 183.4L520.415 181.358L521.033 181.172L521.59 181.667L521.775 182.843L522.58 183.338L523.445 184.143L524.683 184.452L526.229 185.009L526.785 186.309L527.095 187.051L526.167 187.794H525.425L524.497 186.618L523.693 185.504L522.394 185.628L520.91 186.185L520.724 186.866L521.59 187.608L522.208 188.042L521.404 189.465L522.951 190.146L522.889 191.136L524.25 191.384L525.363 192.188L526.414 193.302H527.157V191.693L527.961 191.879L529.012 192.559L529.569 194.354V196.397V198.872L529.012 199.862L527.837 200.172L526.043 199.367L524.435 198.129L523.198 198.253L521.837 197.572H520.538L521.466 198.315L520.724 199.615L519.549 200.172L518.807 200.976L519.487 201.533L517.26 202.152L517.075 200.791L516.333 199.12L515.281 199.615L515.467 200.791L514.23 201.286L514.972 202.462L515.096 203.699H515.59L515.652 202.771H516.518L517.384 203.328L517.508 204.566L516.518 205.247L517.137 205.804H517.508L517.57 207.041L517.446 208.217H518.374H519.673L520.415 206.918L521.775 206.608L522.332 206.918L522.208 207.598L521.033 207.846L521.466 208.589L522.518 208.403L523.569 207.97L524.002 208.836L524.497 209.888L524.126 210.507L523.012 211.25L522.023 211.807L520.662 211.621L520.415 212.054L521.404 212.735H522.58L523.26 212.178L523.878 212.735L524.188 213.664L525.177 214.839L524.992 216.758L525.487 217.686L525.672 218.986L525.61 221.957L524.992 223.504H523.94L523.322 221.462L522.58 220.966L521.404 221.585L520.291 220.905L518.93 219.234L518.188 217.748L516.889 216.696L515.961 216.387L515.9 216.882L516.704 217.748L517.755 218.8L518.064 219.976L519.24 221.152L520.229 222.204L521.219 223.256L520.6 224.061L519.487 224.37L518.745 224.804L517.693 225.546L516.951 225.299L516.704 226.041L517.631 226.66L518.621 226.103L519.611 225.175H520.848L521.281 225.856L521.466 226.66L522.394 225.546L523.322 225.794L523.569 226.66L524.064 227.65L524.497 228.331L523.693 229.321L522.827 229.817L522.394 229.321L521.837 228.146L521.219 228.579L521.157 229.817L520.167 230.312L520.291 230.931L521.404 230.621L522.703 230.559L524.002 230.931L524.435 231.488L525.239 230.559L525.92 230.497L526.105 231.488L526.167 232.292L527.033 232.602L526.971 233.777L526.352 234.644L525.672 235.325L524.992 235.82L523.94 235.572L522.518 234.644L522.703 233.53L521.961 233.159L520.91 232.725L520.229 233.035L520.662 233.53L521.528 234.087L522.147 235.015L522.27 235.82L522.951 236.005L522.827 236.562L521.775 236.872L520.6 237.491L519.487 237.924L518.064 237.553L517.322 236.315L517.013 235.077L516.642 234.644L516.394 235.201L516.147 236.129L515.529 236.81L515.405 238.295L516.271 238.976L516.642 240.4L517.26 241.761L517.755 241.018L517.013 239.409L517.199 238.667L517.941 238.605L518.807 239.409L520.229 240.276L521.404 240.709L522.394 240.461L522.518 241.328L521.961 242.256L521.652 244.051L521.59 245.66L518.374 245.908L517.26 246.465L515.776 248.074L513.24 247.269L511.508 245.598L509.9 244.113L509.591 242.813L511.261 242.566L510.642 241.575L509.343 241.328L508.168 241.947L507.859 244.484L506.56 243.803L505.694 241.885L504.333 240.833L503.962 239.286L503.282 239.595L503.406 240.585L504.086 241.637L505.199 242.689L505.632 243.989L506.746 245.041L505.694 245.784L504.643 245.846L504.333 246.898L503.344 248.074H501.859L501.117 247.084L499.757 247.022L498.705 245.722L497.963 245.227L497.344 245.722L498.025 246.65L498.767 247.393L499.88 248.074L500.994 248.321L500.004 248.878L500.066 249.559L498.829 249.188L497.406 248.94L496.602 249.559L497.035 250.24L498.087 249.992L499.138 250.24H500.375L500.746 249.559L501.303 249.25L502.354 249.126L503.158 249.683L503.962 250.24L505.076 250.797L505.818 251.416L505.694 252.097L504.705 252.592L503.344 252.777L502.663 253.768L501.798 254.077L500.684 253.768L500.066 252.715L499.076 252.839L497.839 253.149L498.025 253.829L499.262 253.644L499.942 253.829L500.251 254.51L500.004 255.191L501.055 254.696L501.241 255.377L501.179 256.119L502.354 255.377L503.344 254.386L504.148 253.582L505.076 253.891L506.003 254.51L506.808 255.686L507.117 256.862L506.375 257.667L504.952 257.914H504.395L504.457 258.595L504.766 258.781L504.89 259.399H505.385L506.065 258.719L507.241 258.533L507.859 258.904L508.663 259.585L509.9 260.328L510.642 260.823L511.137 261.751L511.879 261.999L512.931 262.618L513.797 263.608L514.539 264.412L513.364 266.207L512.869 267.197H513.611L514.477 266.269L514.353 266.95L514.539 267.693V268.497L514.724 269.797L514.786 270.973L515.467 270.663L515.9 269.549L516.518 269.054L517.26 269.364L517.384 270.478L517.013 271.592L517.631 272.21L517.075 273.201L517.384 274.191L517.446 275.367L517.075 275.924L517.137 277.223L517.26 278.337L518.064 279.39L517.817 280.318H517.075L516.271 279.637L515.219 279.947V275.8L514.724 276.171L514.106 277.1L514.23 278.833L514.353 279.761L513.859 280.132H512.25L510.952 279.39L509.776 277.842L509.034 276.048L508.663 273.386L507.55 271.653L507.179 270.292L506.065 270.663H505.57L504.643 269.178L503.901 268.188L502.787 268.002L501.674 267.631L499.942 268.064L498.519 267.012L497.592 264.784L495.86 263.546L494.314 262.803L493.015 261.875L492.644 262.432L493.386 262.989L493.695 263.917L495.303 264.351L496.045 265.465L497.592 266.393L497.468 267.197L496.726 267.136L496.911 267.754L497.654 268.188L499.88 268.868L501.983 269.178L503.777 269.859L504.148 270.973L503.035 272.025L503.901 272.396L502.292 273.263L500.746 274.624L498.458 274.934L497.159 274.5L495.551 272.644L495.118 273.324L496.045 274.005V274.686L494.066 273.881L494.375 274.686L495.551 275.491L495.489 276.728L494.808 278.028L494.004 278.833L492.334 279.513L491.097 279.823V280.565L492.273 280.318L494.252 279.947L494.623 281.061H495.736L496.911 280.504L498.396 280.318L499.818 280.008L500.561 280.07L501.055 280.751L500.746 281.494H499.509L498.458 281.679L497.777 282.298L496.973 283.165L495.551 283.598H494.561H493.695L493.262 283.784L493.695 284.279H494.499H495.303L495.86 284.65L496.85 284.279L497.901 285.021L498.396 284.279V283.35L499.385 282.732L499.757 282.36L500.561 282.793L501.859 282.67L503.035 282.236L503.653 281.494L505.014 280.565L504.828 281.865L505.509 281.679L505.818 281.246L506.869 282.113L507.797 282.855L509.034 283.289L510.828 283.969L512.683 284.155L514.724 283.907L515.961 283.412L515.157 284.774L513.673 285.331L512.622 285.826L513.116 286.631H511.941L512.127 287.745L510.952 288.178L510.519 289.354L509.034 288.673L508.23 288.859L509.096 289.663L508.663 290.901H507.117V292.015L506.684 292.324L505.447 291.829L505.014 292.696L505.632 293.624L505.261 294.305H504.148L503.282 295.109L503.529 295.852L502.416 296.657L501.179 297.399L499.571 298.266L497.839 298.451L496.417 299.38L495.551 298.699L495.303 299.38L495.551 299.627L494.437 299.813L493.819 300.184L491.84 300.989L491.345 301.917L489.675 301.67L489.118 300.741L488.314 301.174L488.129 301.917L487.572 302.412L488.19 303.341H487.51L486.273 301.67L485.84 302.103L486.459 303.155L486.211 303.959H484.603L482.5 303.279L481.82 301.917L481.139 300.741L480.273 299.318L479.593 299.38L479.284 300.184L480.088 300.989L480.768 301.917L480.273 302.845L480.892 303.402L481.016 305.383L480.459 305.692H479.222L478.851 306.93L476.995 307.178L476.439 308.972L475.635 311.139L475.573 311.881L476.129 312.191L475.944 312.933L474.15 313.985L474.769 315.347L473.717 316.523L472.542 316.77L472.666 318.256L471.181 319.803L470.563 318.813L469.388 319.803L467.532 318.689V319.246L468.645 320.546L468.151 321.226L467.594 321.783L467.161 322.897H466.295L465.305 322.464V323.331L465.182 323.95H464.501L463.821 325.992L463.574 324.321L462.955 324.135L462.708 324.94L462.213 325.621L460.79 325.992L460.914 324.011L461.471 323.021L460.976 322.402L461.904 321.35L463.326 320.112L462.089 319.555L461.038 318.937L460.11 319.06L460.048 320.112L460.543 320.174L460.296 321.474V322.897L459.491 322.959L458.811 322.464L458.687 323.269L459.368 323.888L459.801 324.692L459.306 325.682L458.007 325.992L456.77 326.796L456.337 325.435L455.347 325.868L454.482 325.373L452.688 326.796L453.677 327.725L453.121 329.829L451.884 330.819L450.832 330.015L449.657 330.819L449.781 332.552L450.647 333.295L451.018 332.366L451.76 333.109L452.131 334.78L451.513 335.894L450.585 336.513L450.276 337.256L449.657 337.07L449.533 336.265L448.173 336.513L447.802 337.256L448.606 337.689L449.472 338.184H450.709L451.018 339.979L451.203 341.155L450.276 341.712L450.647 342.578L450.276 343.506H449.595L449.348 344.002L448.358 343.259L448.296 344.002L449.41 345.116L448.606 345.734L448.173 347.034L446.812 348.396L445.946 349.138H445.637L444.895 348.21L444.338 348.458L444.524 349.138H443.658L442.915 348.953L443.039 349.695L443.719 350.067H444.771L445.204 350.933L444.956 351.861L445.328 353.037L444.647 354.275L445.946 355.018L445.266 356.441H444.338L444.029 356.751L444.771 357.246L444.585 357.988L443.101 358.174L444.338 358.979L444.152 360.712L442.606 360.464L441.617 361.516L443.41 361.826L443.225 362.94L442.668 363.497L443.286 363.93L443.039 365.229L442.049 365.848L440.936 365.601L441.369 366.467L441.926 366.962L442.111 368.262V369.252H440.379L439.575 369.747L440.379 370.119L440.565 370.738H438.71L439.081 370.181L438.215 369.871L439.081 367.334L438.895 366.962L437.967 367.581L437.534 368.51L437.101 369.252L436.05 368.757L435.988 368.014L435.184 367.891L435.803 366.839L436.483 365.91V364.487L435.741 365.725L435.06 366.096L435.308 364.549L434.627 364.672L433.452 365.415L431.535 363.992L432.277 362.94L432.215 362.197L433.143 361.454L433.081 360.278V359.598L431.906 360.093V360.897L432.153 361.392L431.411 361.578L430.483 362.011L428.813 363.373L428.071 362.94L426.463 363.187L424.793 363.868L424.422 363.373L425.473 362.444L424.855 361.516L424.607 360.093L422.69 359.35L421.02 358.298L421.762 357.741L421.453 356.194L422.133 354.832L421.02 354.275L419.783 353.594L417.742 351.738L417.124 350.562V348.767L418.361 347.529L417.928 347.22L416.814 347.962L416.072 346.848H415.577L414.526 345.301V343.506L413.598 342.454L412.856 339.36L412.732 337.689L413.536 337.936L414.711 337.441L414.835 336.575L415.639 335.894L416.752 335.708L415.33 334.842L416.814 333.79L417.804 335.461L418.422 335.213L417.928 334.285L418.051 332.862L417.247 332.738L416.629 333.233L415.515 332.862L414.278 333.976L413.907 333.295L413.103 334.099L412.608 335.213L412.361 336.327L411.866 337.318L410.877 337.132L410.691 335.337L411.124 333.79L411.371 332.428L410.691 332.119V330.386L409.64 328.467L410.815 326.796L410.505 326.673L409.578 327.23L408.279 326.673L408.65 325.249L408.155 324.94L407.042 325.992L406.671 324.568L407.475 323.764L406.856 323.021L406.918 321.845L407.537 321.041L406.794 321.226L406.114 321.66L405.495 319.927L405.619 318.38L406.733 318.008L408.155 317.823L407.413 317.327L405.99 317.389L405.928 316.956L407.227 316.461L409.516 315.347L409.763 314.481L408.959 314.109L406.733 315.099L406.176 314.357L404.939 314.109L404.258 312.81L407.475 311.51L406.856 310.953L405.743 311.077L404.877 311.634L404.568 311.139L404.753 309.653L405.557 308.725L405.434 307.425L405.619 306.435L406.733 305.445L406.856 304.764L407.598 303.959L406.361 303.341L406.671 302.784L408.526 302.412L409.516 302.165L409.021 301.608L407.66 301.36L406.671 301.731L405.867 301.236L406.856 300.803L408.402 300.246L409.021 299.937L409.516 298.946L409.021 298.761L407.598 299.07L407.475 298.637L408.402 297.585L409.949 297.709L411.248 298.761L411.99 299.442L413.598 299.38L414.711 298.946L414.897 297.585L415.144 296.842L414.588 296.78L413.907 297.214L413.845 295.852L414.278 294.181H415.453L416.258 295.109L417.062 295.171V294.305L417.247 293.933L418.793 293.624L418.299 292.51L416.876 292.696L416.814 292.139L417.062 291.334L416.319 291.644L415.763 292.696L414.897 292.943L414.526 292.324L414.959 291.148L415.206 289.539L415.886 287.497L417.618 287.311L416.938 286.012L416.196 284.898L413.536 284.712L411.866 284.217L410.134 284.279L409.207 283.041L408.093 281.989L406.609 281.061H404.815L403.764 280.194L403.269 278.833L402.156 277.719L402.527 277.038L403.702 276.109L404.815 276.728L407.227 276.976L409.33 277.657L410.505 278.771L411.742 279.947L413.289 280.504L414.959 281.122L416.196 280.999L416.381 279.947L415.886 279.204L415.515 280.132L414.835 280.38L413.969 279.637L414.093 279.204L414.897 279.451L415.082 278.461L414.711 277.657H413.474L413.289 276.976L413.722 276.605L415.021 276.852L415.577 277.223L415.33 276.357L414.526 275.491L412.979 274.81L411.99 274.315L411.804 273.82L412.608 274.067L413.351 274.129L413.041 273.448L412.114 273.077L411.248 272.829L410.877 272.644L411.309 272.025L412.175 271.777L412.918 271.963L412.979 270.849L412.423 270.478L411.309 270.849L410.32 271.901L409.887 270.911L410.753 269.859L412.237 269.735L413.103 268.992L412.732 268.559L411.681 268.745L410.629 269.178L409.949 269.735H409.021L408.279 269.487L408.464 268.745L409.516 268.559L410.815 268.002L411.866 267.754L412.114 266.64L411.495 266.455L411.124 267.074H409.763L408.897 266.95L408.093 266.517L407.598 267.012L408.217 267.445L407.351 267.816L406.485 268.311L405.928 267.259L406.238 266.579L407.66 265.836L407.97 264.784L408.588 263.422L408.155 263.175L407.598 263.608L407.537 264.536L407.289 265.155L406.361 265.465L406.176 264.165L406.361 262.989L405.928 262.061L405.063 261.318L404.815 259.771L404.32 259.214L403.887 259.956L404.382 260.699L404.506 261.875L405.063 262.68L405.619 263.36L405.557 264.598L405.805 265.341L405.186 265.96L404.258 266.083L404.073 267.012V268.311L403.764 269.673L402.094 270.416L400.733 269.673L398.506 269.425L397.764 267.012L399.125 265.093L400.053 264.412L401.537 263.732L401.29 262.989L399.867 263.67L398.939 263.237L399.249 261.937L400.362 260.885L400.919 259.833L400.609 258.842L400.238 259.338L399.805 260.328L398.816 260.885L398.197 260.39L398.939 259.647L399.496 259.214L399.249 258.471L398.321 258.162L398.692 257.419L399.867 257.481L400.671 257.543L401.351 257.171L401.166 255.624L400.609 254.448L401.846 253.768L402.156 253.149L401.599 251.787L400.857 250.921L399.805 250.983L398.692 251.787L398.568 250.921V249.807L399.125 249.188L400.238 249.312L400.053 248.507L399.063 248.012L399.558 247.269L400.053 246.527L399.249 245.97L397.579 245.784L397.702 245.165H398.692V244.608L397.95 243.927L397.207 243.618V242.999L397.702 241.761L397.331 241.266L397.95 240.709L397.455 239.781L396.651 239.595V238.79L395.785 238.048L396.28 236.872L396.527 235.944L394.919 234.644L396.836 234.273L396.218 233.468L395.105 233.53L394.548 233.406L394.3 232.911H393.063L392.321 232.973L391.826 232.416L393.063 231.983H394.61L395.043 232.168L395.414 232.849L396.032 232.973L396.28 232.416L395.723 231.426L395.105 230.435L393.249 230.126L393.373 229.012L394.115 228.022L393.187 227.217L391.455 225.856L389.909 224.742L390.095 223.999L390.28 223.442L389.167 223.009L388.858 222.08L388.301 220.409L388.919 219.852L389.476 218.8L389.043 217.81L388.858 216.077L388.301 215.396L386.631 215.83L386.198 214.654L385.456 213.54L384.342 214.035L383.848 213.168L382.672 211.621L380.693 210.631L379.085 209.022L377.168 208.651L375.127 207.908L373.271 207.846L372.22 206.67L370.797 206.361L369.993 208.155L369.374 209.331L368.57 209.022L368.261 206.732L367.333 207.103L366.529 208.032L366.406 209.269L365.169 208.96L364.365 210.383L364.117 211.25L363.189 211.374L362.818 210.074L363.128 208.774L362.88 207.722L361.643 207.598L360.715 208.651L360.468 210.136L359.54 209.084L358.922 207.97L357.994 208.032L357.314 208.96L357.87 210.26L358.798 211.002L359.355 211.559L358.179 211.497L356.386 211.312L354.407 210.631L353.169 209.826L351.685 208.094L350.324 206.856L349.397 206.546L349.458 205.309L351.5 204.875L352.242 203.452L354.283 203.266L354.963 203.142L355.272 201.781L354.716 200.729L353.664 201.224L353.169 201.719L350.819 201.471L349.211 201.1L347.727 199.677L348.16 198.439L348.098 197.758L347.665 197.696L346.984 198.686L346.366 199.615L345.995 199.8L344.82 198.625L345.253 197.572L344.82 197.387L343.83 197.015L343.768 194.849L345.191 194.292L345.995 193.364L348.221 193.302L349.458 193.178L351.623 193.735L353.602 194.169L354.159 193.55L353.293 192.993L352.118 192.807L351.314 192.25L352.18 191.693L353.602 190.888L355.149 190.765L357.004 190.517L359.045 191.198L359.911 192.188L360.53 192.559L360.901 192.002L360.406 191.26L359.726 190.208L360.653 189.96L361.519 190.084L361.767 189.713L361.581 188.351L361.21 187.423L360.282 185.752L359.478 185.38L357.746 185.69L357.561 187.237L356.386 187.67L355.396 188.351L353.664 188.413L353.417 187.237L352.798 186.247L352.056 186.061L351.747 186.432L352.427 186.866V187.918L352.056 188.599L350.943 188.97L350.324 189.217L349.397 188.599L348.283 187.98L347.17 187.67L347.85 186.742L348.902 186.247L349.768 185.504L349.953 184.576L349.644 184.39L349.211 184.947L348.221 185.566L347.108 185.999L346.428 185.875L345.5 185.257L346.428 184.576L347.355 183.586L347.788 183.029L347.727 182.41L346.737 182.533L346.18 183.029L345.376 183.771L344.325 184.143L343.335 184.204L342.964 183.647L343.768 182.843L343.335 182.595L342.222 182.533L342.036 181.791H341.48L341.047 182.286L340.304 181.915L339.562 180.739L339.748 179.563L339.191 179.315L338.449 179.81L337.954 179.687L337.769 178.449L337.026 176.654L337.769 175.169L337.954 173.374L338.449 171.393Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M401.599 282.793L402.465 281.556L404.506 281.927L406.547 283.041L407.969 285.021L408.65 286.135L410.134 286.692L411.124 287.188V288.859L410.443 289.911L408.402 291.025L405.619 292.201L403.887 291.582L403.454 290.715L406.114 290.653L405.805 289.849L404.444 289.663L404.135 289.044L403.64 289.292L401.599 288.797L400.671 287.93L401.104 287.435L402.093 287.373L401.661 286.878L401.042 286.507L401.537 285.826L403.021 285.269L401.97 284.65L401.475 283.846L401.599 282.793Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M495.551 279.142V280.194L497.468 279.637L499.2 279.142H500.808L502.045 279.637L502.973 278.647L503.653 277.78H504.952L504.705 275.491L503.591 274.624L503.344 273.696L501.241 275.057L500.251 275.8H498.705L497.035 277.533L495.922 278.337L495.551 279.142Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M507.982 253.52L508.292 256.181L509.405 256.8L509.652 257.481L510.951 258.224L512.25 258.842L514.044 260.947L514.662 260.699L514.91 261.318L515.899 261.07L516.085 260.018L515.219 260.08L514.724 259.214L514.044 258.285L515.033 257.914L515.899 258.038L516.332 258.471V257.419L515.59 256.676L513.858 255.624L512.498 253.52L511.199 253.149H509.776L507.982 253.52Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M507.982 252.592L507.797 251.663H510.147L510.889 251.354L512.188 251.044L513.425 251.292L515.157 251.663L516.827 252.592L515.961 253.644L517.013 254.696L516.147 255.129L514.353 254.82L513.302 253.396L512.869 252.777L512.188 252.901L507.982 252.592Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M503.777 249.126L505.076 247.331L505.509 246.465H507.798L509.653 247.022L511.199 247.826V248.507L509.653 248.383L507.488 247.331L506.437 247.826L507.117 248.259L508.664 248.569L510.519 249.126L511.694 249.559L512.931 249.312L513.179 249.869L511.138 250.426L507.488 251.044L505.942 249.992L504.891 250.116L503.777 249.312V249.126Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M527.898 225.484L527.713 221.585L529.012 220.966L529.754 221.709L530.434 220.966L531.053 221.462L530.125 222.699L531.053 224.185L531.3 224.804L531.981 224.742L532.166 223.875L532.97 223.999V225.794L532.29 226.165L531.733 225.484L530.001 225.608L528.888 226.165L527.898 225.484Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M526.848 201.595L527.219 202.4L526.848 203.885V205.123L527.714 206.856L528.085 210.074L528.332 211.869L529.198 210.322L528.208 206.732L527.714 203.885L528.023 202.585L527.281 201.595H526.848Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M530.002 186.309L531.115 186.68L531.857 184.638V183.4L531.363 182.719L530.93 183.586L530.62 184.7L530.002 186.309Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M525.178 167.68L526.167 168.547L526.724 168.113V166.752L526.415 166.009H527.033V164.648L525.796 165.885L525.178 166.876V167.68Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M530.93 162.296L531.363 163.286L532.105 162.296H532.847V160.006L532.105 159.573L531.857 160.81L530.93 162.296Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M525.61 139.644L525.177 141.315L524.93 142.615L526.662 141.625L528.27 140.944L526.6 139.397L525.61 139.644Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M531.857 108.638L533.032 108.205L531.177 104.801L529.878 105.358L531.857 108.638Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M526.91 102.387L528.27 103.068L527.899 99.7261L526.91 96.9411L526.353 95.4558L525.549 96.0747L525.178 97.8076L525.92 100.345L526.91 102.387Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M523.879 107.153L524.683 106.72L525.178 107.648L526.477 107.895L525.549 108.638L524.312 109.009V107.524L523.879 107.153Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M455.039 59.127L454.729 61.7882L456.214 62.5928H456.894L456.461 61.355L455.781 60.8599V59.127H455.039Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M451.328 60.4267L450.523 62.5928L452.132 63.5211H453.245L453.678 64.8827L454.729 66.2442L456.09 67.1107L457.389 67.8533L457.76 67.0488L457.265 66.1204L455.472 65.3778L454.729 63.8306L454.358 62.5928L452.565 62.1596L452.07 61.1693L451.328 60.4267Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M448.173 66.4299H449.657L450.771 67.1107H453.739L454.358 68.596L453.616 69.0292L452.874 68.4722L452.069 69.2768L450.523 68.3484L449.162 68.1628L448.73 67.2344L448.173 66.4299Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M449.967 69.7719L448.606 68.7198L447.06 67.8533L445.514 68.1009L446.813 70.6383L448.544 72.4331L449.534 72.1856L449.967 71.1334V69.7719Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M442.729 67.8533H444.585L445.513 69.6481L446.502 71.2572L447.306 71.7523L448.172 72.8044H445.946L444.523 70.9478L443.472 69.2768L442.729 67.8533Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M430.483 73.2377V74.4136L431.535 75.1562L432.834 75.4657V74.723L431.659 74.0422L430.483 73.2377Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M423.865 74.5992V76.7653L425.412 77.6937L426.71 76.4559L425.288 74.9087L423.865 74.5992Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M419.474 76.1464H420.649L422.381 77.6937L422.133 79.0552L419.474 78.5601V76.1464Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M442.483 65.1921L442.05 65.6872L442.297 66.4299H444.153L443.843 65.811L442.483 65.1921Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M458.378 65.811V67.1107L460.048 66.7393L459.553 66.0586L458.378 65.811Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M401.476 94.0323L402.713 92.4232L403.702 92.6708L404.259 94.0323L405.805 95.2082L406.857 96.1984L407.599 96.446L408.403 98.0551L409.949 99.2929L409.702 100.159L407.97 100.345L405.991 98.5502L403.888 98.9216L402.28 97.9313L401.476 96.0747V94.0323Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M344.016 189.836L344.325 189.094L346.799 189.836H347.665V190.641H345.253L344.016 190.27V189.836Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M342.778 190.641L341.232 190.084L340.057 189.341L339.067 190.331L340.243 191.074L340.49 191.755L342.222 191.384L342.778 190.641Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M319.027 544.274V545.697L319.398 547.616L320.759 548.482L321.13 547.987L320.079 546.873V545.079L319.584 544.274H319.027Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M320.017 609.691L322.43 606.72L321.873 604.925L318.966 602.635L315.811 601.769H313.709L312.039 602.883L308.884 604.121L305.915 603.997L304.493 603.254L304.06 602.45L301.4 599.788L299.606 597.003L298.741 594.713L299.483 592.176L299.978 588.71V586.358L301.215 584.564L300.411 582.893L301.029 581.469L300.534 581.222H298.741L297.751 579.922L297.504 578.932L295.772 578.56L292.494 578.932L289.092 579.179L284.7 579.117L282.041 579.365L280.494 578.56V577.942L282.35 576.828L283.463 574.661L283.03 572.99L283.896 569.896L283.463 568.658L284.02 567.977L284.7 569.277L285.319 569.153L285.937 566.925L285.257 564.883L286.432 562.717L286.741 561.479L288.597 560.056L288.288 558.137L287.484 557.704L286.432 558.137L283.03 557.951L279.443 558.508L278.825 559.189L277.031 559.437L276.041 560.551V563.46L275.113 564.945V565.935L272.639 567.977V569.277L270.784 569.339L270.104 568.534L268.062 568.844L266.887 569.587L264.104 569.834L261.321 570.329L259.96 568.658L256.496 567.977L255.816 566.43L254.826 565.007V563.955L252.785 562.036L251.61 560.179L250.93 557.951L251.424 557.704L251.301 557.023H250.559L249.755 555.847L249.383 554.486V553.186L249.816 552.381L249.755 548.482L250.064 546.997L249.755 543.346L251.734 542.108L252.105 540.87L250.992 539.013L250.744 536.043L250.064 535.3L251.301 534.805L251.734 532.886L252.105 531.711H252.971L254.455 530.473L254.022 529.359H254.455L255.754 530.04L258.043 528.864L259.527 527.193L259.589 525.336H260.95L261.011 526.141L262.434 525.955L264.166 525.336H266.764L268.681 526.264L270.66 525.15L273.196 526.821L276.103 527.255L276.412 527.873L276.845 527.193L276.907 526.264L278.206 526.883L278.268 526.017L279.443 525.15L279.134 524.531L278.206 524.717L278.144 524.16L279.505 522.922L282.907 522.737L284.577 521.685L285.443 523.232L286.185 523.108L287.236 522.613L288.04 522.242L291.009 522.365L294.102 525.707L295.03 525.584L297.132 523.913L298.679 524.222L300.039 525.088L301.895 527.688L303.132 528.121L303.008 533.567L303.998 533.32V535.919L305.235 537.528L305.977 539.509L306.348 539.942L307.833 541.241L308.389 542.912L308.822 543.593L310.245 543.531L310.987 542.541L311.544 541.798L311.915 540.499L312.162 538.828L311.853 536.167L311.049 534.186L310.245 532.515L310.121 529.978L308.266 526.821L307.523 524.346L307.214 522.489L306.658 521.251L307.214 520.261L307.771 518.776L308.142 517.724L309.379 516.238L311.111 514.567L312.966 513.02L314.265 511.844L315.131 510.73L316.492 508.75L318.1 508.502L319.275 507.821L321.625 505.222L322.677 504.975L324.532 504.479L324.347 503.18L324.223 502.437L324.718 501.942H326.264L326.759 501.076L327.13 499.962L326.017 499.59H324.656V498.476L325.213 498.229H326.697L326.388 495.32L325.213 494.515L325.522 493.711L325.337 492.906L324.285 491.978L325.151 491.483L325.089 490.616L323.172 489.564L322.924 488.822L323.852 488.45L325.027 489.688V488.822L324.718 487.893V485.108L325.584 484.984L325.708 487.893L326.883 489.007V490.431L327.625 491.235L326.574 493.278H326.945L328.367 491.297L329.048 489.502L329.666 488.388V487.089L328.738 485.727L327.872 483.994L328.305 483.066L328.676 484.056L330.037 484.489L330.285 485.418L330.841 486.037L331.707 484.427L332.449 483.066L332.944 481.89L333.315 480.033V479.476L332.697 478.857L333.13 478.053L333.872 478.548L335.48 478.424L338.016 477.682L337.769 476.939H337.459L336.16 477.31L334.49 477.805L334.181 477.31L335.418 476.32L337.15 475.577L338.573 474.958H340.366H342.098L342.964 474.278L344.51 474.03L345.005 473.349L345.562 474.154L346.861 473.968L347.417 473.349L346.861 473.04L345.747 473.287L345.253 472.73L345.191 471.74L344.82 469.884V468.151L345.005 466.727L346.057 465.056L347.294 462.828L347.974 463.447L349.335 463.2L349.52 462.457L350.139 462.581L351.252 460.105L351.932 460.353L352.551 460.848L353.788 460.724L354.901 460.105L356.695 458.682H357.19L358.056 458.125V456.701L360.097 456.392L361.952 455.959L363.622 455.278L365.416 454.411L367.272 453.112L367.457 453.731L365.973 455.463L366.467 455.649L368.57 455.402L370.426 455.649L369.622 456.392L367.828 456.577L365.911 457.134L364.426 457.815L362.942 459.053L362.076 460.291L361.272 461.59L361.334 463.014L362.818 464.499L363.56 464.437L365.663 462.704L367.024 461.59L367.333 460.476L368.323 459.548L369.374 459.115L370.735 459.177L372.281 458.744L373.89 457.939L376.24 457.258L377.539 456.516H378.961V455.835L377.91 455.525L378.281 454.783L380.137 454.411L381.868 453.854L382.92 452.493V451.503L381.559 451.131L381.126 450.265L381.188 449.027L381.559 448.346L380.631 447.604L379.765 448.718L378.961 450.636L377.724 452.121L377.601 454.535L375.993 454.349L375.25 453.545L374.446 454.473L372.838 454.226L371.044 453.731L369.807 453.297L368.818 453.05L368.57 451.936L367.086 451.626L365.973 449.832L365.169 448.408L365.354 447.48L364.55 446.428L365.478 445.128L366.096 443.643L364.241 443.519L363.251 444.385L362.385 443.209L360.777 442.405L360.592 441.538L361.643 440.981L363.746 441.724L365.911 440.548L367.395 439.31L367.89 438.011L366.715 436.587L364.983 435.845L360.53 435.968L357.623 437.33L354.901 438.63L353.169 439.867L351.005 441.415L349.644 442.529L347.974 445.128L346.49 446.861L344.572 448.037L344.016 447.418L345.562 445.685L346.923 444.138L348.098 442.405L348.964 440.486L350.634 438.32L351.005 437.392L352.242 437.206L353.231 435.845L353.912 435.535L354.283 434.916L355.52 435.226L357.066 434.421L357.994 431.76L358.365 430.955L360.221 429.718H363.066L364.117 429.346H367.333L368.137 429.841L371.539 429.78L372.529 429.346L374.694 429.78L376.982 430.708L378.095 430.275L379.023 429.903L382.672 429.594L385.765 426.995L387.682 424.21L389.043 423.591L389.476 424.148L390.899 423.157L393.002 422.848L393.373 423.405L394.61 421.858L396.651 420.806L397.64 419.011L397.95 417.773L397.579 416.907L396.898 416.35V415.483L397.269 414.617L397.084 412.389L396.651 411.646L395.476 411.46L394.733 410.532H393.435L392.754 411.832L391.826 411.089L391.95 410.223L392.692 409.542L392.259 408.552L391.703 407.314L390.156 407.128L389.538 406.571L390.651 405.829L391.826 405.333L391.579 404.776L390.342 404.281L390.095 403.415H389.6L388.486 404.467L387.373 403.786L386.445 402.734L385.579 401.868L384.837 402.115L383.662 401.868L383.105 400.877H381.621L381.126 399.392L381.621 397.969H380.57L378.714 397.04L377.724 396.607V395.246H375.745L375.683 392.646L376.426 392.894L376.982 392.832L378.034 391.532L377.106 390.233L377.601 389.861L377.539 389.242H376.611L375.374 388.314L375.745 387.571L375.498 386.767H374.199L374.137 386.395L375.869 385.467L375.621 383.92L374.261 383.301L373.766 382.311L372.034 382.744L372.096 382.001L373.333 380.825L373.147 379.959H372.467L370.117 381.011L370.611 380.145L372.467 378.659L372.281 377.545L371.477 376.308H369.807V375.317L370.302 374.76L369.993 374.203L369.374 373.956L369.622 372.656L368.014 371.604L367.89 369.809L366.962 369.314L366.9 367.148L366.096 366.839L365.354 369.438L364.055 370.923V372.161L364.426 372.904L364.055 373.461L363.932 374.637L363.066 374.575L362.942 375.317L363.313 375.998L362.014 377.05L361.891 378.412L360.715 377.483L359.849 379.464L356.015 382.187L355.458 381.011L355.087 379.588L354.035 380.268L353.726 378.783L352.489 377.174H350.757L349.706 377.979L349.087 378.04L348.16 378.721L347.417 377.483L348.469 376.122L349.273 377.112L350.757 375.503L350.324 374.946L348.469 373.956L349.211 371.356L348.469 369.747L347.108 369.252L348.902 368.448L348.84 367.767L348.469 366.591L348.84 364.363L349.706 363.187L349.211 362.135L347.85 363.62L347.294 363.125L347.232 362.135H345.747L343.459 361.516L341.418 360.031L341.542 357.617H340.428L340.181 356.627L339.253 355.699L337.769 354.337L337.274 353.532L336.346 352.357L334.552 351.428L333.81 351.676L331.336 353.347L328.553 352.914L325.584 351.985L323.667 351.428L322.058 350.624H321.069L319.213 352.728L319.275 354.646L319.832 356.565L320.698 358.174L320.388 359.102L320.698 360.34L320.388 361.64L319.213 363.682L320.76 363.806L320.636 365.291L321.254 367.643L321.873 369.438V370.985L320.45 371.79L320.388 374.451L317.791 377.36L317.853 378.659L318.842 379.773L320.945 381.011L322.43 382.558L323.667 384.848L324.594 388.066L324.842 392.708L324.471 394.75L323.357 397.164L321.625 399.702L318.842 401.744L315.935 403.415L314.018 404.529L314.574 406.324L316.059 408.118L316.244 411.522L316.43 414.617L316.925 416.659L318.038 417.773L317.481 419.877L316.43 421.672L317.11 423.219L316.368 424.333L315.379 423.034L314.265 422.353L313.276 425.014L311.606 424.271L310.492 422.786L310.183 421.672L308.637 420.125L306.781 418.516L306.472 417.402L304.369 414.802V413.131L304.864 411.956V409.232L303.936 407.19L303.998 405.89L304.431 404.281L304.369 402.053L303.132 401.496L299.05 400.939L294.782 401.249L292.865 399.392L290.947 398.216L289.339 397.845L286.803 396.174L285.443 396.05L285.071 394.689L282.659 392.461L280.68 390.975L277.773 390.294L275.67 388.809L273.382 388.314L270.969 389.242L268.31 390.047L267.815 389.119L268.743 387.509L268.124 385.034L267.135 382.311L266.516 379.897L265.96 378.04L261.444 378.102L260.888 376.926L259.465 375.936L259.836 374.76L260.764 373.461L260.146 370.738L260.578 367.581L261.073 365.044L262.681 361.887L263.609 358.545L265.217 356.874L264.475 356.132L265.094 354.646L267.135 353.099L266.825 352.109L268.124 352.357L268.186 350.624L269.238 350.252L269.98 350.562L270.413 349.943L269.794 349.51L268.928 349.262L269.299 348.643L270.413 348.086L271.712 348.334L272.701 348.643L274 347.715L274.619 347.158L274.866 345.796L274.619 344.682L273.382 343.692L271.959 342.888L271.217 342.083L269.98 342.331L268.928 341.217L269.671 340.845L272.145 341.031L273.32 342.083L274.433 342.578L276.227 342.083L277.093 340.845L276.845 340.041L277.464 338.927L278.763 338.37L280.68 338.989L282.412 338.803L282.597 337.998L283.773 337.689L284.515 335.956L286.309 333.79L287.855 329.891L287.484 329.272L284.206 328.963H281.67L279.814 327.415L279.257 326.116L278.268 325.249L276.598 324.073L276.412 323.516H278.082L279.01 322.774L279.567 323.64L280.927 324.754L282.103 325.125L283.154 326.116L283.649 327.353L285.071 328.096H286.123L287.36 327.539L288.535 326.116L289.463 324.878L289.71 323.764L291.442 321.845L291.504 321.041L288.968 319.494L288.906 317.637H290.885L291.937 318.07L293.236 317.327L294.04 317.699L294.473 319.927L296.885 320.669L296.761 319.37H297.504L299.359 320.608L298.493 318.194L297.009 316.461L297.689 315.842L299.05 316.461L299.606 317.513L300.658 319.122L302.575 317.823L304.864 315.842L305.668 314.047L307.152 313.428L307.771 311.386L308.142 309.468L306.658 307.116L304.864 304.64L305.359 303.526L304.431 303.093L304.555 301.484L303.441 300.432L304.493 299.627L304.369 298.946H303.194V297.337H304.369V295.666H305.544L305.915 297.275L305.853 298.513L304.926 299.194L305.792 300.308L308.08 298.451L308.327 297.647L308.018 296.595L307.029 296.347L306.41 295.171L307.462 294.119H308.018L307.833 293.067L306.286 292.696L305.235 292.324L304.555 291.025L302.823 290.406L303.194 289.292L303.132 288.302H300.163L299.421 287.188L297.627 286.754H295.277L294.04 287.373L293.298 289.849L293.978 292.634L296.019 294.243L295.895 295.543L295.215 295.976V296.595L295.834 297.461H293.545L292.679 298.575L292.432 301.608L292.494 304.207L291.257 305.445L290.391 306.621L289.958 306.002L289.896 302.536L289.463 302.103L288.721 302.969L288.226 304.021L288.597 305.816L289.092 306.559H289.772L290.02 307.363L289.834 309.715L289.648 310.705L289.092 310.272L288.473 310.148L287.917 311.943L286.803 311.696L286.123 310.52L284.391 308.106L283.34 305.507L282.969 303.898L283.401 301.731L283.773 300.927L284.886 301.917L284.948 300.679L284.515 297.337L283.34 295.79L281.484 293.748L280.804 292.51L280.185 292.572L278.701 294.738L277.897 297.152V299.999L276.722 302.227L276.227 301.917L276.412 300.741L275.175 299.751L275.918 296.657L275.546 295.171L275.052 294.119L273.938 292.696L274.248 291.829L274.866 291.953L275.299 292.386L275.546 291.767L274.99 291.148L275.361 290.591L275.979 290.53L276.041 289.849L275.052 289.354L273.567 289.911L273.32 289.477L273.938 288.673L272.33 288.487L270.908 289.911L268.31 287.745L270.536 284.65L270.351 283.969H268.99L269.052 282.422H270.042L270.104 282.979L271.464 283.165L271.588 282.113L270.227 281.865V280.504L269.423 279.266L268.186 277.966L268.124 276.976L267.629 276.481L266.887 276.171L266.825 271.158L265.96 269.425L264.784 267.878L264.042 267.136V266.207H262.991L262.063 266.826L261.135 265.836L261.383 264.041L262.248 262.68L263.176 261.566L263.918 259.461L265.155 257.914V257.11L264.166 255.81L262.929 254.882L262.496 254.139L264.661 253.768L266.331 253.458L267.877 254.325L268.867 254.572L270.042 253.891L271.093 252.158L272.392 249.126L272.33 248.012L273.815 246.279L273.938 244.546L274.866 243.865L275.856 241.699L276.227 240.585L276.165 240.214L274.804 239.904L273.32 238.976H270.908L269.423 239.843L269.176 238.976L268.186 237.676L265.65 237.243H263.98L261.815 238.048L259.403 239.224L259.341 240.585L260.022 241.823L260.764 243.742H260.022L258.661 242.256L257.795 242.813L257.733 245.536L258.043 248.631L257.671 251.849L257.795 254.139L258.908 255.748L259.403 257.852V262.803L259.774 263.422L259.341 264.165L259.28 265.093L258.537 265.341L258.352 266.64L256.929 267.94L257.362 268.559L258.228 268.868L258.043 270.601L257.115 270.416L256.434 269.982L254.95 271.715L255.197 273.51L254.455 275.243V276.109L255.569 277.78L256.434 278.276L256.063 279.204L254.826 281.308V282.855L255.197 284.836L256.496 286.94L258.414 287.745L259.465 288.487L260.764 288.859L262.063 289.168L262.681 290.282L263.424 290.096L264.846 289.477L265.094 290.034L265.032 292.696L264.042 292.881L263.671 291.52L262.62 291.644L262.372 293.191L263.052 293.995L262.867 294.552L261.568 295.481L261.754 297.275H262.496L263.238 296.347L263.424 295.171L263.98 294.614L264.97 295.79L264.784 297.894L265.155 299.38L263.485 300.122L263.114 301.608L260.95 304.331L259.898 303.959L258.476 304.145L257.671 306.806L259.032 308.663V310.52L259.341 311.448L258.661 312.376L257.424 312.191L257.053 311.015L255.816 311.819V309.901L254.826 308.911L255.445 307.797L255.63 304.64L256.249 302.412H255.692L255.074 302.845L254.27 304.207L253.651 303.65L254.208 302.35L252.909 301.422L251.981 300.308L250.992 300.184L250.311 299.442L249.383 301.113L247.713 301.174V301.917L248.456 303.217L247.713 303.402V304.578L246.909 303.959L246.724 304.702L248.085 306.435L246.724 306.621L244.312 306.744L240.291 306.064L237.57 306.93L235.529 307.054L233.55 306.683L231.632 305.816L230.086 303.588L229.282 304.145L226.499 304.393L226.189 302.722L225.571 301.917L223.53 300.494L222.911 299.999L222.726 297.028L220.685 295.79H220.004L218.52 297.028L216.293 298.204L213.572 298.575L211.902 300.927L212.953 301.979L213.201 303.217L214.809 302.412L214.561 301.36H216.169L216.85 301.546L217.901 300.679L218.582 300.803L219.138 301.113L219.324 299.442L221.55 298.266L221.922 299.194L222.169 300.741L220.066 301.298L218.953 302.722L218.643 303.898L216.169 304.145L215.242 304.764L215.18 305.816L214.376 306.187L215.242 308.292L215.736 311.139L216.046 312.933L217.221 314.666L216.355 314.852L216.046 314.419L215.18 314.542L215.303 316.213L216.788 318.38L216.417 319.06L214.747 316.894L212.644 313.243L214.314 312.5L214.252 311.324L212.211 308.354L211.221 310.334L210.726 310.21L210.479 307.735L209.984 307.24L208.067 306.806L207.077 304.516L203.552 306.621L202.624 306.249L199.284 307.425L195.944 307.549L191.553 307.24L190.934 306.559L189.202 306.621L187.903 305.507V304.578L188.522 304.083L188.584 302.66L190.068 302.536L191.491 301.484L191.738 301.855L192.852 301.917V300.122L191.553 298.575L190.625 297.399L189.759 296.718L188.398 295.79L185.615 295.914L185.368 296.533L183.326 296.347L180.791 295.543L179.121 294.986L177.822 294.119L176.214 292.572L174.667 292.201L171.946 291.767L170.338 290.468L169.286 289.292L167.74 287.93L165.761 287.188L161.617 287.064L161.246 288.054V289.477L159.39 291.767L158.339 291.334L157.72 291.458L157.102 291.767L155.803 290.963L157.225 288.487L156.236 287.806L156.05 286.569L156.298 283.722L154.38 284.341L154.999 285.455L154.195 286.816L153.019 289.044V290.034L153.576 290.468L153.452 291.458L152.092 291.767L150.545 290.653L148.504 287.992L147.762 285.888L147.205 283.598L146.278 281.865L144.917 280.132L143.556 279.637L143.309 281.246L143.865 281.927L144.793 281.803L145.226 282.855L142.69 283.66V284.712L143 285.764L142.072 286.197L140.402 288.302L139.783 287.992L139.474 286.816L137.309 287.559L135.763 288.24L134.835 289.849L134.526 291.148L133.289 291.829L132.67 291.148L131.928 290.839L130.258 291.148L130.444 292.201L126.98 294.552L126.671 292.696L128.341 292.015L129.145 291.025L129.33 289.911L131.186 289.292L133.66 288.859L135.454 286.631L138.113 284.712L137.742 283.784H137.186L135.825 284.96L134.773 283.969L133.474 284.279L133.103 285.145V286.012L131.31 286.074L129.33 287.93L127.97 288.178L126.423 289.477V290.468L124.753 291.644L122.651 291.829V290.963L123.207 289.849L122.836 289.477L122.218 289.725L121.352 288.116H121.042V289.849V290.53L118.321 290.653L117.393 291.953L116.218 292.262L115.847 293.253L116.713 294.49L117.764 294.429L117.826 295.604L117.455 296.285L118.259 297.709V298.266L117.084 297.523L115.847 296.595L115.043 296.161L113.311 296.533L111.888 295.543L110.404 295.047L107.744 293.438L106.507 292.758L105.889 291.582L104.157 289.973L102.302 289.044L99.5183 288.92L97.7246 288.363L96.3639 287.745L94.632 286.816L91.9106 284.279L90.3643 283.784L88.3232 284.155L85.2925 285.269L83.437 285.145L81.2103 283.784L75.3345 283.041L73.9119 282.236L72.5512 281.618L71.4997 281.741L71.2523 280.999L69.3968 280.627L68.1598 279.823H66.3661L65.0672 280.689L63.7683 281.679V280.504L64.1394 279.947L63.7683 279.637L61.9747 280.875L60.5521 280.689L59.4388 280.008L59.9336 279.08L58.078 279.39L57.5214 278.585L57.7688 277.162L58.3255 276.728L58.078 276.171L56.7173 276.295L55.7896 275.367L54.4288 275.243L53.0063 275.614L51.7074 276.728L50.4085 276.109L49.7281 275.181V273.82L48.6767 273.634L47.9345 275.057L47.1304 275.367L46.883 276.543L45.2749 276.605V274.748L46.3882 273.324V272.458L44.6564 272.396L44.1616 271.592L42.4916 271.468L41.7494 272.272L40.5742 274.624L39.4609 275.614L36.8013 276.852L34.6365 276.976L33.585 277.285V276.357L32.6573 276.605L31.4202 277.904L32.2243 279.451V280.999L31.2347 281.432V279.204L30.4306 279.08L26.967 282.422L25.3588 282.608L24.9259 282.113L24.2455 282.298L23.627 283.598L22.1426 285.826L21.0293 287.497L20.5963 289.044V291.644L18.8026 293.872L16.8852 295.481L13.9782 296.223L12.0609 296.347L10.1435 296.161L9.64866 297.647L9.40125 300.06L8.78274 301.051L9.77236 301.855L11.3186 303.712L12.4938 304.021L14.0401 305.816L15.6482 306.868L17.0089 307.982L17.9986 309.901L18.6171 311.077L18.9263 312.686L21.2148 313.119L22.6992 313.614L24.864 312.81L26.101 314.233L25.1114 315.161L24.864 316.152L25.9773 317.327L26.6577 317.823L27.5855 316.956L28.6988 317.018L30.3069 316.709L30.4925 318.194L30.3069 319.617L29.008 319.741L27.7092 318.813L26.5959 318.38L24.6166 318.627V319.308L26.534 319.432L27.8329 320.298L27.8947 321.226L26.4103 320.546H25.6062L25.0496 323.021L23.9363 322.402L20.5963 322.031L18.3078 322.402L16.8852 321.041L17.5656 319.989L17.9367 317.946L17.4419 317.389L15.2771 317.884L13.4216 319.246L12.6794 318.937L10.762 320.608L11.4423 321.66L9.95791 321.722L9.46311 321.412H8.59719L7.48387 322.34L6.61796 323.702L5.07168 323.95L4.70057 325.311L3.1543 325.435L4.51502 327.168L6.12315 327.601L7.48387 327.91L9.15385 328.282L8.65904 329.334L7.48387 330.448L8.53534 331.686L9.092 332.49L8.84459 333.419L9.40125 334.471H11.0094L12.4938 334.842L13.9782 335.151L15.7719 334.409L17.9367 334.347L19.2356 335.028L19.7922 333.976L20.9056 334.594L21.5859 335.708L23.3177 334.037L24.3074 333.109L26.4103 332.366L26.8433 331.5L27.7092 331.624L28.4514 333.233V334.594L26.7814 335.461L27.8947 337.627L28.5751 340.041L28.3895 342.083L26.7196 343.197L25.4207 343.94L23.5651 343.692L22.7611 343.94L22.4518 344.992L20.4107 346.848L18.4934 347.034L18.3078 346.106L17.38 345.177L16.3286 345.301L15.1534 346.044L15.0916 347.344L14.4112 347.839L14.1019 349.695L13.7308 350.933L11.2568 353.718L11.1949 355.018L11.2568 356.07L10.3909 356.008L10.2053 356.565L10.8238 356.998L9.77236 357.617L9.89606 358.174L10.8857 358.545L10.762 359.412L11.4423 359.845L11.566 360.897L12.6794 360.712L14.1019 361.392L13.3597 362.383L13.7927 362.816L14.906 362.878L13.1742 364.672L12.8649 365.725L13.9782 366.962L15.0916 367.21L16.0812 368.51L16.8234 370.428L19.6685 370.057L21.2767 369.5L22.5137 368.943V367.457L23.1322 367.519L23.627 369.252L24.4929 371.109L25.2351 372.78L24.4311 374.575V375.194L24.864 376.679L24.9877 378.412L25.6062 378.783L27.4618 377.236L28.6988 376.803L30.1214 375.812L30.678 376.741L31.4821 377.174L32.9047 376.679L33.7087 378.412L34.5746 379.835L35.3787 379.464L35.4406 377.298L36.4302 376.308L36.925 377.483L37.4198 378.35L38.9042 378.288L41.1927 376.926L41.6257 377.236L41.4401 378.907L40.0175 380.392L40.3886 381.939L39.7083 383.92L39.5227 386.767H38.4713L38.3476 387.571L37.5435 387.757L36.1828 389.799L35.9354 391.347L34.2035 391.47L31.915 392.956L29.6266 394.998L29.3791 396.112L29.3173 397.288L28.6988 397.412L27.5855 397.474L27.3381 396.545L25.0496 396.978L22.7611 398.711L22.5137 400.135L19.6685 401.806L19.3593 402.858L18.7408 402.672L17.3182 402.425L15.8338 403.105L14.2256 404.838L14.1638 405.457L15.1534 405.829L16.2667 404.838H18.3078L19.2974 403.601L21.0911 402.858L21.957 401.496H22.7611L23.3796 402.239L24.3074 401.62L24.9259 399.763L25.4207 398.773L25.9773 398.959L26.101 399.702L27.2144 399.949L28.6369 399.021L30.0595 398.34L31.8532 397.04L33.5232 397.102L35.255 396.05L36.3065 394.874L36.6157 393.575L38.5331 391.78L39.7083 391.594L40.2031 390.418L41.1309 390.79L43.6049 389.304L43.4812 387.819L44.9656 385.962L46.0789 385.405L47.6252 384.106L48.9859 382.806L50.5941 382.62L51.1507 381.816L51.5218 380.268L52.9444 378.721L53.6866 378.226L54.4907 376.741L53.4392 375.874L51.6455 375.751V374.451L53.1918 372.904L53.9959 371.604L54.6762 371.79L55.4184 371.109L55.604 369.933L56.5936 369.871L57.0884 368.881L56.037 367.334L57.3358 367.396L57.9543 366.529L58.511 364.92L60.3047 363.063L62.2839 361.083L63.892 359.783L64.3869 359.102L65.1291 360.155L66.4898 360.093L67.2939 358.607L69.3349 358.36L69.1494 358.979L68.0979 359.041L67.1083 360.216L66.799 361.269L67.9124 362.197L67.4175 362.754L65.2528 362.444L64.5724 362.506L63.1498 363.187L61.9747 364.363V365.972L61.6036 367.396L60.6758 369.067L59.9954 371.171L60.6758 371.542L61.9747 371.171L62.9024 370.738V371.295L59.6862 374.389L61.3562 374.265L61.851 374.637L62.8406 374.389L64.5724 372.347L65.995 371.604L66.4279 370.428L67.6031 369.685L68.1598 369.933L68.3453 368.571L69.5823 369.314L70.8194 369.685L71.8708 369.314L72.1801 368.324L72.7367 368.819L73.046 369.624L73.6645 369.438V368.633L72.7367 367.705L72.1801 367.457L73.1697 366.467L73.1078 365.477L72.3656 365.848L72.1801 365.353L72.7986 364.734L72.5512 364.115L71.1905 364.054L71.6853 363.187L72.3656 362.94L72.9842 361.702L73.3553 362.197L73.4171 363.373L73.9738 362.878L74.5304 361.949L75.6437 362.259L76.9426 361.887L78.427 362.197L79.1074 363.682L80.3444 364.115L81.5814 364.672L81.0866 365.477L82.9422 366.9L83.5607 366.653L83.8699 365.415L84.6122 364.858L84.8596 366.158L84.4266 366.591L84.674 367.272L86.2821 368.571L88.1377 368.943L90.7354 368.51H92.9002L94.6939 369.067L96.1783 368.881L96.6113 368.076L96.9824 369.067L97.2916 370.181L98.9616 370.923L100.013 371.171L101.497 370.799L102.425 369.809L103.167 368.943L103.539 369.5L103.106 370.242L103.291 371.604L102.735 372.532L103.662 373.461L105.147 374.203L106.817 375.441L108.239 376.184L108.981 377.422L110.59 378.845L111.579 380.083L113.125 380.516L114.857 380.083V379.154L114.053 378.474L111.765 376.06L112.507 375.812L114.424 377.483H115.723L116.28 378.907L116.404 379.897L117.826 380.083L118.568 381.073L118.878 380.949L118.383 378.536L117.764 376.803L116.898 374.637L118.074 373.646L118.878 376.926L119.744 378.969L120.486 380.887L121.29 381.321L122.032 380.702L122.403 380.145L122.836 380.516L122.96 382.682L123.764 383.734L124.753 384.477L124.382 385.653L124.753 388.376L126.671 389.737L127.846 391.408L128.093 392.151L128.836 393.265L127.166 395.184L128.465 396.793L129.64 394.998L130.073 395.617L129.825 396.793L128.959 397.721L129.516 399.021L130.196 397.783L130.444 396.793L130.939 397.412L130.691 399.206L130.258 400.259L130.382 401.311L131.186 400.444L131.124 401.868L131.805 402.363L132.547 400.877L133.227 398.092L133.722 398.526L133.66 400.816L133.103 401.991L133.474 403.601L134.34 404.096L136.196 402.239L136.32 403.291L134.959 405.457L135.392 406.943L134.65 408.799L135.701 409.789L134.959 411.151L136.567 413.193L138.113 412.76L139.165 411.646L139.969 412.389L139.536 414.369L139.907 415.855L141.268 417.092L141.639 417.711L142.443 418.021L143.123 420.991L143.68 420.682L144.113 419.63L144.36 420.62L144.422 422.353L145.35 423.653L145.474 424.767L145.164 425.324L146.772 426.561L147.329 426.128L148.195 427.056L149.618 427.552L151.04 427.428V428.047L149.741 428.913L148.319 428.604L146.278 428.109L145.226 426.995L143.927 426.809L142.567 427.18L143.247 428.666L144.113 429.223L144.36 430.584L145.35 430.522L146.401 431.327L147.7 432.193L148.071 433.369L148.875 432.936L149.432 433.864L148.937 434.236L149.123 434.793L150.051 434.545L150.607 435.164L151.597 436.092L152.648 437.021L153.267 436.773L153.7 437.578L154.628 438.506L155.679 438.939L157.225 439.496L158.833 439.991L159.699 439.496L159.452 438.444L158.462 437.082L157.968 436.154L156.298 435.102L154.875 434.421L154.256 433.183L153.205 431.636L153.638 430.46L154.689 430.398L155.246 431.512L156.174 432.503H157.782L158.091 433.864L159.328 434.359L159.823 433.802L161.06 436.092L162.235 436.649L163.287 438.382L163.163 440.053L162.421 440.796L163.039 441.972L163.843 442.776L163.72 445.623L162.916 446.366L162.606 442.776L161.74 441.662L159.266 441.786L157.968 441.724L155.493 440.424L155.308 441.167L155.679 442.219L156.483 443.828L157.04 445.128L157.287 446.799L157.968 448.346L158.462 449.336L158.153 450.389L158.091 457.877L157.72 460.662L157.225 463.757L156.73 466.418L156.112 468.089L156.421 470.812L157.411 472.669L157.596 475.082V477.929L156.483 479.291L157.349 480.776L158.586 482.199V484.923L159.266 486.594L160.256 487.893L161.431 489.069L161.679 490.183L162.73 490.678L163.472 489.874L164.153 490.678V492.597L163.349 492.04L163.287 493.773L164.524 495.01L165.637 495.258L165.946 496.372L165.266 497.238L166.008 498.352L166.936 499.466L167.616 500.58L168.73 501.447L168.977 502.561L169.843 503.304L169.596 505.16L170.4 505.841L172.317 505.779L174.111 506.522L175.595 507.574L177.141 507.512L177.76 508.812L179.368 509.369L180.729 510.854L181.656 512.587L182.77 516.053L183.821 516.672L184.007 517.724L183.636 518.157L184.502 519.457L185.429 520.632L185.801 522.675L186.914 523.417L187.285 525.584L188.831 526.512L190.13 527.316L191.429 528.864L192.542 530.163V534.124L191.367 533.815L189.573 533.505L190.749 534.434L191.491 535.671L193.47 536.662L195.264 537.219L196.377 538.209L198.294 539.261L199.655 540.746V544.955L200.954 546.131L202.562 547.245L203.923 548.297L205.469 549.72L206.644 550.649V551.824L207.325 552.32L208.747 551.267L208.438 550.153L207.51 548.792L206.273 547.368L205.345 547.802L204.294 546.502L203.923 544.15L202.562 541.86L201.758 540.499L201.634 538.704L200.954 537.714L199.841 536.909L199.037 535.424L197.181 533.815L196.748 531.277L195.449 530.473L195.387 529.544L194.027 528.245L193.965 527.502L192.852 526.326L191.182 524.779L190.439 523.851L190.192 520.818L189.45 519.457L189.821 517.847L190.625 517.043L192.109 517.909L192.913 517.786L194.027 517.971L195.264 519.147L196.377 519.457L196.315 521.189L196.996 522.799L197.923 524.717L199.284 528.245L201.511 531.03L203.737 532.948L204.727 532.701L205.036 534.681L206.026 535.919L207.263 535.981L208.191 537.714L209.242 537.776L209.489 540.499L209.18 540.808L209.922 541.737L211.098 542.17L212.149 542.727L213.633 544.026L214.314 544.955L214.499 545.883L216.293 547.307L217.345 548.049L219.571 550.587L221.674 553.434L222.416 555.414L223.097 557.394L223.901 558.013L223.653 559.189L223.159 560.365V560.922L223.406 561.727L222.664 562.16L222.973 563.645L224.21 564.759L225.818 566.245L227.426 566.987L229.22 568.287L230.519 569.772L232.313 570.391L234.477 570.886L236.395 571.505L237.879 572.867L240.168 574.104L242.209 574.723L243.384 575.466L245.734 575.961L247.219 576.766L249.693 577.88L250.682 578.437L252.723 578.499L253.342 579.241L255.878 579.056L257.548 578.313L259.774 576.828L261.877 577.385L264.661 578.127L266.516 580.231L268.434 582.336L270.289 584.007L271.959 585.306L274.371 585.368L275.979 585.987L277.959 586.544L279.319 587.287L281.113 587.844L283.03 588.029L284.206 587.844L285.381 587.596L286.556 588.586L286.865 589.143L286.123 589.886L288.164 591.31L289.092 592.919L290.576 594.342L291.69 595.27L292.679 596.632L292.494 598.365L291.999 598.922L292.927 600.16L294.225 600.407L294.906 599.479L296.205 600.16L297.132 601.583L298.246 602.264L299.73 603.192L299.916 605.296L301.091 604.739L302.266 605.915L304.06 606.039L305.606 606.287L307.09 606.906L307.771 608.143L308.699 607.772L310.121 610L312.162 608.886L311.544 607.648L310.492 606.349L311.729 605.668L313.028 604.925L313.523 603.811L314.636 603.502L316.183 603.625L317.234 604.368L318.038 605.296L319.028 605.792L318.471 607.463L319.213 608.824L320.017 609.691Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                  <path
                    d="M297.318 555.105L297.875 553.867L300.535 552.381L303.194 552.01L305.05 551.577L308.142 551.886L310.493 551.577L312.657 552.753L315.193 554.362L317.791 554.486L319.337 555.847L320.141 555.414L321.626 556.466L322.492 557.704L323.914 558.57L325.399 558.88L326.636 559.622L327.873 559.87L328.306 560.86L330.038 561.108L331.336 561.541L332.635 562.717L331.522 563.212L330.099 563.583H327.502L325.77 563.398L324.162 563.583L322.863 564.017L321.131 563.707L321.502 563.026L322.739 561.912L322.43 561.17L321.378 560.736L319.337 560.551L318.162 559.127L317.482 557.518L316.183 557.209L314.451 557.333L313.029 556.652L311.544 556.157L309.75 555.476L308.452 555.043L307.215 555.414L305.792 554.609L306.41 554.114L306.596 553.372L306.039 553.124L303.875 553L302.452 553.31L301.091 554.424L299.978 554.795L298.927 554.919L298.184 555.785L297.566 555.723L297.318 555.105Z"
                    className="north-america"
                    onMouseEnter={() => highlightContinent("north-america")}
                    onMouseLeave={() => removeHighlight("north-america")}
                    onClick={() => selectContinent("north-america")}
                  />
                </g>
                <g clip-path="url(#clip1_338_3)">
                  <path
                    d="M798.948 450.604L801.986 460.69L800.467 465.077V468.849L798.127 469.915L794.267 465.897V463.314L792.502 461.756L791.763 459.583L790.572 459.132L789.956 460.28L791.229 461.879L791.311 463.806L793.076 465.979L795.951 469.915L796.443 472.949L797.922 474.794L797.47 475.778L798.866 477.91L799.851 480.575L801.042 481.641L802.438 485.126L805.189 490.374V493.039L805.928 495.294L808.679 497.057L810.979 499.886L811.964 502.387L813.442 504.765L812.785 505.38L813.442 507.676L812.908 508.865L813.442 512.268L813.894 515.917L819.601 520.509L821.613 523.625L822.598 527.561L823.091 530.513L824.282 533.137L825.021 534.695L825.883 533.465L826.869 534.08L827.485 535.966H829.661L830.975 537.073L832.165 537.442L833.438 539.205L834.588 540.804L836.518 542.157L838.735 544.289L839.761 545.97H840.911L842.471 548.061V550.111L840.665 551.3L839.269 552.407L839.679 552.94L840.87 552.366L842.102 552.94L843.375 553.965L844.196 555.564L845.263 556.794L846.372 557.163L847.604 558.229H848.754L850.314 557.819L852.203 557.163L853.599 556.425L855.734 556.384L858.115 556.63L859.388 555.974L860.661 554.785L865.629 554.662L867.354 553.883L872.117 553.596L875.278 552.612L878.891 551.218L880 551.874V552.776L879.302 553.801L879.425 555.851L879.672 557.409L880 558.229L878.481 558.557L878.07 563.026L876.469 565.076L875.155 567.946L873.307 570.365L871.09 574.588L869.735 578.114L868.093 581.066L864.931 585.576L862.221 589.348L860.004 591.439L857.089 594.555L853.886 596.974L851.628 598.368L848.754 600.254L844.606 603.698L841.281 606.773L838.571 609.643L836.353 612.021L834.547 614.768L833.397 616.613L830.851 617.802L830.605 618.909L829.045 620.098L827.361 621.123L826.828 623.624L825.514 626.535L823.461 629.979L822.065 632.357L821.079 634.981L820.915 638.712L822.106 639.86L823.707 641.213L823.625 643.591L823.009 644.042L823.091 646.215L823.748 646.748L823.255 647.855L823.42 649.495L824.118 650.561L824.651 652.365L825.226 654.333L826.171 656.301L828.224 657.654L829.004 660.032L828.059 662.246L828.183 664.05L828.675 666.387L829.045 668.765L829.004 671.922L828.757 673.234L829.209 674.423L829.004 675.981L829.373 679.056L829.209 682.746L827.649 684.755L825.514 686.805L822.722 689.634L820.71 690.823L817.753 691.192L815.167 692.955L812.785 694.226L810.034 698.08L808.802 699.72L806.462 700.294L803.957 703L802.767 704.107H801.576L801.124 705.952V708.371L802.931 710.052L803.341 712.348L804.039 714.685L804.245 716.858H805.271L805.312 718.99L805.025 721.942L804.245 724.443L804.573 726.042L804.327 727.395L803.136 729.076L801.001 730.06L797.716 731.29L794.062 732.93L791.886 734.693L791.229 736.292L791.721 737.768H792.584L792.625 739.777L792.05 743.016L791.229 746.952L790.408 749.494L788.272 751.831L786.548 752.979L785.111 754.619L782.976 757.899L781.744 760.974L780.102 763.516L777.884 766.591L775.421 767.862L773.778 770.199L770.535 773.192L767.866 775.652L765.279 777.825L762.774 778.932H760.845L759.038 779.26L757.806 779.834L757.396 780.777L756.287 780.49L755.466 780.244L754.645 780.777L754.152 781.843L752.715 781.515L750.867 780.982L748.896 780.613L745.16 781.187L743.148 780.695L741.382 781.023L740.233 782.458L737.112 782.991L733.581 783.237L731.405 785L729.721 784.754L728.202 783.77L727.627 782.95L725.656 782.663L725.369 781.187L724.014 780.449L723.644 778.522L722.248 776.554L721.879 775.16L721.509 773.561L722.659 773.315L723.193 771.716L723.07 769.42L722.495 767.247L721.509 765.484L719.703 762.86L718.512 760.482L717.65 757.817L716.746 755.398L715.884 752.569L714.734 750.888L712.969 749.453L710.587 747.075L709.643 744.984L708.658 743.18L708.083 740.966L707.385 737.645L706.358 733.34L706.81 731.454L705.989 729.445L704.921 726.37V720.876L705.414 719.195L704.511 717.514L702.54 714.357L701.02 711.528L699.337 708.248L697.982 705.05L696.134 701.36L694.205 698.572L692.767 696.399L691.823 693.611L692.069 690.946L692.152 687.133L691.823 685.042L692.85 683.853L694.246 679.753L695.108 675.489L695.601 672.906L698.475 669.093L700.158 668.519L701.308 666.018L701.76 662.656L701.677 659.868L700.322 657.531L698.844 653.923L698.598 652.324L697.941 651.381L699.542 649.536L699.707 648.019L698.721 646.133L696.914 642.648V640.68L694.738 637.728L694.122 635.473L693.753 632.972L692.521 630.676L691.454 629.077L688.579 626.289L686.855 624.321L685.746 622.927L683.652 621.533L682.133 619.524L680.655 617.515L679.957 615.178L679.136 612.431L680.326 609.889L680.203 606.855L681.394 607.306V606.117L680.408 605.215L681.763 604.969L681.065 603.001L681.887 600.213L682.585 596.851L683.159 593.817L682.092 590.373L681.722 589.102L680.532 588.774L679.793 589.102L678.52 587.79L677.781 585.945L676.631 586.56L676.138 585.576L675.358 586.027L673.634 586.191L671.006 586.355L668.624 586.724L666.325 587.421L664.642 587.626L663.163 586.396L661.808 584.059L660.33 581.025L658.031 578.442L655.978 576.556L654.089 576.843L649.901 577.54L646.124 577.909L642.551 578.524L640.375 578.811L639.184 580.492L636.433 580.246L633.231 581.804L630.274 583.444L628.345 583.567L626.127 585.33L624.239 584.182L622.227 583.813L620.379 582.583H619.435L617.998 583.28L615.945 583.034L612.742 583.444L609.786 583.485L607.24 584.387L603.996 585.371L601.779 586.314L599.439 587.421L597.345 586.437L594.758 585.002L590.98 582.706L587.654 579.713L584.205 577.294L581.454 575.449L579.812 573.727L576.856 572.702L573.53 568.889L573.325 566.675L571.805 563.067L570.738 560.771L567.699 559.213L565.811 557.696L565.318 555.4L564.497 555.236L563.717 555.933L562.238 553.76V552.284L562.649 550.603L561.089 551.054L558.174 550.89L557.393 549.045L555.71 548.225V543.674L556.942 544.33L559.282 543.797L559.323 542.526H556.942L555.71 541.378L554.971 538.59L553 536.868L554.56 535.474L556.367 532.809L556.942 530.677L557.886 525.962L558.995 522.969L559.323 519.648L558.666 516.532L557.229 514.359L557.311 512.965L558.297 510.546L558.174 508.414L555.751 506.077L554.601 503.986L554.848 500.829L555.792 499.271L557.393 498.861L557.804 496.114L558.954 494.351L560.391 491.891L560.514 490.415L562.526 488.283L564.866 485.823L565.852 480.329L566.837 478.402L569.876 476.557L571.559 474.999L572.503 471.678L573.899 469.095L577.677 468.644L580.839 467.455L582.276 465.487L584.288 463.97L586.874 462.043L588.558 459.501L589.79 456.344L589.009 452.695L589.133 449.702L590.364 447.857L591.966 444.946L592.294 443.101L593.978 441.051L595.784 439.165L598.823 437.976L602.19 436.172L603.996 433.835L605.392 430.965L606.747 427.685L607.568 425.307L608.431 424.897L609.621 425.143L610.689 426.66L612.372 427.89L613.974 428.71L616.232 428.669L620.584 428.382L621.816 428.587L622.761 429.284L624.362 429.243L627.359 428.874L629.659 427.808L631.137 425.676L632.861 424.897H635.694L636.68 423.667L638.651 422.068L640.909 421.084L644.071 420.51L647.52 420.141H649.08L650.106 419.034H653.391L654.5 418.419L656.43 418.788L658.852 418.747L660.782 419.567L661.316 420.1L662.589 419.321L665.545 418.419L666.941 418.009L668.542 418.337L670.267 418.009L671.457 417.763L672.648 418.337L674.948 418.378L676.179 418.993L678.355 417.763L680.573 416.574L682.092 416L683.57 416.615L684.309 418.173L685.089 419.731L686.239 418.829L688.169 417.804L688.456 418.542L687.922 419.526L686.814 420.715L685.869 421.699L685.91 424.159L687.019 424.815L688.046 426.004L688.087 427.849V429.284L686.691 431.129L685.5 432.605L683.57 433.835L682.995 434.696L683.077 435.68L683.94 437.279L685.623 437.566L687.019 436.992L687.06 437.853L687.183 438.386L688.005 438.181L688.826 437.73L688.908 438.837L689.072 439.698L690.591 439.862L691.864 440.477L693.342 441.42L695.108 442.24H697.654L700.446 442.281L702.827 442.978L704.634 444.167L707.631 444.782L708.863 445.971L709.273 448.349L710.423 449.948L712.681 450.932L716.295 451.383L719.744 452.49L722.618 453.884L724.589 455.606L726.724 456.795L728.531 456.139L731.076 453.761L732.144 451.957L731.282 448.923L731.323 446.463L732.965 444.618L735.1 443.306L738.056 442.445L740.027 441.83L743.066 442.322L745.529 443.265L745.776 445.069L746.761 445.807L749.348 446.135L750.539 447.037L754.809 447.16L755.343 447.857L755.712 449.292L757.847 449.333L758.833 449.005L760.475 449.333L763.965 449.743L766.552 451.137L768.564 451.096L768.974 451.916L772.013 452.162L775.174 453.474L777.227 452.285L779.773 450.522L780.841 449.784L782.688 450.194L783.961 449.128L786.137 449.784L788.272 449.538L788.56 451.014L790.243 451.219L791.311 451.916L793.61 451.67L796.731 451.178L798.168 450.973L798.948 450.604Z"
                    className="africa"
                    onMouseEnter={() => highlightContinent("africa")}
                    onMouseLeave={() => removeHighlight("africa")}
                    onClick={() => selectContinent("africa")}
                  />
                  <path
                    d="M848.589 686.723L853.434 685.534L856.39 684.181L859.305 681.598L860.045 682.705L862.262 679.138L862.796 680.122L863.74 678.687V677.006L864.643 676.473V674.628L864.192 673.644L865.464 674.177L866.573 673.972L868.421 672.906L868.79 671.43L869.283 670.036L868.913 668.191L869.94 667.371V666.674H870.802L871.336 667.33L871.993 667.658L872.568 668.929L873.553 670.323L874.251 673.193L874.949 675.94L875.319 678.523L875.935 680.942L876.345 681.803L875.729 683.976L875.278 684.55L873.758 682.5L873.102 682.09L872.732 682.869L872.568 684.632L872.65 686.108L873.348 686.928L873.471 687.789L873.102 689.306L872.157 690.454L871.295 691.807L871.582 692.75L871.747 693.775L871.582 695.251L870.679 697.998L869.488 701.565L867.805 706.444L866.86 708.986L865.341 714.439L864.397 717.186L863.781 719.851L863.042 723.09L862.139 726.042L861.194 728.543L859.634 731.249L857.95 731.577L856.103 732.356L853.393 733.791L852.49 734.037L850.354 733.463L848.384 732.479L846.002 730.962L845.427 729.117L844.442 728.133V722.68L842.964 720.097L842.594 718.867L842.266 715.997L843.662 712.43L845.468 710.011L847.07 707.305L848.466 704.64L848.425 702.508L847.439 700.909L846.207 697.178L845.633 692.545L848.589 686.723Z"
                    className="africa"
                    onMouseEnter={() => highlightContinent("africa")}
                    onMouseLeave={() => removeHighlight("africa")}
                    onClick={() => selectContinent("africa")}
                  />
                </g>
                <g clip-path="url(#clip2_338_3)">
                  <path
                    d="M535.071 945H538.173L538.716 947.405L539.608 946.59L540.5 946.202L541.198 947.405L542.71 946.707L543.912 948.025L546.937 947.754L547.906 948.025L548.449 949.034L550.582 948.452L551.396 948.142L552.094 947.482L552.909 947.754L553.723 948.375L554.033 947.676L555.817 948.103L556.205 949.616L557.252 949.112L558.493 947.289L560.354 947.87L561.013 948.762L563.766 948.491L564.581 949.616L565.356 949.267L566.597 950.004L567.489 949.616L568.458 950.508H569.816L570.165 949.112L571.25 948.569L572.026 948.918L573.267 948.142H574.353L576.485 949.034L576.873 950.508H578.192L579.859 951.051L581.914 951.516L583.427 953.301L584.668 953.805V954.813H585.327L585.947 953.999L588.274 955.434L590.213 956.83L590.911 958.033L592.966 958.654L594.207 959.972V961.058L596.068 961.834L597.27 961.058L599.752 961.834V962.377H601.187L601.536 961.407L602.234 961.757L602.66 962.377L603.203 961.951L603.94 962.377L604.91 962.998L605.685 962.455L607.042 962.183L608.012 962.649L608.904 962.571L609.641 961.291L611.967 960.787L613.014 962.028L614.449 960.787L615.224 961.214L615.612 962.183L616.31 962.3L617.978 963.618L619.18 962.183L621.817 962.106L623.523 963.618L623.988 965.248L622.747 966.838L623.988 967.265L624.492 968.545L625.229 968.971L625.772 971.299L624.143 972.423L624.958 973.16L624.609 974.673L625.772 974.402L626.897 975.449V976.38H626.354L626.548 977.621L628.331 978.164L629.146 977.156L630.58 977.621L631.085 976.613L631.705 976.535L633.256 974.13L634.73 973.626L635.971 973.703L637.444 974.557L638.258 974.13L639.887 974.052L641.671 975.216L643.338 974.479L644.851 974.867L647.992 977.156L648.806 976.768L650.396 976.845L651.171 977.543L651.443 978.397L652.296 978.242L653.072 979.056L653.77 978.862L653.925 978.242L654.545 977.505L655.359 977.543L656.445 978.63L656.135 979.405L656.096 981.655L656.562 982.159L656.755 983.129H657.802L658.345 982.741L660.207 983.827L661.099 983.556L659.78 981.888V980.685L660.905 980.103L662.184 980.879L662.882 981.616L662.068 982.47L662.882 983.129L662.378 984.254L663.154 984.758L663.58 986.193L664.472 986.504L664.821 985.844L664.395 984.603L664.821 984.215L665.791 984.176V983.905L665.364 982.741L666.954 981.655L668.738 981.694L670.211 982.974L671.064 982.664L672.538 983.129L673.779 983.905L675.446 985.844L677.114 987.318L677.463 988.482L679.091 990.188L679.285 991.119L679.13 993.059L678.316 994.378L677.967 996.123L678.742 996.705V998.567L677.889 999.381L677.269 999.032L677.036 998.45L675.912 997.985L675.252 998.838L675.369 1000.51L676.222 1001.36L676.571 1002.83L676.338 1004L676.997 1004.62L677.036 1005.47H676.61L676.455 1004.62L675.95 1004.54L676.028 1007.49L676.881 1008.03L678.122 1009.66L678.51 1013.11L679.169 1016.1L680.371 1016.8L681.379 1017.88L681.845 1019.51L682.155 1022.93L682.543 1024.48L682.93 1025.6L683.279 1027.08L683.706 1027.62L684.016 1029.75L684.404 1031.92L685.49 1033.36H686.459L686.692 1033.86L686.498 1034.25L685.839 1034.6L684.016 1034.83L682.232 1036.5L680.177 1038.67L680.992 1039.37L681.069 1042.16L680.604 1043.17L680.216 1044.41L679.557 1045.5L677.928 1048.22H675.989L676.067 1049.22L676.726 1050.08L676.416 1051.4L677.114 1051.9L678.393 1051.63L678.626 1053.1L679.828 1053.88L681.379 1055.31L682.465 1056.98L683.939 1057.91L685.218 1057.53L685.955 1057.91L686.42 1057.18H687.351L688.825 1058.38L690.143 1059.35L691.462 1060.55L693.129 1063.19L694.486 1065.36L695.145 1065.55L695.727 1065.13L696.891 1065.09L697.511 1065.86H698.403L699.062 1066.64H702.707L703.677 1067.84V1069.08L701.117 1072.23V1073.47L702.087 1073.35L702.242 1072.03H702.707L703.948 1073.89L704.103 1075.45L704.84 1075.06L705.499 1075.79L705.654 1076.26L706.624 1075.83L707.05 1076.49V1079.13L708.214 1079.32L709.183 1080.29V1081.46L708.756 1082.23L708.563 1084.25L706.236 1084.75L705.538 1085.18L703.948 1087.04L702.862 1087.43L702.823 1088.13L703.405 1088.63L703.715 1090.15L704.84 1092.24L704.491 1093.13L705.228 1094.18L705.189 1095.3L704.491 1096.43V1097.67L704.879 1098.25L704.491 1099.69L703.56 1100.62L704.026 1101.71L705.073 1102.95L706.662 1103.61L706.624 1104.5L706.779 1105.58L707.593 1105.82L708.214 1105.43H709.183L709.648 1105.82L712.091 1105.97L714.263 1106.28L715 1106.98V1108.22L713.642 1110.16L712.285 1111.98L711.083 1112.41L710.54 1113.54L709.997 1114.97L709.377 1116.99L706.973 1117.14L707.438 1117.76L708.679 1118.03L709.105 1119.08L708.989 1120.36L710.308 1120.94L710.54 1122.42L709.726 1122.96L706.973 1125.06L707.205 1125.68L707.438 1127.11L709.454 1128.24L710.152 1128.55L710.501 1128.24L711.161 1128.55L710.54 1129.4H708.873L706.74 1130.64L704.336 1130.41L703.599 1130.87L701.272 1134.21L698.674 1137.39L697.239 1139.64L695.727 1139.99L694.641 1141.42L693.4 1141.81L693.594 1142.63L693.827 1144.18L694.99 1145.26L694.254 1146.12L694.603 1147.17L695.029 1148.79L695.65 1148.33H696.503L697.472 1150.04L697.433 1153.49L696.813 1156.9L695.533 1157.79L693.943 1158.45L692.586 1158.88L691.423 1158.45L690.686 1158.3L689.988 1160.24L688.941 1160.66L688.243 1161.17L688.786 1161.75L688.67 1162.41L687.623 1163.46H686.769L686.188 1163.18L685.102 1164.27L684.326 1164.62L683.628 1165.71L682.543 1166.4L682.426 1167.88L681.341 1168.96L681.379 1170.55L680.294 1171.56L679.324 1173.11L679.479 1174.59L680.061 1175.48L679.557 1177.65L677.657 1179.24L676.842 1179.01L676.028 1180.33L675.873 1182.46L674.244 1182.73L674.089 1185.22L674.632 1185.91L675.059 1186.92L675.485 1187.39L675.214 1187.89L674.206 1188.09L674.632 1188.98L673.779 1189.21L672.654 1189.6L671.53 1190.92L670.599 1190.69L669.319 1190.26L668.738 1190.49L667.768 1189.95L667.032 1190.38L665.48 1192.04L666.838 1193.4L666.799 1194.53L666.062 1194.72L666.217 1195.81L667.342 1197.43L667.419 1198.68L668.04 1199.22L667.148 1200.07L664.085 1202.98L663.852 1204.03L662.999 1204.34L662.65 1205.85L661.292 1207.02L659.819 1207.21L659.625 1209.27L658.384 1209.58L656.911 1210.23L656.096 1210.74L654.002 1210.89L653.188 1212.1L651.676 1213.3L650.008 1213.73L648.922 1214.11L646.402 1216.05H644.812L642.64 1217.57L641.322 1217.76L640.003 1219.23H639.228L638.452 1218.65L637.716 1218.77L636.669 1219.97L636.552 1220.98L635.699 1221.64L634.536 1221.02L633.528 1222.26L632.248 1221.68L631.744 1222.26L631.666 1225.09L630.464 1224.9L629.999 1225.09L629.417 1224.9L629.223 1224.08L628.448 1223.73L627.323 1223.54L627.168 1221.41L626.082 1221.02L625.423 1221.33L624.764 1220.82L624.105 1221.13L623.329 1220.4L622.553 1220.71L622.049 1222.57L621.545 1223.5L622.049 1224.12L621.972 1224.7L620.421 1224.35L619.839 1222.88L620.11 1221.87L621.313 1220.36L620.615 1219.58L619.878 1219.82L619.063 1220.2L619.762 1220.67L619.529 1221.41L618.288 1221.06L617.551 1220.4L616.465 1220.98L614.565 1222.03L613.363 1222.92L613.053 1223.85L612.394 1223.58L611.812 1222.69L610.571 1223.04L609.408 1224L606.655 1225.98L606.461 1228L604.987 1227.77L603.436 1226.95L602.079 1225.75L600.605 1225.21L599.481 1225.6L598.511 1224.97L597.968 1225.63H597.193L596.689 1225.17L595.719 1225.56L596.495 1226.72L595.991 1227.26L594.246 1225.56L593.509 1225.83L593.703 1226.6L593.005 1226.49L591.841 1225.71L590.678 1226.41L589.36 1225.71L587.809 1225.17L585.366 1223.69L583.543 1221.44L583.078 1222.34L582.147 1222.49L581.333 1221.64L580.286 1222.65L579.471 1222.38L577.92 1220.82L576.292 1220.94L576.059 1222.1L573.926 1222.26L572.84 1222.57L572.336 1222.22L571.483 1221.99L570.746 1223L569.738 1222.92L569.622 1222.57L569.971 1221.64L569.544 1221.52L568.458 1222.22L566.791 1222.18L566.52 1220.75L565.55 1219.78L563.883 1219.58L562.138 1218.23L560.936 1217.95L560.431 1217.49L560.238 1218.03L560.664 1219.78L560.199 1219.7L559.035 1217.57L558.958 1216.95L558.299 1216.29L558.531 1215.32L559.772 1214.58L560.044 1212.87L559.035 1212.37L559.152 1209.92L559.85 1209.54L559.656 1207.17L560.238 1206.12L560.431 1204.8L560.121 1203.83L561.711 1203.06L562.758 1203.64L563.999 1202.52L564.775 1201L566.287 1199.61L565.046 1199.3L564.619 1198.75L565.317 1198.4L567.256 1198.33L566.597 1196.66L565.395 1195.03V1194.33L566.209 1194.76L567.411 1193.87L567.76 1191.03L568.303 1190.1L569.622 1188.78L569.118 1188.28L568.381 1188.63L566.132 1189.02L564.658 1188.63L564.426 1187.74L566.597 1187.5L568.769 1187.47L568.148 1186.69L567.683 1183.98L567.218 1182.62L566.093 1182.93L565.783 1182.23L566.713 1181.69L566.209 1180.14L565.977 1178.82L565.434 1178.78V1178.08L566.054 1176.95L565.473 1176.64L564.309 1176.49L562.797 1174.12V1172.07L561.983 1172.77H561.323L560.742 1170.71L560.121 1170.94L559.733 1172.03L557.756 1172.46L557.523 1173.62L556.748 1174.2H554.964L554.382 1175.36L553.335 1176.06L553.102 1177.92L552.017 1178.23L550.078 1177.46L548.643 1177.5L546.006 1176.18L544.339 1175.87L543.059 1175.52L541.081 1173.54L540.228 1172.34L537.902 1172.18L534.644 1170.94L530.611 1170.63L527.664 1169.82L519.87 1168.34L517.504 1167.65L515.953 1166.09L515.333 1165.78L513.239 1166.52L510.292 1166.91L506.918 1167.53L504.94 1169.86L504.553 1171.87L503.893 1173.11L503.661 1172.26L502.73 1173L502.265 1172.22L500.791 1172.18L498.387 1170.94L497.456 1170.01L496.681 1168.69L495.866 1168.54L495.517 1169L494.781 1168.15L494.509 1168.69L494.742 1169.66L494.121 1170.21L493.152 1169.39L491.989 1169.66L492.415 1170.63L490.942 1171.6L489.391 1171.72L489.08 1172.34L487.917 1171.99L486.715 1172.69L485.629 1173.23L485.047 1174.63L483.419 1173.77L481.441 1173.97L479.929 1174.05L476.129 1172.11L475.663 1170.75L474.849 1170.71L474.422 1171.76L473.608 1171.72L473.337 1170.67L473.802 1169.04L473.065 1168.89L472.134 1169.55L470.234 1169.9L470.002 1169.12L469.265 1168.58L468.838 1169.58L467.908 1168.85V1167.61L466.744 1167.1L466.318 1168.23L464.999 1167.8L464.573 1167.49L464.03 1167.72L462.595 1166.37L462.013 1166.71L460.928 1166.52L460.462 1165.63L458.446 1164.08L457.36 1164.15L455.887 1163.11L455.189 1162.99L454.878 1161.59L453.948 1161.48L452.397 1160.28V1158.61L450.768 1157.68L449.954 1157.99L447.239 1158.26L445.649 1158.69L445.068 1159.97L443.904 1160.35L442.663 1159.23L442.237 1157.68L443.012 1156.44L443.284 1153.57L443.672 1152.87L442.431 1151.55L441.267 1151.47L440.065 1148.64L439.057 1147.44L438.824 1146.12L437.816 1144.99L438.165 1144.1L438.437 1142.74L437.816 1140.73L435.955 1139.95L435.838 1137L434.598 1136.77L434.055 1135.64L434.675 1134.09L435.063 1133.32L434.52 1131.65L434.249 1130.45L433.744 1129.32L433.938 1128.62L433.744 1127.69L435.334 1126.76L436.42 1126.3L436.459 1124.44L437.816 1122.57L438.592 1122.11L438.049 1121.68L436.42 1121.33L435.063 1121.88L434.404 1121.53L434.132 1119.82L435.063 1119.08L434.52 1118.31L434.714 1117.45L436.187 1115.9L435.916 1114.62L435.257 1113.15L435.14 1110.82L433.512 1110.12L432.426 1110.2L431.379 1112.64L430.332 1112.53L429.014 1111.09L427.307 1111.6L427.036 1114.89L425.291 1115.36L424.981 1112.26L423.662 1112.99L422.576 1112.88L423.003 1115.4L422.693 1116.37L420.831 1117.41L419.358 1117.3L418.544 1116.44L417.148 1116.99L416.062 1118.97L415.635 1118.35L416.023 1117.61L415.829 1116.68L414.743 1116.06L413.58 1116.41L412.649 1115.24L411.447 1112.02V1110.51L411.098 1109.42L410.168 1109L410.439 1107.87L410.982 1106.36L410.168 1104.46V1102.83L411.408 1102.6L411.719 1101.63L412.649 1101.12L413.968 1101.36L414.86 1100.66L414.821 1099.88L414.433 1098.91L414.898 1098.41L414.317 1097.17L414.511 1096.04L414.394 1095.3L415.015 1094.45L414.705 1092.47L414.123 1091.54L414.666 1090.92L415.403 1090.65L414.2 1089.33L415.209 1087.78L415.441 1085.49L416.682 1084.68L416.992 1082.39L417.574 1080.72L418.931 1080.02L420.831 1079.83L422.111 1078.01L422.227 1075.76L422.887 1075.06L423.934 1074.82L425.368 1073.2L425.175 1071.68L424.283 1070.48L423.158 1070.6L421.336 1070.64L421.607 1069.78L422.383 1068.85L421.607 1068.93L419.784 1068.77L419.862 1067.61L421.452 1066.68L423.081 1065.9L422.887 1065.05L421.646 1064.78L421.568 1064L421.995 1063.27L421.336 1062.92L420.366 1063.23V1065.05L420.948 1065.52L420.715 1066.33L419.319 1066.72L418.893 1065.28L417.225 1065.13L416.217 1065.9L415.131 1065.09L415.519 1064.39L416.799 1064.12L417.07 1063.27L416.566 1062.18L417.38 1061.71L418.233 1062.06L417.923 1060.63L419.009 1060.01L420.405 1059.15L420.831 1057.41L421.956 1056.32L422.848 1056.48L423.391 1054.46L423.934 1053.76L423.081 1052.21L421.646 1051.51L420.754 1051.9L419.358 1053.03L418.233 1052.25L417.69 1052.52L417.225 1052.41L416.178 1053.41L416.643 1054.19L416.411 1054.54L415.558 1054.69L415.79 1055.35L414.821 1056.25L413.735 1056.75L413.231 1056.56L412.882 1056.09L412.339 1056.4L411.719 1056.09V1055L412.417 1054.62L411.951 1054L411.098 1053.34L411.408 1052.41L410.904 1051.44L410.168 1050.62L409.314 1050.27L407.569 1050.85V1051.82L408.19 1053.41L408.112 1057.37L407.569 1057.68L406.561 1057.37L406.251 1056.48L406.057 1053.96L405.475 1053.41V1051.2L404.118 1051.51L402.141 1052.13L401.481 1053.53L401.171 1054.62L400.008 1054.38L399.193 1053.22V1051.78L399.853 1051.36L401.171 1051.09L400.706 1049.96V1049.53L401.326 1048.18L401.559 1046.94L401.055 1045.85L399.891 1046.08L398.767 1045.97V1044.96L400.706 1044.65L400.667 1043.99L399.814 1043.37L398.767 1043.02L397.991 1043.72L396.673 1043.68L395.626 1042.24V1040.5L396.169 1038.36L397.991 1038.13L399.581 1038.71L399.969 1037.94L402.916 1038.09L404.196 1038.48L405.088 1038.95L405.631 1037.82L405.282 1036.89L403.653 1035.69L402.722 1036.08L401.559 1035.96L401.985 1035.11L401.21 1034.64L401.947 1033.67L400.551 1031.96L399 1031.38L399.155 1030.18L397.061 1029.52L396.634 1028.74L395.897 1029.25L395.626 1028.82L396.014 1028.01L395.471 1027.89L394.967 1028.51H393.338L392.601 1028.12L391.671 1028.82H390.895L390.119 1027.89L388.84 1027.35L387.017 1026.77L387.134 1026.18L386.668 1024.63L387.832 1024.98L388.84 1025.29L389.305 1024.48L388.064 1024.01L386.862 1023.12H386.048L385.117 1022.23L385.544 1021.3L386.746 1021.1L386.048 1020.44L385.427 1020.29L384.652 1019.47L383.993 1019.86L382.907 1018.74L383.915 1017.84L383.721 1017.46L382.364 1017.53L381.472 1016.99L382.635 1016.1L383.644 1015.59L383.178 1015.32L381.782 1015.25L382.015 1014.47L381.239 1013.89L380.968 1013.03L381.394 1011.91L380.968 1011.75L380.154 1012.14L379.145 1011.64L378.137 1010.67L378.835 1009.66L379.766 1008.65L379.378 1007.99L378.564 1008.42L377.672 1009.12L376.353 1010.05L375.035 1010.47L374.027 1008.5L373.406 1006.95L373.872 1006.01L375.074 1006.71L375.81 1006.09L376.353 1006.25L377.013 1007.6L378.06 1007.64V1006.83L377.594 1006.17L377.013 1005.32L377.206 1005.01L378.176 1004.77L378.137 1003.84L377.4 1003.34L377.206 1002.02L377.594 1001.24L377.439 1000.04L375.966 999.032L375.927 996.744L376.586 995.696L376.237 994.998L377.051 994.572L377.129 993.641L376.198 993.059L376.508 992.244L376.392 991.468L375.81 991.119L376.237 989.723L376.625 989.18L376.315 987.59L376.625 985.417L377.284 985.146L378.641 985.34H379.3L379.921 984.913L380.309 984.331L380.619 984.913L379.805 986.232L379.688 986.62L379.029 986.426L378.292 986.387L378.486 986.93L378.874 987.628L378.37 988.792L377.982 989.801L378.564 990.887L379.223 992.322L380.309 993.757L381.317 994.494L381.239 995.696H379.998L380.076 996.395L381.356 996.938L381.162 997.713L380.076 997.015L379.533 997.713L380.076 998.45L380.464 999.808L381.007 1000.97L382.248 1001.05L383.295 999.808L384.497 999.032L385.66 998.955L385.699 999.381L384.846 999.886L382.674 1001.79L382.248 1002.37L381.472 1003.26L382.325 1004.93L381.86 1006.25L382.635 1006.52L383.837 1007.06L384.186 1006.25L385.272 1005.94L386.513 1006.4L387.599 1005.47L388.258 1004.73L388.685 1004.77L389.77 1005.78L391.399 1006.48H394.346L395.587 1008.11L397.255 1010.09L399.698 1012.03L402.257 1013.38L405.088 1014.74L406.6 1015.79L408.81 1017.81L411.021 1018.97L411.951 1019.55L413.619 1021.03L417.303 1021.14L417.846 1021.06L419.009 1022.31L420.56 1022.77L424.205 1024.63L428.005 1026.26L430.681 1026.42L431.495 1027.74L432.659 1028.43L434.171 1028.82L435.296 1029.64L435.528 1030.53L436.847 1031.92L436.885 1032.7L437.7 1032.86L438.786 1033.75L439.561 1033.9L440.026 1035.07L440.647 1035.11L441.19 1034.64L442.276 1035.76L441.965 1036.73L442.547 1037.59L443.633 1038.36L444.176 1038.17L444.059 1037.43L445.649 1036.62L452.009 1034.68L454.723 1033.79L455.189 1032.7L457.825 1032.24L460.462 1031.38L464.728 1031.3L467.559 1029.75L471.553 1029.91L472.561 1030.37L472.251 1031.42L473.414 1031.92L474.073 1030.8L476.206 1029.21L478.106 1028.82L480.859 1029.44L482.178 1027.97L483.807 1026.11L486.366 1025.21L488.537 1023.66L488.46 1021.45L489.352 1021.03L489.042 1020.21L488.499 1019.2L489.08 1018.27L488.305 1017.22L488.227 1015.56L488.848 1014L489.352 1012.61L490.166 1012.26V1009.89L490.903 1008.73L491.019 1006.98L491.446 1005.35L491.95 1004.15L493.772 1001.9L494.044 1000.86L493.734 999.963L492.958 998.799L491.601 998.334L491.64 997.791L494.121 995.115L494.587 993.912L494.47 992.283L493.656 992.71L492.803 991.507L492.997 990.654L492.183 989.995L491.019 989.258L490.67 988.482L491.717 987.085L493.152 985.767L494.277 985.611L495.44 986.775L496.409 986.698L497.456 986.891L497.573 986.348L496.215 985.301L496.138 984.331L497.146 983.168L496.836 980.802L497.146 979.871L496.72 978.591L497.185 977.194L497.689 975.022L498.309 974.518L497.767 973.975L497.844 973.199L499.473 972.035L500.791 972.695L501.257 972.035L500.908 971.337L502.187 970.484H502.846L503.079 970.368L503.312 969.243L504.553 968.079L504.979 967.071L506.763 966.217L508.159 965.209L509.439 965.17L510.137 964.317L509.633 963.424L510.175 962.804L511.067 962.106L510.408 961.252L509.865 960.089L510.175 959.352L511.416 958.964L511.804 957.917L512.076 956.986L513.316 956.714L514.131 956.287L515.527 954.193L517.039 952.874L518.241 952.447L518.862 953.533L519.715 953.146L520.762 951.594L522.352 951.167L523.593 950.857L524.756 951.09L528.323 950.624L529.952 950.314L530.728 949.267L532.007 948.685L533.752 948.258L535.459 948.064L534.295 947.211L535.071 945Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M384.031 1027.54L386.203 1029.91L387.134 1030.76L388.297 1032.24L390.352 1032.08L390.585 1031.15L390.197 1029.91L388.724 1028.59L388.297 1028.94L387.909 1028.36L388.064 1027.54H386.901L386.203 1027.77L385.04 1027.31L384.613 1026.38L383.799 1025.95L384.031 1027.54Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M378.447 1017.65L378.913 1017.11L379.727 1017.38L379.998 1018.19L380.696 1018.43V1019.47L379.572 1018.74L378.447 1017.65Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M373.135 1003.07L373.406 1002.6H374.182L373.794 1001.75L373.949 1001.13L375.074 1002.56L376.198 1004.38L376.043 1005.32L374.802 1004.19L373.6 1004L373.135 1003.07Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M368.482 981.849L367.784 981.383L367.164 982.237L366.466 984.409L367.086 985.922L367.28 987.279L368.056 987.085L367.901 985.767L368.482 985.146L368.327 983.517L368.094 982.819L368.482 981.849Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M376.625 982.47L377.517 981.228L378.603 981.577L378.913 980.569L379.533 980.065L380.386 979.948L380.619 979.25L381.472 979.638L380.891 980.84L379.882 981.888L380.929 982.314L381.278 983.013L379.844 983.633L378.797 983.827L378.448 982.896L377.672 982.819L376.625 982.47Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M380.619 987.279L381.162 987.745L380.619 988.908L381.162 989.723L382.248 988.676L383.023 988.908L383.256 989.956L383.993 989.723L384.497 989.064L385.234 989.956L385.079 990.925H384.07L383.76 990.46L383.062 991.236L383.101 991.973L382.093 992.438L381.201 991.973H380.038L379.495 990.848L379.301 989.025L379.921 988.094L380.619 987.279Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M366.776 988.753L367.125 989.18L367.667 988.947V989.451L367.047 989.956V991.042L367.125 991.895L366 992.71L366.349 993.485L366 994.067L366.465 994.416L366.853 993.718L367.163 992.942L368.482 992.167V990.732L368.365 989.258L367.9 988.21L367.241 988.404L366.776 988.753Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M373.678 997.054L374.221 996.395L375.113 997.519L374.802 998.334L374.415 997.519L373.678 997.054Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M367.241 971.105L367.823 971.648L368.676 971.376L368.249 970.484L368.947 969.049L367.668 970.096L367.241 971.105Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                  <path
                    d="M554.383 1175.83L554.887 1174.94L556.244 1175.36L557.369 1174.59L557.873 1173.77L558.842 1174.24V1175.13L558.416 1175.6L559.23 1176.61L558.687 1177.34L557.524 1176.06L556.322 1176.49L555.313 1176.3L554.383 1175.83Z"
                    className="antarctica"
                    onMouseEnter={() => highlightContinent("antarctica")}
                    onMouseLeave={() => removeHighlight("antarctica")}
                    // onClick={() => selectContinent("antarctica")}
                  />
                </g>
                <g clip-path="url(#clip3_338_3)">
                  <path
                    d="M1334.6 673.012L1335.32 671.681L1336.08 673.925L1334.6 673.012Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1344.86 661.984V660.501L1346.42 662.365L1344.86 661.984Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1340.87 656.09V654.531L1342.24 655.33L1340.87 656.09Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1337.11 649.321L1338.36 648.941L1336.58 646.659H1336.08L1337.11 649.321Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1333.54 641.868L1334.6 640.879L1335.32 644.074L1332.7 643.085V640.157L1333.54 641.868Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1391.45 658.676L1394.19 656.965L1393.2 655.33L1391.45 653.618L1389.51 654.113L1387.54 655.33L1386.97 657.459L1389.51 658.106L1391.45 658.676Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1393.69 649.321L1394.19 651.641L1395.97 650.386H1398.1L1400 647.61L1396.35 648.903L1393.69 649.321Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1270.34 590.151L1270.95 589.581L1272.21 591.482L1272.85 591.748L1273.95 593.384L1275.78 595.475L1276.69 595.817L1277.53 597.605L1276.2 598.403L1273.95 596.92V595.475L1272.47 594.22L1271.37 593.422L1270.8 591.14L1270.34 590.151Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1280.45 597.985L1282.81 600.152H1283.57L1283 598.403L1281.4 597.985H1280.45Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1282.5 604.069L1283.57 603.347L1283.91 604.906L1284.97 604.487H1286.04L1286.99 606.693L1285.73 605.704H1283.83L1282.5 604.069Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1290.98 602.472L1293.79 604.792L1295.65 605.59L1296.07 606.693L1296.6 606.313L1297.48 607.111L1297.67 606.693L1295.77 604.411L1291.62 602.472H1290.98Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1296.6 612.207L1297.67 613.462L1299.45 613.69L1300.97 614.108L1302.42 613.576L1300.33 611.751L1298.5 611.408L1296.91 611.903L1296.6 612.207Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1306.03 616.58L1306.48 617.759L1307.89 618.025L1308.69 618.9L1309.79 618.595L1309.07 617.341L1307.7 616.846L1306.03 616.58Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1305.27 612.473L1306.03 611.713L1304.39 610.686L1302.91 608.746L1302.68 607.111L1302.04 606.123L1301.39 606.389L1302.07 607.872L1302.11 609.317L1303.06 610.534L1305.27 612.473Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1146.39 563.989L1148.02 565.282L1150.91 564.369L1149.31 563H1147.64L1146.39 563.989Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1174.01 567.449L1174.89 568.97H1176.45L1176.75 568.21L1175.38 567.791L1174.66 567.449H1174.01Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1174.01 571.366L1175.95 572.241L1178.04 572.545V571.67H1176.03L1174.01 571.366Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1165.43 594.753V597.985L1167.25 597.3L1168.73 593.84L1167.82 592.167L1167.06 591.748L1166.26 593.84L1165.43 594.753Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1144.94 623.843L1147.57 624.071L1149.54 624.376L1151.71 622.626L1151.48 621.638H1149.39L1147.38 622.132L1145.51 622.474L1145.06 623.007L1144.94 623.843Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1177.55 635.327L1178.04 634.909L1179.33 635.746L1180.02 637.001H1178.5L1177.55 635.327Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1230.25 573.724L1230.94 573.039L1232.84 573.381V574.142H1230.86L1230.25 573.724Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1208.25 618.405L1206.62 621.409L1205.82 624.566L1204.22 627.722L1205.21 628.254L1205.02 629.433L1204.22 629.928V631.715L1204.68 633.008L1203.43 634.795V635.517L1204.03 636.886L1203.81 640.575L1203.43 644.264L1202.82 648.219L1200.99 651.717L1200.31 654.189L1199.85 654.797L1195.75 655.71L1193.85 654.303L1191.46 653.314L1190.51 651.451L1188.19 650.804L1186.02 649.702L1184.01 647.458L1181.65 646.355L1178.69 645.861L1172.11 639.853L1174.58 636.202L1175.15 634.225L1174.47 632.133L1176.56 630.726L1177.66 629.319L1179.83 626.771L1176.86 625.668V626.771L1176.37 627.38L1175 627.456L1174.77 626.087L1171.62 625.935L1170.94 626.429L1170.1 626.163L1169.19 625.364L1168.24 625.136L1166.03 625.783L1165.54 624.68L1163.87 624.261L1161.36 624.071L1160.45 623.653L1159.27 622.284L1158.09 622.55L1157.48 621.79L1156.72 621.181L1155.89 621.257L1155.39 621.904L1156.19 621.866L1156.8 622.208L1157.56 623.197L1158.17 624.376V625.63L1156.42 626.353L1153.99 626.771L1151.94 626.277L1149.62 625.973L1148.86 627.836L1147.34 627.342L1144.87 632.627V633.388L1143.65 633.502L1141.41 637.913L1143.35 639.7L1142.85 641.982L1141.87 640.955L1141.11 640.993L1139.62 641.184L1138.22 640.157L1134.65 641.754V640.955L1135.03 640.081L1134.65 639.206L1131.07 635.327L1128.26 634.491L1127.46 635.974L1125.26 636.506L1124.46 635.632L1123.82 638.788L1121.12 638.902L1119.9 639.777L1120.93 642.058H1120.4L1119.9 641.602L1118.04 641.754L1117.62 643.047L1115.87 643.769L1116.52 645.443L1116.71 646.773L1115.87 648.561L1115.46 649.131L1113.48 647.534L1112.26 648.028L1111.05 650.234L1113.18 652.325L1112.76 652.934L1112.07 652.82L1111.35 654.493L1109.79 652.135L1109.11 650.728L1108.58 650.044L1107.4 649.435L1105.54 651.451L1104.44 653.2L1104.82 655.71L1105.23 657.687L1103.3 659.665L1101.74 661.186L1100.56 663.772L1099.23 665.369L1096.76 666.662L1090.79 668.449L1088.89 667.726L1086.35 669.438L1082.05 671.111L1079.55 672.023L1076.89 671.187L1073.81 673.202L1072.02 674.115L1070.43 675.902L1068.45 676.891L1065.83 678.07L1064.84 679.781L1064.08 681.834L1062.98 681.53V680.047V677.956L1062.18 678.678L1060.81 682.253L1061.65 683.47L1061.15 685.713L1060.81 688.299L1059.79 689.326L1059.29 691.303L1059.98 693.699L1060.77 695.562L1061.88 697.768L1063.24 701.152L1063.55 702.711L1062.94 703.928L1062.29 702.863L1061.46 702.331L1061.38 703.053L1061.76 703.928L1061.27 704.803L1060.09 704.422L1059.67 702.939L1058 702.521L1058.72 703.662L1060.39 705.449L1061.8 708.187L1062.94 710.431L1063.24 713.093L1065.26 716.059L1065.83 718.568L1067.16 720.736L1067.46 725.223L1068.53 728.379L1069.21 730.395L1071.3 734.464L1071.6 738.837L1070.84 740.624V743.894L1070.12 746.404L1067.42 747.469L1067.35 749.294L1068.03 750.663L1070.31 751.348L1071.83 752.641L1072.82 753.972L1074.72 754.58L1075.86 755.227H1078.86L1080.84 755.683L1082.43 755.265L1084.71 754.276L1086.73 752.298L1087.45 751.386L1089.88 751.462L1090.91 749.294L1092.62 748.572L1096.57 748.077L1101.02 747.621L1104.02 747.925L1104.32 749.294L1105.88 748.192L1108.96 748.115L1109.57 748.8L1110.78 748.61L1112.38 747.279L1113.44 745.53L1114.35 743.248L1116.33 742.031L1117.93 741.537L1120.81 740.13L1124.31 738.152L1125.68 738.076L1128.64 738.228H1130.66L1133.51 737.278L1137.04 735.681L1139.21 734.35L1143.46 734.274L1146.39 733.779L1148.25 734.35L1151.1 733.893L1153.19 734.692L1155.32 735.871L1156.38 736.859L1158.97 736.175L1160.3 737.658L1163.18 737.278L1164.86 739.521L1166.15 739.94L1166.72 741.157L1165.65 742.031L1166.76 743.438L1168.43 743.894L1169.34 746.176L1170.94 747.887L1172.08 749.979L1172.8 752.679L1172.99 754.352L1174.47 755.074L1174.66 754.276L1174.28 753.858L1174.47 752.793L1175.8 751.196L1177.24 749.104L1179.14 747.621L1181.84 745.606L1182.03 744.503L1184.01 742.411L1184.43 739.711L1185 741.461L1185.53 744.047L1184.54 744.237L1184.92 745.225L1185.53 746.024L1183.13 748.8L1182.64 754.542L1180.32 754.884L1179.87 755.683L1180.55 756.367H1182.03L1184.05 755.949L1184.69 753.249L1185.79 750.093L1186.52 750.511L1187.31 752.374L1188.42 753.934L1187.69 757.166L1186.44 758.915L1186.93 759.219L1188.19 758.915L1189.48 758.117L1190.01 759.219L1191.95 760.132L1193.05 761.007L1194.19 763.022L1195.07 765.684L1194.19 767.966L1195.18 769.867L1196.43 771.084L1197.54 773.061L1199.06 773.974L1199.25 774.43H1200.99L1201.72 775.077L1202.63 776.636H1204.11L1205.4 775.951L1207.19 776.255L1208.97 777.016L1210.49 778.043L1212.62 778.537L1214.26 779.336L1216.04 777.853L1217.41 776.94L1218.4 774.734L1219.73 773.936L1220.6 773.289L1221.7 774.582L1220.91 777.548L1222.01 776.94L1223.26 775.571L1223.98 775.837L1224.29 777.853L1225.05 778.651L1227.25 779.716L1228.73 778.955L1230.75 778.651L1232.65 776.712L1234.74 774.43L1235.23 773.441L1238.27 773.137L1240.55 772.567L1243.78 772.985L1246.56 771.35V766.482L1247.73 762.338L1248.72 758.421L1250.09 756.063L1251.04 753.363L1251.38 750.967L1252.83 749.37L1253.21 746.1L1254.5 745.301L1255.98 742.83V741.917L1259.29 739.483L1259.78 738.647L1259.4 737.506L1261.53 734.464L1262.59 730.965V729.368L1262.29 728.075L1263.05 725.489L1264.26 721.116L1265.14 718.112L1265.4 717.009L1265.1 713.967L1264.15 711.724L1263.01 709.708L1262.63 708.719L1263.01 707.503L1262.74 705.829L1262.67 700.506L1264.07 696.589L1263.81 695.03L1263.28 695.106V696.665L1262.17 699.365L1261.68 698.148L1259.74 696.209L1259.67 694.992L1257.96 693.889L1257.01 692.406L1256.21 690.771L1255.33 689.744L1253.4 689.288L1252.41 687.348L1250.93 687.653L1250.7 682.481L1248.76 681.682L1246.9 680.541L1246.67 680.884L1246.97 682.177L1244.5 679.705L1244.28 677.575L1243.55 675.408L1243.06 673.963L1241.31 673.164L1240.44 671.149L1239.26 669.514L1237.21 667.612L1233.33 666.357L1233.64 665.673L1234.09 665.521L1233.64 665.064L1231.89 664.342L1229.72 663.581L1228.13 661.87L1226.87 659.208L1226.61 657.649L1226.99 655.748L1226.91 654.303L1225.69 651.831L1224.55 650.5L1223.49 648.637L1223.22 646.051L1222.65 643.769L1222.35 643.085L1222.73 642.324L1222.96 640.955L1221.25 639.738L1219.12 638.255L1218.93 637.001L1217.14 637.837L1216.16 638.788L1214.71 637.343L1214.03 634.415L1213.84 632.551L1214.14 632.019L1212.93 629.319L1212.43 627.494L1211.52 627.037L1211.86 625.478L1210.15 623.425L1209.96 620.383L1208.56 618.405H1208.25Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1373.89 796.182L1375.49 797.436L1376.86 798.235L1380.01 796.182L1381.76 792.569L1384.61 788.652L1385.86 785.382L1384.91 783.328L1386.28 782.112L1387.95 781.123H1389.85L1390.08 779.602L1392.17 776.826L1392.97 772.339L1390.42 771.73L1388.07 774.164L1386.09 774.544L1382.25 772.833L1380.66 771.73L1379.71 769.411L1379.59 767.471L1378.11 765.988L1378.04 769.715L1377.09 769.411L1373.89 765.988L1373.78 764.239L1374.12 763.707L1373.06 761.919L1372.49 760.816L1372.87 759.98L1372.18 758.725L1371.88 757.66L1371.46 756.862L1369.6 755.645L1367.17 755.341L1365.08 753.021L1364.58 752.641L1364.47 753.325L1366.22 755.607L1366.41 757.622L1367.74 759.447L1369.56 761.995L1370.28 762.87L1371.5 763.022L1371.77 763.897L1371.31 764.619L1372.26 766.406L1373.21 767.699L1373.89 767.433L1374.39 768.574L1373.89 768.992L1374.46 772.034L1374.77 774.088L1374.46 775.951L1373.67 777.434L1373.32 779.982L1371.88 781.351L1369.41 782.454L1369.26 783.024L1369.75 784.127L1371.12 784.659L1372.41 785.154L1373.36 786.18L1375.3 786.751L1376.48 789.032L1376.4 791.58L1373.89 796.182Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1178.04 760.626L1178.76 761.615L1183.06 761.121L1184.2 760.132L1182.56 759.219H1179.52L1178.04 760.626Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1236.11 787.169L1236.79 785.99L1238.31 787.778L1237.7 789.565L1236.11 787.169Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1219.88 792.455L1222.39 792.873L1225.16 794.47L1227.25 795.155L1229.84 795.535L1230.86 794.661L1234.59 794.622L1235.23 793.976H1236.11L1236.41 792.949L1237.21 793.254L1238.08 795.535V800.289L1236.68 802.304L1236.11 805.384V806.981L1234.02 807.362L1232.46 810.328H1231.74L1231.51 811.43L1230.22 812.343L1229.23 812.077L1226.64 810.86L1224.59 808.654L1223.49 806.563L1222.58 802.988V800.517L1221.1 798.805L1219.54 795.041L1219.88 792.455Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1215.59 788.386H1216.42L1216.84 785.344H1215.59V788.386Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1365.53 814.016L1363.6 812.039L1363.9 809.719L1366.22 807.285L1367.66 805.156L1370.55 800.631V798.425L1370.21 797.322L1371.27 795.953L1369.9 795.459L1368.65 794.204L1367.93 795.383L1365.38 795.953L1365.15 793.634L1363.6 793.33L1363.1 792.075H1362.42L1361.05 793.253L1360.06 796.828L1358.66 799.376L1356.45 803.026L1355.54 805.46L1353.41 807.59L1351.59 808.426L1348.97 811.468L1345.28 813.598L1342.73 815.309L1340.83 815.842L1340.04 817.781L1339.12 818.047L1338.14 819.796L1335.06 822.496L1333.42 824.702L1332.32 827.82L1332.74 828.581L1332.32 829.607L1332.66 830.482L1333.73 831.28H1335.51L1336.54 830.862L1337.34 831.052L1338.44 832.383H1340.38L1342.09 834.285L1343.11 833.562L1344.48 834.018L1346.46 834.285L1347.67 833.752L1349.69 830.824L1352.84 828.428L1353.64 824.664L1355.31 820.823L1355.73 818.732L1357.1 816.45L1361.32 814.13L1361.89 813.446L1363.56 813.902L1364.28 814.092L1365.53 814.016Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1338.14 835.502H1339.35V837.023L1340.19 837.251V837.783L1336.88 839L1337.45 837.251L1338.14 835.502Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1148.02 567.791H1149.05L1150 569.389L1151.06 568.286V567.183L1153.76 566.879L1155.62 565.053L1158.89 565.586L1161.21 566.422L1163.64 566.879L1165.24 567.449V568.932L1166.22 570.225L1165.24 572.545L1165.84 573.838V575.739L1167.1 577.526H1167.9V576.195L1168.39 576.157L1168.62 578.135L1169.57 579.504L1170.21 580.492H1172.84L1175.08 577.907L1176.86 575.967L1177.21 574.94L1181.31 574.066L1182.68 571.518L1185 570.681L1189.1 572.583L1194.38 575.207L1196.74 575.549L1199.4 575.929L1201.94 576.994L1207.11 579.123L1210.27 580.492L1212.77 580.835L1215.59 582.166L1217.41 582.812L1219.73 584.181L1222.08 585.474L1223.49 586.158L1225.28 588.326V591.254L1228.7 592.129L1231.39 593.308L1234.78 595.171L1235.88 596.806L1235.38 597.3H1233.98L1231.85 595.969L1231.13 597.3L1231.77 599.24L1232.65 601.179L1234.55 602.7L1236.83 604.64L1237.74 606.085V607.568L1239.41 609.621L1240.7 609.925H1243.4V610.914L1243.1 612.055L1244.77 612.777L1246.97 615.097L1247.85 615.553H1249.63L1249.1 616.428L1249.25 617.493L1247.96 618.405L1246.97 617.188L1245.61 616.428L1242.76 615.82L1241.81 615.363L1236.18 614.907L1233.98 613.158L1231.47 610.876L1228.51 606.655L1226.3 604.069L1223.79 603.309L1220.83 602.662L1218.47 601.826L1217.18 603.118L1216.57 603.08L1215.4 602.32L1214.48 604.64L1214.22 606.883L1211.1 605.78L1210.8 606.503L1212.66 607.796L1213 609.165L1210.72 610.42L1208.94 610.99L1206.88 610.344L1204.15 610.001L1201.98 610.23L1199.93 608.708L1197.92 606.921L1195.94 604.754L1193.2 604.411L1190.92 604.83L1190.09 606.199L1188.53 606.085L1188.11 605.628L1187.35 606.047L1186.14 606.503L1184.5 605.818L1184.24 604.906L1185.49 602.738L1186.82 601.521L1188.61 601.331L1190.13 601.559L1190.16 600.799L1188.87 599.734L1189.86 598.213L1189.33 597.795L1187.69 595.475L1186.36 592.319L1185.76 591.178L1184.08 590.151L1183.51 589.505L1178.57 587.489L1174.51 585.854L1171.7 585.474L1170.06 585.094L1168.58 583.002L1166.87 583.04L1166.3 583.535L1165.58 583.116L1164.97 582.318L1164.32 582.128L1163.07 580.873L1161.89 582.964L1160.3 583.953L1159.31 583.573L1158.36 581.861L1158.81 579.96L1157.33 578.401L1156.38 578.021L1154.79 578.059V577.108L1156.46 576.652L1157.83 577.07L1158.47 577.526L1159.57 576.652L1161.21 575.701L1162.46 576.195L1164.21 575.853L1164.36 574.788L1163.11 573.952L1161.82 574.484L1160.52 574.028L1158.21 574.332L1156.08 574.37L1155.01 573.305L1154.56 571.48L1152.92 570.872L1151.1 570.339L1149.5 570.301L1148.78 568.97L1148.02 567.791Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1241.58 593.764L1244.28 594.638H1247.66H1250.43L1252.67 593.764L1254.38 591.444L1257.5 590.341V589.087L1258.79 587.261L1257.65 585.056L1256.66 584.561L1255.18 585.094L1255.56 586.691L1255.68 588.288L1253.78 588.668L1251.8 591.33L1248.34 591.748L1247.54 590.227L1246.67 590.265L1246.56 591.444L1243.14 591.368L1238.92 591.748L1239.49 592.737L1241.58 593.764Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1251.42 577.222V576.462L1254.27 578.059L1257.04 579.466L1259.25 581.481L1261.26 583.268L1262.29 584.295L1262.63 586.006L1262.25 586.539H1261.07L1260.73 585.322L1260.81 584.181L1258.79 581.899L1257.46 580.454L1254.73 578.933L1252.41 577.678L1251.42 577.222Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                  <path
                    d="M1319.48 669.818L1319.78 668.829L1322.48 670.692L1323.47 671.681L1325.06 672.404L1325.98 674.001L1327.46 675.18L1328.86 676.092L1330.5 676.967L1331.83 678.298L1333.54 679.173L1333.92 680.656L1332.21 680.085L1330.54 679.857L1329.85 678.792L1328.45 678.07L1327.65 677.385L1326.17 677.081L1325.06 676.206L1323.58 674.723L1323.09 673.621L1321.61 672.632L1319.48 669.818Z"
                    className="oceania"
                    onMouseEnter={() => highlightContinent("oceania")}
                    onMouseLeave={() => removeHighlight("oceania")}
                    onClick={() => selectContinent("oceania")}
                  />
                </g>
                <path
                  d="M638.69 324.929C638.022 324.804 637.354 324.679 636.686 324.513H635.016L634.599 325.388H633.389L632.846 326.429H631.719L632.929 324.513L635.1 321.637L638.439 319.096H640.985L642.989 317.262H641.486L640.526 317.887L638.94 316.845H637.02L636.853 315.97H633.556L633.096 314.304L635.1 313.012L636.853 312.47L637.354 309.928L636.978 308.011L634.891 308.553V308.011L636.185 306.803L635.643 305.928L636.06 304.428L637.396 305.803L639.775 305.553L640.025 304.928L641.778 305.72L641.445 303.553L642.488 300.469L640.777 298.052L639.733 296.386L640.234 294.261L639.65 293.76L638.272 294.594L636.811 294.344L635.601 295.052L634.557 294.261H633.305L633.472 293.052L634.808 291.219L635.309 289.552L634.39 287.968L635.142 286.802L634.349 286.26L633.305 287.468L632.596 286.552L631.969 286.718L631.51 290.427L630.968 290.052L631.218 286.51L631.427 285.552V283.468L632.971 281.343L632.762 280.635L631.635 281.676L630.717 282.635V283.593L629.59 283.885L628.672 283.676L629.048 282.843V282.218L630.508 280.635L631.051 278.843L631.26 277.593L630.884 276.634L630.592 275.301L631.302 273.759L630.801 273.092L631.26 272.592L632.762 272.217V270.551L632.345 269.967L632.721 269.467H633.639L633.764 267.425H638.397L638.94 267.009L639.733 266.717H641.069L641.361 268.05L640.318 268.967L637.229 272.342L637.73 272.801L637.354 273.384L636.978 273.967L637.145 275.218L638.105 274.634L640.151 273.926L642.488 273.842L645.702 274.009L646.495 275.176L645.368 276.759L645.285 278.176C645.285 278.176 644.575 279.759 644.575 279.884C644.575 280.01 643.448 281.385 643.448 281.385L642.53 282.51H641.403L641.236 283.26L641.737 283.635L642.196 283.551L642.613 283.843L642.697 284.426L641.57 284.343L641.194 284.802L640.151 285.927L640.777 286.427L642.53 286.76L644.325 286.635L645.493 287.677L646.37 289.302L647.246 290.177L647.539 292.385L648.666 294.719L649.292 296.511L650.544 297.761L652.13 298.344L653.174 299.636L653.341 303.178L654.05 304.011L654.676 304.72L655.052 306.095L654.05 307.428L654.593 308.136L656.471 308.011L657.556 307.303L659.477 307.803L660.478 308.887V310.887L660.103 312.387L658.809 314.054L657.515 315.637L655.636 316.845L655.887 317.762L657.64 318.346L659.101 317.971L659.477 318.387L659.143 319.179L655.135 321.596L654.301 321.429L653.633 321.012L650.294 321.596L648.749 321.096L648.04 321.512L647.413 321.887L646.453 321.637L644.7 322.346L642.154 321.721L640.568 322.221L639.399 323.346C639.149 323.846 638.857 324.304 638.606 324.804L638.69 324.929Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M628.506 292.052L629.8 295.261L631.22 296.302V297.553L628.506 300.344L628.089 300.928L628.506 303.47L629.007 306.595L628.506 309.762L627.63 311.554V312.512H625.459H624.666L623.08 312.97L620.743 315.304L617.863 316.804H614.982V315.846L613.605 316.096L614.231 315.095L612.979 315.22L612.395 314.387L613.605 313.137L612.937 312.679L613.355 312.387L614.356 312.262L614.148 311.387L614.732 310.595L616.109 310.095L615.942 309.47L614.022 309.928L614.231 309.345L615.066 308.553L615.108 307.678L616.068 307.053L615.901 306.22L614.649 306.095L614.064 305.553L612.728 305.47L613.021 304.178L612.603 303.511L614.022 303.011L615.4 302.053L615.108 300.928L613.939 301.178L613.897 300.261L614.106 299.553L613.48 298.844L614.649 298.344L616.276 298.719L617.153 299.219L618.739 298.969L620.325 297.469L620.951 296.261L620.075 295.677L619.407 295.552L620.158 294.552L619.95 293.594L621.202 292.552L622.913 291.844L623.331 292.386L623.706 291.844L624.249 291.51H624.958L625.793 292.344L628.506 292.052Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M629.759 277.968L630.635 277.176L629.759 276.843L629.133 276.676L628.966 275.092H628.507L628.632 274.134H627.922L627.714 275.259L627.171 275.843L627.338 276.384L628.131 276.343L628.381 277.468L629.759 277.968Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M625.458 270.842L626.585 269.092L627.921 268.134L628.756 268.592L627.712 270.051L627.795 271.634L626.46 272.301L625.458 270.842Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M562.221 222.297H565.101L567.731 221.88L572.531 225.256H573.825L575.912 226.422H578.124L579.961 225.797L582.048 223.506L583.718 223.089L584.469 221.88L585.721 222.63L586.765 221.88L589.645 219.089L593.026 218.213L594.695 216.463V215.255L596.908 214.088L597.951 212.713L596.448 211.421H598.369V210.338L597.868 209.046L598.369 207.088L597.742 206.004L595.948 205.296L595.321 204.462H593.61L593.694 201.837L592.734 201.129L592.692 199.462L590.897 200.171L589.979 198.837L589.06 197.045L587.391 197.462L587.266 200.254L585.345 200.962L584.218 200.421L583.342 202.296H582.215L581.088 200.712H580.295V201.962L580.837 203.837L580.587 204.671L579.752 203.046L578.667 202.212L577.623 200.129L575.411 202.171L575.662 204.462L574.576 204.796L572.155 200.879L571.237 201.296L571.905 203.546L571.78 206.171L569.526 205.754L568.107 209.38L567.647 207.796L567.147 205.963L566.27 204.671L567.564 203.129L566.729 201.962L565.602 201.421L562.847 197.42L560.844 197.67L560.218 198.42L560.76 198.92L561.845 198.42L562.847 199.254L561.219 199.921L561.428 200.421L562.847 201.087L563.306 203.129L562.305 202.087L561.637 201.962L561.261 202.379L559.717 200.171L558.798 200.587L558.423 201.754L557.546 201.837L558.757 203.129L557.546 203.296L558.506 204.004L559.717 204.671L559.049 205.671L556.795 204.337L557.087 205.588L556.795 206.296L555.376 205.671L555 206.588L557.087 207.588L558.924 206.588L560.969 206.004L562.054 205.879L562.639 205.338L563.557 206.088L565.477 207.171L565.018 208.088L562.764 209.505L564.475 210.38L565.602 209.546L565.644 211.13L564.684 211.755H562.138L559.884 212.421L557.713 212.671L557.546 213.838L558.506 213.296L560.218 213.171L563.265 213.38L563.974 214.588L563.933 216.172L565.727 215.005L565.435 216.547L565.811 216.963L567.23 217.422L565.727 218.839L565.644 220.089L564.016 221.13L562.722 221.38L562.012 221.172L561.845 221.714L562.221 222.297Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M900.78 322.137L903.159 321.596L904.119 318.721L901.156 317.304L900.738 316.345H898.651L899.111 315.22L896.856 313.929L889.761 309.22L888.592 306.886V304.553L892.015 296.886L892.223 292.927L889.886 290.177H885.211L878.282 291.969L875.068 290.594L873.356 287.385L871.436 285.593L872.062 281.093L883.082 270.55L883.207 268.217L881.705 264.8L874.15 265.342L871.311 260.425L873.398 256.675L878.24 253.466L883.499 240.423L886.38 222.63L893.559 211.755L910.881 203.546L920.482 196.004L927.828 185.586L929.665 178.669L925.908 172.794L919.313 168.752L914.638 164.918L909.295 162.585L903.201 161.71L901.824 160.668L900.237 161.126L900.071 162.251L898.61 162.751L898.317 164.335L899.904 166.835L899.737 168.46L901.198 169.585L901.114 171.669L899.403 173.46L896.898 173.669L896.397 174.294L897.357 176.002L895.938 177.586L894.352 177.336L893.309 176.336L893.559 174.877L893.768 173.544L894.603 173.252L893.475 171.169L893.35 170.252L891.764 170.752L889.51 172.002L888.007 172.752L887.298 174.335L886.087 175.669L884.668 175.335L883.959 174.669H881.538L880.786 174.294L879.117 175.294L877.948 175.794L876.612 178.086L876.445 179.794L874.859 178.377H874.442L872.981 180.961L872.563 180.336L872.897 179.002L869.6 178.669V177.711L871.228 176.711L872.396 176.627L872.146 175.752L871.687 174.835L871.896 173.21L872.271 172.21L871.812 171.835L871.269 171.127L870.059 171.335L866.386 174.169L867.054 175.335L867.471 176.836L865.801 177.752L865.342 177.294L865.801 176.752L865.593 176.044L864.215 175.544L862.838 175.961L862.128 176.794L859.248 177.752L857.328 179.836L855.867 181.086L853.404 182.544L852.778 183.044H851.693L851.484 183.794L852.152 184.419L851.109 184.711L848.02 185.711L847.644 188.878L847.269 190.67L847.06 192.628L844.889 193.087L843.136 193.628L840.465 193.337L838.92 192.587L838.42 190.712L837.501 189.586L836.082 189.003L835.706 186.961L837.334 185.42V184.003L838.712 183.336L842.051 183.086L842.594 182.544L842.218 181.503L841.801 179.836L840.632 177.711L839.129 176.502L837.167 175.502H834.83H832.492L831.115 175.002L829.696 173.96L829.487 174.294L830.238 175.377L831.324 176.211L832.743 177.377L832.993 178.961V181.419L832.743 183.669L831.866 186.253L831.365 188.295L831.157 189.461L831.449 190.003L832.993 190.628L833.828 192.17L834.162 193.67L833.786 194.253V194.712L834.329 195.254L833.745 196.17L833.077 197.92L832.325 199.546L832.451 200.212L832.785 200.962L832.325 202.087L831.824 201.171L830.614 200.296L829.779 199.837L830.03 199.337L829.529 198.879L828.986 198.67V197.962H827.984L827.275 198.212L825.188 196.837L823.852 198.42L821.974 200.837L820.346 201.546L818.968 201.962L818.175 203.087L817.507 204.296L816.172 205.088L815.086 206.046L814.794 207.213L815.253 208.796L816.714 211.088L818.175 214.297V215.672L817.09 215.963L815.963 214.38L815.17 215.047V216.297L813.709 215.797L811.956 214.672L810.453 214.088L809.076 214.38L808.408 214.963L808.116 214.13L808.658 213.421L807.531 212.921L806.571 212.505V211.421L803.816 210.213L803.149 210.588V212.088L801.771 212.338L802.063 213.547L803.107 215.13L803.9 216.713L805.027 217.63L806.279 216.838L806.989 217.088L807.865 218.422L807.448 219.214L808.158 220.839L807.573 221.755L805.862 223.214L804.192 222.797L802.23 221.672L800.352 221.255L800.143 219.589L798.056 217.88L797.013 218.589L794.675 216.255L794.926 213.213L794.133 212.13L793.84 209.838L792.922 208.463L793.882 206.421L794.383 205.379L793.882 204.421L794.174 203.712L794.842 204.213V203.004L793.924 201.879L792.38 200.421L790.501 199.504L789.541 198.879V197.629L788.706 197.212L788.414 195.962L787.162 194.92L786.244 194.503L785.743 193.462L784.991 192.753L785.325 191.962L784.991 191.253L784.198 190.545V189.795L785.033 189.961L785.451 190.212L786.452 191.045L787.412 192.545L788.832 193.712L789.499 194.253L789.792 193.378L790.793 194.378L792.046 194.754L793.214 195.129L793.59 196.295L794.842 195.545L796.136 196.545L797.722 197.712L799.434 198.212L801.437 198.504L803.316 199.004L805.027 199.504L806.613 200.421L807.782 201.004L810.203 200.754L812.248 200.421L813.918 199.587L815.42 198.879L817.174 197.504L818.467 195.92L819.511 194.545L820.262 193.42L820.596 191.837L820.972 190.17L820.012 189.086L819.553 186.795V185.003L818.092 183.461L816.38 182.544L815.88 181.753L813.751 180.753L810.787 177.752H808.951L808.366 176.627L805.737 173.544L803.399 171.335L800.978 169.543L797.722 167.918L796.261 167.46L794.842 167.71L793.089 167.21L791.67 166.668L789.959 167.127L789.708 168.46L788.581 169.502L788.205 169.127L788.915 168.002V165.626L787.454 165.043L785.158 164.585L783.447 163.293L783.197 162.46L783.864 161.626L784.866 162.668L786.327 163.293L787.287 162.918L787.496 162.043L786.995 161.168H785.534L784.824 160.543L783.906 159.543L783.03 159.751V161.209L782.32 161.418V161.918L782.487 162.71L781.443 162.793L780.734 161.876L779.398 161.334L777.729 161.084L776.56 160.168L776.101 160.418L775.516 161.96L774.389 161.251L774.598 160.584L774.389 159.751L773.429 159.168L772.219 158.251L770.674 157.751L769.255 157.043L769.422 156.042L770.8 156.542L772.469 156.918L774.264 157.418L775.475 157.251L776.602 156.126L777.979 155.292H779.106L779.273 154.251L778.814 153.251L778.188 153.584L777.854 152.876L777.562 152.084L775.6 152.626L775.224 152.084L776.017 151.084L774.932 150.209L774.014 151.042L773.888 149.875L772.553 150.334L771.968 150.084L772.302 149.334L771.05 147.875L770.132 148.667L769.088 150V152L769.297 152.667L768.587 152.792L767.126 152.542L766.751 151.834L767.544 151.042L768.003 150.209L767.043 150.709L766.125 150.875L766.417 150.167L767.001 149.792L766.751 149.25L767.293 148.625L768.17 148.292L768.671 147.959L768.838 147.167L767.711 146.708L767.377 145.5L766.125 146.042L765.457 145.25L765.039 145.625L765.415 146.792L764.288 146.542L763.787 147.042L764.831 148.292L765.165 148.959L763.37 150.5V152.209L762.368 153.334L760.949 154.126L760.782 152.542V150.667L760.531 149.75L761.575 148.709L760.531 147.709L759.571 149.5L759.07 150.959L758.236 152.167L757.025 153.501L756.775 155.709L755.439 157.709L754.27 157.126L754.604 154.917L755.523 152.876L754.938 152L756.107 150.875L756.733 149.625L757.777 148.625L757.484 148.084L756.65 147.375L756.316 148.334L755.314 147.75L753.811 147.042L753.227 148.75L752.183 148.334L751.975 149.042L753.436 149.834L753.06 151.042L752.35 150.5L751.641 151.167L751.891 152.626L750.806 152.459L750.973 151.209L750.388 150.042L749.762 149.5L749.47 150L749.721 151.292L750.096 152L750.263 152.792L749.47 153.959L748.301 155.334L748.134 157.168L748.844 158.501C748.844 158.501 747.717 159.168 747.634 159.209C747.55 159.209 746.34 158.084 746.34 158.084L745.63 156.876L746.047 156.209L744.586 155.792L744.753 156.667L744.378 157.209L743.585 156.417L743.376 155.209L742.541 155.001L741.957 155.876L740.913 155.501L739.703 155.876L740.287 157.251L741.498 157.543L742.625 158.251L742.374 159.293L742.583 160.209L741.331 159.709L739.953 158.668L739.578 159.918L739.077 160.084L738.701 160.834L737.991 160.543L738.284 159.584L737.783 158.376L737.574 159.626L737.365 160.876L737.031 161.876L736.531 162.96L736.948 163.835L736.238 164.085L735.529 164.46L735.362 163.543L735.612 161.71L735.529 160.584L735.904 159.043H735.362L734.569 161.084L733.859 162.251L734.11 163.376L733.442 163.168L732.983 162.251L733.191 161.293L732.356 161.376L730.687 161.835L730.52 161.084L731.772 160.168L732.899 159.043L732.732 158.251H731.981L731.522 158.543L731.062 157.876L729.476 159.209L729.936 160.126H729.268L728.642 161.251L727.598 162.626L727.306 163.168L727.515 163.543H728.683L729.393 163.168L729.476 162.126L729.977 161.96L730.228 163.085L730.645 164.085L730.854 165.085L732.064 165.793L732.231 167.252L731.647 167.835L731.146 167.46L731.313 166.585L730.603 165.668L729.56 164.251L728.516 164.835L729.184 166.502L728.308 166.668L727.807 165.168H727.264L726.68 165.751L726.304 164.835L724.593 163.626L723.716 164.543L723.883 165.418L722.547 166.21V167.002L722.172 167.502L722.422 168.168L722.172 168.502V169.043L723.507 168.293L724.134 167.793L725.511 167.96L726.304 167.043L726.972 168.377L725.428 168.918L724.509 169.627L724.134 171.21L724.342 172.169L723.09 173.419L721.086 174.002L720.126 173.752V172.502L719.083 171.96V173.252L718.039 173.669L717.872 172.544L717.413 171.96L717.789 170.835L716.453 171.419V172.877H715.618L715.076 170.752L714.575 171.002L713.865 172.335L712.947 172.419L711.862 173.544L712.237 174.294L713.531 173.377L714.408 173.21L713.74 174.419L714.867 174.252L715.702 173.544L716.412 173.71V174.502L715.285 175.544L715.118 176.127L713.991 176.211L712.947 176.794L711.904 177.502L710.317 177.711L709.441 178.086L708.356 179.252L707.396 179.836L706.269 180.252L705.642 182.044L707.521 180.919L708.648 179.919L710.234 178.461H711.361L711.486 179.044L712.655 178.252L713.907 177.336L715.535 176.419L716.412 177.377L717.372 176.461L718.624 175.294L719.25 174.835L719.793 176.044L721.629 175.836L723.549 174.96L725.01 175.252L725.428 176.502H723.8L722.088 177.461L721.045 176.586L719.041 177.627L720.377 178.919L719.793 180.711L719.417 181.503L718.832 180.753L718.332 178.544L717.33 179.586L715.744 179.669L715.451 180.669L716.578 180.461L717.497 180.753L718.039 181.628H716.912L715.702 182.253L715.118 182.378L714.617 181.336L713.907 182.253L713.49 183.169L714.241 183.753L715.368 183.169L716.412 183.253L716.495 184.294L715.285 184.544L715.076 184.919L716.286 186.378L715.535 186.503L714.199 185.378L713.031 186.378L712.864 187.545L713.49 188.461L714.992 188.336L715.702 188.753L716.37 189.461L716.078 190.545L715.159 189.67L714.032 189.336H712.697L711.695 189.92L710.359 190.962L709.274 192.545V193.17L709.816 193.628L709.441 194.337L707.396 194.587L706.769 196.879L706.519 197.587L707.103 198.295L708.272 198.754L708.022 199.004H706.895L706.728 200.296L705.142 200.921L705.935 201.754L705.768 202.087L704.849 201.921L704.641 202.212L704.849 203.671L703.388 205.004V205.796L704.682 206.713L704.39 207.379L702.554 207.088L702.303 207.671L702.554 208.796L704.182 210.046L704.056 211.338L702.554 210.005L700.759 211.838L699.381 212.296L699.131 212.755L700.216 213.713L699.924 214.338L697.586 216.213L696.585 217.13L694.957 219.214L694.164 220.797V222.089L692.578 222.755V223.881L693.83 223.297L693.371 224.589L693.788 225.047L694.164 225.631L695.374 224.589L696.543 224.089L697.795 222.797L697.503 221.589L698.713 220.714L699.381 220.547L699.799 221.547L698.296 222.13L698.713 222.505L699.715 222.339V223.464L698.296 224.131L697.586 224.672L697.461 226.547L694.79 226.172V227.214H693.496V226.089L692.035 224.922L690.991 226.506L690.24 227.047L689.155 226.714L688.153 227.047L687.736 227.964L686.358 228.048L685.983 230.589L684.856 230.756L684.313 229.798L682.309 230.673L681.934 232.423L683.562 232.214L683.144 234.381L680.932 233.715L679.763 234.131L681.475 235.173L679.763 235.715L677.801 236.798V238.048L677.008 237.34L676.257 236.298L675.965 236.798V237.798L674.587 237.298L674.003 237.715L675.589 239.257H675.047L674.253 238.757L673.502 240.548L674.713 242.215L674.17 243.799L674.671 245.799H676.8L679.137 245.34L678.887 246.299L676.674 246.924L674.045 247.507L674.42 248.507L673.794 249.341V249.841L674.504 250.549L673.544 251.174L673.92 253.258L674.963 252.966L676.132 254.133L676.424 254.883L675.464 255.299L674.671 257.008L675.172 257.216L676.549 255.633L677.426 254.799L677.843 253.591L678.427 252.216L680.681 251.466V252.508L678.511 253.299L678.177 254.841L677.05 256.174L677.384 257.341L676.34 258.591L675.84 259.216L675.464 258.675L674.88 258.8L674.587 260.258L675.172 261.008L676.674 260.508L677.175 259.216L678.135 259.966L678.01 261.592L677.426 261.842V263.258L677.927 264.425H677.092L676.424 263.8L676.007 264.258L675.923 266.175L677.551 267.634L678.344 268.384L679.93 269.009L680.014 270.509L680.932 270.634L684.062 270.425L685.649 270.217L688.737 267.884L692.118 264.05L693.078 262.592L694.08 263.383L695.499 261.967L695.625 260.591L695.166 259.258L695.917 258.633L696.96 259.341L697.378 261.717L698.755 262.508V264.133L699.256 267.175L700.216 269.134L699.715 270.05L701.093 271.926L701.427 274.176L703.013 277.259L704.098 279.801L705.601 281.843L705.1 283.426L704.766 285.385L706.06 287.593V290.052L708.063 290.302L710.943 289.802L710.735 287.677L711.695 285.885L713.031 285.385L713.949 284.385L717.205 284.885L718.707 282.426L719.793 279.468L720.627 275.259L721.337 270.967L720.794 266.175L723.674 264.842L724.509 263.258L726.012 264.008L727.723 262.217L728.308 260.591L729.769 258.633L729.685 255.674L729.101 253.924L726.095 251.091L724.509 251.424L724.259 250.466L722.422 248.632L722.631 241.757L723.716 240.59L724.134 236.923L724.634 236.548L723.633 235.298L724.301 234.381L725.344 234.881L725.887 233.59L726.054 231.256H728.099L727.974 229.173L730.812 227.339L731.271 226.256L735.028 224.089L735.445 223.005L736.781 222.672L737.95 220.297L738.325 218.88L740.412 217.13L740.162 215.797L738.826 214.463L739.327 213.588L738.868 212.296L740.496 210.088V207.129L742.332 206.879L743.71 205.546V202.837L744.879 203.296H746.465L747.007 204.087L747.842 203.254L750.806 203.671L752.434 203.837L754.562 205.171L755.773 207.796L756.65 210.755L756.107 212.921L755.147 212.421L753.519 212.921L752.475 214.922L750.221 218.672L748.051 221.589L747.091 222.88L745.839 222.505L745.421 222.88L745.129 224.547L743.919 225.214L744.211 227.714L741.039 227.964L740.955 230.214L739.369 231.339L738.826 233.006L739.327 234.59L740.371 236.173L739.786 238.923L741.08 241.09L740.83 244.674L740.287 246.549L739.745 250.966L740.12 251.257L741.039 250.716L742.166 251.924L743.334 252.299L743.251 253.841L744.378 254.341L744.545 255.383L746.173 255.591L746.507 257.05L748.385 256.341L751.015 255.299L753.269 254.966L755.523 253.299L758.152 252.799L760.615 251.633L763.203 251.132L765.29 251.633L767.293 251.007L769.714 249.507L770.132 250.007L768.629 251.382L770.591 253.383L771.676 254.341L774.64 253.841L775.433 255.299L775.683 256.758L774.348 256.341L771.843 256.008L770.925 257.216L769.339 257.341L768.629 258.425L767.21 258.716L766.793 260.3H764.455L761.241 259.8L758.778 259.008L757.192 259.466L755.022 260.008L753.769 259.883L751.432 261.3L749.47 261.883L748.928 263.675L748.51 265.342L749.303 267.092L749.428 268.384L750.889 268.884L751.975 267.967L753.31 268.717L752.601 269.884L752.142 273.259L752.475 275.884L752.183 277.884L750.347 279.343L748.385 279.093L747.258 277.884L746.966 276.134L746.173 275.843L744.545 273.551L743.084 274.217L741.039 275.468L740.538 276.551L740.204 278.884L738.826 280.218L738.451 282.843L739.035 287.51L739.87 292.302L739.578 294.302L737.574 294.177L736.197 293.802L734.402 294.177V295.219L735.32 295.552V296.011L734.443 296.344L733.275 297.761L732.356 298.677L730.812 298.219L728.85 298.052L727.89 294.886L727.014 294.761L724.342 295.094L721.963 296.469L720.377 296.636L718.582 298.802L716.745 299.303L714.241 300.011L712.154 301.136L712.446 301.969L712.154 302.594L711.194 302.469L710.067 301.428L709.441 300.344L708.856 299.678L708.147 299.844L707.229 299.178L707.813 298.052L708.773 297.844L708.856 296.802L707.103 296.427L706.811 297.552L706.227 298.177L705.016 297.927L703.889 298.427L702.637 299.344L700.634 299.761L699.548 301.053L697.336 300.803V299.511L698.88 297.677L698.38 297.136L697.712 297.344L697.211 298.344L696.251 298.011L694.581 297.552L693.454 297.011L693.371 295.511L692.035 294.761V294.177L693.162 293.844L693.078 293.344L691.743 292.969L692.118 291.927L692.745 291.635L692.327 290.51L692.619 289.802L693.454 290.385L693.955 291.51L694.79 292.302L695.833 292.76H696.543L696.877 292.052L697.169 291.385L696.626 290.469L695.583 289.51L694.748 289.343L693.788 289.552H693.287L692.745 288.885L693.579 287.885L693.663 286.802L694.372 286.468L694.665 284.801L694.957 284.301L695.708 283.968L696.209 284.301L696.793 284.51L697.127 283.926L697.461 283.176L696.919 282.343L696.042 282.093L695.04 282.385L694.748 281.343L694.539 279.634L695.332 278.134L695.959 276.884L695.792 274.009L694.289 274.717L693.287 275.384L692.452 277.051L691.826 277.676L689.948 278.051L688.153 278.593L686.984 279.676L686.901 280.343L687.402 280.885L688.111 280.51L688.779 281.468V282.385H688.111L686.692 281.885L686.817 284.26L686.316 285.718V288.26L686.776 289.302L687.819 290.51L688.487 291.927L688.654 294.844L689.447 296.136L688.946 297.927L689.739 299.678L689.614 300.761L690.991 301.553L690.407 301.886L689.322 301.386L688.445 301.553L687.986 302.636V303.386L686.817 303.469L685.983 304.22L685.649 302.636L682.268 303.344L681.516 305.053L680.64 304.386L679.054 304.595L676.758 304.845L675.38 306.636V307.553L675.923 308.261L676.549 308.595L676.007 310.053L673.92 311.887L673.377 311.387L673.836 309.887L674.128 309.012L673.419 308.011L672.5 308.303L671.958 309.345L671.54 311.428L671.123 313.053L670.121 314.304L668.535 315.595L669.578 316.345L669.954 316.887L669.453 317.22L667.867 316.887L666.949 317.887L665.237 318.887L663.568 319.971L660.98 320.596L660.187 321.179L659.853 322.888V324.888L658.642 326.346L656.722 327.555L654.969 328.221L654.134 328.513L653.759 329.513L654.427 330.138L654.093 330.68L653.091 331.096L650.628 330.888L649.042 330.43L647.915 329.805L646.83 328.596H645.995L645.703 329.555L646.371 330.596L647.247 332.805L647.539 334.763L646.705 335.263H643.783L642.03 335.472L641.404 334.763L640.652 334.013L638.816 334.555L637.229 335.055H635.852L634.266 335.68L633.932 336.722L634.516 336.93L635.935 336.722L636.102 337.847L635.017 338.805L635.727 339.847L636.896 339.639L638.482 339.847L639.65 340.514L640.318 341.055L642.531 340.847L643.532 342.014L643.616 342.931L644.576 343.597L645.16 345.097L644.451 345.972L645.536 347.181L646.579 348.098L648.04 348.806L648.833 349.889L648.917 352.348L650.127 353.765L650.211 354.765L649.251 354.39L648.708 354.765L648.458 356.89L648.625 358.932L648.124 360.015L647.706 362.89C647.706 362.89 647.205 364.89 647.205 365.015C647.205 365.14 645.202 366.391 645.202 366.391L642.906 366.016L637.981 365.849L636.687 365.557L634.433 365.641L632.429 365.057L630.008 364.515L625.959 364.932L624.165 365.14L621.911 364.015H620.909L619.448 366.224L617.737 366.432L615.816 367.516L616.359 368.682L616.568 369.891H617.778L617.528 372.599L617.236 374.599L618.237 377.058L617.695 380.517L617.403 382.6L616.943 385.059L615.775 387.684L615.357 388.225L614.856 390.392L616.109 390.809L615.983 391.809L616.86 392.059L617.486 391.309L617.653 393.434L617.361 395.726L617.069 398.351V399.185H618.404L620.951 398.893L622.62 399.185L624.415 398.81L627.003 399.518L627.629 401.685L628.673 403.602L630.634 404.393L631.678 403.101L633.264 401.976L634.349 401.81L635.685 400.81H637.856H640.026L642.197 400.685L644.158 400.56L645.285 399.351L646.621 397.309L648.124 396.393L649.543 396.559L650.127 394.976L651.171 393.017L653.3 390.726L651.254 387.85L652.423 385.642L654.927 381.183L656.722 378.725L658.601 377.85L660.354 377.516L662.107 376.225L664.778 374.808L665.822 373.599L665.738 371.474L664.945 368.891L665.446 367.266L668.076 364.807L671.749 364.474L672.041 365.766L674.086 365.682L676.633 367.016L679.638 366.641L683.144 363.557L685.774 362.724L687.11 361.015L689.197 359.557L690.908 360.39L694.581 362.432L695.124 364.932L696 366.807L696.167 367.891L697.712 369.307L698.88 370.808L700.508 371.558L701.635 372.933L703.013 374.558L704.808 376.1L706.811 377.141L709.441 377.766L710.025 378.975L711.403 379.892L712.237 380.475L713.949 380.683L713.698 382.558L714.992 383.35L716.871 384.267L717.58 386.392L718.624 388.684L718.832 390.392L717.956 391.226L717.455 392.309L716.787 394.184L717.288 394.684H718.206L719.417 393.101L719.959 391.476L720.293 390.309L721.337 389.517L722.297 389.309V388.184L721.796 386.85L720.627 386.392L719.751 385.809V384.767L721.921 381.225L722.422 381.1L723.007 381.642L724.008 382.475H725.344L725.887 383.142L726.221 384.058L727.097 384.684L727.556 384.6L727.848 383.642L727.515 382.558L726.346 381.475L724.467 380.058L722.631 378.725L719.584 377.516L717.246 376.225L717.413 375.225L718.415 374.558L718.081 374.141L716.954 373.849L715.952 374.224L714.158 373.849L712.404 372.599L710.317 370.391L708.94 367.849L708.648 366.349L707.604 364.599L706.602 364.015L705.183 362.64L703.514 361.849L702.929 360.307L701.886 359.348L702.303 358.015L703.18 357.057L702.721 355.723L702.22 354.64L702.637 353.556L703.889 353.015L704.265 353.348L705.809 352.515L707.312 351.931L708.898 352.306L708.397 353.598L708.105 354.681L708.773 356.057L709.399 357.057L710.401 356.265L710.777 354.681L711.361 353.681L712.154 354.931L713.114 355.556L713.74 356.432V358.015L714.116 359.348L714.909 361.015L716.119 362.515L717.205 363.89L718.081 364.89H720.377L722.213 366.182L723.424 367.432L722.631 367.849L723.591 368.641L725.887 369.057L728.057 370.558L729.56 371.391L730.77 373.308L732.523 374.224L732.231 376.266L732.106 378.308L732.398 379.391L731.313 381.6L731.689 382.683L733.066 383.183L734.277 384.559L733.15 385.35L733.943 387.017L735.028 388.767L736.656 389.226L737.365 390.476L738.492 391.059L738.951 392.517H740.204L741.999 392.226L744.67 392.642L746.715 393.309V394.226L745.713 394.726L744.169 393.851L742.75 393.726L741.957 392.976L741.164 393.351L740.788 393.934L739.828 393.851L738.701 394.976L739.745 396.101L740.997 397.351L740.496 398.184L741.289 400.268L742.291 399.393H742.875L743.418 400.643L743.793 401.893L744.378 401.56L744.753 400.351H745.588L746.381 401.685L746.465 400.726L746.089 399.31L745.672 398.059L745.087 396.934L745.588 396.518L746.465 396.893L747.383 397.393L747.55 396.809L746.757 395.684L746.298 395.018L747.174 394.434L748.093 394.309L749.053 394.726L749.721 395.143L750.263 395.018L750.43 393.809L751.182 392.892V391.642L750.514 391.226L749.261 390.809L748.218 389.642L747.467 389.351L746.966 389.642L747.467 390.309L748.594 391.392V392.059H747.801L747.508 391.476L746.59 390.892L745.797 390.059L746.214 389.309L745.839 388.517L746.047 387.6L745.839 387.184L746.548 387.767L747.258 387.6L746.757 386.684L745.505 385.434L745.004 384.183L744.42 383.267L744.127 382.142L744.461 381.1L745.171 380.725L746.047 380.517L746.548 381.35L747.55 382.35L748.594 382.6L749.261 382.183L749.762 381.517L749.554 380.392L750.138 379.642L751.39 379.183L752.726 378.85L754.187 378.683L755.147 378.266L756.232 378.766L757.484 379.141L758.904 379.433L759.864 378.558V377.1L760.907 376.725L760.156 374.849L762.577 372.641L766.208 373.141L765.832 371.808L764.58 370.683L764.914 369.807L766.333 367.641L766.584 365.641L767.753 364.974H768.713L768.838 361.932V359.89L770.466 358.515L771.509 357.182H772.845L773.221 355.223L773.596 353.848L772.636 353.265L773.012 352.39L773.555 351.681L773.972 352.265L775.683 351.14L776.351 350.056L775.057 348.681L775.308 347.973L776.602 348.848L777.228 349.223L777.603 347.973L777.77 347.181L778.814 346.973H780.692L781.819 346.889L782.07 345.847L782.988 346.222L783.28 346.931L784.365 347.514L783.864 348.473L783.03 348.764L783.739 349.639L784.866 350.014L785.826 349.848L787.037 349.598L788.205 349.848L789.499 350.098V351.39L788.581 351.848L787.162 352.39L785.534 353.848L786.452 354.181L787.538 354.848L787.872 355.765L789.082 355.64L789.332 356.807L789.04 358.182L789.499 359.14L789.959 359.765L790.877 359.64L792.087 359.14L792.88 358.265L793.214 357.598H794.133L795.427 357.223L796.053 356.682L796.554 356.015L797.639 355.681L798.599 356.098H799.851H800.561L800.728 354.973L800.06 353.806L798.808 354.515L797.555 354.89L796.888 355.265L795.802 355.015L795.051 353.431L794.55 352.598L793.131 351.681L793.256 350.223L794.133 349.348L795.928 348.306L796.22 346.806L797.138 347.598L798.14 347.014L800.018 346.639L802.022 346.097L803.65 345.514L805.236 344.556L806.822 343.972L808.366 344.097L810.62 343.431L812.206 343.056L812.749 343.972L811.831 345.389L809.66 346.097L809.451 346.931L808.324 346.681L806.697 347.223L807.197 348.431L808.533 348.973L808.158 350.973L807.072 351.098L806.571 352.681L805.611 354.306L804.985 354.64L803.19 354.348L802.481 355.515L802.898 355.765L803.691 355.14L804.234 356.265L804.86 357.807L806.53 358.432L808.283 359.598L809.66 360.14L811.413 361.057L812.791 362.599L814.168 364.182L815.253 365.182L816.756 364.515L821.389 366.224L825.438 366.432L830.155 368.682L830.781 369.849L832.534 369.974L833.244 369.016L835.748 369.224L838.962 370.849L838.253 372.099L841.3 373.641L843.721 374.933L844.806 376.725L847.394 377.058L849.982 374.308L848.312 371.766L845.724 368.099V365.474L846.475 362.849L845.515 362.557L843.888 360.223L842.176 360.098L842.928 358.307L846.642 353.098L847.519 352.598L847.644 353.306L848.02 352.806L848.604 351.89L849.606 352.723L850.566 352.265L851.109 350.764L851.943 348.764L849.731 347.056L851.777 346.097L848.521 340.639L845.641 339.514L845.348 340.597L844.013 339.805L844.305 337.097L841.675 336.263L843.47 331.096V327.013L846.016 323.721L849.272 327.346L851.484 326.513L850.274 322.846L853.78 321.096V319.596L858.914 316.22V315.012L861.544 315.97V317.012L862.88 317.137L863.422 316.095L865.885 315.012L866.386 317.095L869.558 316.845L874.066 320.762L874.316 323.179L875.235 322.512L874.943 319.887L879.409 323.179L882.498 319.554L883.583 320.137L884.793 319.304L886.672 320.929L887.715 319.262H890.345L891.973 321.846L894.185 322.137L894.477 323.388L896.69 321.096L898.777 322.429L900.237 321.929L900.78 322.137Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M849.188 170.418L849.689 167.627L851.442 164.918H854.406L857.745 167.668L856.326 170.418L853.488 172.96H851.609L850.148 172.085L849.188 170.418Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M891.723 154.917L893.434 153.334L895.563 156.668L896.774 157.543L899.32 160.418L898.234 162.168H896.064L895.521 160.501L893.893 160.043L893.017 159.793L891.723 157.751L890.638 156.126L892.558 156.918L891.723 154.917Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M698.629 288.593L699.088 290.969L701.342 292.094L702.719 292.76L704.18 290.969L703.429 290.135L705.349 288.593L704.013 286.302L702.511 286.718V287.927L700.465 288.343L699.13 288.093L698.629 288.593Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M703.221 293.219L704.014 293.594L702.97 294.511L702.511 296.386L699.464 295.386V294.344L701.05 294.802L702.177 294.26L703.221 293.219Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M688.779 372.683V371.224L690.407 370.141L692.077 369.182V371.391L692.536 372.183L691.993 372.683L692.077 374.516L691.117 376.683L689.739 375.933L688.779 372.683Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M691.618 378.183L692.536 378.975L693.496 381.558L692.536 382.267L693.037 384.1L692.954 386.725L692.161 388.476H690.324L689.614 389.434L688.404 388.559V386.267L688.78 384.975L687.193 380.267L688.78 380.1L691.618 378.183Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M704.723 394.643V395.893L705.891 397.018H707.352L709.189 398.476L710.608 399.185L712.153 399.601L713.029 400.768H714.699L715.742 399.351L714.782 397.684L715.283 395.684L716.535 393.601L713.906 394.143L712.153 394.809L711.026 394.476L709.815 394.726L708.772 394.643L707.352 393.601L704.723 394.643Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M727.472 275.301L728.014 278.009L729.517 277.051L729.976 275.301L730.686 272.676L730.185 272.176L728.432 273.259L727.472 275.301Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M742.833 269.092L744.085 270.134L746.59 269.092L747.758 267.925L747.299 266.884H744.461L743.25 268.05L742.833 269.092Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M744.085 264.467L745.838 263.508L747.424 264.467L745.755 265.55L744.085 264.467Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M733.399 253.549L734.109 255.049L735.862 254.299L735.319 252.466L733.859 252.883L733.399 253.549Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M749.971 407.602V408.477L752.684 408.727L754.395 409.977L758.736 409.769L760.489 408.977L759.738 408.81L758.235 409.102L757.901 408.31L754.52 407.768L752.809 408.018L752.392 407.602L751.265 407.227L749.971 407.602Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M663.776 386.392L666.156 384.6L666.49 385.683L667.491 385.642L667.283 386.642L666.49 387.392L664.987 387.017L664.903 386.559L663.776 386.392Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M716.537 170.377L717.372 168.543L719.042 166.71L719.375 167.543L718.29 169.335L717.33 170.377L716.829 171.127L716.537 170.377Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M736.948 156.542L737.825 155.751L738.451 156.542L737.7 158.043L736.948 157.626V156.542Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M743.377 151L744.42 152.876L745.422 152.334L746.883 151.959L747.676 151L748.553 149.084L747.342 149.792L746.591 149.5L745.965 149.917L746.257 150.667L745.673 151L744.754 150.167L743.377 151Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M757.108 145.583L757.651 146.875L758.778 146.25L759.154 145H757.776L757.108 145.583Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <path
                  d="M747.133 153.459V154.917H747.675L749.47 152.876L749.095 151.375L747.592 152.292L747.133 153.459Z"
                  className="europe"
                  onMouseEnter={() => highlightContinent("europe")}
                  onMouseLeave={() => removeHighlight("europe")}
                  onClick={() => selectContinent("europe")}
                />
                <g clip-path="url(#clip4_338_3)">
                  <path
                    d="M307.355 623.639L310.443 619.774L310.031 617.883L311.225 619.24L311.842 620.761H312.871L312.542 618.212L314.683 616.198L316.165 614.307L318.305 613.156V610.936L318.923 608.017L321.599 606.372H323.78L324.892 605.92V605.18H327.115L329.873 604.769L332.178 603.289L334.072 602.014V600.411L336.419 600L337.818 600.534L338.642 601.809L336.871 603.083L334.854 603.412L335.142 604.892L335.883 607.441V609.086L334.648 610.771L334.072 612.498L335.019 614.266L336.336 615.54L338.23 615.458L339.177 614.389V611.84L337.365 608.921V607.441L339.177 606.043L340.782 605.591L342.964 604.851L344.158 604.111V603.207L343.005 602.631L343.087 601.398L344.158 601.192L345.022 602.467L345.887 603.906L346.834 604.358L349.057 604.234L350.415 605.18L351.403 606.372L352.309 608.387L353.256 609.086L355.643 608.757L358.69 608.387L361.942 608.551L363.136 609.743L365.07 610.689L367.252 611.141L369.846 610.36L373.304 608.757L376.062 608.181L378.614 607.606L379.767 607.811V608.346L377.791 608.88L377.42 609.414L378.408 610.483L379.767 611.1L381.166 611.84H382.731H383.595L384.748 612.991L386.23 613.772L386.642 615.992L387.012 617.883H390.058L391.787 618.952L393.557 620.227L394.834 621.46L395.986 621.912L397.057 623.31L397.468 624.872L399.897 626.352L401.173 628.284L402.985 629.641L405.208 630.258L407.101 631.039L409.036 630.504H412.124L414.099 629.723L417.063 630.587L420.192 631.779L423.362 632.683L425.791 634.204L428.343 636.096L429.208 637.576L430.484 638.11L431.719 639.837V642.057L432.336 643.742L432.871 645.716L433.859 648.264L434.93 649.416H436.206L437.111 651.348V653.897L436.37 655.459L435.218 656.404V654.39L434.395 655.171L433.201 656.733L431.06 657.679L429.907 659.2L428.672 661.091L428.837 662.037L430.031 660.762L431.307 660.68L431.719 662.037L432.46 660.68L433.448 659.899L434.477 658.254L436.288 656.651L438.388 656.24L437.441 657.35L438.799 658.337L439.664 657.391L441.599 658.624L443.822 659.2V660.762L443.163 662.859L441.804 664.257L440.611 664.873L440.199 665.942L442.134 665.613L443.822 664.133L445.304 661.831L446.374 660.639L447.938 660.474L448.556 661.297L449.667 660.639L450.573 661.297L452.59 661.954L454.648 662.366L456.336 662.9L457.489 664.092L459.588 664.627L460.947 665.284L461.441 667.011L463.293 668.491L462.593 669.519L463.499 670.136L465.022 669.93L467.657 669.026L468.81 668.779L470.703 670.136L473.05 670.629L476.302 671.204L477.619 671.533L479.225 671.04L483.671 671.081L485.194 672.191L487.293 673.424L489.887 675.069L492.274 677.124L494.374 679.303L497.585 681.03L501.372 681.318L504.007 680.989L504.748 682.674L505.859 684.977L506.148 688.101L507.753 689.088L508 691.472L506.806 693.816L506.353 696.693L504.913 699.9L503.431 701.914L501.29 704.669L497.75 707.752L496.103 709.602L495.115 711.74L493.345 714.864L492.069 716.92L491.039 718.112L489.804 716.714L488.94 717.167L489.31 718.441L488.281 719.716L488.322 721.853L487.787 725.019L487.87 727.897L487.952 729.87L488.322 732.049L487.746 734.392L486.964 737.229L486.84 740.888L486.1 742.203L484.782 743.807L484.576 746.52L484.288 749.357L483.753 751.042L482.436 753.016L481.777 754.496L479.595 756.633L478.566 758.483L478.196 759.963L478.731 761.854L477.99 762.923L476.096 763.417L474.367 764.938L473.873 766.418H471.691L467.245 766.664L464.034 767.034L461.976 767.528L460.617 768.926L458.724 770.241L457.365 771.228L456.419 770.776L455.184 771.474L452.055 773.037L449.009 775.544L446.497 777.477L445.18 779.614H443.039L442.916 781.382L443.204 782.944L442.71 784.507L442.916 787.097L443.41 788.453L443.657 789.563L443.163 791.043L442.834 794.086L442.504 795.812L441.475 796.593L439.54 797.786L437.894 800.047L436.947 802.143L436.082 804.98L434.889 807.488L433.077 810.201L431.142 812.339L429.002 814.312L426.738 815.669L425.708 817.354L425.256 819.533L424.35 820.191L423.238 821.342L422.045 823.521L420.727 825.248L419.616 827.386L417.681 828.948L415.54 829.852L414.182 830.674L413.07 830.346L411.094 829.77L409.201 829.976L407.678 830.674L405.66 829.482L403.684 828.249L400.062 827.673L398.868 826.769L397.592 827.057L397.468 828.824L398.744 829.852L400.391 831.003L402.12 832.031L403.561 833.717L402.985 834.868L402.408 836.142L402.861 837.622L403.973 838.979L405.619 839.801L405.66 841.939L404.549 844.323L402.573 846.708L401.708 848.558L399.897 850.408L396.604 852.299L392.528 852.874L388.535 853.902L384.913 854.396L381.249 853.861L379.973 853.121L379.437 853.656L379.931 854.396L379.52 856.122L380.59 857.602L379.479 860.069L378.943 862.577L379.396 865.29L378.985 866.4L376.473 867.099L372.768 867.387L370.998 866.606L368.611 865.084L366.882 865.29L366.141 867.757L366.676 869.648L366.923 874.252L368.94 874.787L369.928 875.691L371.328 875.321L372.151 873.923L373.057 873.759L373.509 875.691L373.468 877.171L372.768 878.199L371.616 877.829L370.875 876.76L369.557 876.554L368.858 876.102L367.705 876.719L367.376 877.829L368.158 878.692L369.681 879.35L368.487 880.09L367.087 880.953L365.729 883.584L365.564 885.434L365.729 887.778L364.165 890.121L363.671 892.053L361.777 892.382L359.636 893.533L357.413 894.191L356.302 895.63L355.355 897.686L354.738 899.7L355.273 902.002L356.837 903.688L358.401 905.25L359.554 906.196L362.559 906.648L363.712 908.416L363.094 910.882L362.065 913.143L359.472 915.569L356.714 917.83L355.108 919.762L354.408 924.696L352.762 927.039L350.086 928.354L347.822 931.15L346.998 934.274L347.986 934.973L348.439 937.563L349.057 939.783L350.292 942.003L351.156 943.936L350.58 944.223L348.974 943.196L347.204 942.949L345.969 944.717H344.487L342.593 945.868L340.329 947.183L339.547 949.444V952.857L339.094 954.994L338.312 955.488H336.83L335.184 954.46L332.714 952.98L329.832 951.171L330.738 950.143L329.338 949.609L328.391 948.047L328.844 946.608L327.197 946.238L326.95 945.333H326.333L326.003 946.073H325.386L325.633 945.169L325.962 944.141L325.468 943.812L324.192 944.429L325.098 942.743L325.18 942.044L323.492 940.03L323.657 939.496L325.18 940.318L324.563 939.126L325.262 938.344L325.88 937.358L325.345 935.878L325.633 934.891L324.027 934.069L323.369 935.138L321.475 937.358H320.158L319.911 936.453L321.557 935.179L322.463 934.809L321.887 933.987L320.981 934.11L320.734 933.329L321.187 932.219L323.41 931.561L323.78 930.574L322.34 929.999L323.122 929.259L322.628 928.354L323.945 926.751L325.962 926.874L326.333 925.888L324.398 924.778L323.78 923.709L323.369 925.189L322.34 926.463L321.516 926.134L320.94 924.778L319.417 925.148L318.47 924.243L319.17 923.051L318.676 921.777L319.87 921.119L318.388 919.598V915.034L318.964 913.39L319.952 913.883L320.364 914.582L320.528 913.102V911.951L321.187 911.499L321.846 912.65L322.381 914.5L322.792 916.638L323.163 917.912L324.274 917.583L323.945 916.309L323.245 914.007L322.71 912.691L323.328 912.157L325.057 912.773L327.238 912.938L327.444 912.074L326.621 911.499L324.316 911.417L323.245 911.376L322.257 910.266L323.904 908.21L325.098 906.771L324.398 905.003L323.698 903.852L321.187 903.729L320.034 902.824L319.17 903.153L319.581 904.633L317.894 904.428L318.182 902.578L319.787 901.344L321.557 899.864L321.516 898.878L321.063 898.261L323.204 897.686L323.163 895.178L324.48 896.617L325.057 896.534L324.81 894.726L324.563 893.903L325.427 893.369L324.645 892.259L323.739 890.738L324.892 889.833L323.822 889.217L323.904 888.353L324.604 889.011L325.057 888.353L324.686 887.408H323.739V885.846L325.509 886.544L326.703 887.696L327.115 889.792L326.168 891.108L325.798 892.177L326.333 892.917L326.25 895.383L325.839 896.658L326.168 897.768L327.321 898.261L327.774 896.699L328.35 894.931L328.679 894.109L328.185 892.876L329.214 891.848L329.05 890.738L328.309 889.957L329.461 888.764L330.244 887.819L329.955 886.914L329.214 885.969L330.943 884.283L330.696 883.214L329.955 882.187L330.861 879.967L331.273 878.692L330.902 876.637L332.096 874.992L332.467 873.43L331.273 872.731L331.849 870.922L330.532 869.812L329.75 870.388L328.597 871.374L327.568 871.909L327.527 872.978L328.144 874.787L327.074 876.308L326.95 878.199L327.28 879.227L327.074 880.213L326.168 881.693L323.739 880.46L324.892 877.541L325.015 874.047L325.633 871.95L327.115 871.251L326.827 870.059L326.127 867.14L326.168 865.167L326.703 862.371L327.115 861.343L328.268 859.699L329.214 857.479L328.885 854.108L327.815 851.723L327.938 848.023L327.28 846.708L327.815 844.406L329.379 843.871L329.708 841.404L331.108 838.568L332.014 835.731L332.755 833.922L334.278 830.921L334.854 826.687L336.542 824.138V820.684L337.489 818.506L337.407 814.148L336.913 813.038L336.377 809.584L336.583 805.186L338.065 803.747V800.622L337.365 799.348L337.53 797.621L338.724 793.962L339.959 790.303L340.535 788.207L340.947 782.204L341.976 779.738L341.647 777.764L341.317 776.038L341.935 774.023V771.269L341.276 770.159L341.317 768.473L343.005 766.623L342.964 763.334L343.417 761.649L343.87 757.373L343.293 754.167L343.499 750.138L342.84 748.247L342.676 744.547L341.4 743.642L337.859 740.806L337.201 739.038L334.031 737.517L330.326 735.173L325.551 733.282L324.933 732.008L322.751 731.432L320.446 729.911L318.099 727.116L316.412 725.964L315.012 722.84L315.341 720.579L314.065 718.729L312.13 715.029L310.196 711.493L308.22 708.657L306.738 705.409L304.926 700.722L303.156 697.187L301.057 694.556L299.451 691.596L298.751 689.828L296.611 687.978L293.976 686.991L292.906 685.676L293.77 684.196L292.535 681.976L292 679.632L292.864 677.001L295.664 674.329L297.763 672.808L298.34 670.917L298.051 669.642L296.034 669.519L294.058 668.532L293.976 666.518L294.552 663.188L295.746 659.364L297.722 656.733L297.928 654.349L299.163 653.28L301.18 652.622L302.827 651.8L302.621 649.991L304.226 649.416L303.897 647.154L305.297 645.716L306.614 646.209L308.014 645.551L309.208 642.714L310.401 640.906L309.866 638.398L310.154 636.054L309.413 632.067L310.237 630.381L309.66 629.271L309.907 627.709L309.578 626.106L307.355 623.639Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <path
                    d="M342.14 951.788L342.47 949.28L343.499 948.951L342.799 947.964L345.351 947.636L346.833 945.457L347.574 946.484L349.88 945.95L351.773 949.033L350.127 950.02L351.156 951.377L352.514 951.788L354.038 954.748L355.849 956.639L358.895 959.064L360.501 960.709L363.012 961.983L364.535 962.394L366.182 961.86V963.011L364.288 964.573L362.806 963.998L359.554 965.108L357.743 966.053L356.384 967.533L355.931 966.506H353.502L352.761 964.943L350.621 965.313L351.362 966.793L350.95 967.533L352.514 968.109L352.844 970L351.238 968.397L349.797 968.643L348.645 967.04L347.657 967.246L346.628 968.191L344.775 966.958L344.569 965.478L345.64 963.998L343.828 963.546L342.14 963.833L341.111 965.683L339.835 964.82L340.988 963.874L340.165 962.806L339.382 961.737L338.024 961.326L335.883 961.613L334.854 960.914V960.38L336.213 960.914L337.365 960.257L338.024 959.517L337.9 958.612L336.748 958.407L335.472 959.023L334.854 958.283L333.372 956.886L332.178 957.173L331.026 957.091L330.326 955.981L329.873 954.912L328.638 953.926L327.403 953.514L327.115 952.404V951.089L322.71 948.663V947.841L324.974 948.828L328.02 950.554L329.708 952.117L331.273 953.391L332.672 954.049L333.331 955.036L334.072 956.351L335.76 956.392L337.653 956.886L338.971 957.749L339.3 958.941L338.559 960.051L339.753 960.339L340.864 959.763L341.152 959.106L340.288 958.571L340.165 956.187L341.111 954.789L341.935 954.09L342.058 955.734L342.182 957.42L342.511 958.407L342.017 959.229L342.387 959.763L344.075 959.393L344.446 960.75L345.64 960.421H347.451L348.11 960.873L348.604 960.216L348.027 959.393L346.134 958.612L344.446 957.584L343.54 955.488L344.446 954.501L346.339 953.72L347.08 952.774L346.257 951.87L344.899 951.623L343.128 952.404L342.14 951.788Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <path
                    d="M319.417 927.203V929.3L318.841 931.561L319.746 931.972L320.57 929.382L321.475 928.313L319.705 926.833L319.417 927.203Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <path
                    d="M320.446 940.77L321.475 939.948L322.381 940.359L322.957 941.551L322.422 942.579L322.299 943.771L321.023 942.373L320.446 940.77Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <path
                    d="M386.147 941.88L387.753 942.908L389.564 941.346L391.211 940.811L392.94 938.139L393.599 937.111L392.034 937.44L390.882 937.111L389.852 937.933L388.864 937.111H387.876V937.728L388.864 938.016L389.852 938.961L389.029 939.208H387.959L388.329 940.194L388.576 940.811L386.147 941.88Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <path
                    d="M392.322 941.839L392.61 942.908H394.792L396.068 941.222L395.574 939.989H396.809L397.962 940.359L399.074 939.496L399.321 937.892L400.02 937.481L399.279 936.659L398.044 937.111L396.809 936.33L394.792 938.18L395.327 938.961L394.339 939.619L392.94 940.318L392.322 941.839Z"
                    className="south-america"
                    onMouseEnter={() => highlightContinent("south-america")}
                    onMouseLeave={() => removeHighlight("south-america")}
                    onClick={() => selectContinent("south-america")}
                  />
                  <g clip-path="url(#clip5_338_3)"></g>
                </g>
                <g clip-path="url(#clip6_338_3)">
                  <path
                    d="M1146.23 398.401H1148.13V397.613L1148.92 397.351L1152.72 393.806L1154.03 393.413L1155.93 393.806L1158.75 393.413L1161.17 392.428L1161.83 393.413L1164.26 393.347L1164.85 392.034L1164.58 390.918L1166.88 388.227L1167.21 387.44L1167.01 385.668L1167.93 384.683L1168.52 385.077L1167.8 386.193L1168.52 386.783L1168.78 387.834L1169.96 387.505L1172.65 385.865L1174.61 383.436L1176.45 381.205L1176.97 380.089L1178.15 378.12L1178.61 376.807L1179 375.232L1178.74 373.853L1178.02 373.197L1178.61 372.344L1179 371.425L1178.61 370.769L1179.46 369.325L1179.86 367.684L1180.84 367.356L1181.23 369.062L1182.87 368.931L1183.07 367.618L1182.81 366.962L1181.89 367.421L1181.56 366.502L1182.35 365.912L1183.59 366.568L1183.79 369.193L1184.84 371.359L1185.36 372.541L1185.69 374.51L1185.89 375.494L1185.17 377.266L1184.12 378.973L1183.85 380.351L1182.41 380.745L1182.02 382.845L1181.95 385.996L1181.04 389.081L1180.64 390.787L1181.69 392.1L1180.84 393.019L1180.25 393.544L1179.79 394.856L1178.55 395.578L1178.15 394.856L1178.55 393.938L1178.81 392.887H1178.35L1177.17 394.134L1175.66 394.594L1175.27 396.104L1174.55 396.366V394.856L1173.76 395.053L1172.91 395.841L1172.06 397.022L1168.58 397.613L1168.78 396.629L1167.53 396.235L1166.55 395.71L1166.22 396.76L1166.75 397.876L1167.34 398.401L1166.35 398.86L1164.78 399.845L1163.99 401.879L1162.35 401.682L1161.31 400.37V398.926L1161.63 398.401L1161.31 397.022L1160.26 396.694L1158.82 396.563L1157.37 397.285L1156.19 397.876L1154.55 398.269L1152.46 398.926L1151.21 398.729L1150.43 399.123L1150.36 400.37L1148.79 399.582L1147.41 400.304L1146.56 400.107L1145.97 399.91L1146.23 398.401Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1151.34 402.601L1152 404.373L1153.24 405.095L1154.36 403.389L1154.82 402.339L1156.06 401.879L1157.18 402.536L1158.03 403.126L1158.29 401.879L1159.41 400.96L1159.14 399.451L1157.64 399.188L1157.05 398.729L1156.19 399.123L1155.34 400.304L1154.16 400.238L1153.57 399.845L1152.59 400.829L1151.34 402.601Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1145.57 411.856L1145.38 410.477L1144.66 410.281L1144.53 411.068L1145.05 411.987H1143.81V410.281L1143.41 409.493L1144.66 407.196L1144.72 405.817L1144.13 403.848L1143.28 404.111V405.095L1142.3 405.949L1141.64 404.899L1141.45 403.98L1142.63 402.208L1144.13 401.879L1145.25 400.632H1146.1L1147.48 402.142L1148.46 402.076L1148.72 402.536L1148.07 403.192L1149.11 403.783L1149.57 405.095L1149.11 405.817L1148.2 408.115L1147.74 410.149L1146.62 410.74L1146.23 411.987L1145.57 411.856Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1182.09 364.796L1182.54 364.14L1181.04 362.893L1179.92 362.564V361.842L1180.32 360.792H1181.82L1182.54 361.58L1183.46 360.792L1185.89 360.53L1187.13 361.58L1188.71 362.302L1190.21 363.352L1190.8 362.367L1191.07 360.792L1193.95 358.364L1194.67 358.758H1195.52L1197.49 357.773V355.804L1196.83 354.623L1197.88 352.325L1196.24 353.507L1195.46 354.36L1193.75 353.704L1191.26 352.325L1188.9 350.685L1187.13 347.928L1185.89 346.812L1185.3 346.353L1184.25 347.337L1185.23 350.028L1184.77 352.26L1184.58 354.426L1183.46 355.541L1183.85 356.985L1183.26 357.839L1181.1 357.445H1180.25L1180.51 358.364L1180.38 359.151L1178.55 360.333L1178.22 361.908L1179.27 363.549L1178.87 364.796L1179.07 365.912L1179.66 366.174L1180.64 364.927L1181.1 364.074L1181.76 364.468L1182.09 364.796Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1198.14 354.623L1198.6 354.885L1199.65 353.047L1201.23 352.325L1201.62 351.735L1201.03 351.406L1199.91 351.997L1199.32 352.85L1198.14 354.623Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1203.91 350.488L1205.62 348.059L1207.78 347.534L1209.22 346.353L1209.55 345.828H1210.4V347.075H1209.35L1207.45 348.453L1206.08 348.847L1205.68 349.503L1204.7 350.225L1203.91 350.488Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1212.96 345.303L1214.4 343.268L1215.78 342.415L1214.99 343.859L1212.96 345.303Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1185.89 343.465L1186.8 341.364L1187.72 339.921L1188.84 339.592L1190.02 340.38L1190.8 341.233L1191.13 339.855L1189.75 338.87L1189.3 337.558L1188.51 335.851L1187.46 334.079L1188.05 331.388L1188.9 327.909L1189.56 326.269L1190.74 325.35L1192.38 325.743L1193.69 326.465V325.087L1193.1 322.724L1191.85 319.902L1191.39 316.948L1190.8 314.783L1189.82 312.748L1189.43 310.254L1190.28 307.038L1190.21 305.331L1189.3 303.559L1189.23 300.868L1188.97 299.818L1189.3 297.849L1188.25 296.405L1187.2 296.996L1188.25 298.768L1188.18 300.343L1187.72 302.246L1187.2 302.509L1186.41 301.721L1185.43 302.246L1185.17 303.362L1185.43 305.856L1184.77 308.679V311.37L1186.21 313.864L1186.61 316.095L1186.35 317.211L1186.02 319.114L1186.61 320.821L1186.35 325.218L1185.69 327.778L1185.56 329.419L1186.28 331.388L1186.41 332.963L1185.95 335.26L1185.89 339.133L1185.49 340.446L1185.43 342.415L1185.89 343.465Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1112.41 436.337L1113.78 437.453L1113.06 440.079L1112.41 441.654L1111.82 444.739L1110.18 447.233L1109.92 449.333L1107.69 445.986L1107.43 442.835L1109.39 439.357L1110.97 437.191L1112.41 436.337Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1068.69 457.472L1073.8 457.209L1074.13 458.522L1072.82 459.572V460.491L1071.44 462.132L1069.47 463.773L1066.39 462.46L1065.87 460.885L1066.65 459.047L1068.69 457.472Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M963.481 495.671V498.493L962.498 501.184L962.76 505.45L963.481 508.273L965.71 508.666L968.266 507.485L969.577 505.254L968.856 502.169L966.955 499.018L965.71 496.984L963.481 495.671Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1106.38 471.583L1107.88 472.174L1108.41 469.68L1108.67 464.232L1109.79 462.46H1111.29L1113.19 463.444L1114.05 463.641L1114.44 462.985L1114.9 463.182V463.904L1114.31 465.807L1115.62 468.826L1114.5 471.189L1112.67 472.174L1112.01 474.734L1112.74 477.884L1113.06 479.394L1111.49 481.166L1110.18 480.116L1109.26 479.919L1109.13 479L1110.31 477.621L1109.06 476.309L1108.67 477.556L1107.29 476.309L1106.38 471.583Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1104.67 490.486L1105.53 492.586L1102.18 495.146L1101.85 496.196L1100.15 497.574L1097.59 499.937V499.018L1098.84 497.312L1101.26 495.736L1101.59 494.752L1104.35 492.061L1104.67 490.486Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1113.65 505.188L1114.57 505.45L1115.62 502.891L1116.14 502.366L1117 503.35L1117.85 502.759L1118.63 503.35L1119.29 502.366L1120.34 502.103L1122.04 503.547V504.794L1121.26 505.844L1121.78 507.485L1122.7 508.404L1124.53 509.323L1125.39 508.535L1125.78 509.651H1126.76V507.026L1126.11 505.844L1127.55 503.941L1128.53 505.45V506.763L1128.99 506.632V505.516L1130.1 504.663V502.103L1129.25 499.937L1128.73 499.281L1129.32 498.428L1129.19 497.443L1128.01 496.59L1126.83 495.54L1126.57 497.771L1125.25 498.493L1124.07 498.099L1123.81 499.215L1122.83 499.543L1122.37 500.397L1122.11 501.25L1120.6 500.856L1120.34 499.937H1117.72L1117.45 501.053L1116.14 501.381L1114.9 501.972L1113.65 505.188Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1119.16 491.273L1118.5 490.748L1117.39 491.47V493.899L1115.62 494.752V495.54L1117.39 497.574L1118.44 497.18L1118.5 496.393L1117.72 495.211L1118.37 493.571L1119.16 491.864V491.273Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1118.7 495.54L1119.16 493.964L1119.95 492.455L1120.8 491.339L1121.19 491.864L1120.73 493.439L1119.81 494.161L1118.96 495.802L1118.7 495.54Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1120.8 495.211L1121.45 495.802L1122.96 494.818L1122.7 494.161L1121.91 493.899L1121.19 494.424L1120.8 495.211Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1122.37 489.042L1122.96 490.748L1124.08 490.945V493.571L1125.52 493.242L1124.99 491.798L1124.67 490.486L1124.8 489.633H1125.91L1126.7 490.158V489.042L1126.37 488.32V486.876L1125.91 485.629L1124.99 485.038H1123.49L1122.96 485.563L1123.16 486.548L1124.53 487.532L1124.99 488.517L1124.67 488.911L1123.88 489.304L1123.35 489.764L1122.96 489.304L1122.37 489.042Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1116.08 492.389L1117.91 489.304L1115.82 488.517L1114.37 488.254L1114.18 491.142L1113.98 492.652L1115.55 491.93L1115.82 492.586L1116.08 492.389Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1108.41 481.822L1109.65 482.872L1110.05 484.71L1110.7 485.366L1112.01 484.776V483.069L1111.03 482.085L1110.31 481.691H1108.8L1108.41 481.822Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1113.59 479.722L1116.14 482.282L1116.27 481.625L1115.62 480.903L1115.95 480.05L1116.47 479.984L1116.93 480.641L1117.72 480.969L1118.7 482.15L1119.09 482.938L1119.75 483.529L1120.6 484.316H1121.39L1121.12 482.872L1119.68 481.297L1119.55 479.919H1118.18L1117.91 479.984L1117.45 479.525L1116.6 478.606L1115.62 478.803L1115.09 479.197L1113.59 479.722Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1136.79 523.106V521.793L1137.77 521.203V522.45L1136.79 523.106Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1137.25 525.272L1135.94 526.453L1135.15 527.635L1134.82 526.453L1135.55 525.272L1135.48 524.222L1135.15 523.106L1133.97 525.338L1133.58 526.388L1134.17 527.897L1134.04 528.554L1134.56 529.21V531.442L1135.94 532.951L1136 532.229L1135.02 530.785L1135.15 528.816L1136.2 528.619L1136.79 529.079L1137.77 529.341V528.554L1137.05 527.832L1136.33 527.569L1137.25 526.979L1138.1 526.191L1137.77 525.272H1137.25Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1132.99 532.295L1133.58 531.77L1134.37 532.295L1135.02 532.951L1134.82 533.608L1133.91 532.689L1132.99 532.295Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1133.58 536.561L1134.3 535.708L1135.61 536.364L1133.58 536.561Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1135.35 542.599L1136.14 541.024L1138.95 540.827L1139.74 541.221L1141.12 540.565L1142.49 541.09L1144.13 541.615L1145.77 542.993V544.372H1145.18L1144.26 543.19L1142.56 542.468H1141.58L1140.92 542.665L1139.81 542.731L1137.77 542.862L1136.79 542.009L1136.4 541.615L1135.35 542.599Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1128.66 542.074H1131.81L1132.53 543.387L1131.15 544.372L1130.76 544.175L1129.65 543.847L1128.66 542.468V542.074Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1120.54 568V565.834L1121.72 563.996L1124.01 563.209L1125.39 561.962L1128.99 561.305L1132.53 560.911L1131.74 561.962L1128.2 563.471L1125.19 564.456L1123.48 566.294L1120.54 568Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1127.94 559.008L1128.66 558.286H1130.76L1130.04 559.205L1127.94 559.008Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1122.57 560.78L1123.35 559.73L1124.73 560.78H1122.57Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1118.31 560.911V560.452H1116.6L1115.68 561.371H1113.06L1111.82 561.699L1110.77 561.108L1108.93 560.452L1107.23 560.78L1106.44 561.568V562.093L1107.56 562.487L1109.98 562.224L1111.1 562.487L1112.34 562.159L1114.96 562.027L1116.27 561.699L1117 560.911H1118.31Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1103.49 565.44V564.653L1104.02 564.456H1106.44L1107.75 565.637H1108.28L1109.13 566.556V567.541L1108.54 567.803L1107.36 567.409L1106.44 566.556L1105.85 565.768L1104.02 565.834L1103.49 565.44Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1098.97 560.255L1100.35 561.633L1098.97 561.83L1098.12 561.043L1096.35 561.24L1095.56 562.487V563.274H1097.27L1098.58 562.749L1100.15 562.487L1101.07 561.765L1102.25 562.487L1103.23 561.765V560.583L1101.53 560.78H1100.87L1100.28 560.255H1098.97Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1093.86 562.815L1094.78 560.911L1094.32 560.452L1093.07 560.78L1092.61 562.093L1092.09 562.487L1093.14 562.815H1093.86Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1089.66 562.027L1090.91 561.24L1090.58 560.255L1089.14 559.73L1088.35 560.255L1087.11 560.058L1086.71 558.746L1085.27 558.549L1082.32 558.746L1081.08 557.63L1081.34 556.317L1082.84 556.514L1084.75 555.661H1081.08L1080.55 555.858L1079.9 555.661L1077.4 555.267L1076.55 554.807L1074.06 554.479H1073.14L1072.29 555.726L1069.08 555.529L1065.61 555.004V554.02L1064.82 553.101L1064.1 553.495L1062.98 553.101L1061.8 552.707L1060.69 552.248L1060.03 552.707L1057.15 552.248L1056.23 553.167L1054.72 555.201L1055.05 555.333L1056.43 554.807L1057.08 555.201L1057.81 555.726L1058.46 556.908L1059.25 557.105H1061.48L1062.66 557.958L1064.23 558.417L1066.92 558.089L1069.21 558.22L1070.85 559.074L1072.82 559.73L1075.11 560.255H1078.91L1081.14 560.715L1082.84 560.255L1084.16 561.108L1085.53 561.437L1086.52 560.452L1087.63 560.649L1088.02 561.108L1088.94 561.633L1089.66 562.027Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1122.83 536.955L1123.68 536.364L1124.73 536.955L1128.2 537.283H1124.73L1123.35 537.677L1122.83 537.349V536.955Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1124.07 524.878L1125.19 525.272L1123.68 527.438L1122.83 528.816L1120.54 529.473L1117.91 528.948L1113.46 528.751L1110.57 529.21L1109.39 528.816L1108.21 528.882L1106.9 530.72L1107.16 533.345L1108.93 535.183L1110.18 535.708L1111.03 535.38L1112.34 533.608L1113.26 534.067L1115.09 533.608H1116.6L1117.06 532.689H1118.63L1118.77 533.805L1116.73 534.264L1115.88 535.314L1114.37 536.167L1113 537.414L1111.62 537.021L1112.34 538.136L1113.98 539.843L1115.36 542.074L1114.57 543.19L1115.42 544.372L1116.67 545.422L1116.54 546.078L1115.03 546.669L1114.18 546.997L1113.78 548.244L1112.34 547.325V545.356L1110.18 543.19L1110.31 542.074L1110.83 539.909L1109.52 540.105L1108.15 540.565L1107.43 541.549L1108.28 543.518L1108.08 545.75L1107.75 550.279L1105.59 550.869L1104.54 549.491L1105.52 546.472L1105.46 544.372L1105 542.928H1103.75L1102.71 542.074L1103.23 540.105L1104.15 538.268L1104.8 537.021L1104.28 536.167L1104.67 534.526L1106.18 533.214L1106.05 531.77L1106.44 530.195L1106.84 529.013L1108.93 527.372L1109.65 526.913L1110.11 526.06L1110.97 525.928L1113.39 526.847L1115.36 527.044L1117.52 527.372H1119.55L1121.13 527.701L1122.17 526.519L1123.35 525.731"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1115.29 549.425L1116.34 550.869L1117.91 549.885L1117.39 548.375L1118.31 547.26L1117.78 546.538L1117.13 546.8L1117.32 548.047H1116.8L1116.34 547.26L1115.29 548.047V549.425Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1069.28 523.762L1071.44 524.55H1072.49L1073.8 524.878L1075.04 524.287L1075.96 521.071L1078.91 520.284L1081.53 519.562L1083.11 517.527L1084.29 516.674L1085.53 513.983L1088.68 513.327L1090.91 512.605L1090.45 511.292L1090.91 510.701L1092.48 510.242L1093.86 507.682L1096.54 505.385L1097.59 507.157L1098.18 507.288L1098.71 508.929L1099.95 509.979H1101.39L1102.51 511.029L1103.95 511.292L1103.75 511.948L1102.71 512.67L1100.87 512.211L1100.41 512.801L1101.59 514.114L1100.67 514.77L1099.62 514.836L1098.45 514.77L1098.05 516.411L1097.79 517.461L1098.18 518.052L1097.33 518.512L1097.27 519.627L1098.12 520.021L1099.76 522.253L1098.84 523.5L1099.82 524.484L1101.2 525.272L1101.98 526.322L1102.25 527.307H1101.2L1100.35 526.913L1099.23 527.11L1098.18 528.619L1097.66 530.326L1097.13 532.82L1096.41 534.067L1094.71 535.314L1093.66 536.561L1093.86 538.333L1093.46 540.434L1093 541.877L1092.22 542.993L1091.1 543.912L1089.14 544.7H1088.02L1087.3 543.19L1086.65 542.599L1084.55 542.665L1083.57 541.746L1082.32 541.615L1080.35 542.665L1077.86 542.14L1077.08 540.63L1075.44 540.893L1074.32 541.287L1071.83 540.959L1071.44 538.727L1071.31 537.546L1070.72 537.021L1071.31 535.248L1070.65 534.592L1070.13 534.198L1069.28 534.92L1068.95 532.951L1068.03 530.982L1067.7 529.407L1067.24 529.013V526.322L1067.7 525.009L1068.56 523.959L1069.28 523.762Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1053.61 537.874L1054.13 536.561H1054.72L1055.58 536.955V536.561H1056.49L1056.82 537.48L1057.28 538.596L1057.61 539.449L1058.46 539.843V540.893H1057.15L1056.04 539.383L1054.99 538.005L1053.61 537.874Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1062.13 541.221L1062.39 542.009L1064.03 541.746L1064.36 540.762L1063.64 539.843L1062.13 541.221Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1054.2 550.344L1055.18 551.132L1055.58 550.213L1055.9 548.507V544.569L1055.58 543.518L1056.43 541.681L1054.72 540.04L1055.12 539.58L1054.2 539.186L1052.56 539.383L1051.91 538.727L1052.23 537.808H1051.12L1050.86 536.561L1050.4 535.051L1049.61 534.461L1048.1 534.133L1047.19 532.754V530.982L1048.1 530.195L1047.91 529.407L1046.99 528.685L1045.81 529.604H1044.76L1045.35 528.947L1045.09 528.16L1045.29 527.372H1045.88L1045.48 526.65L1043.91 526.453H1042.79L1041.16 524.681L1040.76 523.369L1039.85 523.959L1038.67 522.712H1037.16L1034.86 520.743L1033.16 518.84L1031.39 517.724L1029.69 516.608L1028.57 515.624L1028.44 514.639L1027.52 514.18L1027.13 513.195L1026.01 512.145L1023.39 511.817L1021.75 512.014L1021.03 511.686L1020.18 510.832L1019.07 510.504L1018.02 510.898L1018.41 512.605L1019.72 514.18L1021.49 515.755L1022.74 516.674L1023.98 517.33L1025.69 519.234L1026.47 520.284L1026.8 521.859L1028.44 522.515L1030.73 523.959L1031.19 526.257L1031.59 527.897L1031.98 529.407L1033.62 529.998L1034.73 531.245L1035.98 533.279L1036.63 534.592L1037.42 535.577L1037.49 536.233L1038.21 537.546L1038.34 538.465L1039.12 539.58L1040.04 540.893L1041.61 542.534L1042.93 543.453L1043.38 544.503L1044.76 545.881L1046.53 547.194L1047.71 548.047L1048.89 548.835L1050.14 550.016L1051.32 551.394L1051.71 550.541L1053.15 550.869L1053.87 550.082L1054.2 550.344Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1029.82 534.986L1031.06 534.067L1032.11 536.299L1031.72 537.152L1029.82 534.986Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1026.47 527.963L1027.26 528.16V526.978L1026.47 525.994L1025.56 525.469H1024.57L1025.62 526.65L1026.47 527.963Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M791.68 396.3L792.532 397.285L796.53 396.3L797.186 394.66L798.824 393.281L796.137 394.2L793.581 394.331L792.532 395.316L791.68 395.644V396.3Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1047.71 525.469H1049.55L1050.01 524.55L1048.89 521.531L1046.99 520.284V516.805L1047.32 513.72L1046.01 511.423L1043.52 508.929L1041.94 508.207L1041.29 506.763L1040.24 505.844H1037.22L1036.63 503.547L1035.45 499.937L1034.4 498.69L1033.95 497.574L1032.11 497.115V494.161L1032.44 491.798L1033.55 488.254L1034.6 485.76L1034.8 483.069L1034.47 482.216L1036.5 480.969L1038.14 481.822L1038.27 484.25L1042.01 484.316L1043.84 486.154L1045.02 486.351L1045.94 488.779L1046.33 490.88L1048.1 490.486L1047.84 492.192L1049.61 492.061L1051.71 493.177L1053.02 494.358L1052.63 495.474L1052.04 499.15L1052.69 499.609L1054.79 497.509L1057.15 496.458L1058.07 495.671V494.621L1058.59 494.489L1058.92 493.636L1059.25 492.652L1061.87 492.389L1064.03 491.273L1066.65 489.436L1067.97 487.532L1068.29 483.397L1067.83 480.969L1068.29 479.919L1067.7 478.146L1066.85 475.718L1066.46 474.537L1064.95 472.961L1063.18 470.795L1061.54 470.008L1060.62 468.761L1058.4 466.332L1058.07 464.691L1056.82 463.773L1055.58 462.132L1055.05 460.491L1055.84 457.866L1057.22 456.684L1058.46 455.568L1059.18 453.796L1060.56 453.009L1062.26 452.68L1063.05 450.908H1064.29L1065.87 450.252L1068.29 451.433L1069.47 450.777L1070.52 451.565L1070 453.14L1070.52 454.846L1071.31 455.7L1071.96 455.634L1072.36 454.715L1071.51 453.993L1071.96 453.074L1072.75 452.68L1073.28 451.63L1074.39 451.04L1076.81 450.974L1078.72 449.661L1079.31 449.989L1081.27 449.661L1082.39 448.742V449.333L1083.5 448.348L1083.83 447.167V445.986L1084.75 446.642L1085.53 447.298L1086.97 446.445L1088.55 445.986L1090.71 446.511L1092.42 445.986L1094.38 445.132L1096.48 442.835L1098.25 441.26L1099.23 440.866L1099.95 439.488L1101.2 438.963L1102.71 436.994L1103.03 436.337L1103.69 436.928V435.418L1104.54 435.025L1105.33 434.237L1105.72 431.94L1105.33 430.627L1106.11 429.708L1106.97 430.168L1107.88 428.789L1108.67 428.067L1109.06 427.083L1110.18 425.245L1111.03 424.129L1111.49 424.72L1112.6 424.129L1112.01 422.817L1112.6 421.898L1112.15 420.585L1112.6 420.257L1113.78 420.979V419.666L1113.26 418.485L1114.77 417.041L1112.47 416.516L1111.03 415.991L1109.92 416.319L1109.59 415.466L1110.97 414.153L1113.06 413.694L1113 411.987L1111.16 410.871L1109.59 409.034L1110.97 409.362L1112.87 410.871L1113.06 409.296L1111.69 406.933L1109.92 405.949L1109.79 404.505L1108.67 401.682L1107.75 399.057L1105.92 398.401L1104.8 397.154L1103.95 396.826L1104.34 395.053L1105.52 393.216L1108.67 390.984L1109.46 389.278L1113.13 387.374L1114.05 386.455L1114.77 386.98L1115.62 386.849L1115.88 385.274L1114.24 384.814H1111.75L1110.83 384.027L1108.87 383.174L1105.92 386.587L1104.8 386.193L1103.23 385.996L1102.77 384.486L1103.49 383.436L1102.71 382.058H1099.76L1098.12 381.008L1098.05 378.579L1098.58 377.988L1099.1 376.676L1099.89 376.282L1100.94 377.332L1101.59 376.544L1102.71 376.807L1103.43 375.954L1105.26 373.394L1107.36 372.213L1108.93 370.9L1110.18 369.259L1112.08 368.34H1113.78L1114.9 369.915L1114.64 372.016L1113.06 374.182L1111.49 375.101L1111.62 375.757L1113.06 375.822L1112.93 376.61L1112.01 377.792L1111.29 378.12L1112.15 378.448L1113.92 377.135L1116.41 375.101L1118.7 373.919L1121.19 373.722L1122.83 373.328L1123.68 374.575L1126.24 374.969V377.004L1125.58 378.054L1126.24 378.973L1125.65 379.892L1124.6 380.351V381.27L1125.39 382.452L1126.63 382.845L1127.61 381.992L1128.73 383.108L1130.04 382.189L1130.3 383.567L1131.29 384.946V386.324L1130.17 387.702L1130.5 389.409L1130.89 392.231L1130.11 394.331L1129.78 397.679L1130.56 398.401L1131.81 397.285L1133.12 397.613L1133.51 396.104L1134.89 395.382L1136.79 396.104L1137.84 396.497V395.841L1137.45 395.053L1139.48 395.119L1140.4 393.478V389.212V386.718L1140 384.946L1138.63 382.78L1137.25 380.483L1136.07 378.776L1133.91 377.07L1133.32 376.282L1133.71 375.297L1133.97 373.788L1135.68 372.672L1137.51 372.016L1139.09 370.44L1140.86 369.193L1141.45 368.34V366.306L1141.84 364.402L1143.22 362.827L1144.72 361.383L1146.75 360.595L1147.61 358.823L1148.98 357.182L1149.84 356.789L1150.36 357.445L1151.15 357.182L1151.41 358.692L1152.72 359.414L1154.42 359.873L1157.11 358.823L1159.73 356.789L1161.9 355.016L1163.34 352.129L1165.63 349.831L1167.01 347.862L1168.91 345.565L1171.01 343.071L1172.12 340.905L1173.63 337.426L1175.07 336.048L1176.12 333.554L1178.68 330.469L1179.2 329.091L1179.73 327.581V324.956L1180.38 323.774L1179.66 322.593L1180.05 321.346V319.639L1180.12 316.817L1180.77 315.701V313.798L1181.23 313.404V312.223L1182.41 311.763L1183.33 309.729L1182.81 308.416L1182.48 305.856L1181.82 304.806L1180.97 303.69L1182.09 304.084L1182.81 304.281L1183.59 303.69L1183.13 302.968L1179.46 299.424L1179.14 298.374L1177.56 297.061L1175.6 297.849L1174.15 297.586L1173.56 301.196L1172.71 301.262L1172.91 299.424L1171.93 300.671L1170.09 301.459H1168.71L1170.22 299.293L1169.43 298.374L1169.63 297.521L1168.98 297.061L1168.25 297.914L1168.78 298.571L1168.32 299.687L1166.62 299.818L1166.68 296.405L1166.22 294.567L1165.11 295.027H1163.21L1161.57 294.042L1161.7 292.204L1163.4 291.22L1165.83 289.054L1166.09 288.135L1167.07 287.807L1168.12 286.757L1169.57 285.51L1171.73 282.95L1171.93 281.637L1172.91 280.587L1174.02 279.34L1175.66 277.765L1177.69 275.927L1178.87 274.286L1179.99 273.892L1180.38 272.383L1180.91 271.595L1181.43 270.348L1183.33 269.232L1184.77 267.723L1186.08 265.622L1187.59 264.178L1190.28 263.391L1193.1 263.063H1196.24L1199.19 262.734L1199.72 264.31L1200.57 264.441L1201.88 262.406L1203.32 263.063L1204.96 263.588L1206.53 263.391L1208.04 262.8L1209.62 263.916L1210.6 263.391L1209.94 262.406L1210.6 261.947L1211.06 262.275L1211.39 260.962L1213.02 260.437L1214.92 260.962L1216.17 261.619L1216.83 262.538H1217.55L1218.14 261.684L1219.84 261.947L1220.82 263.391L1222.73 263.916L1221.94 264.703L1219.51 264.9L1219.19 266.344L1219.78 266.935L1221.94 266.607L1223.77 265.885L1224.82 266.41L1225.67 265.097L1226.72 264.178L1228.3 264.441L1229.02 265.425L1229.8 264.9L1230.66 264.31L1232.56 264.375L1233.02 263.588L1232.23 262.341L1230.46 262.538L1229.35 262.275L1229.15 261.422L1229.67 260.831L1229.41 259.518L1230.66 258.14L1232.03 256.237L1233.8 254.727L1235.64 252.758L1236.16 251.445L1238.19 249.673V247.507L1239.9 246.391L1241.54 245.276L1242.98 245.604L1244.49 245.276L1247.5 244.488L1248.75 246.129L1250.32 245.341L1251.7 244.488L1252.09 245.801L1251.37 247.835L1250.39 249.083L1250.58 250.986L1252.09 251.183L1251.57 252.561L1251.3 254.268L1252.35 253.48L1253.4 253.086L1255.04 251.117L1257.66 248.032L1259.3 246.391L1260.87 246.26L1261.46 246.785L1261.92 246.523L1261.4 245.604L1261.14 244.488L1261.92 241.994L1262.45 239.566L1265.27 238.778L1266.58 238.253L1268.08 239.566L1269.4 239.959L1269.13 241.272L1267.76 240.616L1265.53 241.928L1265.2 245.998L1264.02 247.77L1265 249.542L1263.43 250.92L1263.96 252.364L1261.79 253.217L1257.66 256.105L1257.33 257.681L1252.48 262.538L1250.26 265.294L1249.47 266.607L1248.55 268.248L1244.88 271.923L1244.03 272.842L1242.26 273.039L1241.28 274.22L1239.44 274.089L1239.24 275.139L1239.77 276.715L1239.31 277.502L1238.13 279.274L1237.74 280.324L1236.03 281.768L1235.57 283.869L1234.85 287.15L1234.92 293.517L1235.77 297.783L1236.56 303.625L1237.21 307.694L1237.93 310.254L1238.13 314.52L1238.98 316.03L1241.41 313.864L1243.96 310.713L1245.08 308.547L1244.75 306.775L1245.99 304.806L1248.03 303.297L1250.12 303.231L1249.73 301.459L1249.53 298.965L1251.17 296.996L1253.4 295.027L1255.17 295.223L1256.81 294.895L1258.06 293.189L1257.01 291.351L1256.42 289.382L1257.27 286.888L1257.86 285.116L1260.09 284.459L1261.07 285.247L1261.92 285.378L1262.51 284.591L1262.38 283.015L1261.92 281.703L1260.74 281.44L1260.55 278.881V276.977L1261.73 275.533L1261.99 274.352L1260.02 273.498L1259.24 274.746L1258.06 274.155L1257.53 272.777L1257.79 270.545L1258.71 268.445L1261.14 265.951L1261.01 265.032L1262.05 263.522L1261.92 261.816L1262.84 259.518L1264.22 258.468L1265.53 258.403L1266.58 257.746L1268.54 259.978L1268.87 257.943L1270.97 256.63L1272.8 255.318L1273 258.206L1272.67 259.19L1272.8 260.109L1274.18 258.665L1275.03 257.156L1275.56 255.712L1276.61 255.843L1278.64 254.793L1280.54 254.202L1282.7 254.465L1284.73 255.055L1285.91 256.696L1286.5 257.878L1287.88 258.534L1288.4 256.827L1288.86 255.383L1290.24 254.858L1292.08 253.217L1293.65 252.43L1294.63 250.33L1295.22 249.739L1295.94 250.133L1296.66 249.608L1296.4 248.492L1297.97 248.229L1298.76 246.917L1299.29 245.538L1300.6 245.67L1301.12 245.013L1302.69 244.816L1303.81 243.832L1305.18 243.504L1311.35 239.566L1311.67 237.859L1313.18 237.596V238.712L1313.9 239.5L1315.74 239.894L1317.57 240.747L1319.08 241.403L1319.54 240.287L1320.72 238.909L1320.46 237.596L1320.06 234.774L1317.77 232.871L1317.51 230.705L1317.84 230.049L1317.11 227.095L1316.52 225.651H1316L1315.08 226.57L1313.18 224.601L1312.92 222.369L1311.48 222.96L1311.08 223.748L1310.3 223.485L1308.79 221.385L1308.66 220.072L1309.71 220.466L1311.28 220.925H1312.46L1312.13 220.072L1310.56 219.678L1310.36 218.956H1312.07L1312.99 220.138L1314.36 222.172L1318.82 221.844L1320.72 220.728L1322.42 218.956L1323.8 217.381L1324.46 214.428L1323.41 213.18L1323.08 210.227L1323.73 209.111L1324.06 209.702L1324.85 209.374L1325.7 207.864L1326.16 208.652L1327.08 208.455L1327.73 207.864L1328.32 208.849L1326.95 211.737L1328.32 213.64L1328.06 214.953L1328.59 215.478L1330.95 215.412L1333.37 214.099L1335.07 214.821L1337.17 216.265L1337.89 218.431L1337.63 219.875L1339.4 221.254L1341.11 221.516L1342.48 222.566L1343.66 223.288L1344.58 224.995L1345.37 224.929L1346.61 224.01V225.651L1347.86 225.585V223.879L1348.91 224.667L1349.69 223.879L1348.84 223.288L1347.92 222.829L1348.18 221.779L1348.58 220.466L1349.69 220.138L1350.35 219.416V216.134L1349.04 214.624L1348.51 213.837L1349.23 213.246L1350.35 213.837L1350.68 214.756L1352.58 215.084L1353.82 215.018L1354.35 214.624L1353.17 213.115L1352.9 212.327L1353.43 212.262L1354.08 213.115L1355.13 213.837L1355.66 214.099L1356.25 213.312V211.933L1357.75 210.818L1359 210.555L1358.02 209.308L1356.25 207.864L1354.08 205.829L1352.84 203.598L1352.12 202.679L1351 202.351L1347.92 202.942L1346.74 201.563L1345.43 201.235L1343.66 201.694L1344.32 203.926L1343.86 205.501L1345.23 206.814L1344.78 207.667L1343.53 207.011L1342.61 207.798L1342.22 206.42L1340.32 205.173L1341.11 203.335L1340.71 198.281L1339.86 198.807L1339.4 196.575L1338.88 195.656L1337.63 195L1336.98 196.378L1336.25 195.984L1336.32 194.081L1335.73 193.228L1334.94 193.556L1334.03 192.899L1333.9 191.915L1331.93 190.471L1331.67 193.359L1329.83 194.672L1329.37 193.884L1330.88 192.834L1330.68 191.324V190.471L1331.01 189.815H1330.55H1329.83L1329.37 188.502L1327.8 187.977L1327.01 186.992L1326.75 185.68L1324 183.842L1322.69 183.448L1321.7 182.398L1320.46 181.02L1319.08 180.101H1317.97L1317.64 178.46H1315.21L1314.43 177.541L1312.92 176.753L1311.08 176.425L1310.56 175.769L1309.12 175.047L1308.53 173.931L1308.13 174.85L1306.56 174.587L1303.74 174.194L1301.78 173.931L1301.06 173.537H1299.35H1298.7L1299.09 174.784L1298.17 174.653L1296.47 173.275L1293.52 172.75L1291.55 171.962H1288.73L1288.54 175.244L1287.55 176.622L1289.19 177.278L1289.91 180.888L1290.31 182.135L1289.32 183.251L1287.55 184.695L1285.78 185.155L1284.47 184.498L1284.08 182.398L1282.44 181.348L1281.39 180.691L1280.21 180.56L1279.88 176.95L1279.36 175.703L1280.08 175.375L1281.39 176.228L1283.55 176.753L1284.21 174.391L1283.75 173.275L1280.28 172.422L1278.77 173.734L1277.92 175.572L1275.49 178.066L1272.94 177.541L1271.69 177.082L1266.97 176.885L1265.27 175.506H1264.48L1263.69 175.966L1261.27 176.031L1260.35 176.491L1259.17 176.097L1256.29 179.116V184.104L1255.11 185.548L1254.84 184.367L1255.5 182.267L1255.17 179.313L1255.96 177.869L1255.76 176.95L1254.97 177.41L1254.65 178.722L1254.71 181.545V182.267L1253.93 181.742L1253.86 176.885L1252.09 175.9L1249.4 174.325L1249.21 173.012L1250.45 169.927L1250.32 168.68L1249.67 166.186L1248.35 164.742L1246.26 162.839L1240.69 161.001H1235.11L1228.03 163.364L1228.82 165.333L1228.3 165.727L1227.44 164.414L1227.25 163.233L1224.17 163.758L1220.69 162.314L1220.89 161.461L1221.68 161.395L1221.09 159.492L1219.71 157.982L1218.53 157.26L1217.22 158.507L1216.69 158.048L1215.84 158.704L1215.58 157.982L1216.83 156.735L1216.24 156.013L1215.32 156.735L1215.25 156.275L1215.45 155.619L1214.53 154.438L1210.93 154.175L1211.12 152.797L1212.7 151.681L1213.22 152.534L1214.01 152.403L1214.86 151.353L1214.4 150.565L1214.2 149.909L1212.7 148.465L1211.25 147.677L1208.96 146.824H1204.7L1202.8 149.45L1201.29 151.812L1199.46 153.847L1198.14 154.503L1196.37 154.044L1196.24 152.731L1196.9 152.272L1196.64 151.025L1197.36 151.222L1198.28 151.287L1199.19 150.762L1198.93 149.843L1198.67 148.662L1199.26 147.612L1200.5 147.743L1201.03 148.793L1200.24 150.171L1200.11 151.287L1201.49 149.909L1202.54 148.202L1203 147.218L1202.34 146.627H1200.83L1199.39 146.89L1197.36 147.415L1195.52 148.006L1194.6 147.349L1195.52 146.168L1196.37 145.052L1197.55 145.249L1199.39 145.84L1201.55 146.037L1202.8 145.774L1201.36 145.052L1199.06 144.002L1195.52 143.017L1191.79 142.295L1188.57 141.902H1185.23L1183.46 140.392L1181.63 140.064L1182.28 141.836L1183.2 143.214L1181.82 144.199L1180.38 144.855L1178.28 144.658L1177.17 144.789L1175.53 146.693L1175.79 148.071L1176.51 148.465L1178.02 147.415L1178.87 147.94L1177.56 150.828L1178.22 152.994L1178.61 155.947L1177.23 156.538L1176.38 157.194L1175.4 155.947L1174.02 154.372V157.26H1173.43L1173.37 155.816L1172.84 155.225L1171.99 155.619L1171.47 156.866L1171.27 158.704L1170.02 159.032L1169.17 157.391L1167.93 156.997L1167.4 156.013L1166.22 156.21L1165.57 155.028L1162.62 154.766L1160.85 156.079L1158.82 157.785L1157.77 157.982L1156.39 156.997L1155.14 155.947L1153.18 153.65L1152.26 151.681L1151.41 153.191L1150.43 156.013L1149.64 158.573L1148.92 162.051L1147.93 164.349L1146.75 164.808L1145.84 164.152L1145.51 162.708L1144.92 163.43L1143.41 161.723L1141.38 159.229L1140.4 157.326L1140 155.422L1139.41 154.832L1138.5 154.635L1138.76 153.978L1139.81 153.716L1140.27 152.6L1139.87 152.534L1139.35 153.191L1138.43 153.388L1137.38 151.55L1137.25 150.5L1137.71 150.697L1137.91 151.222L1138.17 150.762L1138.04 149.975L1137.18 149.581L1135.68 148.202L1135.15 147.612L1134.63 146.365L1132.53 145.84L1131.22 145.774L1131.81 147.612L1132.27 149.253L1132.53 150.434L1133.19 151.419L1133.12 152.862L1132.73 153.256L1133.19 154.438L1133.32 156.407L1134.17 160.673L1133.91 161.592L1133.25 161.657L1133.19 160.41L1132.79 159.098L1132.47 156.472L1132.2 154.044L1132.01 151.681L1130.56 149.843L1129.19 148.728L1128.34 147.284L1127.81 146.627L1128.2 146.037L1128.53 146.758L1129.25 146.233L1129.58 145.183L1128.93 144.199L1128.01 143.411L1128.79 142.558L1129.45 141.836L1129.91 142.033L1130.17 139.604H1129.78L1129.52 140.392L1129.12 140.064L1129.38 138.817L1131.02 137.045L1131.74 136.651L1132.53 136.06L1133.38 136.52L1132.92 137.57L1131.94 138.62L1131.48 139.998L1130.96 140.654L1130.56 141.705L1130.83 142.427L1131.35 141.245L1131.81 140.392L1132.33 139.473L1132.79 140.129L1132.6 141.245L1131.88 142.295L1131.55 142.755L1131.68 143.411L1132.53 142.624L1133.19 141.376L1134.04 141.18L1135.09 140.72H1136.4L1136.79 139.736L1137.91 138.882L1139.02 138.357L1139.94 138.423L1140.4 138.817L1140.53 138.095L1140.07 137.176L1139.28 136.651L1138.63 137.701L1137.91 138.095L1137.51 137.438L1138.17 136.323L1137.97 135.207H1136.99L1136.4 135.994L1135.61 136.52L1134.37 136.979L1134.23 136.454L1134.5 135.929L1135.61 135.601L1136.27 134.813L1136.33 133.96L1135.48 134.288L1135.02 133.763L1134.23 133.238L1134.5 132.581L1134.04 131.663L1133.19 132.45L1132.79 131.663L1131.88 131.991L1131.74 133.435L1130.7 133.829L1130.96 135.929L1130.5 135.994L1129.45 134.419L1129.25 133.369L1129.71 132.385L1128.93 131.663L1128.2 132.647L1127.09 132.844L1126.5 131.663L1125.39 131.138L1125.25 130.284L1124.01 129.497L1122.24 128.643L1121.13 130.481L1120.4 130.547L1119.42 129.431L1119.49 130.809L1118.9 132.385L1119.29 134.747L1119.81 136.716L1118.96 138.751L1118.24 139.079L1117.39 138.62L1116.08 136.979L1115.55 137.438L1116.67 138.751L1117.65 139.539H1118.57L1119.49 140.326L1120.14 140.72L1121.65 140.983L1123.09 141.967L1123.88 142.361L1125.12 143.542L1126.37 144.396L1126.5 145.052L1126.11 145.38L1125.32 144.593L1123.75 143.411L1121.72 142.361L1120.47 141.639L1119.36 141.77L1118.7 141.967L1117.78 141.245L1116.08 140.392L1114.05 139.539L1112.54 138.882L1110.24 139.276L1108.28 138.751L1107.75 137.176L1105.92 136.191L1104.41 137.242L1102.9 137.045L1101.2 135.798L1100.94 133.107L1101.72 132.253L1102.12 131.531L1101.26 131.203L1098.45 131.269L1095.82 130.809L1094.38 129.694L1093.07 130.219L1092.02 129.431L1089.53 129.694L1088.35 130.744L1085.6 131.006L1083.7 132.056L1085.47 134.091L1084.35 134.55L1084.16 136.257L1083.5 136.454L1082.65 135.338L1083.24 134.616L1082.26 133.238L1082.52 131.006L1082.91 130.219L1082.19 128.184L1081.27 126.215L1081.01 129.103L1079.96 129.431L1076.95 129.234L1075.77 127.528L1075.04 126.674L1075.9 125.23L1075.31 124.968L1074.26 126.346L1073.34 126.215L1072.1 125.23L1070.59 126.084L1070.19 127.396L1069.21 128.315L1069.6 129.562L1071.57 129.168L1072.95 128.184L1073.86 128.643V129.562L1071.31 131.269L1071.05 132.188L1068.95 133.041L1064.82 134.813L1064.43 135.798L1061.02 136.913L1058.66 136.651L1057.48 136.454L1057.15 138.489L1058.66 139.211L1060.43 139.801L1060.1 140.523L1058.72 140.261L1057.41 139.604L1056.36 139.276L1055.31 140.72L1054.92 141.573L1053.09 141.836L1051.38 143.608L1050.4 144.396L1048.89 145.183L1048.83 144.067L1049.68 142.886L1051.19 142.164L1052.17 140.851L1053.94 140.261L1055.38 138.948L1055.64 137.504L1056.36 136.388L1056.56 134.813L1057.61 133.894L1059.25 133.829L1059.58 132.188L1059.9 130.35L1062 129.956L1064.03 129.431L1064.88 128.709L1065.87 126.937L1066.79 125.559L1067.7 124.246H1068.88L1070 122.736L1070.33 121.03L1071.64 119.98L1072.16 118.47L1072.82 118.864L1074.19 117.945L1075.7 116.304H1077.01L1077.67 115.057L1079.04 113.285L1080.29 112.891L1081.86 110.66L1083.7 107.509V105.343L1082.65 104.556L1082.26 102.783L1081.8 103.834L1081.34 104.621L1080.55 104.162L1080.75 102.783L1080.62 101.471L1079.31 100.355L1079.57 99.7643L1080.94 100.618L1081.8 101.668L1082.91 102.652H1084.09L1084.68 101.536L1084.55 99.0423L1083.24 98.5172L1083.17 95.4324L1082.71 94.3823H1081.8L1081.86 95.6949L1081.34 96.6795H1080.75L1080.62 95.1699L1079.96 94.3823L1080.62 92.3476L1080.22 89.9191L1079.83 88.6721L1078.52 88.0157H1076.81L1074.59 86.1123L1073.54 86.6374L1072.42 86.1123L1071.37 87.0312L1069.74 87.1625L1069.01 86.3749L1066.79 87.0968H1065.15L1064.75 86.6374L1063.51 86.8343L1063.25 89.0659L1062.72 90.2473L1060.56 90.116L1059.71 90.9036L1058.07 90.2473L1057.94 89.2628L1058.92 88.3439L1059.12 86.5718L1060.82 84.4715L1060.89 82.5681L1058.66 81.5179H1057.15L1055.58 82.765L1055.05 82.3712L1055.38 81.5179L1055.45 80.599L1054.53 81.2554L1052.56 81.3866L1050.14 81.0585L1050.2 80.1396L1052.5 79.4176L1054.13 78.7613L1054.79 77.3173L1055.84 76.2015L1057.08 76.5953L1056.17 75.217L1055.77 73.1823L1054.59 73.7731L1053.28 73.1823L1052.04 71.4759L1051.38 71.1477H1050.46L1049.94 70.4913L1048.96 70.9508L1047.91 72.1978L1046.47 71.9353L1044.56 74.2325L1042.21 77.1204L1040.44 79.6802L1039.71 81.0585L1039.65 82.765L1038.47 83.5526V85.1278L1039.45 86.5718L1038.6 89.5253L1038.99 90.116L1040.7 90.5755L1042.27 91.4287L1043.98 91.8881L1043.84 92.8727L1042.01 92.5445L1040.76 91.6256L1039.06 91.2974L1038.08 90.7067L1037.81 89.9847L1036.96 90.2473L1036.5 90.9036L1034.47 90.6411L1033.82 91.2318L1032.11 91.0349L1031.65 90.2473L1030.73 90.6411L1031.32 92.3476L1032.57 93.3321L1033.75 94.3823L1033.95 95.6949L1033.49 96.4169L1032.57 95.6949L1032.18 94.4479L1030.73 94.6448L1030.34 93.8572L1029.69 94.5792L1028.24 95.6949V96.6138H1026.67L1027 98.189L1026.01 97.7952L1024.9 97.7296L1024.64 96.5482L1023.13 97.2045V97.7952L1024.18 97.7296L1024.05 98.3203L1023.39 98.5172L1022.74 99.5674L1022.21 99.2392L1022.67 98.7798L1022.48 98.189H1021.56L1020.38 98.6485L1019.79 99.0423V98.2547L1020.38 97.5327L1020.84 96.4825L1019.79 95.6949L1018.15 95.3668L1017.76 96.0231L1016.77 95.6949L1015.59 95.3011L1015.2 96.1544L1014.41 95.6949L1012.97 96.0231V96.7451L1011.92 96.8107L1011.27 97.2045L1010.68 96.3513L1010.28 96.4825V97.4671H1009.5L1009.1 99.4361L1009.76 98.911L1010.35 97.9921L1010.87 98.4516L1011.4 99.3048L1012.05 99.633L1010.74 100.486L1008.19 101.011L1005.17 102.127V103.046L1002.81 102.98L1001.43 103.177L1000.84 103.768L999.074 103.965L998.747 105.015L997.567 105.868L996.453 105.146L994.552 106.984L993.306 108.756L992.454 110.266L990.815 110.66L989.308 110.2L988.128 110.266L987.866 110.856L988.849 111.382L990.488 111.578L990.684 112.366L990.225 112.891L989.111 112.169V113.285L988.325 114.466L987.866 115.517V117.42L987.276 116.895L986.751 116.042L985.375 115.188L984.523 115.517L983.867 116.567L984.261 117.092L985.637 117.354L986.882 118.733L987.866 120.177L987.407 120.636L986.62 119.651L985.506 119.389L984.588 119.914L983.867 121.03L984.523 121.883L986.293 122.014L987.21 122.408L987.472 124.312L987.931 125.034L986.817 126.084L987.407 126.477L988.39 126.149L988.128 127.068L987.276 127.265L984.654 127.462L983.146 128.512L982.36 129.694L981.18 129.234L980.262 128.84L977.575 129.562L975.739 130.547L969.643 130.678L966.759 131.466L965.186 131.728L965.383 132.647L964.662 133.697V134.747L965.514 135.535L964.858 136.388L965.907 137.767L965.841 141.18L965.448 142.23L966.038 143.017L966.104 144.527L966.431 145.249L967.48 145.905L969.905 146.496L971.02 147.48L971.348 148.924L972.003 149.646L972.396 151.222L974.232 151.55L975.28 152.141L975.608 153.584L976.001 154.832L975.608 155.75L974.69 157.785L974.494 159.163L975.28 161.395L976.067 164.217L976.526 167.565L976.133 168.483L975.018 169.205L973.642 169.534L974.297 171.306L975.608 172.093L976.198 173.406L977.509 174.784L978.492 175.966L979.344 175.703L980.328 174.456L981.114 174.587V175.309L980.59 175.638L979.476 176.819L979.017 177.213L977.771 177.016L977.312 175.9L975.739 174.062L975.346 174.719L974.69 174.128L974.953 173.012L974.428 172.356L972.855 171.831L972.003 170.584L972.134 169.599L972.79 169.009L973.183 167.499L973.38 165.399L973.969 164.414L973.642 163.233L972.921 163.364L972.003 163.823L972.527 164.283L972.069 164.939L971.741 165.924L971.282 166.711L970.561 166.449L970.692 165.661L971.151 164.808L971.02 163.364L970.692 162.445L970.758 158.901L972.069 157.523L973.445 156.735L973.248 155.816L973.576 154.963L974.363 154.044L973.38 153.584L972.265 153.322L970.758 154.11L968.267 153.781L966.431 151.419L965.186 149.712L963.416 148.531L961.909 147.152L961.056 146.43L958.041 146.102L956.075 146.496L954.96 147.612L954.043 148.137L953.584 148.596V149.187L954.895 148.793L956.009 149.253L956.665 150.959L955.681 152.337H953.781L952.863 151.09L951.683 149.778L950.372 150.171L948.799 151.944L949.585 154.241L950.307 155.488L951.749 156.801L952.928 157.654L954.239 158.376L955.157 157.719L955.419 158.376L956.73 158.77L957.189 160.739L957.451 162.248L956.73 162.839L955.485 162.051L955.026 160.804L954.633 160.345L952.47 159.885L948.209 159.623L947.291 159.032L945.849 157.785L945.718 156.801L946.308 155.882V154.372L945.456 153.519V150.828L946.243 150.106L946.701 148.006L946.964 146.89L946.374 145.118L946.898 143.805L946.111 142.624L945.849 140.983L944.538 139.539L943.686 138.029L943.162 137.176L941.982 137.504L941.72 138.292L942.768 139.079L943.883 140.326L944.604 141.902L945.128 144.067L945.063 147.546L944.407 149.187L943.227 150.565L940.999 151.615L939.622 152.862L939.426 154.372L938.967 155.357L937.918 156.538L938.18 157.457L939.557 158.835L940.605 160.673L941.13 163.364L942.244 164.545L942.637 166.383L941.851 168.155L940.671 170.846L940.212 173.669L939.688 175.113L940.474 176.819L940.999 178.132L940.605 180.166L940.736 181.151L941.13 181.545L942.244 180.888L943.358 181.61L944.473 181.545L945.456 180.954L946.374 179.904L949.061 180.101L950.896 181.217L952.404 182.267L954.239 183.251L954.895 186.927L955.616 188.502L956.14 189.618L955.813 190.471L954.174 191.521V194.343L955.157 195.262L956.534 195.131L957.976 195.722L958.238 196.969L957.124 197.166L956.14 196.903L954.633 197.822L953.912 196.772L953.781 195.722L952.666 194.475V191.193L953.06 190.537L952.666 189.158L952.863 187.649L951.224 185.942L950.503 185.155L950.372 183.12H948.602L946.57 183.908L944.604 184.826L943.162 186.073L942.637 188.633L943.227 189.88L944.014 191.587L944.276 193.425L943.948 195.394L941.523 198.413L941.064 200.907L940.736 202.22L939.098 204.057L937.918 204.648L935.558 206.748L935.296 208.52L934.64 209.374L932.871 208.914L931.625 207.995L929.003 208.389L927.43 207.93L925.791 206.945L924.48 205.961L923.694 205.764V204.451L921.793 205.239L921.334 205.895L920.679 204.845L921.072 204.057L922.973 203.532L923.759 203.27L924.415 203.86L925.333 204.254L925.529 205.304L926.447 206.223L927.234 206.026L926.709 204.976L926.316 203.86L926.709 203.007L927.43 203.598L928.348 204.845L929.266 206.026L930.642 205.567L932.15 204.714L932.084 204.057L931.625 202.548L932.215 201.826L933.133 202.088L934.051 201.694L933.985 200.382L934.903 199.266L935.689 197.888L936.476 196.312L937.787 194.803L938.246 193.425L937.721 191.521L938.18 190.143L939.622 188.174L939.491 186.992L937.656 185.483L936.148 183.317L935.689 181.676L936.083 177.475L935.82 175.441L936.41 174.325L935.886 173.012L936.083 170.846L935.427 169.862L936.148 167.893L936.541 166.318V163.692L936.083 160.673L934.051 158.376L933.198 156.275L934.509 154.306L935.296 152.469L936.083 149.187L936.869 146.758L936.541 144.396L936.41 142.558L936.148 141.639L934.378 140.851L931.625 139.933L930.118 140.129L925.726 140.195L925.07 139.342L923.759 141.376L922.907 144.789L922.449 147.874L922.121 151.222L921.334 152.862L920.351 154.897L919.63 155.816L916.287 158.638L915.238 160.476V161.461L915.828 162.117L915.238 162.708V163.889L917.401 164.02L917.86 165.202L917.074 166.252L917.467 167.63L917.074 168.877L916.877 169.927L917.205 171.043L917.532 172.159L915.763 173.472L915.238 175.113L915.631 177.541L916.418 178.526L917.139 177.935L916.942 176.95L916.09 176.885L915.959 175.9L916.68 175.703L917.598 176.228L919.106 176.95L920.154 177.475L919.892 179.444L920.679 181.151L921.334 182.595L922.252 183.514L923.563 183.12L923.891 183.842L923.432 185.877L922.58 187.452L921.99 189.093L921.269 190.537L920.679 190.799L918.253 196.444L911.764 205.764L903.243 212.458L887.839 219.81L881.481 229.458L878.924 245.341L874.271 256.959L869.944 259.781L868.109 263.128L870.6 267.526L877.351 267.066L878.662 270.086L878.597 272.186L868.764 281.572L868.24 285.575L869.944 287.15L871.452 290.038L874.336 291.285L880.498 289.645H884.627L886.725 292.139L886.528 295.617L883.513 302.443V304.544L884.562 306.644L890.854 310.844L892.821 311.96L892.427 312.945H894.263L894.59 313.798L897.278 315.111L896.426 317.67L892.952 318.655L891.116 317.473L889.084 319.508L888.822 318.327L886.856 318.064L885.414 315.767H883.054L882.136 317.277L880.498 315.833L879.449 316.62L878.466 316.03L875.713 319.246L871.78 316.292L872.042 318.655L871.255 319.246L870.993 317.145L866.995 313.667L864.176 313.864L863.717 311.96L861.554 312.945L861.095 313.864L859.915 313.732V312.813L857.556 311.96V313.076L852.902 316.03L852.967 317.408L849.887 318.917L850.935 322.199L848.969 322.987L846.085 319.771L843.856 322.724V326.334L842.217 330.929L844.577 331.716L844.315 334.145L845.495 334.801L845.757 333.816L848.313 334.867L851.198 339.724L849.362 340.577L851.394 342.152L852.902 341.955L854.672 340.446L858.015 338.608L860.374 338.148L861.554 339.133L863.39 339.527L864.504 339.002L865.487 339.986V341.889L865.094 342.415L865.553 343.727L866.011 344.121L865.618 345.303L864.373 345.893L864.111 346.746L861.554 346.615L859.85 347.272L858.67 349.372L860.636 351.275L858.801 351.407L858.277 351.013L855.917 350.947L855.851 351.8L857.425 352.325L858.539 353.835L859.522 355.673L859.915 357.576L861.423 357.707L862.013 359.086H864.111L864.897 359.939V361.186L864.111 362.302L864.045 363.877L864.438 365.19L865.094 365.912L864.897 364.796L865.553 363.418L867.388 362.433L868.568 362.827L869.551 364.468L871.976 367.618L872.107 369.325L870.796 368.8L870.731 368.997L871.321 369.981L870.403 369.915L868.502 369.39L867.847 369.456L867.257 369.85L866.143 369.719L865.749 368.865L865.356 369.259L865.028 370.703L865.29 372.672L868.437 372.803L868.699 373.394L867.847 373.853L868.175 376.544L869.158 377.66L869.486 378.382L869.092 379.367V381.073V384.355L869.223 385.536L869.879 387.374L869.289 387.768L868.043 387.505L866.47 387.768L863.324 388.621L861.358 388.818L859.915 388.227L858.08 387.637L856.638 386.783L855.983 385.536L854.344 384.814L852.246 384.289L851.198 383.305L851.132 381.401L850.804 379.957L850.87 377.857L851.394 376.61L852.181 376.413L852.443 375.494L852.771 374.444L853.23 372.409L854.278 371.359H855.851L856.179 371.097L855.524 370.703L854.278 370.309L853.361 369.981L851.984 367.815L851.001 365.912L850.542 364.927L849.887 364.336L847.592 366.896L845.233 366.371L844.774 365.452L839.333 362.63L839.858 361.12L836.974 359.742L834.745 360.136L832.516 360.202L832.32 359.611L827.797 357.182L824.388 357.379L819.997 355.738L819.144 356.526L820.39 357.445L822.618 358.495L824.323 359.545L824.913 360.727L825.044 361.842L825.699 363.877L824.978 365.649L823.208 367.356L820.849 368.471L819.472 368.997L817.178 368.275H815.146L813.507 368.997L811.803 368.603L809.705 368.078L807.346 366.765L806.166 367.29L804.593 365.124L802.036 365.058L801.446 363.549L798.759 364.008L795.678 363.615H794.105L791.68 364.862L789.975 366.109L787.812 367.749L783.355 367.553L779.422 367.487L778.111 366.634L776.669 365.321L775.62 363.352L772.736 363.024L770.18 364.927L770.901 366.371L769.918 367.356V368.406L769 369.522L770.114 369.85L771.163 369.981L770.573 370.769L769.852 371.688V372.869L769.262 373.919L769.328 375.035H770.639H771.687L771.425 376.151L771.95 377.792L772.277 378.842L771.884 379.432L772.146 380.351L771.687 380.679L771.163 380.22L770.77 379.564L770.377 379.629L770.245 380.811L770.639 381.205H771.687L772.081 381.598L773.195 382.452L773.457 383.305L772.933 383.896L773.261 384.355L774.506 385.799L774.441 386.455L775.162 386.783L776.735 386.587L776.341 387.571H778.111L778.963 388.227L779.75 387.965L779.947 388.818L780.93 389.868L781.979 390.393L783.224 390L784.666 389.868L785.059 388.49L785.649 387.374L787.55 387.505L789.32 388.162L790.696 389.343L792.204 390.853L793.712 390.984L795.023 390.393L796.465 390.328L797.71 389.474L799.349 388.03L799.939 387.44L800.66 387.702L801.774 388.556L803.02 388.162L804.331 387.44L805.117 386.98L805.51 387.44L805.314 388.556L804.134 389.803L804.199 390.525L804.658 391.05L804.265 392.494L804.003 393.281L804.658 394.594L804.724 397.285L804.331 398.401L803.478 399.91L803.085 401.223L802.167 402.798L801.315 404.57L800.922 405.817L800.529 407.721L800.07 409.296L799.48 410.149L798.628 411.856L800.594 418.747L801.119 419.994L800.529 422.16L800.594 424.654L801.84 424.786L802.888 426.427L804.199 428.855L805.773 430.627L806.297 432.465L807.542 433.253L808.395 435.287L809.312 436.6L809.116 438.306L810.164 439.619L812.065 440.735L813.901 442.77L815.277 445.461L816.064 448.283L815.736 449.267L815.67 450.121L816.588 451.958L816.129 452.287L817.047 453.796L817.833 455.043L819.341 455.765L821.176 456.815L822.553 458.981L823.471 460.491L823.733 461.935L824.65 462.985L825.568 465.02L827.141 466.267L828.059 467.908L829.173 470.402L829.239 472.371L828.78 474.93L829.894 476.571L830.55 479.394L831.205 482.019L831.664 483.857L832.057 484.25L833.762 484.579L836.515 483.791L839.006 482.478L840.513 481.756L843.594 481.56L846.085 480.181L847.986 479.919L848.313 479.262L850.083 479.328L851.722 477.753L853.492 476.834L855.589 476.506L857.425 475.324L860.44 474.668L861.882 473.815L862.865 473.618L863.39 470.927L864.766 469.811L867.191 469.352L868.896 468.761L871.124 468.17L872.697 468.301L873.746 467.317L873.943 466.135L874.926 464.954L877.155 464.888L878.728 463.444L880.039 461.344L881.677 461.016L882.857 460.819L882.726 458.719L882.988 456.487L883.185 454.256L883.775 453.862L884.562 454.518L884.758 455.437L885.873 454.715L887.118 452.812L887.839 451.63L888.626 451.368L889.609 449.596L890.395 448.086L890.133 447.43L889.216 446.905L887.511 445.067L886.069 443.098L882.923 442.638L880.432 441.719L878.4 438.832L877.745 436.403L877.679 433.056L876.63 433.909L874.598 436.272L872.239 438.438L871.649 439.422L870.6 439.685L869.617 441.063L867.126 441.26L864.766 440.866L862.144 441.522L860.636 440.341L860.112 440.144L859.915 438.7L860.768 437.716L860.833 434.106L860.112 433.515L858.867 433.646L858.08 435.287L857.883 436.666L857.752 437.913L856.704 436.14L855.13 433.778L855.917 431.94L854.672 429.905L851.132 427.28L850.411 425.18L849.559 423.211L848.641 421.307L847.33 419.994V419.076L848.969 418.55L850.411 416.975L851.787 415.925L853.688 417.041L854.672 416.188L855.655 416.516L857.097 419.338L857.818 420.651L859.26 422.423L859.85 424.589L861.161 425.77L862.931 426.164L863.455 426.82L864.373 427.214L864.635 427.936L866.798 429.118L868.961 430.036L871.911 431.349L873.025 431.087L875.123 429.446L877.548 428.593H878.99L880.432 429.905L881.481 434.04L883.578 434.631L885.61 434.959L887.184 435.156L887.708 435.55H888.56L889.347 435.222L890.264 435.55L892.1 436.14L892.821 435.484L893.345 436.206L895.377 437.125L896.95 436.666L899.376 436.469H902.718L903.833 435.812L905.603 436.272H907.7L910.978 435.812L914.91 435.55L915.173 437.125L915.763 437.847L917.008 437.978L917.729 440.997L918.253 441.522L919.892 441.785L920.679 442.77L921.596 442.704L922.449 444.542L923.956 445.592L925.66 445.986L927.234 445.592L928.217 445.264L928.61 445.658L928.217 446.511L926.316 447.758L925.529 448.217L923.497 447.955L924.743 449.792L926.578 451.565L928.151 453.337L929.593 453.927L931.691 453.665L933.657 452.877L934.837 450.711L934.772 449.005L935.493 448.48L937.131 448.217L936.672 448.874L936.279 449.53L936.607 451.63L937.197 454.19L937.525 455.568L937.131 456.29L936.804 457.472L937.525 460.556L938.377 460.819L937.918 462L937.656 463.444L938.573 465.873L939.163 470.402L940.015 472.436L942.637 477.424L943.49 480.05L944.211 481.494L944.407 483.332L946.046 486.745L947.029 487.86L948.471 491.339L949.782 494.949L950.634 498.034L951.88 499.675L952.732 500.462L954.371 500.922L955.878 499.872L956.534 498.231L959.024 496.59L959.811 494.227L960.729 493.046L961.515 492.849L962.499 493.308V489.764L962.105 488.779L962.499 487.664L963.22 485.891L963.809 484.054L964.137 482.675L963.088 481.1L963.416 479.787V475.981L963.22 474.274L963.875 473.093L965.12 472.436L966.497 472.961L967.218 471.517L967.808 470.861L969.578 470.795L970.823 470.008L971.348 469.68V469.089L970.889 468.761L971.413 468.039L973.248 466.529L975.608 464.363L978.361 462.526L980.065 460.097L981.573 458.587L981.901 457.34L983.015 457.275L983.081 457.8L984.982 457.472L986.03 456.815L986.62 455.7L988.128 454.059L987.603 453.14L987.735 451.827L988.849 450.843L990.815 450.252L992.126 448.742L992.651 448.677L992.585 450.449L993.372 450.777L995.207 450.58L996.977 449.989L999.074 448.874L999.664 449.596L1000.06 449.267L1000.58 448.677L1001.11 449.399L1001.83 448.545L1001.63 446.642L1000.98 444.87L1000.19 444.214L998.222 442.966L996.387 442.048L995.994 441.26L997.436 441.588L997.895 440.866L997.632 439.947L997.37 437.519L997.698 435.156L998.353 433.318L999.795 432.531L1000.39 432.793L999.992 433.384L999.14 433.975L998.55 434.828L998.222 436.403L998.353 438.7L998.616 440.735V442.048L999.795 442.835L1001.37 443.623L1001.63 444.936L1002.61 446.839L1003.66 447.101L1004.25 446.248L1004.84 446.642L1005.37 448.152L1005.63 450.843L1006.09 451.958L1007.99 454.387L1008.97 455.634L1011 457.144L1012.77 459.835L1014.35 462.46L1015.26 464.888L1015.4 467.645L1014.74 469.548L1014.22 470.861L1014.35 472.043L1015.99 472.699L1017.03 472.239L1018.15 472.896L1019 472.502L1021.3 469.877L1023.07 469.286L1023.46 467.776H1024.38L1025.16 469.023L1026.08 471.911L1026.87 473.88L1027.13 476.243L1027.92 477.556L1028.44 480.378L1029.36 481.297L1029.75 483.332L1030.21 484.382L1029.69 485.104L1029.49 485.694L1029.88 486.285L1029.49 486.942L1029.88 487.532L1030.54 487.926L1030.47 489.961L1029.75 491.405L1029.69 494.161L1029.62 495.277L1029.23 495.868L1029.1 497.574L1028.7 499.478L1028.83 501.841L1029.23 501.578L1029.82 500.397L1030.87 501.578L1031.72 502.694L1032.57 503.481L1032.64 504.335H1033.29L1033.95 505.582L1034.99 506.829L1035.78 508.338L1036.44 509.979L1036.37 512.408L1037.42 513.983L1038.67 517.855L1039.85 519.759L1040.57 520.612L1042.21 521.99L1043.71 522.581L1045.02 524.025L1046.99 525.009L1047.71 525.469Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M867.585 485.104L868.437 485.629H869.879L870.272 484.579L867.585 485.104Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1233.21 320.427L1233.74 321.346L1235.7 320.427L1236.69 319.246V317.867H1235.77L1235.31 319.246L1233.67 319.902L1233.21 320.427Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1263.56 268.379L1264.61 265.754L1266.97 264.9L1267.36 266.673H1265.46L1263.56 268.379Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1168.91 292.992L1169.57 291.548H1170.81L1171.6 292.992L1170.88 294.108L1168.91 292.992Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1135.61 145.446L1136.14 146.365H1136.99L1137.25 145.446L1139.02 145.905V146.627L1137.71 146.89L1138.23 147.284L1139.74 147.94L1140.4 147.284V146.037L1140 144.921H1138.23L1136.33 143.739H1134.96L1134.3 144.33L1134.76 145.118L1135.61 145.446Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1122.17 127.396L1123.48 127.79L1124.14 126.871L1123.16 126.477L1122.17 127.396Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1138.23 140.195L1139.02 139.145L1140.13 139.933L1138.23 140.195Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1137.77 141.77L1138.23 141.245L1139.54 142.361L1138.63 142.624L1137.77 141.77Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1076.22 121.292L1077.93 120.833L1078.32 118.339L1082.39 119.389L1083.11 120.439L1081.93 122.671L1080.94 124.115L1078.85 123.721L1077.67 122.408L1076.68 122.08L1076.22 121.292Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M926.906 137.307H927.955L928.479 138.095L931.953 136.388L932.74 137.635L933.199 137.241L932.74 135.404L931.56 133.303L930.446 132.516H928.873L926.906 133.566L927.168 135.272L926.906 137.307Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M951.552 146.496L953.846 143.477L956.402 143.871V144.593L954.764 146.496L952.076 147.021L951.552 146.496Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M958.106 139.933L959.549 137.701H960.335L961.122 139.342V141.573H959.024L958.106 140.523V139.933Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M948.537 136.126L949.389 135.272L950.897 136.126V137.045H949.389L948.537 136.126Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M985.637 113.679L986.948 114.269H987.603L987.865 113.285H988.39V112.366H987.013L986.096 112.891L985.637 113.679Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1018.87 94.3823L1019.85 95.2355H1020.84L1021.3 95.498L1021.75 95.1699L1021.43 94.3823L1021.95 93.6603L1021.36 93.3977L1019.59 93.5946L1018.87 93.9228V94.3823Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1318.16 163.758L1317.77 161.198L1319.21 158.638L1321.57 156.407L1324.19 155.422H1326.69H1328.26L1329.5 157.063L1331.27 159.623L1329.57 161.395L1326.62 161.986L1324.52 162.511L1323.15 161.592L1321.77 161.723L1321.18 162.708L1318.16 163.758Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1168.12 155.357L1168.91 156.275L1170.48 156.669L1171.33 155.619L1170.74 154.7H1169.17L1168.12 155.357Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1178.22 132.647V133.96L1180.25 132.975L1181.76 133.041L1183.46 134.288L1186.08 134.879L1188.84 135.469L1190.28 135.732L1191.33 135.338L1190.93 133.829L1190.8 131.4L1189.23 129.562L1187.72 127.987L1186.15 127.134L1183.66 127.396L1182.28 127.659L1181.82 129.956L1181.3 131.4L1179.73 132.581L1178.22 132.647Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1180.77 126.74L1179.53 124.771V122.736L1181.63 122.146L1182.41 122.736V124.968L1180.77 126.74Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1163.8 126.346L1164.98 126.74V124.837L1163.54 122.999L1162.29 122.474V123.655L1163.21 124.443L1163.67 125.165L1163.8 126.346Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1163.21 100.683L1162.81 102.39L1163.21 103.505L1162.81 105.081V106.787L1164.26 106L1164.58 103.702L1163.99 101.865L1163.21 100.683Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1174.02 95.0386L1176.32 96.6794L1178.15 98.5172V99.633L1178.81 100.289L1179.07 101.011H1180.25L1180.64 101.93L1182.02 102.915L1182.41 102.324L1182.02 101.536L1181.89 97.9265L1182.41 96.942L1184.05 97.3358V96.8107L1183.79 96.1544L1184.05 95.7606L1185.49 96.8764L1187.07 98.6485L1188.71 100.355L1190.28 100.486L1191.39 99.6986L1193.03 100.683L1193.88 101.536L1195.2 102.324L1196.51 103.309L1197.36 104.031L1197.1 104.949L1195.79 106.065L1195.98 108.1L1195.39 109.872L1193.1 111.71L1192.25 110.922L1190.93 111.119L1189.49 110.069L1188.12 107.575L1188.05 105.737L1189.36 104.096L1189.62 102.849L1189.75 101.865L1188.97 101.602L1187 101.668L1186.35 102.849L1186.08 104.687L1186.35 107.115L1187.2 109.084L1187.85 110.528L1189.36 111.185L1190.61 111.907L1191.39 112.3L1191.26 113.351L1189.49 113.613L1187.98 114.532H1187.2L1186.02 113.416L1186.48 112.366L1185.69 112.038L1184.64 112.366L1182.68 113.219L1180.32 114.073L1178.81 114.532L1177.96 112.957L1176.78 112.891L1177.1 114.532L1176.58 115.713L1175.33 116.829L1174.02 115.976L1172.38 115.385L1171.34 114.073L1170.29 111.907L1169.04 111.119L1168.19 109.216L1167.67 108.1V107.378L1168.65 106.328L1168.98 105.474L1168.12 104.162L1168.25 103.44L1168.58 102.849L1168.52 101.668L1169.96 101.077L1170.16 100.158L1169.76 99.5017L1169.96 98.7798L1170.75 97.9265L1171.99 97.4014L1172.52 96.22L1174.02 95.0386Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1201.68 104.556H1202.67V106.262L1204.24 107.312L1205.29 105.934L1209.48 107.312V108.822H1211.12L1211.91 108.297L1214.2 108.822L1215.51 109.675L1216.56 110.66L1217.09 110.2L1217.68 110.266L1217.22 111.775L1216.69 113.547L1213.42 115.254L1211.12 115.582L1208.04 114.991L1205.62 112.104H1204.37L1200.77 108.756L1201.29 108.034V106.525L1201.68 104.556Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1208.89 87.425L1209.68 88.4752L1211.52 87.9501L1212.63 86.4405L1212.17 85.5872L1210.4 86.1123L1208.89 87.425Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1056.69 60.9743L1058.13 59.5304L1058.46 58.4146L1059.25 59.3335V61.8932L1060.95 62.1558H1062.59L1062.85 63.9279L1061.61 65.2406L1061.02 64.453L1058.13 64.3217L1057.15 63.0746L1056.69 61.8276V60.9743Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1054.07 57.1019L1052.3 60.0555L1050.53 59.6617L1048.89 60.8431L1046.6 61.8276L1045.42 62.0901L1044.89 62.9434L1043.91 61.8276L1042.34 62.4183L1039.12 62.2214L1037.55 64.3217L1035.06 66.0938H1033.09V64.1904L1033.81 61.8276L1035.58 58.4146L1036.31 55.3298L1036.7 52.6388L1037.29 51.7199L1038.8 52.245L1039.19 51.9824L1037.94 50.3416L1038.27 48.0444L1039.52 47.5849L1038.67 46.5348L1038.86 45.6159L1039.85 45.3534L1039.91 44.5001L1039.52 43.9094L1040.5 42.8593L1040.83 41.5466L1041.42 41.284L1041.94 42.3342L1042.73 43.1218L1043.06 42.5311V40.037L1043.58 39.5119L1044.83 40.5621L1045.88 41.7435L1045.35 43.0562L1045.02 43.7781L1044.76 45.8128L1044.24 48.7007L1043.58 50.1447L1044.11 50.2103L1044.83 49.554L1045.29 48.5694L1045.48 46.863L1046.86 46.0753L1047.71 44.6314L1048.69 44.8283L1049.42 46.7973L1050.33 48.3725L1050.92 50.1447L1051.25 51.9824L1051.71 51.9168L1051.97 51.0636L1052.3 50.7354L1053.28 51.0636L1053.61 51.7199L1054.07 54.6078V57.1019Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1034.27 45.9441L1034.67 49.0289L1033.09 50.9323L1029.75 50.6698L1026.8 50.5385L1026.34 50.8667L1024.05 48.3726L1023.79 47.2568L1019.98 47.5193L1019.53 46.0753L1018.41 45.4846L1017.36 46.5348L1015.72 45.1565L1015.92 43.9094L1014.81 42.7936V38.0023L1013.1 37.6741L1012.84 36.6896L1011.92 36.2302L1011.27 37.0834V38.0023H1010.81L1010.09 37.1491L1010.28 36.624L1011.73 35.3113L1012.58 34.3924L1012.71 33.4735L1013.43 32.6203L1015 31.7014L1014.09 30.1918L1014.54 28.6822L1015.33 27.829L1016.9 26.0569L1017.76 26.9757L1018.28 26.0569L1019.66 25.7287L1021.23 25.4661L1022.41 25.7943L1023.85 25.0067L1024.9 24.2847L1025.95 24.5473L1027.06 25.4005L1027.59 26.2538L1027.46 27.1726L1027.13 28.8791L1026.02 30.52L1024.05 31.8327L1022.02 33.2766L1022.34 33.7361L1023.72 33.211L1024.97 32.3578L1026.21 31.7014L1025.69 32.8172L1025.95 33.0797C1025.95 33.0797 1026.61 32.6203 1026.74 32.6203C1026.87 32.6203 1027.92 31.7671 1027.92 31.7671L1028.57 31.1107L1028.24 30.1918L1028.11 29.4698L1028.77 28.7479L1029.29 29.6011L1029.82 29.076V27.7634L1029.49 27.107L1029.75 26.6476L1031.46 26.1881L1032.57 26.7132V27.829L1033.29 28.551L1034.27 29.6667L1034.86 31.7671L1034.14 33.0797L1034.41 34.1955L1034.08 36.7553L1033.95 40.4308L1033.82 42.0716L1033.36 42.728L1032.11 41.6778L1031.91 42.2686L1032.77 43.1218L1033.62 44.2376L1034.34 45.7472L1034.27 45.9441Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1007.92 39.1837L1006.94 40.2995L1005.63 39.7744L1003.66 38.4618L1003.27 37.4772H1004.06L1004.71 38.4618L1006.02 38.8556L1007.46 39.0525L1007.92 39.1837Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1002.94 33.8017L1004.84 35.18L1005.63 34.5237H1008.32L1010.02 33.8017L1011.2 32.489L1011.99 30.8482L1012.77 29.6011L1011.79 29.0104L1011.92 27.8946L1009.76 27.4352L1007.4 27.107L1006.09 26.1225H1002.68L1003.27 27.107V28.2228L1002.68 28.551L1003.01 29.798L1002.68 31.1107L1003.07 31.3732L1004.25 31.8327L1005.89 32.0296L1006.55 32.6203L1005.76 33.2766H1003.79L1002.94 32.8828V33.8017Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1009.23 25.3349L1010.48 26.6476L1011.86 27.2383L1013.5 26.7132L1014.68 25.5318L1015.59 24.6129H1017.36L1018.87 23.3658L1021.36 22.972L1023.92 22.8408L1025.43 22.0532L1025.29 21.3312L1024.64 20.5436L1024.51 17.59L1024.18 16.4742L1024.57 14.5052L1025.03 14.1114L1025.56 14.4396L1027.46 13.2581L1026.87 12.5362L1027.06 11.0922L1025.88 10.6328L1024.31 8.86064L1023.13 7.81049L1022.87 6.43217L1021.75 5.05385L1021.69 3.87243L1020.84 2.23157L1019.92 1.9034L1020.18 0.459441L1019.33 0H1017.62L1017.36 0.525075L1018.08 1.18142L1018.15 1.83776L1017.23 2.62538L1016.18 3.87243L1014.81 4.33187L1013.5 5.05385L1010.68 7.21978L1010.28 9.05755L1008.97 10.1733L1009.1 11.1578L1008.45 11.9455L1008.97 12.208L1009.82 11.8798L1010.55 11.4204L1011 11.7486L1010.55 12.7987L1009.69 13.7832L1009.17 15.1615L1009.37 16.9993L1009.1 17.9838L1007.73 18.5745L1007.14 19.1652V19.6247L1008.64 19.8872L1008.58 20.5436L1008.19 21.003L1007.46 20.7405L1006.42 20.3467L1005.83 20.8061L1006.35 21.2655L1007.27 21.4624L1008.05 21.5937L1008.84 21.3968L1009.89 21.2655L1010.68 21.9875L1010.87 22.447L1010.48 22.7751L1009.76 22.3157H1008.45L1007.4 22.5126L1007.53 23.1033L1009.1 23.6284L1009.43 24.2191L1009.23 24.7442V25.3349Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1007.86 24.5473L1008.32 24.8754L1007.86 25.138L1006.68 25.0067L1007.01 24.3504L1007.86 24.5473Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1004.58 2.03466V4.3975L1002.68 5.11947L1000.78 4.3975L999.14 3.08481L999.926 2.03466L1002.68 1.18141L1004.58 2.03466Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M983.867 118.864L984.195 117.945H984.982V118.733L983.867 118.864Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M982.426 119.455L983.016 118.404L981.967 118.208L981.442 118.798L982.426 119.455Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M970.889 110.528L970.102 110.791L968.66 108.625L968.922 106L970.889 104.687L971.282 107.247L970.692 107.706L970.889 110.528Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M971.282 98.2547L972.855 97.4671L974.297 98.2547L974.035 99.2392L972.331 98.6485L971.282 98.5829V98.2547Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M969.774 98.386L969.381 99.2392L969.971 99.8299L970.757 99.2392L970.102 99.1079L969.774 98.386Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M994.289 82.5024H995.076L995.338 80.7303L995.928 80.2052L997.96 79.6802L997.632 77.7111L996.124 78.0393L995.731 79.4176L994.289 80.4021V82.5024Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M998.288 80.3365L998.944 81.1241L999.73 80.074L999.402 79.6145L998.288 80.3365Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                  <path
                    d="M1018.61 82.1743L1021.95 79.6145V81.1241L1020.31 83.2244L1020.05 81.9774L1018.61 82.5024V82.1743Z"
                    className="asia"
                    onMouseEnter={() => highlightContinent("asia")}
                    onMouseLeave={() => removeHighlight("asia")}
                    onClick={() => selectContinent("asia")}
                  />
                </g>
              </svg>
            </div>
            {continentHover ? (
              <div className="hover-state">
                <h1 className="gallery-select-continent">
                  {handleTitling(continentHover)}
                </h1>
                {continentHover === "antarctica" ? (
                  <>
                    <div className="select-help-text">no pictures... yet!</div>
                    <TbCameraOff className="select-help-text icon" />
                  </>
                ) : (
                  <>
                    <div className="select-help-text">click to select</div>
                    <TbClick className="select-help-text icon" />
                  </>
                )}
              </div>
            ) : (
              <h1 className="gallery-select-header">
                Select Continent to Explore
              </h1>
            )}
          </>
        ) : (
          <div className="mobile-gallery-maps">
            {renderMobileMaps(darkMode)}
          </div>
        )}
      </div>
    );
  }
};

export { Gallery };
