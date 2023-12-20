import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to DLicious
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Hello, handsome!
          </Typography>
          <Typography variant="body1">
            We're glad to see you here. Add your recipes under the "Add Recipe"
            tab
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
