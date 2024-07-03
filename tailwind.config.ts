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
      },
    },
    screens: {
      sm: "641px",
      md: "769px",
      lg: "1200px",
      xl: "1441px",
      "full-desktop": { min: "1025px"},
      "full-tablet": { min: "769px", max: "1024px",  },
      "full-phone": { max: "768px" },
    },
    colors: {
      "black": "#000000",
      "black-1": "#1E1E1E",
      "black-2": "#3E3E894D",
      "gray": "#D6D6D6",
      "white": "#FFFFFF"
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
