import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

const CanvasPage = () => {

    const canvasRef = useRef(null);
    const [penWidth, setPenWidth] = useState(3);
    const [penColor, setPenColor] = useState('black');
    const [fabricCanvas, setFabricCanvas] = useState();
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: "red",
            width: 800,
            height: 400,
            isDrawingMode: true,
            selectionColor: "rgba(0,0,0, 0.2)",
            selectionLineWidth: 2,
        });
        setFabricCanvas(canvas);

        canvas.on('mouse:up', () => {
            setTimeout(() => {
                var base64ImageData = canvas.toDataURL("image/png");
                navigator.clipboard.writeText(base64ImageData);
                TestStuff(base64ImageData);
            }, 100)
        })

        return () => {
            canvas.dispose();
        }

    }, [canvasRef])

    const changePenWidth = (width) => {
        if (fabricCanvas) {
            fabricCanvas.freeDrawingBrush.width = width;
            setPenWidth(width);
            fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }

    const changePenColor = (color) => {
        if (fabricCanvas) {
            fabricCanvas.freeDrawingBrush.color = color;
            setPenColor(color);
            fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }

    const CopyImage = () => {
        var canvasTest = document.getElementById("canvas-test");
        var ctx = canvasTest.getContext("2d");
        console.log(ctx);
    }

    const TestStuff = (image) => {
        var canvasTest = document.getElementById("canvas-test");
        var ctx = canvasTest.getContext("2d");
        ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, 400, 800);
        var logoImage = new Image();
        logoImage.src = `${image}`;
        var imageExists = document.querySelector("img");
        if(imageExists) {
            imageExists.remove();
            document.body.append(logoImage);
        }
        else {
            document.body.append(logoImage);
        }
        // ctx.drawImage(logoImage, 0, 0, 400, 800);
    }

    return (
        <div className='container w-100 h-100'>
            <p>Whiteboard</p>
            <canvas ref={canvasRef}></canvas>
            <div>
                <div>
                    <label>Pen Width - {penWidth}</label>
                    <input type="range" onChange={(e) => changePenWidth(e.target.value)} value={penWidth} min={1} max={30} />
                </div>
                <div>
                    <label>Pen Color - {penColor}</label>
                    <input type="color" onChange={(e) => changePenColor(e.target.value)} value={penColor} />
                </div>
                <button onClick={() => CopyImage()}>Copy</button>
            </div>
            <div>
                <canvas id="canvas-test" style={{marginTop:"20px", marginBottom:"20px"}}></canvas>
            </div>
        </div>
    )
}

export default CanvasPage;