import React, { useEffect, useRef } from "react";
import './styles/BackToTop.css';
function BackToTop() {
  const btnRef = useRef(null);
  useEffect(() => {
    function handler() {
      if(btnRef.current)
        btnRef.current.style.display = window.scrollY > 200 ? 'block' : 'none';
    }
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button ref={btnRef} className="back-to-top" style={{display:'none'}} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
      ↑
    </button>
  );
}
export default BackToTop;
