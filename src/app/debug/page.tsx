"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Check if sidebar exists
    const sidebar = document.querySelector("aside");
    setSidebarVisible(!!sidebar);

    // Log DOM structure for debugging
    console.log("Document body children:", document.body.children);
    console.log("Sidebar element:", sidebar);

    // Window resize listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get computed style of the sidebar if it exists
  useEffect(() => {
    const sidebar = document.querySelector("aside");
    if (sidebar) {
      const style = window.getComputedStyle(sidebar);
      console.log("Sidebar computed style:", {
        display: style.display,
        position: style.position,
        transform: style.transform,
        width: style.width,
        left: style.left,
        visibility: style.visibility,
        opacity: style.opacity,
      });
    }
  }, [sidebarVisible]);

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Layout Debug Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="font-semibold mb-2">Window Information</h2>
          <p>Width: {windowSize.width}px</p>
          <p>Height: {windowSize.height}px</p>
          <p>Device type: {windowSize.width >= 768 ? "Desktop" : "Mobile"}</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="font-semibold mb-2">Layout Information</h2>
          <p>Sidebar detected: {sidebarVisible ? "Yes" : "No"}</p>
          <p>
            App Shell layout:{" "}
            {document.querySelector(".flex.min-h-screen.w-full.flex-col")
              ? "Detected"
              : "Not found"}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-md shadow">
        <h2 className="font-semibold mb-2">DOM Structure</h2>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
          {JSON.stringify(
            {
              html: {
                body: {
                  childElementCount: document.body.childElementCount,
                  firstChild: document.body.firstElementChild?.tagName,
                  hasAppShell: !!document.querySelector(
                    ".flex.min-h-screen.w-full.flex-col"
                  ),
                },
              },
            },
            null,
            2
          )}
        </pre>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Actions</h2>
        <button
          onClick={() => (window.location.href = "/athletes")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Go to Athletes Page
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
