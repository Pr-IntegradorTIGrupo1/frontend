// pages/foro/[id].js
'use client';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, FormControl, FormLabel, Input, Button, Textarea } from "@chakra-ui/react";
import Swal from "sweetalert2";

const ForoDetailPage = () => {

  // Datos estáticos para el foro y los comentarios
  const foroData = {
    id: 1,
    title: "Título del Foro",
    content: "Contenido del foro.",
    comments: [
      {
        id: 1,
        content: "Este es un comentario.",
        createdAt: "2024-07-09T12:34:56Z",
        user: {
          id: 1,
          username: "usuario1"
        }
      },
      {
        id: 2,
        content: "Este es otro comentario.",
        createdAt: "2024-07-10T14:34:56Z",
        user: {
          id: 2,
          username: "usuario2"
        }
      }
    ]
  };

  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simula la adición de un comentario
    Swal.fire('Comentario añadido', 'Tu comentario ha sido añadido exitosamente.', 'success');
    setComment("");
  };

  return (
    <Box p="5">
      <Heading mb="5">{foroData.title}</Heading>
      <Text mb="5">{foroData.content}</Text>
      
      <Heading size="md" mb="4">Comentarios</Heading>
      <VStack spacing="4" align="stretch" mb="8">
        {foroData.comments.map((comment) => (
          <Box
            key={comment.id}
            p="4"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Text>{comment.content}</Text>
          </Box>
        ))}
      </VStack>

      <form onSubmit={handleCommentSubmit}>
        <FormControl isRequired>
          <FormLabel>Agregar un comentario</FormLabel>
          <Textarea 
            placeholder="Escribe tu comentario aquí" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Comentar
        </Button>
      </form>
    </Box>
  );
};

export default ForoDetailPage;
