import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

export default function BabylonCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Babylon engine and scene
        const engine = new BABYLON.Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true
        });


        const scene = new BABYLON.Scene(engine);

        // Transparent background to show the grid pattern underneath
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

        // Setup a 2D Orthographic Camera
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 50, 0), scene);
        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvasRef.current, true);

        // Remove default rotation inputs for 2D feel, keep only panning/zooming if possible
        // For FreeCamera, we'll just fix the rotation
        camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        camera.inputs.removeByType("FreeCameraMouseInput");

        // State for ortho size to handle zoom
        let orthoSize = 10;
        const aspectRatio = canvasRef.current!.clientWidth / canvasRef.current!.clientHeight;

        const updateOrthoBounds = () => {
            camera.orthoTop = orthoSize;
            camera.orthoBottom = -orthoSize;
            camera.orthoLeft = -orthoSize * aspectRatio;
            camera.orthoRight = orthoSize * aspectRatio;
        };
        updateOrthoBounds();

        // Mouse Wheel Zoom
        const onWheel = (event: WheelEvent) => {
            const zoomSpeed = 0.1;
            const delta = event.deltaY > 0 ? 1 : -1;
            orthoSize += delta * orthoSize * zoomSpeed;
            orthoSize = Math.max(2, Math.min(50, orthoSize));
            updateOrthoBounds();
        };

        // Right-Click Panning
        let isPanning = false;
        let lastPointerPos = { x: 0, y: 0 };

        const onPointerDown = (event: PointerEvent) => {
            if (event.button === 2) { // Right click
                isPanning = true;
                lastPointerPos = { x: event.clientX, y: event.clientY };
                canvasRef.current!.style.cursor = 'grabbing';
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            if (isPanning) {
                const deltaX = event.clientX - lastPointerPos.x;
                const deltaY = event.clientY - lastPointerPos.y;

                // Adjust sensitivity based on zoom level
                const sensitivity = (orthoSize * 2) / canvasRef.current!.clientHeight;

                camera.position.x -= deltaX * sensitivity;
                camera.position.z += deltaY * sensitivity;

                lastPointerPos = { x: event.clientX, y: event.clientY };
            }
        };

        const onPointerUp = () => {
            isPanning = false;
            canvasRef.current!.style.cursor = 'crosshair';
        };

        canvasRef.current?.addEventListener('wheel', onWheel);
        canvasRef.current?.addEventListener('pointerdown', onPointerDown);
        canvasRef.current?.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        // Disable context menu on right click
        const preventDefault = (e: MouseEvent) => e.preventDefault();
        canvasRef.current?.addEventListener('contextmenu', preventDefault);

        // Setup lights
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1.0;

        // Create Dot Grid (Something other than lines)
        const createDotGrid = (size: number, step: number) => {
            const points = [];
            const colors = [];

            const dotColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.2);
            const majorDotColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.5);

            for (let x = -size; x <= size; x += step) {
                for (let z = -size; z <= size; z += step) {
                    const isMajor = x % 5 === 0 && z % 5 === 0;

                    // Each dot is a tiny cross (+) to make it visible across zoom levels
                    const tiny = 0.03;
                    points.push([
                        new BABYLON.Vector3(x - tiny, 0, z),
                        new BABYLON.Vector3(x + tiny, 0, z)
                    ]);
                    points.push([
                        new BABYLON.Vector3(x, 0, z - tiny),
                        new BABYLON.Vector3(x, 0, z + tiny)
                    ]);

                    const color = isMajor ? majorDotColor : dotColor;
                    colors.push([color, color]);
                    colors.push([color, color]);
                }
            }

            const grid = BABYLON.MeshBuilder.CreateLineSystem("dotGrid", { lines: points, colors }, scene);
            grid.isPickable = false;
            return grid;
        };

        const grid = createDotGrid(50, 1);

        // Add a 1x1m Reference Square at Origin
        const refSquare = BABYLON.MeshBuilder.CreateLines("refSquare", {
            points: [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(1, 0, 0),
                new BABYLON.Vector3(1, 0, 1),
                new BABYLON.Vector3(0, 0, 1),
                new BABYLON.Vector3(0, 0, 0)
            ]
        }, scene);
        refSquare.color = new BABYLON.Color3(0.4, 0.6, 1); // Soft Blue
        refSquare.alpha = 0.5;




        // Render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        // Handle resize
        const handleResize = () => {
            engine.resize();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            canvasRef.current?.removeEventListener('wheel', onWheel);
            canvasRef.current?.removeEventListener('pointerdown', onPointerDown);
            canvasRef.current?.removeEventListener('pointermove', onPointerMove);
            canvasRef.current?.removeEventListener('contextmenu', preventDefault);
            window.removeEventListener('pointerup', onPointerUp);
            engine.dispose();
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full outline-none touch-none"
            style={{ display: 'block' }}
        />
    );
}
