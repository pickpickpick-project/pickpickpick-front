import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import colors from "../../assets/colors";
import { postAdminSignIn } from "../../api/admin";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

const PageStyle = styled.div`
  padding: 135px 0px 40px 0px;
  color: ${colors.text};
`;

const theme = createTheme();
const AdminSignIn = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(postAdminSignIn, {
    onSuccess: data => {
      queryClient.invalidateQueries("adminSignIn");
      console.log(data, "관리자로그인");
      if (data.msg === "Success") {
        navigate("/admin/manage/user");
      } else {
        alert("관리자가 아닙니다.");
      }
    },
    onError: error => {
      console.log(error, "유저삭제에러");
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    mutate({
      id,
      password,
    });
  };

  return (
    <PageStyle>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              관리자 로그인
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="아이디"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={"info"}
              >
                로그인
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </PageStyle>
  );
};

export default AdminSignIn;
