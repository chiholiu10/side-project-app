import React, { useRef, useEffect } from 'react';

const DifferencePageOne = () => {
    const canvasRef = 'assets/find-differences/d1.svg';


    return (
        <div>
            DifferencePageOne
            <img src={canvasRef}/>
        </div>  
    )
}

// const useCanvas = (draw, context = "2d") => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const ctx = canvasRef.current.getContext(context);
//         let animationFrameId = requestAnimationFrame(renderFrame);
    
//         function renderFrame() {
//           animationFrameId = requestAnimationFrame(renderFrame);
//           draw(ctx);
//         }
    
//         return () => cancelAnimationFrame(animationFrameId);
//     }, []);
//     return canvasRef;
// }
export default DifferencePageOne;