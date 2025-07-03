import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Save, ArrowLeft } from "lucide-react";
import { useProblemSolution, useUpdateProblemSolution } from "@/hooks/useProblemSolutions";
import { useAuth } from "@/hooks/useAuth";
import { ProblemSolution } from "@/types/supabase";

const EditStory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: story, isLoading, error } = useProblemSolution(id!);
  const updateMutation = useUpdateProblemSolution();

  const [formData, setFormData] = useState({
    title: "",
    problem_description: "",
    solution_process: "",
    final_solution: "",
    difficulty: "중급" as "초급" | "중급" | "고급",
    status: "진행중" as "진행중" | "완료",
    tags: [] as string[],
    is_public: false,
  });

  const [newTag, setNewTag] = useState("");

  // 기존 데이터가 로드되면 폼에 설정
  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        problem_description: story.problem_description,
        solution_process: story.solution_process,
        final_solution: story.final_solution,
        difficulty: story.difficulty,
        status: story.status,
        tags: story.tags || [],
        is_public: story.is_public,
      });
    }
  }, [story]);

  // 권한 확인
  useEffect(() => {
    if (story && user && story.user_id !== user.id) {
      navigate("/dashboard");
    }
  }, [story, user, navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    try {
      await updateMutation.mutateAsync({
        id,
        updates: {
          title: formData.title,
          problem_description: formData.problem_description,
          solution_process: formData.solution_process,
          final_solution: formData.final_solution,
          difficulty: formData.difficulty,
          status: formData.status,
          tags: formData.tags,
          is_public: formData.is_public,
        }
      });

      navigate(`/story/${id}`);
    } catch (error) {
      console.error("스토리 수정 중 오류 발생:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">스토리를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 스토리가 존재하지 않거나 접근 권한이 없습니다.</p>
          <Button onClick={() => navigate("/dashboard")}>대시보드로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => navigate(`/story/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">스토리 수정</h1>
        <p className="text-gray-600">문제 해결 과정을 수정하고 업데이트하세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>스토리의 기본 정보를 입력하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="문제 해결 스토리의 제목을 입력하세요"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty">난이도</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">상태</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="진행중">진행중</SelectItem>
                    <SelectItem value="완료">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">태그</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그를 입력하세요"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  추가
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                checked={formData.is_public}
                onCheckedChange={(checked) => handleInputChange("is_public", checked)}
              />
              <Label htmlFor="is_public">공개 설정</Label>
            </div>
          </CardContent>
        </Card>

        {/* 문제 상황 */}
        <Card>
          <CardHeader>
            <CardTitle>1. 문제 상황</CardTitle>
            <CardDescription>어떤 문제를 해결하려고 했는지 설명하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.problem_description}
              onChange={(e) => handleInputChange("problem_description", e.target.value)}
              placeholder="발생한 문제나 해결하고자 하는 과제를 자세히 설명하세요..."
              className="min-h-[120px]"
              required
            />
          </CardContent>
        </Card>

        {/* 해결 과정 */}
        <Card>
          <CardHeader>
            <CardTitle>2. 해결 과정</CardTitle>
            <CardDescription>문제를 해결하기 위해 시도한 방법들을 기록하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.solution_process}
              onChange={(e) => handleInputChange("solution_process", e.target.value)}
              placeholder="시도한 방법들, 실패한 접근법, 참고한 자료 등을 단계별로 기록하세요..."
              className="min-h-[120px]"
              required
            />
          </CardContent>
        </Card>

        {/* 최종 해결책 */}
        <Card>
          <CardHeader>
            <CardTitle>3. 최종 해결책</CardTitle>
            <CardDescription>최종적으로 문제를 해결한 방법을 정리하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.final_solution}
              onChange={(e) => handleInputChange("final_solution", e.target.value)}
              placeholder="최종 해결책, 코드 예시, 핵심 포인트 등을 정리하세요..."
              className="min-h-[120px]"
              required
            />
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(`/story/${id}`)}>
            취소
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateMutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStory; 