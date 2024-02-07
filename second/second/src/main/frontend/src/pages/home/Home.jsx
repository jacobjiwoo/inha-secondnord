import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Mobile, PC, PCAndTablet } from "../../config/configResponsive";
import HeaderHome from "../../components/header/HeaderHome";
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Float, OrbitControls, Text3D } from "@react-three/drei";
import { MeshNormalMaterial } from "three";
import { RoationIcon } from "../../assets/svg";
import { Suspense } from "react";

const HomeTitle = ({ size }) => {
  return (
    <>
      <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
        <Float speed={3} floatIntensity={1}>
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
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </>
  );
};

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <PCAndTablet>
        <PCAndTabletLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <HomeTitle size={1} />
            <RoationIcon />
          </Suspense>
        </PCAndTabletLayout>
      </PCAndTablet>
      <Mobile>
        <MobileLayout>
          <header>
            <div className="header-logo" onClick={() => navigate("/")}>
              {"SecondNORD"}
            </div>
          </header>
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <HomeTitle size={0.4} />
              <RoationIcon />
            </Suspense>
          </section>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;

    & .header-logo {
      margin-left: 1rem;
      font-size: 1.25rem;
      font-weight: 800;
      color: #9852f9;
      cursor: pointer;
    }
  }

  & section {
    position: relative;

    & svg {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 2rem;
    }
  }
`;
