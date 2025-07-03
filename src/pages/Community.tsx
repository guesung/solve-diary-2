
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ThumbsUp, MessageCircle, Calendar, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useProblemSolutions } from "@/hooks/useProblemSolutions";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("latest");
  
  // 공개된 스토리들만 가져오기
  const { data: stories = [], isLoading, error } = useProblemSolutions(undefined, true);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">스토리를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">스토리를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티</h1>
        <p className="text-gray-600">다른 개발자들의 문제 해결 스토리를 둘러보고 함께 성장하세요.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="스토리나 태그로 검색..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
            <SelectItem value="solved">해결완료</SelectItem>
            <SelectItem value="progress">진행중</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stories Grid */}
      <div className="space-y-6">
        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 공개된 스토리가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">첫 번째 스토리를 작성해보세요!</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">사용자</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>익명 사용자</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(story.created_at).toLocaleDateString('ko-KR')}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors">
                      <Link to={`/story/${story.id}`}>{story.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {story.problem_description.substring(0, 150)}...
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant={story.status === "완료" ? "default" : "secondary"}>
                        {story.status === "완료" ? "해결완료" : "진행중"}
                      </Badge>
                      <Badge variant="outline">{story.difficulty}</Badge>
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>0</span>
                    </div>
                  </div>
                  <Link to={`/story/${story.id}`}>
                    <Button variant="outline" size="sm">자세히 보기</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="py-8">
            <h3 className="text-xl font-semibold mb-2">당신의 스토리도 공유해보세요!</h3>
            <p className="text-gray-600 mb-4">작은 문제부터 시작해도 좋습니다. 다른 개발자들에게 도움이 될 수 있어요.</p>
            <Link to="/write">
              <Button className="bg-blue-600 hover:bg-blue-700">스토리 작성하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
