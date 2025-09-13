import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Lightbulb,
  Target,
  Calendar,
  ArrowRight
} from "lucide-react";

const StudyRecommendations = () => {
  const recommendations = [
    {
      id: "1",
      type: "focus-area",
      title: "Review Linear Algebra Fundamentals",
      description: "Your recent ML assessments show gaps in matrix operations. Focus on eigenvalues and matrix decomposition.",
      priority: "high",
      estimatedTime: "2-3 hours",
      confidence: 92,
      tags: ["Mathematics", "ML Prerequisites"],
      action: "Start Review",
    },
    {
      id: "2",
      type: "practice",
      title: "Algorithm Practice Session",
      description: "You're performing well in theory. Practice more coding problems to strengthen implementation skills.",
      priority: "medium",
      estimatedTime: "1 hour",
      confidence: 87,
      tags: ["Algorithms", "Programming"],
      action: "Practice Now",
    },
    {
      id: "3",
      type: "revision",
      title: "Neural Network Architecture Review",
      description: "Great understanding of basics! Ready to dive deeper into advanced architectures like Transformers.",
      priority: "low",
      estimatedTime: "45 min",
      confidence: 95,
      tags: ["Deep Learning", "Advanced"],
      action: "Explore Topic",
    },
  ];

  const studyPlan = {
    nextSession: "Today, 3:00 PM",
    duration: "45 minutes",
    topic: "Linear Algebra Review",
    type: "Focused Study",
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "focus-area":
        return <Target className="h-5 w-5" />;
      case "practice":
        return <TrendingUp className="h-5 w-5" />;
      case "revision":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Study Recommendations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Personalized study suggestions based on your performance, learning patterns,
            and knowledge gaps identified by our AI system.
          </p>
        </div>

        {/* Next Study Session */}
        <Card className="p-6 mb-8 bg-gradient-subtle border-primary/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Next Recommended Session</h3>
                <p className="text-muted-foreground">
                  {studyPlan.nextSession} • {studyPlan.duration} • {studyPlan.type}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-semibold text-foreground">{studyPlan.topic}</div>
                <div className="text-sm text-muted-foreground">Recommended topic</div>
              </div>
              <Button variant="study" size="lg">
                Start Session
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Personalized Recommendations</h3>
          
          <div className="grid lg:grid-cols-1 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="p-6 hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        {getTypeIcon(rec.type)}
                      </div>
                      
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-foreground">{rec.title}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {rec.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {rec.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats & Action */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                    <div className="space-y-2 text-center lg:text-right">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{rec.estimatedTime}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {rec.confidence}% confidence
                      </div>
                    </div>
                    
                    <Button variant="outline" size="lg" className="w-full lg:w-auto">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <Card className="p-6 mt-8 bg-gradient-subtle border-secondary/20">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">AI Learning Insight</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your learning velocity has increased 23% over the past week. You show strong 
                pattern recognition in algorithms but benefit from more hands-on practice. 
                Consider alternating between theory review and practical implementation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default StudyRecommendations;