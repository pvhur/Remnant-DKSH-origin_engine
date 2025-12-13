import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FadeIn } from '../components/ui/FadeIn';

interface LoginPageProps {
  onBack?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 백엔드 API 연동
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // 로그인 성공 처리
        if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        onLoginSuccess?.();
      } else {
        setErrors({ 
          password: data.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        password: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-toss-grey flex items-center justify-center px-4 py-12">
      <FadeIn className="w-full max-w-md">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="mb-8 flex items-center gap-2 text-toss-greyDark hover:text-toss-dark transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">돌아가기</span>
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-10">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-toss-dark tracking-tighter">
                origin<span className="text-toss-blue">.AI</span>
              </span>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
                BETA
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-toss-dark mb-2 tracking-tight">
              로그인
            </h1>
            <p className="text-toss-greyDark">
              Origin AI에 오신 것을 환영합니다
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: undefined });
                }
              }}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
              }}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-toss-blue focus:ring-toss-blue focus:ring-2"
                />
                <span className="text-toss-greyDark">로그인 상태 유지</span>
              </label>
              <button
                type="button"
                className="text-toss-blue hover:text-blue-600 font-medium"
              >
                비밀번호 찾기
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              disabled={isLoading}
              className="mt-8"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          {/* Sign up Link */}
          <div className="mt-8 text-center">
            <p className="text-toss-greyDark text-sm">
              아직 계정이 없으신가요?{' '}
              <button
                type="button"
                className="text-toss-blue hover:text-blue-600 font-semibold"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

