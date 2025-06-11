import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTools, FaHeart, FaPlus, FaTimes } from "react-icons/fa";
import type { SkillsFormValues } from "../validations/onboarding";

export default function Skills({ handleNext, handlePrevious }:any) {
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formData: SkillsFormValues = {
      skills: skills.map(skill => skill.trim()),
      interests: interests.map(interest => interest.trim())
    };
    handleNext(formData);
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
              <FaTools className="text-primary w-5 h-5" />
              Add Your Skills
            </h3>
            <div className="flex gap-3">
              <Input 
                placeholder="Add a skill" 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                autoFocus
                className="h-14 text-lg rounded-xl flex-1"
              />
              <Button
                type="button"
                onClick={addSkill}
                className="h-14 w-14 rounded-xl"
              >
                <FaPlus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
              <FaHeart className="text-primary w-5 h-5" />
              Add Your Interests
            </h3>
            <div className="flex gap-3">
              <Input 
                placeholder="Add an interest" 
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest();
                  }
                }}
                className="h-14 text-lg rounded-xl flex-1"
              />
              <Button
                type="button"
                onClick={addInterest}
                className="h-14 w-14 rounded-xl"
              >
                <FaPlus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
