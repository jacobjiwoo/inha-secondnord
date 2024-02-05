import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Mobile, PC, PCAndTablet } from "../../configResponsive";
import HeaderHome from "../../components/header/HeaderHome";
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Float, OrbitControls, Text3D } from "@react-three/drei";
import { MeshNormalMaterial } from "three";
import { RoationIcon } from "../../assets/svg";

const HomeTitle = ({ size }) => {
  return (
    <>
      <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
        <Float speed={3} floatIntensity={3}>
          <Center>
            <Text3D
              font={
                "https://drei.pmnd.rs/fonts/helvetiker_regular.typeface.json"
              }
              bevelEnabled
              bevelSize={0.07}
              bevelThickness={0.1}
              lineHeight={1}
              letterSpacing={0.1}
              color="blue"
              size={size}
              material={new MeshNormalMaterial()}
            >
              {"Second\nNORD"}
            </Text3D>
          </Center>
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
};

function Home() {
  return (
    <>
      <PCAndTablet>
        <PCAndTabletLayout>
          <HomeTitle size={1} />
          <RoationIcon />
        </PCAndTabletLayout>
      </PCAndTablet>
      <Mobile>
        <MobileLayout>
          <HeaderHome />
          <HomeTitle size={0.4} />
          <RoationIcon />
        </MobileLayout>
      </Mobile>
    </>
  );
}

export default Home;

const PCAndTabletLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* background-color: rgba(152, 82, 249, 0.5); */

  & svg {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 3rem;
  }
`;

const MobileLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & svg {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 2.5rem;
  }
`;
