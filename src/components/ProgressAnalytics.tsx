import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  BookOpen, 
  Award,
  Calendar,
  BarChart3
} from "lucide-react";
import analyticsIcon from "@/assets/analytics-icon.png";

const ProgressAnalytics = () => {
  const studyStats = {
    totalStudyTime: "47.5 hours",
    documentsProcessed: 23,
    assessmentsCompleted: 15,
    averageScore: 87,
    currentStreak: 7,
    weeklyGoal: 75, // percentage
  };

  const recentActivity = [
    {
      id: "1",
      type: "assessment",
      title: "Machine Learning Fundamentals",
      score: 92,
      date: "2 hours ago",
      subject: "AI/ML",
    },
    {
      id: "2",
      type: "document",
      title: "Neural Networks Research Paper",
      progress: 100,
      date: "1 day ago",
      subject: "Deep Learning",
    },
    {
      id: "3",
      type: "assessment",
      title: "Data Structures Quiz",
      score: 85,
      date: "2 days ago",
      subject: "Computer Science",
    },
  ];

  const subjectProgress = [
    { subject: "Machine Learning", progress: 85, color: "bg-primary" },
    { subject: "Data Structures", progress: 72, color: "bg-secondary" },
    { subject: "Algorithms", progress: 90, color: "bg-success" },
    { subject: "Mathematics", progress: 68, color: "bg-warning" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return <Award className="h-4 w-4 text-primary" />;
      case "document":
        return <BookOpen className="h-4 w-4 text-secondary" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <section id="analytics" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <img src={analyticsIcon} alt="Progress analytics" className="w-10 h-10" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Track Your Progress
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytics to monitor your learning journey, identify strengths,
            and optimize your study approach with AI insights.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.totalStudyTime}</div>
            <div className="text-sm text-muted-foreground">Study Time</div>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <BookOpen className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.documentsProcessed}</div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <Award className="h-6 w-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.assessmentsCompleted}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <Target className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.averageScore}%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-card transition-all duration-300">
            <Calendar className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{studyStats.weeklyGoal}%</div>
            <div className="text-sm text-muted-foreground">Weekly Goal</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Goal Progress */}
          <Card className="p-6 lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Weekly Goal</h3>
                <Badge variant="outline">{studyStats.weeklyGoal}%</Badge>
              </div>
              
              <div className="space-y-4">
                <Progress value={studyStats.weeklyGoal} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 hours</span>
                  <span>10 hours target</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7.5 hours</div>
                <div className="text-sm text-muted-foreground">studied this week</div>
              </div>
            </div>
          </Card>

          {/* Subject Progress */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">Subject Progress</h3>
            
            <div className="space-y-4">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{subject.subject}</span>
                    <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-background rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.subject} • {activity.date}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {activity.score ? (
                    <div className="text-lg font-bold text-success">{activity.score}%</div>
                  ) : (
                    <Badge variant="outline">Completed</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProgressAnalytics;