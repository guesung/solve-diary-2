
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Users, Target, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentStories = [
    {
      id: 1,
      title: "React Hook Form 유효성 검사 문제 해결",
      status: "완료",
      createdAt: "2024-01-15",
      difficulty: "중급"
    },
    {
      id: 2,
      title: "TypeScript Generic 타입 오류 해결",
      status: "진행중",
      createdAt: "2024-01-14",
      difficulty: "고급"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">개발자로서의 성장을 추적하고 기록을 관리하세요.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 스토리</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 이번 주
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">해결 완료</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              75% 완료율
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">연속 기록</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7일</div>
            <p className="text-xs text-muted-foreground">
              새로운 기록!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">획득 배지</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 이번 달
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Stories */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                최근 스토리
                <Link to="/write">
                  <Button size="sm">새 스토리</Button>
                </Link>
              </CardTitle>
              <CardDescription>
                최근에 작성한 문제 해결 스토리들을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div key={story.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{story.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{story.createdAt}</span>
                        <Badge variant={story.status === "완료" ? "default" : "secondary"}>
                          {story.status}
                        </Badge>
                        <Badge variant="outline">{story.difficulty}</Badge>
                      </div>
                    </div>
                    <Link to={`/story/${story.id}`}>
                      <Button variant="ghost" size="sm">보기</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Goals */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>이번 달 목표</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>스토리 작성</span>
                  <span>6/10</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>문제 해결</span>
                  <span>4/8</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>획득 배지</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-xs font-medium">연속 7일</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs font-medium">빠른 해결</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs font-medium">정확한 분석</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl mb-1">🌟</div>
                  <div className="text-xs font-medium">인기 스토리</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
