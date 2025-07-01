
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Lightbulb, CheckCircle, Tag, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WriteStory = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    tags: [],
    problem: "",
    process: "",
    solution: "",
    insights: ""
  });

  const handleSubmit = () => {
    toast({
      title: "스토리가 성공적으로 저장되었습니다!",
      description: "커뮤니티에서 다른 개발자들과 공유해보세요.",
    });
  };

  const steps = [
    { id: 1, title: "문제 정의", icon: AlertTriangle, color: "text-red-600" },
    { id: 2, title: "해결 과정", icon: Lightbulb, color: "text-yellow-600" },
    { id: 3, title: "최종 해결", icon: CheckCircle, color: "text-green-600" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">새 스토리 작성</h1>
        <p className="text-gray-600">문제 해결 과정을 3단계로 구조화하여 기록하세요.</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center space-x-3 ${currentStep >= step.id ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ml-8 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tag className="h-5 w-5" />
              <span>기본 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">스토리 제목</Label>
              <Input
                id="title"
                placeholder="예: React Hook Form 유효성 검사 문제 해결"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty">난이도</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="난이도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="초급">초급</SelectItem>
                    <SelectItem value="중급">중급</SelectItem>
                    <SelectItem value="고급">고급</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>태그</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["React", "TypeScript", "JavaScript", "CSS", "Node.js"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="1">1. 문제 정의</TabsTrigger>
          <TabsTrigger value="2">2. 해결 과정</TabsTrigger>
          <TabsTrigger value="3">3. 최종 해결</TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>문제 정의</span>
              </CardTitle>
              <CardDescription>
                마주한 문제나 해결하고 싶은 과제를 명확히 정의해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="problem">문제 상황</Label>
                <Textarea
                  id="problem"
                  placeholder="어떤 문제를 마주했나요? 상황을 구체적으로 설명해주세요."
                  className="min-h-32"
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(2)}>
                  다음 단계: 해결 과정
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-600">
                <Lightbulb className="h-5 w-5" />
                <span>해결 과정</span>
              </CardTitle>
              <CardDescription>
                시도한 방법들, 실패와 성공, 학습한 내용을 기록해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="process">시도한 방법과 과정</Label>
                <Textarea
                  id="process"
                  placeholder="어떤 방법들을 시도했나요? 실패한 것과 성공한 것을 모두 기록해주세요."
                  className="min-h-32"
                  value={formData.process}
                  onChange={(e) => setFormData({...formData, process: e.target.value})}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  이전: 문제 정의
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  다음 단계: 최종 해결
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>최종 해결</span>
              </CardTitle>
              <CardDescription>
                최종 해결책과 얻은 인사이트를 정리해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="solution">최종 해결책</Label>
                <Textarea
                  id="solution"
                  placeholder="문제를 어떻게 해결했나요? 최종 해결책을 설명해주세요."
                  className="min-h-24"
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="insights">얻은 인사이트</Label>
                <Textarea
                  id="insights"
                  placeholder="이 과정에서 배운 점이나 다음에 유용할 인사이트가 있다면 공유해주세요."
                  className="min-h-24"
                  value={formData.insights}
                  onChange={(e) => setFormData({...formData, insights: e.target.value})}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  이전: 해결 과정
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  스토리 저장하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WriteStory;
