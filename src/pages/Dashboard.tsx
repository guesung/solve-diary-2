
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Users, Target, Calendar, Award, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProblemSolutions, useDeleteProblemSolution } from "@/hooks/useProblemSolutions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: problemSolutions, isLoading, error } = useProblemSolutions(user?.id);
  const deleteMutation = useDeleteProblemSolution();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: string | null; storyTitle: string }>({
    open: false,
    storyId: null,
    storyTitle: "",
  });

  // 통계 계산
  const totalStories = problemSolutions?.length || 0;
  const completedStories = problemSolutions?.filter(story => story.status === '완료').length || 0;
  const completionRate = totalStories > 0 ? Math.round((completedStories / totalStories) * 100) : 0;
  
  // 최근 스토리 (최대 5개)
  const recentStories = problemSolutions?.slice(0, 5) || [];

  const handleDeleteClick = (storyId: string, storyTitle: string) => {
    setDeleteDialog({ open: true, storyId, storyTitle });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.storyId) {
      try {
        await deleteMutation.mutateAsync(deleteDialog.storyId);
        setDeleteDialog({ open: false, storyId: null, storyTitle: "" });
      } catch (error) {
        console.error("스토리 삭제 중 오류 발생:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">데이터를 불러오는 중 오류가 발생했습니다</h2>
          <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

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
                      <div className="text-2xl font-bold">{totalStories}</div>
          <p className="text-xs text-muted-foreground">
            총 스토리 수
          </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">해결 완료</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
                      <div className="text-2xl font-bold">{completedStories}</div>
          <p className="text-xs text-muted-foreground">
            {completionRate}% 완료율
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
                {recentStories.length > 0 ? (
                  recentStories.map((story) => (
                    <div key={story.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{story.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{new Date(story.created_at).toLocaleDateString('ko-KR')}</span>
                          <Badge variant={story.status === "완료" ? "default" : "secondary"}>
                            {story.status}
                          </Badge>
                          <Badge variant="outline">{story.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link to={`/story/${story.id}`}>
                          <Button variant="ghost" size="sm">보기</Button>
                        </Link>
                        <Link to={`/edit/${story.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteClick(story.id, story.title)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>아직 작성한 스토리가 없습니다.</p>
                    <Link to="/write">
                      <Button className="mt-2">첫 스토리 작성하기</Button>
                    </Link>
                  </div>
                )}
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

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        title="스토리 삭제"
        description={`"${deleteDialog.storyTitle}" 스토리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        onConfirm={handleDeleteConfirm}
        confirmText="삭제"
        cancelText="취소"
        variant="destructive"
      />
    </div>
  );
};

export default Dashboard;
