import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to Our App
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Hello, User!
          </Typography>
          <Typography variant="body1">
            We're glad to see you here. Explore our recipes and feel free to add
            your own!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
