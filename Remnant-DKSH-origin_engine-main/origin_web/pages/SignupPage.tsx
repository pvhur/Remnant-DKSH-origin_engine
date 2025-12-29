import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FadeIn } from '../components/ui/FadeIn';

interface SignupPageProps {
  onBack?: () => void;
  onSignupSuccess?: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onBack, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = '이름을 입력해주세요';
    } else if (name.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
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
    setErrors({});

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name,
          email, 
          password 
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 회원가입 성공 처리 - 자동 로그인
        if (data.data?.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        onSignupSuccess?.();
      } else {
        // 에러 처리
        if (data.message) {
          if (data.message.includes('이미 사용 중인 이메일')) {
            setErrors({ email: data.message });
          } else {
            setErrors({ general: data.message });
          }
        } else if (data.errors) {
          // Zod validation errors
          const validationErrors: { 
            name?: string; 
            email?: string; 
            password?: string;
          } = {};
          data.errors.forEach((error: { path: string[]; message: string }) => {
            const field = error.path[0];
            if (field === 'name') validationErrors.name = error.message;
            if (field === 'email') validationErrors.email = error.message;
            if (field === 'password') validationErrors.password = error.message;
          });
          setErrors(validationErrors);
        } else {
          setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ 
        general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' 
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
              회원가입
            </h1>
            <p className="text-toss-greyDark">
              Origin AI와 함께 시작하세요
            </p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="이름"
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: undefined });
                }
              }}
              error={errors.name}
              autoComplete="name"
            />

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
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
                // 비밀번호 확인도 다시 체크
                if (confirmPassword && e.target.value !== confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '비밀번호가 일치하지 않습니다' });
                } else if (confirmPassword && e.target.value === confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
              }}
              error={errors.password}
              autoComplete="new-password"
            />

            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
                // 실시간 비밀번호 일치 확인
                if (password && e.target.value !== password) {
                  setErrors({ ...errors, confirmPassword: '비밀번호가 일치하지 않습니다' });
                } else if (password && e.target.value === password) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
              }}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              disabled={isLoading}
              className="mt-8"
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-toss-greyDark text-sm">
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={onBack}
                className="text-toss-blue hover:text-blue-600 font-semibold"
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

