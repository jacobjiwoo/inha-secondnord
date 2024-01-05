import styled from "styled-components";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <HomeLayout></HomeLayout>
    </>
  );
}

export default Home;

const HomeLayout = styled.div`
  height: 100vh;
`;
