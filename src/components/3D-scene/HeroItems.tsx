'use client'

import { OrbitControls, useGLTF, useTexture } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Mesh } from "three"

export default function HeroItems() {
    const { nodes } = useGLTF('./sports_items.glb')
    const texture = useTexture('./baked.jpg')
    console.log(nodes)

    return (
        <>
            <OrbitControls makeDefault />
            
            <color args={['#56496e']} attach="background" />
            <mesh geometry={(nodes.baseball as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.knot as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Baseball_Bat as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Bike as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle001 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle002 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle003 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle004 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle005 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle006 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Circle007 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Cylinder as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Cylinder001 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Cylinder002 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Cylinder003 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Cylinder004 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane001 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane002 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane003 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane004 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane005 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane006 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane007 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane008 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Plane009 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Vert as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Vert001 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Vert002 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Vert003 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Vert004 as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            {/* <mesh geometry={(nodes.Football as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh> */}
        </>
    )
}
