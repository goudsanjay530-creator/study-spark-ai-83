import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, CheckCircle, Play, RotateCcw } from "lucide-react";
import assessmentIcon from "@/assets/assessment-icon.png";

interface Assessment {
  id: string;
  title: string;
  type: "multiple-choice" | "short-answer" | "essay";
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: number;
  timeEstimate: string;
  topic: string;
  score?: number;
  completed?: boolean;
}

const AssessmentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: "1",
      title: "Introduction to Machine Learning",
      type: "multiple-choice",
      difficulty: "beginner",
      questions: 15,
      timeEstimate: "20 min",
      topic: "AI Fundamentals",
    },
    {
      id: "2",
      title: "Neural Networks Deep Dive",
      type: "short-answer",
      difficulty: "intermediate",
      questions: 8,
      timeEstimate: "30 min",
      topic: "Deep Learning",
      score: 85,
      completed: true,
    },
    {
      id: "3",
      title: "Advanced Algorithm Analysis",
      type: "essay",
      difficulty: "advanced",
      questions: 3,
      timeEstimate: "45 min",
      topic: "Algorithms",
      score: 92,
      completed: true,
    },
  ]);

  const generateNewAssessment = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation process
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Add a new assessment
          const newAssessment: Assessment = {
            id: Date.now().toString(),
            title: "Data Structures & Algorithms",
            type: "multiple-choice",
            difficulty: "intermediate",
            questions: 12,
            timeEstimate: "25 min",
            topic: "Computer Science",
          };
          
          setAssessments(prev => [newAssessment, ...prev]);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const getDifficultyColor = (difficulty: Assessment["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-success/10 text-success";
      case "intermediate":
        return "bg-warning/10 text-warning";
      case "advanced":
        return "bg-destructive/10 text-destructive";
    }
  };

  const getTypeIcon = (type: Assessment["type"]) => {
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <section id="assessments" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
            <img src={assessmentIcon} alt="Assessment generation" className="w-10 h-10" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI-Generated Assessments
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatically create personalized quizzes, tests, and practice problems 
            based on your uploaded study materials.
          </p>
        </div>

        {/* Generation Controls */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-secondary rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Assessment Generator</h3>
                <p className="text-muted-foreground">Generate new assessments from your documents</p>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={generateNewAssessment}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Assessment
                </>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Analyzing documents...</span>
                <span className="font-medium">{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}
        </Card>

        {/* Assessments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="p-6 hover:shadow-elegant transition-all duration-300 group">
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                    {assessment.completed && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">{assessment.score}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {assessment.title}
                  </h3>
                  
                  <Badge variant="outline" className="text-xs">
                    {assessment.topic}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(assessment.type)}
                    <span className="text-sm text-muted-foreground">
                      {assessment.questions} questions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {assessment.timeEstimate}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Button
                  variant={assessment.completed ? "outline" : "study"}
                  className="w-full"
                  size="lg"
                >
                  {assessment.completed ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake Assessment
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Assessment
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessmentGenerator;