"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { AthleteDisplay } from "@/types/athlete";
import { createClient } from "@/utils/supabase/client";

interface AssignAthletesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (athletes: AthleteDisplay[]) => void;
  currentlyAssigned: AthleteDisplay[];
}

export function AssignAthletesDialog({
  isOpen,
  onClose,
  onAssign,
  currentlyAssigned,
}: AssignAthletesDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [athletes, setAthletes] = useState<AthleteDisplay[]>([]);

  const [selectedAthletes, setSelectedAthletes] = useState<AthleteDisplay[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Filter athletes based on search query
  const filteredAthletes = athletes.filter((athlete) => {
    const fullName = `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Load athletes from Supabase
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("athletes")
          .select("*")
          .order("last_name", { ascending: true });

        if (error) {
          throw error;
        }

        // Convert database format to display format
        const displayAthletes: AthleteDisplay[] = data.map((athlete) => ({
          id: athlete.id,
          first_name: athlete.first_name,
          last_name: athlete.last_name,
          birthday: athlete.birthday,
          grade: athlete.grade,
          time1600m: athlete.time_1600m ? athlete.time_1600m : "0:00.00",
          created_at: athlete.created_at,
          updated_at: athlete.updated_at,
        }));

        setAthletes(displayAthletes);

        // Set initially selected athletes based on currentlyAssigned
        if (currentlyAssigned.length > 0) {
          setSelectedAthletes(currentlyAssigned);
        }
      } catch (error) {
        console.error("Error fetching athletes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAthletes();
    }
  }, [isOpen, currentlyAssigned]);

  // Handle checkbox changes
  const handleAthleteSelection = (
    athlete: AthleteDisplay,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedAthletes((prev) => [...prev, athlete]);
    } else {
      setSelectedAthletes((prev) => prev.filter((a) => a.id !== athlete.id));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    onAssign(selectedAthletes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Assign Athletes
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Athletes list */}
          <div className="border rounded-md max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Loading athletes...
              </div>
            ) : filteredAthletes.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAthletes.map((athlete) => {
                  const isSelected = selectedAthletes.some(
                    (a) => a.id === athlete.id
                  );
                  return (
                    <div
                      key={athlete.id}
                      className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <Checkbox
                        id={`athlete-${athlete.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          handleAthleteSelection(athlete, checked === true)
                        }
                        className="h-4 w-4 mr-3"
                      />
                      <Label
                        htmlFor={`athlete-${athlete.id}`}
                        className="flex-1 flex items-center cursor-pointer"
                      >
                        <div className="font-medium">
                          {athlete.first_name} {athlete.last_name}
                        </div>
                        <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                          Grade: {athlete.grade}
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No athletes found matching your search.
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectedAthletes.length} athletes selected
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Assign Athletes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
