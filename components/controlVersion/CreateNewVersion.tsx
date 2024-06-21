'use client';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Stack, Center } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { CREATE_TEMPLATE_MUTATION } from '../apollo/mutations';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { documentoRequisito } from '@/app/user/versionControl/fakeData/documentoRequisito';

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

const CreateNewVersion: React.FC = () => {
  const [createTemplate] = useMutation(CREATE_TEMPLATE_MUTATION);
  const [version, setVersion] = useState<string>(documentoRequisito.version);
  const [templateTitle, setTemplateTitle] = useState<string>(documentoRequisito.title);
  const [requirements, setRequirements] = useState<Requirement[]>(documentoRequisito.requirements.map((req, index) => ({
    index: index + 1,
    content: req.content.map(item => {
      const [key, value] = item.split(': ').map(str => str.trim());
      return { key, value, disabled: false, isNew: false };
    }),
    disabled: false,
    isNew: false
  })));
  const [sameStructure, setSameStructure] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = {
      format: sameStructure ? requirements.map(req => ({
        ...req,
        content: requirements[0].content.map(({ key, value, disabled }) => ({ key, value, disabled })),
      })) : requirements
    };
    // Aquí manejarías el formData, como enviarlo a tu backend
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

  return (
    <Center>
      <Box width="800px"> {/* Adjust the width as needed */}
        <form onSubmit={handleSubmit}>
          <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Título de Documento</FormLabel>
                <Input
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                  minLength={5}
                  maxLength={60}
                />
                <Text>Versión: {version}</Text>
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
