
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, PlusCircle, Users, BarChart3, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SolveDiary</span>
          </Link>
          
          {user && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/dashboard">
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"} 
                  size="sm" 
                  className="flex items-center space-x-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>대시보드</span>
                </Button>
              </Link>
              <Link to="/community">
                <Button 
                  variant={isActive("/community") ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>커뮤니티</span>
                </Button>
              </Link>
              <Link to="/write">
                <Button 
                  variant={isActive("/write") ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>스토리 작성</span>
                </Button>
              </Link>
            </nav>
          )}
          
          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name || user.email} />
                      <AvatarFallback>
                        {user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.name || '사용자'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>대시보드</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/write" className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>스토리 작성</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      const { error } = await signOut();
                      if (error) {
                        toast({
                          title: "로그아웃 실패",
                          description: error.message,
                          variant: "destructive",
                        });
                      } else {
                        toast({
                          title: "로그아웃 성공",
                          description: "안전하게 로그아웃되었습니다.",
                        });
                      }
                    }}
                    className="flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">로그인</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">시작하기</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
