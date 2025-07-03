
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Calendar, 
  Clock,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useProblemSolution } from "@/hooks/useProblemSolutions";
import { Link } from "react-router-dom";

const StoryDetail = () => {
  const { id } = useParams();
  
  // 실제 데이터 가져오기
  const { data: story, isLoading, error } = useProblemSolution(id || '');

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">스토리를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">스토리를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 스토리가 존재하지 않거나 삭제되었을 수 있습니다.</p>
          <Link to="/community">
            <Button>커뮤니티로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">익명 사용자</div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(story.created_at).toLocaleDateString('ko-KR')}</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>5분 읽기</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant={story.status === "완료" ? "default" : "secondary"}>
            {story.status === "완료" ? "해결완료" : "진행중"}
          </Badge>
          <Badge variant="outline">{story.difficulty}</Badge>
          {story.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4" />
              <span>0</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>0</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Story Content */}
      <div className="space-y-8">
        {/* Problem Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>문제 상황</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {story.problem_description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-600">
              <Lightbulb className="h-5 w-5" />
              <span>해결 과정</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {story.solution_process}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>최종 해결책</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {story.final_solution}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex justify-center space-x-4">
        <Button variant="outline">이전 스토리</Button>
        <Button>다음 스토리</Button>
      </div>
    </div>
  );
};

export default StoryDetail;
