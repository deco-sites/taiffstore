import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      }
    },
    backgroundImage: {
      "bgCbNewsletter": "url('/image/svg/cbXMark.svg')",
    },
    screens: {
      sm: "641px",
      md: "769px",
      lg: "1200px",
      xl: "1441px",
      "sm-desktop": { min: "1025px", max: "1440px",  },
      "full-desktop": { min: "1025px"},
      "all-mobile": {max: "1024px"},
      "full-tablet": { min: "639px", max: "1024px",  },
      "lg-tablet": { min: "980px", max: "1024px"},
      "sm-tablet": { min: "639px", max: "979px"}, 
      "full-phone": { max: "638px" },
    },
    colors: {
      "black": "#000000",
      "black-1": "#1E1E1E",
      "black-2": "#3E3E894D",
      "black-3": "#191C1F",
      "black-4": "#1D1D1D",
      "gray": "#D6D6D6",
      "gray-2": "#494949",
      "gray-3": "#242424",
      "gray-4": "#EAEAEA",
      "gray-5": "#8E8E93",
      "gray-6": "#7D7D7D",
      "gray-7": "#CECECE",
      "gray-8": "#545454",
      "gray-9": "#707070",
      "gray-10": "#F6F6F6",
      "gray-11": "#3C3C3C",
      "gray-12": "#E9ECEF",
      "gray-13": "#5E5E5E",
      "gray-14": "#C3C3C3",
      "gray-15": "#C5C5C5",
      "white": "#FFFFFF",
      "white-1": "#F1F1F1",
      "white-2": "#F0F0F0",
      "blue-1": "#2B07E2"
    },
    fontFamily: {
      quicksand: "Quicksand, sans-serif",
    },
    fontSize: {
      tiny: "10px",
      small: "12px",
      base: "14px",
      big: "16px",
      bigger: "18px",
      large: "20px",
      larger: "22px",
      xlarge: "24px",
    },
    boxShadow: {
      "blg": "0px 4px 4px 0px #ACACAC40;",
    },
  },
};
