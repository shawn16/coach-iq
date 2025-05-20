"use client";

import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

export default function DebugPage() {
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarStyles, setSidebarStyles] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Set isClient to true when component mounts (client-side only)
    setIsClient(true);

    // Only run the following code on the client side
    if (typeof window !== 'undefined') {
      // Set initial window size
      const updateWindowSize = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      setWindowSize(updateWindowSize());

      // Check if sidebar exists
      const checkSidebar = () => {
        const sidebar = document.querySelector("aside");
        setSidebarVisible(!!sidebar);
        
        if (sidebar) {
          const style = window.getComputedStyle(sidebar);
          setSidebarStyles({
            display: style.display,
            position: style.position,
            transform: style.transform,
            width: style.width,
            left: style.left,
            visibility: style.visibility,
            opacity: style.opacity,
          });
        }
      };

      // Initial check
      checkSidebar();

      // Window resize listener
      const handleResize = () => {
        setWindowSize(updateWindowSize());
        checkSidebar();
      };

      // Mutation observer for DOM changes
      const observer = new MutationObserver(checkSidebar);
      observer.observe(document.body, { childList: true, subtree: true });

      // Add event listeners
      window.addEventListener("resize", handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
      };
    }
  }, []);

  // Only render the debug information on the client side
  if (!isClient) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Loading debug information...</h1>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-3">Window Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Width:</span> {windowSize.width}px</p>
            <p><span className="font-medium">Height:</span> {windowSize.height}px</p>
            <p><span className="font-medium">Device type:</span> {windowSize.width >= 768 ? "Desktop" : "Mobile"}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-3">Layout Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Sidebar detected:</span> {sidebarVisible ? "Yes" : "No"}</p>
            <p><span className="font-medium">App Shell layout:</span> {
              typeof document !== 'undefined' && document.querySelector(".flex.min-h-screen.w-full.flex-col") 
                ? "Detected" 
                : "Not found"
            }</p>
          </div>
        </div>
      </div>

      {sidebarVisible && sidebarStyles && (
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Sidebar Styles</h2>
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(sidebarStyles, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-3">Environment</h2>
        <div className="bg-gray-50 p-3 rounded">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(
              {
                NODE_ENV: process.env.NODE_ENV,
                NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Actions</h2>
        <button
          onClick={() => (window.location.href = "/athletes")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition-colors"
        >
          Go to Athletes Page
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
