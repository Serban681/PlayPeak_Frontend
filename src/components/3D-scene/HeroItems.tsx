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
            <mesh geometry={(nodes.American_football_ball as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.American_football_ball as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.baseball as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Baseball_Bat as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
            <mesh geometry={(nodes.Bike as Mesh).geometry}>
                <meshBasicMaterial map={texture} map-flipY={false} />
            </mesh>
        </>
    )
}
