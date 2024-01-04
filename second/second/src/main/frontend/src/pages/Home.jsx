import styled from "styled-components";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <HomeLayout>홈화면</HomeLayout>
    </>
  );
}

export default Home;

const HomeLayout = styled.div`
  border: 3px solid blue;
  height: 100vh;
`;
