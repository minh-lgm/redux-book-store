import React, { useEffect } from "react";
import { Container, Button, Box, Card, Stack, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReadingList, removeFromReadingList } from "../redux/actions/bookActions";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const { readingList: books, loading } = useSelector(state => state.book);
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    dispatch(removeFromReadingList(bookId));
  };

  useEffect(() => {
    dispatch(getReadingList());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>Book Store</Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap={"wrap"}>
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute", top: "5px", right: "5px",
                      backgroundColor: "secondary.light", color: "secondary.contrastText",
                      padding: "0", minWidth: "1.5rem"
                    }}
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>

              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container >
  );
};

export default ReadingPage;
