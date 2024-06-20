'use client';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Select, HStack, InputGroup, InputRightElement, Switch, Stack, Center, Alert, AlertIcon } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { CREATE_TEMPLATE_MUTATION } from '../apollo/mutations';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

interface Requirement {
  index: number;
  content: string[];
}

const CreateTemplateForm: React.FC = () => {
  const [createTemplate] = useMutation(CREATE_TEMPLATE_MUTATION);
  const [templateTitle, setTemplateTitle] = useState<string>('');
  const [requirements, setRequirements] = useState<Requirement[]>([{ index: 1, content: [''] }]);
  const [requirementCount, setRequirementCount] = useState<string>('10');
  const [customRequirementCount, setCustomRequirementCount] = useState<number | null>(null);
  const [sameStructure, setSameStructure] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = {
      
      format: sameStructure ? requirements.map(req => ({ ...req, content: requirements[0].content })) : requirements
    };
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro de que quieres crear este template?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });
    
    if(result.isConfirmed){
      try{
        //llamada a la mutacion
        const {data, errors } = await createTemplate({
          variables: {
            input: {
              title: templateTitle,
              format: JSON.stringify(formData)
            }
          }
        });
        console.log(templateTitle)
        console.log(JSON.stringify(formData))
        if(data?.createTemplate.success){
          Swal.fire(
            'Template creado',
            'El template ha sido creado exitosamente.',
            'success'
          ); 
        }else{
          console.error("error al crear el template", errors);
          Swal.fire(
            'Error',
            'Hubo un error al crear el template.',
            'error'
          );

        }
        //console.log(data);

      }catch(error){
        console.error("error al crear el template", error)
        Swal.fire(
          'Error',
          'Hubo un error al crear el template.',
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
        .map((_, i) => ({ index: prev.length + i + 1, content: [''] }))
    ]);
  };

  const handleRequirementContentChange = (reqIndex: number, contentIndex: number, value: string) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content[contentIndex] = value;
    if (sameStructure) {
      for (let i = 1; i < updatedRequirements.length; i++) {
        updatedRequirements[i].content[contentIndex] = value;
      }
    }
    setRequirements(updatedRequirements);
  };

  const addRequirementContent = (reqIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content.push('');
    setRequirements(updatedRequirements);
  };

  const removeRequirementContent = (reqIndex: number, contentIndex: number) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[reqIndex].content.splice(contentIndex, 1);
    setRequirements(updatedRequirements);
  };

  useEffect(() => {
    if (sameStructure && requirements.length > 1) {
      setRequirements(prev => {
        const newRequirements = prev.map((req, index) => {
          if (index > 0) {
            return { ...req, content: [...prev[0].content] };
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
          <Box p={5} borderWidth={1} borderRadius={5} marginBottom={7}>
            <VStack spacing={4}>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <HStack spacing={4} width="100%">
                <Box flex="1">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="same-structure-switch" mb="0">
                      Requisitos iguales
                    </FormLabel>
                    <Switch
                      id="same-structure-switch"
                      isChecked={sameStructure}
                      onChange={(e) => setSameStructure(e.target.checked)}
                    />
                  </FormControl>
                </Box>
                <Box flex="1">
                  <FormControl>
                    <FormLabel>Cantidad de requisitos</FormLabel>
                    <Select
                      value={requirementCount}
                      onChange={(e) => {
                        const value = e.target.value;
                        setRequirementCount(value);
                        if (value !== 'personalizado') {
                          setCustomRequirementCount(null);
                          addRequirements(parseInt(value, 10) - requirements.length);
                        }
                      }}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="personalizado">Personalizado</option>
                    </Select>
                  </FormControl>
                  {requirementCount === 'personalizado' && (
                    <FormControl marginTop={4}>
                      <FormLabel>Cantidad personalizada</FormLabel>
                      <InputGroup>
                        <Input
                          type="number"
                          value={customRequirementCount || ''}
                          onChange={(e) => setCustomRequirementCount(parseInt(e.target.value, 10))}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => {
                              if (customRequirementCount !== null) {
                                addRequirements(customRequirementCount - requirements.length);
                              }
                            }}
                          >
                            Ok
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                  {requirementCount !== 'personalizado' && (
                    <Button
                      marginTop={4}
                      width="100%"
                      onClick={() => {
                        if (requirementCount !== 'personalizado') {
                          addRequirements(parseInt(requirementCount, 10) - requirements.length);
                        }
                      }}
                      colorScheme="teal"
                    >
                      Añadir requisitos
                    </Button>
                  )}
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Nombre de la plantilla</FormLabel>
                <Input
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                  minLength={5}
                  maxLength={60}

                />
              </FormControl>
              <>
                {requirements.map((requirement, reqIndex) => (
                  <Box key={reqIndex} position="relative" borderWidth={1} borderRadius={5} p={4} boxShadow="sm">
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
                    {requirements.length > 1 && (
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        onClick={() => setRequirements(requirements.filter((_, index) => index !== reqIndex))}
                        aria-label={`Remove requirement ${reqIndex + 1}`}
                        borderRadius="full"
                      />
                    )}
                    <Box mt={4} p={4}>
                      <Stack spacing={4} align="center">
                        {requirement.content.map((content, contentIndex) => (
                          <FormControl key={contentIndex} position="relative" width="80%" mt={4}>
                            <FormLabel>Contenido de Requisito {contentIndex + 1}</FormLabel>
                            <Center>
                              <Input
                                value={sameStructure && reqIndex > 0 ? requirements[0].content[contentIndex] : content}
                                onChange={(e) => handleRequirementContentChange(reqIndex, contentIndex, e.target.value)}
                                readOnly={sameStructure && reqIndex > 0}
                                minLength={2}
                                maxLength={50}
                              />
                              {requirement.content.length > 1 && (
                                <IconButton
                                  icon={<CloseIcon />}
                                  size="sm"
                                  position="absolute"
                                  top={2}
                                  transform="translateY(-50%)"
                                  right={-8}
                                  onClick={() => removeRequirementContent(reqIndex, contentIndex)}
                                  aria-label={`Remove content ${contentIndex + 1}`}
                                  borderRadius="full"
                                  isDisabled={sameStructure && reqIndex > 0}
                                />
                              )}
                            </Center>
                          </FormControl>
                        ))}
                        <Button onClick={() => addRequirementContent(reqIndex)} colorScheme="teal" size="sm" isDisabled={sameStructure && reqIndex > 0}>
                          Añadir más contenido
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                ))}
                {requirements.length > 0 &&
                  requirements[requirements.length - 1].content[0] && (
                    <Button onClick={() => setRequirements([...requirements, { index: requirements.length + 1, content: [''] }])} colorScheme="teal">
                      Añadir más requisitos
                    </Button>
                  )}
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
export default CreateTemplateForm;
