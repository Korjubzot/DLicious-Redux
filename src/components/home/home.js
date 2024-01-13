import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import "./home.css";

function Home() {
  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h2" align="center" gutterBottom className="h2">
        Welcome to DLicious
      </Typography>
      <Card className="card">
        <CardContent className="card-content">
          <Typography variant="h5" gutterBottom className="h5">
            Hello, handsome!
          </Typography>
          <Typography variant="body1" className="body1">
            We're glad to see you here. Add your recipes under the "Add Recipe"
            tab
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
