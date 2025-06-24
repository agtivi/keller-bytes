'use client'
import { useEffect, useRef } from 'react';

export default function InitialCanvas( {canvasRef} ){
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
        console.error('WebGL not supported');
        return;
        }

        // Your WebGL rendering code here
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
    }, [canvasRef]);
    return (
        <div className="grid grid-cols-2 justify-center pt-20">
            <code className="code w-full">
                <pre>
                    {"'use client'"}
                    <br/>
                    {"import { useEffect, useRef } from 'react';"}
                    <br/>
                    {"export default function Gravity(){"}
                    <br/>
                    {"  const canvasRef = useRef<HTMLCanvasElement>(null);"}
                    <br/>
                    {"  useEffect(() => {"}
                    <br/>
                    {"    const canvas = canvasRef.current;"}
                    <br/>
                    {"    if (!canvas) return;"}
                    <br/>

                    {"    const gl = canvas.getContext('webgl');"}
                    <br/>
                    {"    if (!gl) {"}
                    <br/>
                    {"      console.error('WebGL not supported');"}
                    <br/>
                    {"      return;"}
                    <br/>
                    {"    }"}
                    <br/>
                    {"    gl.clearColor(0.0, 0.0, 0.0, 1.0);"}
                    <br/>
                    {"    gl.clear(gl.COLOR_BUFFER_BIT);"}
                    <br/>
                        
                    {"  }, []);"}
                    <br/>
                    <br/>
                    {"  return ("}
                    <br/>
                    {"      <canvas ref={canvasRef} width={500} height={500} />"}
                    <br/>
                    {"  )"}
                    <br/>
                    {"}"}
                </pre>
            </code>
            <div className="flex justify-center">
                <canvas ref={canvasRef} width={500} height={500} />
            </div>
        </div>
    )
}