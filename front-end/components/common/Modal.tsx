import { ReactNode, useEffect } from "react";

interface ModalProps{
    isOpen: boolean;
    onClose: ()=>void;
    children: ReactNode;
}
function Modal({isOpen, onClose,  children}: ModalProps){
     // Method 1: ESC key handler
    useEffect(()=>{
        const handleEsc = (e: KeyboardEvent)=>{
            if(e.key === 'Escape'){
                onClose();
            }
        };
          if (isOpen) {
            document.addEventListener('keydown', handleEsc);
          }
        return ()=> document.removeEventListener('keydown', handleEsc);
    },[onClose, isOpen])
    // Method 2: Click outside (backdrop click) handler
    const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(e.target === e.currentTarget){
            onClose();
        }
        
    }
    // prevent body scroll
    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'unset';
        }
        return ()=>{document.body.style.overflow = 'unset';};
    },[isOpen]);

    if(!isOpen){
        return null;
    }
    return(
        <div onClick={handleBackDropClick} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 "> 
                {children}
            </div>
        </div>
    )
    ;
}

export default Modal;