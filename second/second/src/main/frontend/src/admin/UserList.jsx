import { DataGrid } from "@mui/x-data-grid";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import AdminPrincessList from "./AdminPrincessList";

const columns = [
  { field: "memberId", headerName: "회원 번호", width: 150 },
  { field: "fingerGuardId", headerName: "핑거가드 아이디", width: 180 },
  { field: "fingerPrincessId", headerName: "핑거프린세스 아이디", width: 200 },
  { field: "id", headerName: "아이디", width: 150 },
  { field: "password", headerName: "비밀번호", width: 150 },
  { field: "email", headerName: "이메일", width: 150 },
  { field: "gender", headerName: "성별", width: 150 },
  { field: "birth", headerName: "생년월일", width: 150 },
  { field: "memberRole", headerName: "권한", width: 150 },
];

const guardColumns = [
  { field: "member_id", headerName: "회원 번호", width: 150 },
  { field: "authorizationGuard", headerName: "가드 권한", width: 150 },
  { field: "email", headerName: "이메일", width: 150 },
  { field: "gender", headerName: "성별", width: 150 },
  { field: "birth", headerName: "생년월일", width: 150 },
];

const handleAuthorizedGuardSubmit = async (authorizedGuards) => {
  const requestData = { allMember: [] };
  authorizedGuards.forEach((guard) => {
    requestData.allMember.push({ member_id: guard });
  });

  const response = await axios.patch("/api/admin/users/guard", requestData);
};

function UserList() {
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/users");
      return response.data.allMember;
    },
  });
  const { data: guardList } = useQuery({
    queryKey: ["guardList"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/users/guard");
      return response.data.allMember;
    },
  });

  const [authorizedGuards, setAuthorizedGuards] = useState([]);

  return (
    <TmpLayout>
      <div style={{ width: "80%", height: "40%" }}>
        <DataGrid
          rows={userList}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <div style={{ width: "80%", height: "40%" }}>
        <DataGrid
          rows={guardList}
          columns={guardColumns}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.member_id}
          onRowSelectionModelChange={(rows) => setAuthorizedGuards(rows)}
          hideFooter={true}
        />
        <button
          type="button"
          onClick={() => handleAuthorizedGuardSubmit(authorizedGuards)}
        >
          승인
        </button>
      </div>
      <AdminPrincessList />
    </TmpLayout>
  );
}

export default UserList;

const TmpLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 150vh;
`;
