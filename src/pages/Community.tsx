
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ThumbsUp, MessageCircle, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("latest");

  const stories = [
    {
      id: 1,
      title: "React Hook Form 유효성 검사 문제 해결",
      author: "김개발",
      authorInitial: "김",
      difficulty: "중급",
      tags: ["React", "TypeScript", "Form"],
      summary: "복잡한 폼 유효성 검사를 구현하면서 겪은 문제와 Hook Form을 활용한 해결 과정을 공유합니다.",
      likes: 24,
      comments: 8,
      createdAt: "2024-01-15",
      status: "해결완료"
    },
    {
      id: 2,
      title: "Next.js 13 App Router 마이그레이션 경험기",
      author: "박프론트",
      authorInitial: "박",
      difficulty: "고급",
      tags: ["Next.js", "React", "Migration"],
      summary: "Pages Router에서 App Router로 마이그레이션하면서 겪은 다양한 이슈들과 해결 방법을 단계별로 정리했습니다.",
      likes: 45,
      comments: 12,
      createdAt: "2024-01-14",
      status: "해결완료"
    },
    {
      id: 3,
      title: "TypeScript Generic 타입 오류 해결",
      author: "이타입",
      authorInitial: "이",
      difficulty: "고급",
      tags: ["TypeScript", "Generic"],
      summary: "복잡한 Generic 타입 정의에서 발생한 컴파일 오류를 해결하는 과정에서 학습한 내용을 공유합니다.",
      likes: 18,
      comments: 5,
      createdAt: "2024-01-13",
      status: "진행중"
    }
  ];

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        {filteredStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{story.authorInitial}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{story.author}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{story.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors">
                    <Link to={`/story/${story.id}`}>{story.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {story.summary}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={story.status === "해결완료" ? "default" : "secondary"}>
                      {story.status}
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
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{story.comments}</span>
                  </div>
                </div>
                <Link to={`/story/${story.id}`}>
                  <Button variant="outline" size="sm">자세히 보기</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
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
