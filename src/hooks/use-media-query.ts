import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    // Ensure window is defined (runs only on client)
    if (typeof window !== "undefined") {
      const result = window.matchMedia(query);
      setValue(result.matches);
      result.addEventListener("change", onChange);

      return () => result.removeEventListener("change", onChange);
    }
    // Return an empty cleanup function if window is not defined (SSR)
    return () => {};
  }, [query]);

  return value;
}
