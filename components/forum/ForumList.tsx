// pages/foros.js
"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Tooltip,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  GET_ALL_DOCUMENT_LAST_VERSION,
  GET_ALL_VERSIONS_BY_DOCUMENT,
  GET_FORUM_BY_DOCUMENT,
} from "../apollo/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_FORUM_MUTATION } from "../apollo/mutations";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// Definimos la interfaz para un foro
interface Foro {
  id: number;
  title: string;
  content: string;
}

const ForosPage = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [idDocument, setIdDocument] = useState<string | null>(null);
  const [idDocumentInt, setIdDocumentInt] = useState<number>(0);
  const [allDocuments, setAllDocuments] = useState<any[]>([]);

  const [selectedDocument, setSelectedDocument] = useState<string>("");
  const [foroTitle, setForoTitle] = useState<string>("");
  const [foroDescription, setForoDescription] = useState<string>("");

  const {
    data: DocumentsData,
    loading: loadingDocuments,
    error: documentError,
  } = useQuery(GET_ALL_DOCUMENT_LAST_VERSION);

  const [
    getForosByDocument,
    { data: ForosData, loading: loadingForos, error: forumError },
  ] = useLazyQuery(GET_FORUM_BY_DOCUMENT);

  const [createForum] = useMutation(CREATE_FORUM_MUTATION);
  const router = useRouter(); // Para redireccionar a otras páginas

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);

      setUserId(parseInt(parsedUserData.id));
    }
    if (DocumentsData) {
      console.log(DocumentsData);
      setAllDocuments(DocumentsData.getAllDocumentsLastVersion);
    }
  }, [DocumentsData]);

  useEffect(() => {
    if (ForosData) {
      console.log(ForosData);
      setForos(ForosData.getForumsByDocument);
    }
  }, [ForosData]);

  const [foros, setForos] = useState<Foro[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateForum = () => {
    onOpen();
  };

  const handleDocumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // const documentString = event.target.value;
    // const documentObject = JSON.parse(documentString);
    // const selectedId = documentObject.id_document;
    // console.log(selectedId);

    const selectedId = event.target.value;
    const idNumerico = allDocuments.find(
      (document) => document.id_document === selectedId
    )?.id;
    setIdDocumentInt(idNumerico);

    // setIdDocumentInt(documentObject.id);
    console.log(selectedId);

    setSelectedDocument(selectedId);
    getForosByDocument({ variables: { id: selectedId } });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    const input = {
      title: foroTitle,
      content: foroDescription,
      id_document: idDocumentInt,
      id_user: userId,
      status: "activo",
    };
    console.log(input);

    const confirmation = await Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Estás seguro de que deseas crear este foro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      backdrop: true,
    });

    if (confirmation.isConfirmed) {
      try {
        const { data, errors } = await createForum({
          variables: {
            input: {
              title: foroTitle,
              content: foroDescription,
              id_document: idDocumentInt,
              id_user: userId,
              status: "activo",
            },
          },
        });
        if (data?.createForum) {
          Swal.fire(
            "Foro creado",
            "El foro ha sido creado exitosamente.",
            "success"
          );
        } else {
          console.error("error al crear el foro", errors);
          Swal.fire("Error", "Hubo un error al crear el foro.", "error");
        }
      } catch (error) {
        console.error("error al crear el foro", error);
        Swal.fire("Error", "Hubo un error al crear el foro.", "error");
      }
    }
    console.log("Formulario enviado");
  };

  const handleBoxClick = (foroId: number) => {
    // Aquí puedes redireccionar a una página específica del foro o realizar cualquier otra acción
    router.push(`/user/forum/${foroId}`); // Redirecciona a la página del foro
  };

  if (loadingDocuments) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="5" width={800}>
      <Box display="flex" alignItems="center" mb={4}>
        <Select
          placeholder="Selecciona el documento"
          onChange={handleDocumentChange}
          value={selectedDocument}
          mr={2}
        >
          {DocumentsData?.getAllDocumentsLastVersion?.map((document: any) => (
            <option key={document.id_document} value={document.id_document}>
              {document.title}
            </option>
          ))}
        </Select>
        <Tooltip label="Crear nuevo foro" placement="top" fontSize={"md"}>
          <Button colorScheme="green" size="sm" onClick={handleCreateForum}>
            <Icon as={AddIcon} />
          </Button>
        </Tooltip>
      </Box>
      {loadingForos ? (
        <Box textAlign="center" mt="20">
          <Spinner size="xl" />
        </Box>
      ) : (
        <VStack spacing="4" align="stretch">
          {foros.map((foro) => (
            <Box
              key={foro.id}
              p="5"
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              cursor="pointer" // Cambio de cursor para indicar que es clickeable
              onClick={() => handleBoxClick(foro.id)}
            >
              <Heading fontSize="xl">{foro.title}</Heading>
              <Text mt="4">{foro.content}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Nuevo Foro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="create-forum-form" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input
                  placeholder="Título del foro"
                  value={foroTitle}
                  onChange={(e) => setForoTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input
                  placeholder="Descripción del foro"
                  value={foroDescription}
                  onChange={(e) => setForoDescription(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Nombre del Documento</FormLabel>
                <Select
                  placeholder="Selecciona el documento"
                  onChange={handleDocumentChange}
                  value={selectedDocument}
                >
                  {DocumentsData?.getAllDocumentsLastVersion?.map(
                    (document: any) => (
                      <option
                        key={document.id_document}
                        value={document.id_document}
                      >
                        {document.title}
                      </option>
                    )
                  )}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              form="create-forum-form"
            >
              Crear
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ForosPage;
