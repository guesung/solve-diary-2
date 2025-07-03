
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, PlusCircle, Users, BarChart3 } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SolveDiary</span>
          </Link>
          
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
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">로그인</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">시작하기</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
