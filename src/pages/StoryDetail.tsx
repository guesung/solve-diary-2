
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
  CheckCircle
} from "lucide-react";

const StoryDetail = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const story = {
    id: 1,
    title: "React Hook Form 유효성 검사 문제 해결",
    author: "김개발",
    authorInitial: "김",
    difficulty: "중급",
    tags: ["React", "TypeScript", "Form"],
    createdAt: "2024-01-15",
    readTime: "5분 읽기",
    likes: 24,
    comments: 8,
    status: "해결완료",
    problem: `
회사 프로젝트에서 복잡한 사용자 등록 폼을 구현해야 했습니다. 폼에는 다음과 같은 요구사항이 있었습니다:

- 실시간 유효성 검사
- 비밀번호 확인 일치 검사
- 이메일 중복 확인 (비동기)
- 다단계 폼 구조

기존에 사용하던 useState로 상태 관리를 하니 코드가 너무 복잡해지고, 유효성 검사 로직이 흩어져서 유지보수가 어려웠습니다.
    `,
    process: `
### 1차 시도: 순수 React State 사용
처음에는 useState로 모든 상태를 관리하려고 했습니다.

\`\`\`javascript
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
const [isValidating, setIsValidating] = useState(false);
\`\`\`

하지만 폼이 복잡해질수록 상태 관리가 어려워졌고, 유효성 검사 로직이 컴포넌트 곳곳에 흩어져 있었습니다.

### 2차 시도: React Hook Form 도입
React Hook Form을 사용하기로 결정했지만, 처음에는 기본적인 사용법만 알고 있어서 복잡한 유효성 검사를 구현하는데 어려움이 있었습니다.

특히 비동기 유효성 검사(이메일 중복 확인)와 비밀번호 확인 로직을 구현하는 부분에서 막혔습니다.

### 3차 시도: Zod와 함께 사용
TypeScript 환경에서 더 나은 타입 안정성을 위해 Zod 스키마 검증 라이브러리를 함께 사용해보았습니다.
    `,
    solution: `
최종적으로 React Hook Form + Zod + @hookform/resolvers 조합으로 문제를 해결했습니다.

### 최종 해결책

\`\`\`typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
\`\`\`

이 방법으로 다음과 같은 이점을 얻었습니다:
- 타입 안정성 확보
- 선언적인 유효성 검사
- 성능 최적화 (불필요한 리렌더링 방지)
- 깔끔한 코드 구조
    `,
    insights: `
이 경험을 통해 배운 것들:

1. **라이브러리 선택의 중요성**: 처음부터 적절한 도구를 선택하는 것이 중요하다는 것을 깨달았습니다.

2. **타입 안정성**: TypeScript 환경에서는 런타임 검증과 컴파일 타임 검증을 모두 고려해야 합니다.

3. **문서 읽기**: React Hook Form의 고급 기능들을 제대로 활용하지 못했던 이유는 문서를 충분히 읽지 않았기 때문이었습니다.

4. **점진적 적용**: 한 번에 모든 기능을 적용하려고 하지 말고, 단계적으로 적용해나가는 것이 좋습니다.
    `
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{story.authorInitial}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{story.author}</div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{story.createdAt}</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>{story.readTime}</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{story.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant={story.status === "해결완료" ? "default" : "secondary"}>
            {story.status}
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
              <span>{story.likes}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>{story.comments}</span>
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
                {story.problem}
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
                {story.process}
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
                {story.solution}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Lightbulb className="h-5 w-5" />
              <span>얻은 인사이트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {story.insights}
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
