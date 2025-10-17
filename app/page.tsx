"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MissionCard from "@/components/MissionCard";
import MissionDialog from "@/components/MissionDialog";

interface Mission {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State for missions and dialog
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/login-dev");
    } else {
      fetchMissions();
    }
  }, [session, status, router]);

  // Fetch missions from API
  const fetchMissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/missions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch missions');
      }
      
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error('Error fetching missions:', error);
      alert('Failed to load missions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle creating/updating missions
  const handleMissionSubmit = async (data: { title: string; description: string; status: string }) => {
    try {
      setIsSubmitting(true);
      
      const url = editingMission ? `/api/missions/${editingMission.id}` : '/api/missions';
      const method = editingMission ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${editingMission ? 'update' : 'create'} mission`);
      }

      // Refresh missions list
      await fetchMissions();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to ${editingMission ? 'update' : 'create'} mission: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing a mission
  const handleEditMission = (mission: Mission) => {
    setEditingMission(mission);
    setIsDialogOpen(true);
  };

  // Handle deleting a mission
  const handleDeleteMission = async (missionId: string) => {
    try {
      const response = await fetch(`/api/missions/${missionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete mission');
      }

      // Refresh missions list
      await fetchMissions();
    } catch (error) {
      console.error('Error deleting mission:', error);
      alert('Failed to delete mission. Please try again.');
    }
  };

  // Handle opening dialog for new mission
  const handleAddNewMission = () => {
    setEditingMission(null);
    setIsDialogOpen(true);
  };

  // Show loading state while checking authentication or loading missions
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-[#E6F1FF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4500] mx-auto mb-4"></div>
          <p className="text-[#8892B0]">
            {status === "loading" ? "Loading..." : "Loading missions..."}
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#E6F1FF]">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-8 lg:px-12">
        {/* Dashboard Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk',_'Inter',_sans-serif]">
              My Missions
            </h1>
            <p className="text-[#8892B0] mt-2">
              🚀 Welcome back!
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleAddNewMission}
              className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
              Add New Mission
            </Button>
            <Button 
              onClick={() => signOut()}
              variant="outline"
              className="border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500] hover:text-white bg-transparent"
            >
              Sign Out
            </Button>
          </div>
        </header>

        {/* Missions Grid */}
        {missions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-[#233554] rounded-full flex items-center justify-center mb-6">
              <svg 
                className="w-12 h-12 text-[#8892B0]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#E6F1FF] mb-2">No missions yet</h3>
            <p className="text-[#8892B0] mb-6">Create your first mission to get started on your journey!</p>
            <Button 
              onClick={handleAddNewMission}
              className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-semibold"
            >
              Create Your First Mission
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onEdit={handleEditMission}
                onDelete={handleDeleteMission}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mission Dialog */}
      <MissionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mission={editingMission}
        onSubmit={handleMissionSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
