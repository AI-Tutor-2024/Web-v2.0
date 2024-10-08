"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Sidebar from "@/app/components/layout/Sidebar";
import SectionFolder from '@/app/components/section/SectionFolder';
import CTANewSection from '@/app/components/button/CTANewSection';
import SectionModal from '@/app/components/modal/SectionModal';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Professor = () => {
  const [sections, setSections] = useState<{ subject: string; professor: string; name: string }[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const storedSections = localStorage.getItem('3');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    }
  }, []);

  const router = useRouter(); // useRouter 훅 사용

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  const handleSave = (subject: string, professor: string) => {
    setSections([...sections, { subject, professor, name: subject }]);
    setShowModal(false);
  };
  const handleClose = () => {
    console.log('Closing modal');
    setShowModal(false);
  };

  const handleEdit = (index: number, subject: string, professor: string) => {
    const updatedSections = sections.map((section, i) => 
      i === index ? { subject, professor, name: subject } : section
    );
    setSections(updatedSections);
  };


  const handleDelete = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  return (
    <div className="flex flex-row bg-bgDeepGray">
      <Sidebar sections={sections}/>
      <div className="w-full flex flex-col justify-between">
        <div className="px-8 py-8 font-Pretendard font-semibold leading-[70px] text-[57px] text-custom-green">
          안녕하세요 하OO 교수님,<br/>
          교수님을 도와드릴 AI Tutor예요!
        </div>
        <div className="border-t-2 h-[600px] border-r-2 border-l-2 border-[#929292]/[0.4] rounded-t-xl rounded-r-ml rounded-l-ml bg-[#242424]">
          <div className="mx-4 my-4 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Image src="ic_side_all.svg" alt="logo" width={24} height={24} />
              <p className="text-white text-[18px]">수강과목</p>
            </div>
            <div>
            <CTANewSection handleClick={() => setShowModal(true)} />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 px-4">
            {showModal && (
              <SectionModal 
                onSave={handleSave} 
                onClose={handleClose} 
              />
            )}
            {sections.map((section, index) => (
              <SectionFolder 
                key={index} 
                subject={section.subject} 
                professor={section.professor} 
                onEdit={(subject, professor) => handleEdit(index, subject, professor)} 
                onDelete={() => handleDelete(index)} 
                onClick={() => router.push('/createNotes')} // 클릭 시 해당 ID로 라우팅
              /> 
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professor;