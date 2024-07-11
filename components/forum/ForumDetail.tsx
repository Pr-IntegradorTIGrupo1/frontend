// pages/foro/[id].js
'use client';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, FormControl, FormLabel, Textarea, Button, Spinner, Center } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { GET_COMMENTS_BY_FORUM, GET_FORUM_BY_ID } from '../apollo/queries';
import { useMutation, useQuery } from '@apollo/client';
import { usePathname } from 'next/navigation';
import { CREATE_COMMENT_MUTATION } from '../apollo/mutations';

type Comment = {
  id: number;
  content: string;
};

const ForoDetailPage = () => {
  const idForo = parseInt(usePathname().split('/')[3]);
  console.log(idForo);

  const { data: ForumData, loading: loadingForums, error: forumsError } = 
    useQuery(GET_FORUM_BY_ID, { variables: { id: idForo } });
  
  const { data: CommentData, loading: loadingComments, error: commentsError, refetch: refetchComments } =
    useQuery(GET_COMMENTS_BY_FORUM, { variables: { id: idForo } });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  useEffect(() => {
    if (ForumData) {
      console.log(ForumData);
    }
  }, [ForumData]);

  useEffect(() => {
    if (CommentData) {
      console.log(CommentData);
    }
  }, [CommentData]);

  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(comment);

    const confirmation = await Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Estás seguro de que deseas crear este comentario?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: true
    });

    if (confirmation.isConfirmed) {
      try {
        const { data, errors } = await createComment({
          variables: {
            input: {
              content: comment,
              id_user: 1,
              id_forum: idForo
            }
          }
        });
        if (data?.createComment) {
          await refetchComments();
          Swal.fire(
            'Comentario creado', 
            'El comentario ha sido creado exitosamente.',
            'success'
          );
        } else {
          console.error("error al crear el comentario", errors);
          Swal.fire(
            'Error',
            'Hubo un error al crear el comentario.',
            'error'
          );
        }
      } catch (error) {
        console.error("error al crear el comentario", error);
        Swal.fire(
          'Error',
          'Hubo un error al crear el comentario.',
          'error'
        );
      }
    }
    console.log("Formulario enviado");
    setComment("");
  };

  if (loadingForums || loadingComments) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="5" width={800}>
      <Center>
        <VStack spacing="4" align="stretch" mb="8">
          <Heading mb="5">{ForumData?.getForum.title}</Heading>
          <Text mb="5">{ForumData?.getForum.content}</Text>
        </VStack>
      </Center>
      
      <Heading size="md" mb="4">Comentarios</Heading>
      <VStack spacing="4" align="stretch" mb="8">
        {CommentData?.getCommentsByForum.map((comment: Comment) => (
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
