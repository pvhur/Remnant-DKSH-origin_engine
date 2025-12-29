import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-toss-dark mb-4">서비스</h4>
            <ul className="space-y-3 text-sm text-toss-greyDark">
              <li><a href="#" className="hover:text-toss-blue">기능 소개</a></li>
              <li><a href="#" className="hover:text-toss-blue">요금제</a></li>
              <li><a href="#" className="hover:text-toss-blue">기업용 솔루션</a></li>
              <li><a href="#" className="hover:text-toss-blue">API 문서</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-toss-dark mb-4">회사</h4>
            <ul className="space-y-3 text-sm text-toss-greyDark">
              <li><a href="#" className="hover:text-toss-blue">Origin 팀</a></li>
              <li><a href="#" className="hover:text-toss-blue">채용</a></li>
              <li><a href="#" className="hover:text-toss-blue">블로그</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-toss-dark mb-4">고객지원</h4>
            <ul className="space-y-3 text-sm text-toss-greyDark">
              <li><a href="#" className="hover:text-toss-blue">공지사항</a></li>
              <li><a href="#" className="hover:text-toss-blue">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-toss-blue">문의하기</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="text-2xl font-bold text-gray-300">
              origin.AI
            </div>
            <div className="text-xs text-gray-400">
              <p>Copyright © Origin AI Corp. All rights reserved.</p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-toss-dark">이용약관</a>
                <a href="#" className="font-bold hover:text-toss-dark">개인정보처리방침</a>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};