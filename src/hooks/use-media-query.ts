import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    // Update match value when the media query condition changes
    const handleChange = () => setMatches(mediaQuery.matches);

    // Initial check
    handleChange();

    // Add listener for changes in the media query
    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export { useMediaQuery };
