import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DocumentUpload from "@/components/DocumentUpload";
import AssessmentGenerator from "@/components/AssessmentGenerator";
import ProgressAnalytics from "@/components/ProgressAnalytics";
import StudyRecommendations from "@/components/StudyRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DocumentUpload />
        <AssessmentGenerator />
        <ProgressAnalytics />
        <StudyRecommendations />
      </main>
    </div>
  );
};

export default Index;
