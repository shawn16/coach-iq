/**
 * AthleteForm Component
 *
 * Form for creating and editing athlete information.
 * Handles:
 * - First and last name
 * - Birthday
 * - Grade level
 * - Active status
 * - Gender
 */

import { useState } from "react";
import { Athlete } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AthleteFormProps {
  onSubmit: (
    athleteData: Omit<Athlete, "id" | "coach_id" | "created_at" | "updated_at">
  ) => Promise<void>;
  initialData?: Partial<Athlete>;
}

export function AthleteForm({ onSubmit, initialData }: AthleteFormProps) {
  const [formData, setFormData] = useState<
    Omit<Athlete, "id" | "coach_id" | "created_at" | "updated_at">
  >({
    first_name: initialData?.first_name ?? "",
    last_name: initialData?.last_name ?? "",
    birthday: initialData?.birthday ?? "",
    grade: initialData?.grade ?? null,
    active: initialData?.active ?? true,
    gender: initialData?.gender ?? "male",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          id="birthday"
          type="date"
          value={formData.birthday}
          onChange={(e) =>
            setFormData({ ...formData, birthday: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">Grade</Label>
        <Select
          value={formData.grade?.toString() ?? "none"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              grade: value === "none" ? null : parseInt(value),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="9">9th</SelectItem>
            <SelectItem value="10">10th</SelectItem>
            <SelectItem value="11">11th</SelectItem>
            <SelectItem value="12">12th</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, active: checked })
          }
        />
        <Label htmlFor="active">Active</Label>
      </div>

      <Button type="submit" className="w-full">
        Save Athlete
      </Button>
    </form>
  );
}
