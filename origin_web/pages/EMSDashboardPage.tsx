import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, Activity, Users, Stethoscope, Building2, Clock, TrendingUp } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn';

interface EMSDashboardPageProps {
  onBack?: () => void;
}

export const EMSDashboardPage: React.FC<EMSDashboardPageProps> = ({ onBack }) => {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  // 샘플 데이터
  const patients = [
    {
      id: 1,
      name: '김환자',
      age: 45,
      severity: '중증',
      injury: '다발성 외상',
      status: '응급실 대기',
      arrivalTime: '14:23',
      assignedDoctor: null,
    },
    {
      id: 2,
      name: '이환자',
      age: 32,
      severity: '경증',
      injury: '골절',
      status: '진료 중',
      arrivalTime: '13:45',
      assignedDoctor: '박의사',
    },
    {
      id: 3,
      name: '최환자',
      age: 58,
      severity: '중증',
      injury: '심정지',
      status: '수술 준비',
      arrivalTime: '12:10',
      assignedDoctor: '정의사',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: '박의사',
      specialty: '외과',
      status: '가용',
      currentPatients: 2,
      maxPatients: 5,
    },
    {
      id: 2,
      name: '정의사',
      specialty: '응급의학과',
      status: '진료 중',
      currentPatients: 3,
      maxPatients: 4,
    },
    {
      id: 3,
      name: '김의사',
      specialty: '정형외과',
      status: '가용',
      currentPatients: 1,
      maxPatients: 5,
    },
    {
      id: 4,
      name: '이의사',
      specialty: '내과',
      status: '휴식',
      currentPatients: 0,
      maxPatients: 4,
    },
  ];

  const hospitals = [
    {
      id: 1,
      name: '서울대학교병원',
      distance: '2.3km',
      availableBeds: 5,
      specialistAvailable: true,
      matchScore: 95,
      specialty: '다발성 외상',
    },
    {
      id: 2,
      name: '세브란스병원',
      distance: '3.5km',
      availableBeds: 3,
      specialistAvailable: true,
      matchScore: 88,
      specialty: '다발성 외상',
    },
    {
      id: 3,
      name: '가톨릭의대병원',
      distance: '4.1km',
      availableBeds: 8,
      specialistAvailable: false,
      matchScore: 75,
      specialty: '일반 외상',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '중증':
        return 'bg-red-100 text-red-700';
      case '경증':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '가용':
        return 'bg-green-100 text-green-700';
      case '진료 중':
        return 'bg-blue-100 text-blue-700';
      case '휴식':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-toss-grey font-sans text-toss-dark">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Activity size={24} className="text-[#24B368]" />
              <span className="text-xl font-bold text-toss-dark tracking-tighter">
                EMS 시스템
              </span>
              <span className="bg-[#FFF0E6] text-[#FF5F00] text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
                BETA
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Beta Notice */}
        <FadeIn>
          <div className="mb-8 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-orange-900 mb-1">베타 서비스 안내</h3>
              <p className="text-orange-800 text-sm">
                현재 EMS 시스템은 베타 버전입니다. 실제 응급 상황에서는 기존 응급 의료 체계를 우선적으로 사용해주세요.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column - Patient Status */}
          <div className="space-y-6">
            <FadeIn delay={100}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">환자 상태 파악</h2>
                    <p className="text-sm text-toss-greyDark">실시간 환자 현황</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedPatient === patient.id
                          ? 'border-toss-blue bg-blue-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                      onClick={() => setSelectedPatient(patient.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-toss-dark text-lg">
                            {patient.name} ({patient.age}세)
                          </h3>
                          <p className="text-sm text-toss-greyDark">{patient.injury}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(patient.severity)}`}>
                          {patient.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-toss-greyDark">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {patient.status}
                        </span>
                        <span>도착: {patient.arrivalTime}</span>
                        {patient.assignedDoctor && (
                          <span className="flex items-center gap-1 text-toss-blue">
                            <Stethoscope size={14} />
                            {patient.assignedDoctor}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Hospital Recommendation */}
            {selectedPatient && (
              <FadeIn delay={200}>
                <div className="bg-white rounded-[28px] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#E5F7E8] text-[#24B368] rounded-2xl flex items-center justify-center">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-toss-dark">병원 추천</h2>
                      <p className="text-sm text-toss-greyDark">
                        부상 유형에 맞는 최적 병원
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {hospitals.map((hospital) => (
                      <div
                        key={hospital.id}
                        className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-toss-dark text-lg mb-1">
                              {hospital.name}
                            </h3>
                            <p className="text-sm text-toss-greyDark mb-2">
                              {hospital.specialty} 전문
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-toss-greyDark">
                                거리: {hospital.distance}
                              </span>
                              <span className="text-toss-greyDark">
                                병상: {hospital.availableBeds}개
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#24B368] mb-1">
                              {hospital.matchScore}%
                            </div>
                            <p className="text-xs text-toss-greyDark">적합도</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          {hospital.specialistAvailable ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              전문의 가용
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              전문의 대기
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Right Column - Doctor Status */}
          <div className="space-y-6">
            <FadeIn delay={150}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-toss-blue rounded-2xl flex items-center justify-center">
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">의사 주무 현황</h2>
                    <p className="text-sm text-toss-greyDark">의사 가용성 및 환자 배정 현황</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-toss-dark text-lg">
                            {doctor.name} ({doctor.specialty})
                          </h3>
                          <p className="text-sm text-toss-greyDark mt-1">
                            담당 환자: {doctor.currentPatients}/{doctor.maxPatients}명
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doctor.status)}`}>
                          {doctor.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                        <div
                          className="bg-toss-blue h-2 rounded-full transition-all"
                          style={{ width: `${(doctor.currentPatients / doctor.maxPatients) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Patient-Doctor Assignment */}
            {selectedPatient && (
              <FadeIn delay={250}>
                <div className="bg-white rounded-[28px] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-toss-dark">환자-의사 배정</h2>
                      <p className="text-sm text-toss-greyDark">AI 추천 최적 배정</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {doctors
                      .filter((doc) => doc.status === '가용' || doc.currentPatients < doc.maxPatients)
                      .map((doctor) => (
                        <div
                          key={doctor.id}
                          className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50 cursor-pointer hover:border-purple-300 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-toss-dark">
                                {doctor.name} ({doctor.specialty})
                              </h3>
                              <p className="text-sm text-toss-greyDark mt-1">
                                적합도: {90 - doctor.currentPatients * 5}%
                              </p>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                              배정
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Bed Availability */}
            <FadeIn delay={300}>
              <div className="bg-white rounded-[28px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-toss-dark">병상 현황</h2>
                    <p className="text-sm text-toss-greyDark">실시간 병상 가용성</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-toss-dark mb-1">12</div>
                    <p className="text-sm text-toss-greyDark">가용 병상</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-toss-dark mb-1">8</div>
                    <p className="text-sm text-toss-greyDark">사용 중</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">3</div>
                    <p className="text-sm text-toss-greyDark">중환자실</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">5</div>
                    <p className="text-sm text-toss-greyDark">일반 병상</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
};

