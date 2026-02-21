import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

export default function BabylonCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Babylon engine and scene
        const engine = new BABYLON.Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
            antialias: true
        });


        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.05, 0.05, 0.05, 1); // Dark background

        // Setup a 2D Orthographic Camera
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 50, 0), scene);
        camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvasRef.current, true);

        // State for ortho size to handle zoom
        let orthoSize = 10;

        const updateOrthoBounds = () => {
            if (!canvasRef.current) return;
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;

            if (width === 0 || height === 0) return;

            const aspectRatio = width / height;
            camera.orthoTop = orthoSize;
            camera.orthoBottom = -orthoSize;
            camera.orthoLeft = -orthoSize * aspectRatio;
            camera.orthoRight = orthoSize * aspectRatio;
        };

        // Initial update
        updateOrthoBounds();

        // Remove default rotation inputs
        camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        camera.inputs.removeByType("FreeCameraMouseInput");

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
                if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
            }
        };

        const onPointerMove = (event: PointerEvent) => {
            if (isPanning && canvasRef.current) {
                const deltaX = event.clientX - lastPointerPos.x;
                const deltaY = event.clientY - lastPointerPos.y;

                const sensitivity = (orthoSize * 2) / canvasRef.current.clientHeight;

                camera.position.x -= deltaX * sensitivity;
                camera.position.z += deltaY * sensitivity;

                lastPointerPos = { x: event.clientX, y: event.clientY };
            }
        };

        const onPointerUp = () => {
            isPanning = false;
            if (canvasRef.current) canvasRef.current.style.cursor = 'crosshair';
        };

        canvasRef.current.addEventListener('wheel', onWheel, { passive: false });
        canvasRef.current.addEventListener('pointerdown', onPointerDown);
        canvasRef.current.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        const preventDefault = (e: MouseEvent) => e.preventDefault();
        canvasRef.current.addEventListener('contextmenu', preventDefault);

        // Setup lights
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1.0;

        // Create Dot Grid
        const createDotGrid = (size: number, step: number) => {
            const points = [];
            const colors = [];

            const dotColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.15);
            const majorDotColor = new BABYLON.Color4(0.5, 0.5, 0.5, 0.4);

            for (let x = -size; x <= size; x += step) {
                for (let z = -size; z <= size; z += step) {
                    const isMajor = Math.abs(x % 5) < 0.1 && Math.abs(z % 5) < 0.1;

                    const tiny = 0.04;
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

        createDotGrid(100, 1);

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
        refSquare.color = new BABYLON.Color3(0.4, 0.6, 1);
        refSquare.alpha = 0.5;

        // Render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        // Handle resize with ResizeObserver for better reliability
        const resizeObserver = new ResizeObserver(() => {
            engine.resize();
            updateOrthoBounds();
        });

        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
        }

        const handleResize = () => {
            engine.resize();
            updateOrthoBounds();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();

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
