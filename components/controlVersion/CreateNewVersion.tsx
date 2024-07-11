'use client';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Stack, Center, InputGroup, InputLeftAddon, FormErrorMessage, InputRightAddon } from '@chakra-ui/react';
import { CloseIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { GET_DOCUMENT_BY_ID } from '../apollo/queries';
import { useMutation, useQuery } from '@apollo/client';
import { usePathname, useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import { UPDATE_DOCUMENT_MUTATION } from '../apollo/mutations';
import { Template } from '../../interfaces/FormValues';

interface RequirementContent {
  key: string;
  value: string;
  disabled: boolean;
  isNew: boolean;
}

interface Requirement {
  index: number;
  content: RequirementContent[];
  disabled: boolean;
  isNew: boolean;
}

type Document = {
  id: number;
  id_document: string;
  id_project: number;
  id_user: number;
  title: string;
  timestamp: string;
  read_only: boolean;
  is_active: boolean;
  requirements: {
    id: number;
    content: string;
  }[];
  version: DocumentVersion;
  template: Template;
};

type DocumentVersion = {
  version: number;
  last_version: boolean;
};

const CreateNewVersion: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [version, setVersion] = useState<string>('');
  const [versionTitle, setVersionTitle] = useState<string>('');
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [sameStructure, setSameStructure] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const documentId = parseInt(usePathname().split('/')[3]);

  const { data: RequirementDocument, loading: loadingDocument, error: documentError } = useQuery<{ getDocument: Document }>(GET_DOCUMENT_BY_ID, { variables: { id: documentId } });
  const [documento, setDocumento] = useState<Document | null>(null);
  const [updateDocument] = useMutation(UPDATE_DOCUMENT_MUTATION);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);

      setUserId(parseInt(parsedUserData.id));
    }
    if (RequirementDocument) {
      setDocumento(RequirementDocument.getDocument);
      const { version, title, requirements } = RequirementDocument.getDocument;
      setVersion(version.version.toString());
      setVersionTitle(title);
      setRequirements(requirements.map((req, index) => {
        const parsedContent = JSON.parse(req.content).content.map((item: string) => {
          const [key, value] = item.split(': ').map((str: string) => str.trim());
          return { key, value, disabled: false, isNew: false };
        });
        return {
          index: index + 1,
          content: parsedContent,
          disabled: false,
          isNew: false
        };
      }));
    }
  }, [RequirementDocument]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const filteredRequirements = requirements
      .filter(req => !req.disabled)
      .map(req => ({
        id: req.index,
        content: req.content.filter(content => !content.disabled).map(content => `${content.key}: ${content.value}`)
      }));
    
    // Aquí puedes enviar el formData al backend
    const confirmation = await Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Estás seguro de que deseas actualizar este documento de requisitos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    })

    if (confirmation.isConfirmed) {
      try{
        const { data, errors } = await updateDocument({
          variables: {
            input: {
              id_document: RequirementDocument?.getDocument.id,
              id_user: userId,
              title: versionTitle,
              content: JSON.stringify({ requirements: filteredRequirements }),
              id_template: RequirementDocument?.getDocument.template.id,
            }
          }
        });
        if(data?.updateDocument.success){
          Swal.fire(
            'Nueva versión creada',
            'Se ha creado una nueva versión del Documento de requisitos.',
            'success'
          );
          console.log(data);
          
          router.push(`/user/versionControl/`)
        }else{
          console.error("error al actualizar el Documento de requisitos", errors);
          Swal.fire(
            'Error',
            'Hubo un error al actualizar el Documento de requisitos.',
            'error'
          );
        } 
      }catch(error){
        console.error("error al actualizar el Documento de requisitos", error)
        Swal.fire(
          'Error',
          'Hubo un error al actualizar el Documento de requisitos.',
          'error'
        );
      }
    }
  };

  const addRequirements = (count: number) => {
    if (count < 0) {
      setErrorMessage('El número de requisitos no puede ser menor que el número actual de requisitos.');
      return;
    }
    setErrorMessage(null);
    setRequirements(prev => [
      ...prev,
      ...Array(count)
        .fill(null)
        .map((_, i) => ({
          index: prev.length + i + 1,
          content: [{ key: 'type', value: '', disabled: false, isNew: true }, { key: 'title', value: '', disabled: false, isNew: true }, { key: 'description', value: '', disabled: false, isNew: true }],
          disabled: false,
          isNew: true
        }))
    ]);
  };

  const handleRequirementContentChange = (reqIndex: number, contentIndex: number, field: 'key' | 'value', value: string) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content[contentIndex][field] = value;
    if (sameStructure) {
      for (let i = 1; i < updatedRequirements.length; i++) {
        updatedRequirements[i].content[contentIndex][field] = value;
      }
    }
    setRequirements(updatedRequirements);
  };

  const addRequirementContent = (reqIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content.push({ key: '', value: '', disabled: false, isNew: true });
    setRequirements(updatedRequirements);
  };

  const disableRequirementContent = (reqIndex: number, contentIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content[contentIndex].disabled = true;
    setRequirements(updatedRequirements);
  };

  const removeRequirementContent = (reqIndex: number, contentIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content.splice(contentIndex, 1);
    setRequirements(updatedRequirements);
  };

  const disableRequirement = (reqIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].disabled = true;
    updatedRequirements[reqIndex].content.forEach(content => {
      content.disabled = true;
    });
    setRequirements(updatedRequirements);
  };

  const removeRequirement = (reqIndex: number) => {
    const updatedRequirements = requirements.filter((_, index) => index !== reqIndex);
    setRequirements(updatedRequirements);
  };

  useEffect(() => {
    if (sameStructure && requirements.length > 1) {
      setRequirements(prev => {
        const newRequirements = prev.map((req, index) => {
          if (index > 0) {
            return {
              ...req,
              content: requirements[0].content.map(({ key, value, disabled }) => ({ key, value, disabled: req.content.find(c => c.key === key)?.disabled || false, isNew: req.content.find(c => c.key === key)?.isNew || false })),
              disabled: req.disabled
            };
          }
          return req;
        });
        return newRequirements;
      });
    }
  }, [sameStructure]);

  const incrementVersion = (version: string) => {
    const parts = version.split('.').map(Number);
    parts[parts.length - 1] += 1;
    return parts.join('.');
  };

  if (loadingDocument) return <p>Cargando...</p>;
  if (documentError) return <p>Error al cargar los templates: {documentError.message}</p>;


  return (
    <Center>
      <Box width="800px"> {/* Adjust the width as needed */}
        <form onSubmit={handleSubmit}>
          <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Título de Documento</FormLabel>
                <Input
                  value={versionTitle}
                  onChange={(e) => setVersionTitle(e.target.value)}
                  minLength={5}
                  maxLength={60}
                />
                <InputGroup size={'sm'} width={'40%'} marginTop={3}>
                  <InputLeftAddon>Versión</InputLeftAddon>
                  <Input
                    type='text'
                    value={version}
                    readOnly
                  />
                  <InputRightAddon>
                    <ArrowForwardIcon />
                  </InputRightAddon>
                  <Input
                    type='text'
                    value={incrementVersion(version)}
                    readOnly
                  />
                </InputGroup>
              </FormControl>
              <>
                {requirements.map((requirement, reqIndex) => (
                  <Box key={reqIndex} position="relative" borderWidth={1} borderRadius={5} p={4} boxShadow="sm" bg={requirement.disabled ? 'red.100' : 'white'}>
                    <Text
                      position="absolute"
                      top={2}
                      left={2}
                      fontWeight="bold"
                      backgroundColor="white"
                      px={2}
                      borderRadius="md"
                    >
                      {`${reqIndex + 1}.`}
                    </Text>
                    {requirement.isNew ? (
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        onClick={() => removeRequirement(reqIndex)}
                        aria-label={`Remove requirement ${reqIndex + 1}`}
                        borderRadius="full"
                        colorScheme="red"
                      />
                    ) : (
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        onClick={() => disableRequirement(reqIndex)}
                        aria-label={`Disable requirement ${reqIndex + 1}`}
                        borderRadius="full"
                        colorScheme="red"
                      />
                    )}
                    <Box mt={4} p={4}>
                      <Stack spacing={4} align="stretch">
                        {requirement.content.map((content, contentIndex) => (
                          <Box key={contentIndex} position="relative" mt={4}>
                            <FormControl>
                              <FormLabel color={content.disabled ? 'red' : content.isNew ? 'green' : 'black'} fontSize="sm">
                                <Input
                                  value={content.key}
                                  onChange={(e) => handleRequirementContentChange(reqIndex, contentIndex, 'key', e.target.value)}
                                  readOnly={content.disabled}
                                  minLength={2}
                                  maxLength={50}
                                  placeholder="Etiqueta"
                                  size="sm"
                                  color={content.disabled ? 'red' : content.isNew ? 'green' : 'black'}
                                  width="50%"
                                />
                              </FormLabel>
                              <Input
                                value={sameStructure && reqIndex > 0 ? requirements[0].content[contentIndex].value : content.value}
                                onChange={(e) => handleRequirementContentChange(reqIndex, contentIndex, 'value', e.target.value)}
                                readOnly={sameStructure && reqIndex > 0 || content.disabled}
                                minLength={2}
                                maxLength={50}
                                placeholder="Valor"
                                color={content.disabled ? 'red' : content.isNew ? 'green' : 'black'}
                                mt={1}
                              />
                              {content.isNew ? (
                                <IconButton
                                  icon={<CloseIcon />}
                                  size="sm"
                                  onClick={() => removeRequirementContent(reqIndex, contentIndex)}
                                  aria-label={`Remove content ${contentIndex + 1}`}
                                  borderRadius="full"
                                  colorScheme="gray"
                                  position="absolute"
                                  top={0}
                                  right={0}
                                />
                              ) : (
                                <IconButton
                                  icon={<CloseIcon />}
                                  size="sm"
                                  onClick={() => disableRequirementContent(reqIndex, contentIndex)}
                                  aria-label={`Disable content ${contentIndex + 1}`}
                                  borderRadius="full"
                                  isDisabled={sameStructure && reqIndex > 0 || content.disabled}
                                  colorScheme={content.disabled ? 'red' : 'gray'}
                                  position="absolute"
                                  top={0}
                                  right={0}
                                />
                              )}
                            </FormControl>
                          </Box>
                        ))}
                        <Button onClick={() => addRequirementContent(reqIndex)} colorScheme="teal" size="sm" isDisabled={sameStructure && reqIndex > 0 || requirement.disabled}>
                          Añadir más contenido
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                ))}
                <Button onClick={() => addRequirements(1)} colorScheme="teal">
                  Añadir Nuevo Requisito
                </Button>
              </>
              <Button type="submit" colorScheme="blue">
                Finalizar
              </Button>
            </VStack>
          </Box>
        </form>
      </Box>
    </Center>
  );
};
export default CreateNewVersion;
