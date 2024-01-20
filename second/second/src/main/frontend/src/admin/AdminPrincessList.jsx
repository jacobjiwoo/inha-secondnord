import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";

const columns = [
  { field: "member_id", headerName: "회원 번호", width: 150 },
  { field: "id", headerName: "아이디", width: 150 },
  { field: "email", headerName: "이메일", width: 150 },
  {
    field: "question_num",
    headerName: "질문권 개수",
    width: 150,
  },
  {
    field: "question_num_modified",
    headerName: "질문권 개수 수정",
    width: 200,
    renderCell: (params) => {
      const [count, setCount] = useState(0);
      return (
        <>
          <NumberInput
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button
            type="button"
            onClick={async () => {
              const response = await axios.patch("/api/admin/users/princess", {
                allMember: [
                  {
                    member_id: params.row.member_id,
                    question_num: count,
                  },
                ],
              });
              console.log("response", response);
            }}
          >
            수정
          </button>
        </>
      );
    },
  },
];

function AdminPrincessList() {
  const { data: princessList } = useQuery({
    queryKey: ["princessList", columns],
    queryFn: async () => {
      const response = await axios.get("/api/admin/users/princess");
      return response.data.allMember;
    },
  });
  return (
    <div style={{ width: "80%", height: "40%", marginTop: "5rem" }}>
      <DataGrid
        rows={princessList}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default AdminPrincessList;

const NumberInput = styled.input`
  width: 50px;
  text-align: center;
`;
