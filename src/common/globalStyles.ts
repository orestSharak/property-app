import { createGlobalStyle } from 'styled-components'
import houseIconUrl from '../assets/icons/house-icon.png'

const GlobalStyle = createGlobalStyle`
  /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
  */

  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin */
  * {
    margin: 0;
  }

  /* 3. Enable keyword animations */
  @media (prefers-reduced-motion: no-preference) {
    html {
      interpolate-size: allow-keywords;
    }
  }

  body {
    /* 4. Add accessible line-height */
    line-height: 1.5;
    /* 5. Improve text rendering */
    -webkit-font-smoothing: antialiased;
  }

  /* 6. Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* 7. Inherit fonts for form controls */
  input, button, textarea, select {
    font: inherit;
  }

  /* 8. Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* 9. Improve line wrapping */
  p {
    text-wrap: pretty;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  /*
    10. Create a root stacking context
  */
  #root {
    min-height: 100vh;
  }

  #root, #__next {
    isolation: isolate;
  }

  /*
   A styles for a Leaflet Markers
  */
  .house-marker {
    background-image: url(${houseIconUrl});
    background-size: ${(p) => p.theme.spacing.lg};
    background-repeat: no-repeat;
    background-position: center;
    width: 44px !important; // to rewrite a value from Leaflet
    height: 44px !important; // to rewrite a value from Leaflet
    border-radius: ${(p) => p.theme.radius.round};
    transition: all 0.2s;
  }

  .house-marker:hover {
    width: 48px !important;
    height: 48px !important;
  }

  .marker-color-news {
    background-color: ${(p) => p.theme.colors.surfacePink};
  }

  .marker-color-contract {
    background-color: ${(p) => p.theme.colors.surfaceInfo};
  }

  .marker-color-default {
    background-color: ${(p) => p.theme.colors.surface2};
  }

  .house-marker:focus,
  .leaflet-control-zoom-in:focus,
  .leaflet-control-zoom-out:focus {
    box-shadow: 0 0 0 4px ${(p) => p.theme.colors.boxShadowInfo};
    outline: none;
  }


  // hide a leaflet logo attribute 
  .leaflet-control-attribution {
    display: none;
  }
`
export default GlobalStyle
