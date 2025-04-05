import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

// Define the props interface for the Carousel component
interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

// Carousel component - A component for displaying a carousel of items
export function Carousel({ items, className }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to move to the next item in the carousel
  const nextItem = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Function to move to the previous item in the carousel
  const prevItem = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // Main render function
  return (
    <div className={className}>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevItem}
            className="rounded-full border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index
                    ? "bg-indigo-600 dark:bg-indigo-400"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-indigo-400 dark:hover:bg-indigo-500"
                }`}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="icon"
            onClick={nextItem}
            className="rounded-full border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label="Next item"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export the Carousel component as the default export
export default Carousel;
