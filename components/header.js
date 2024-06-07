import Link from 'next/link';

export default function Header() {
  return (
    
    <header className="text-gray-600 body-font border-b-2 border-gray-200">
        
      <div className="container mx-auto flex flex-wrap p-2 md:p-0 flex-col md:flex-row items-center">
        <Link href="/" legacyBehavior>
          
            <img src="/logo.png" alt="MemeFactory Logo" className="w-16 h-16 object-contain mb-0 md:mb-0" />
            
          
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" legacyBehavior>
            <a className="mr-5 hover:text-gray-900">홈</a>
          </Link>
          
          <Link href="https://open.kakao.com/o/s8P7WCvg" legacyBehavior>
            <a className="mr-5 hover:text-gray-900">연락하기</a>
          </Link>
          <Link href="https://open.kakao.com/o/s8P7WCvg" legacyBehavior>
          <a className="mr-5 hover:text-gray-900">팀원 모집</a>
          </Link>
        </nav>
       
      </div>
    </header>
  );
}
