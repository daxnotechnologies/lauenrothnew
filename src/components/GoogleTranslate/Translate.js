import React, { useEffect, useRef, useState } from 'react';

export default function Translate() {
  const [isRendered, setIsRendered] = useState(false);
  const [key, setKey] = useState(0);

  const googleTranslateElementRef = useRef(null);

  useEffect(() => {
    if (!isRendered) {
      // Define the callback function for initializing the Google Translate Element
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'de,en,ar,fr,it,hi,ur,es',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Change layout to HORIZONTAL
            autoDisplay: false,
          },
          'google-translate-element'
        );
      };

      // Load the Google Translate API
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script tag when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isRendered]);

  useEffect(() => {
    const removeLogo = () => {
      const goggle = document.querySelector('.goog-te-gadget-simple');

      const googleTranslateLogo = document.querySelector('.goog-logo-link');
      if (googleTranslateLogo) {
        googleTranslateLogo.style.display = 'none';
      }
    };

    removeLogo();
    setIsRendered(true);
  }, []);

  useEffect(() => {
    const handleTranslateClick = (event) => {
      event.preventDefault(); // Prevent the default scroll behavior

      // Scroll to the top of the Google Translate component instead
      const yOffset = -googleTranslateElementRef.current.getBoundingClientRect().top;
      window.scrollBy({ top: yOffset, behavior: 'smooth' });
    };

    const googleTranslateElement = document.getElementById('google-translate-element');
    if (googleTranslateElement) {
      googleTranslateElement.addEventListener('click', handleTranslateClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (googleTranslateElement) {
        googleTranslateElement.removeEventListener('click', handleTranslateClick);
      }
    };
  }, []);
  useEffect(() => {
    const createSVGElement = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('viewBox', '0 0 16 16');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute(
        'd',
        'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z'
      );

      svg.appendChild(path);
      return svg;
    };

    const svgElement = createSVGElement();
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svgElement))}`;
    console.log('SVG Data URL:', svgDataUrl);

    const elements = document.querySelectorAll('.goog-te-gadget-simple a');
    console.log('Found elements:', elements);
    if (elements.length === 0) {
      handleRerender();
    }
    elements.forEach((element) => {
      console.log('Element:', element);
      element.innerHTML = ''; // Clear existing content
      element.appendChild(svgElement.cloneNode(true));
    });
  }, [key]);

  const handleRerender = () => {
    setKey((prevKey) => prevKey + 1); // Update the key to trigger rerender
  };
  return <div id="google-translate-element" ref={googleTranslateElementRef}></div>;
}
