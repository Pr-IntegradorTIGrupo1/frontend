'use client';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Select, FormErrorMessage, HStack, InputGroup, InputRightElement, Switch, Stack, Center } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, FieldArray, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

interface Requirement {
  content: string[];
}

interface Project {
  id: string;
  name: string;
}

const validationSchema = Yup.object().shape({
  project: Yup.string().required('Debe seleccionar un proyecto.'),
  documentTitle: Yup.string().required('Debe ingresar el título del documento.'),
  requirements: Yup.array().of(
    Yup.object().shape({
      content: Yup.array().of(Yup.string().required('Debe ingresar el contenido del requisito.')),
    })
  ).min(1, 'Debe haber al menos un requisito.'),
});

const CreateTemplateForm: React.FC = () => {
  const initialValues = {
    project: '',
    documentTitle: '',
    requirements: [{ content: [''] }],
  };

  const [requirementCount, setRequirementCount] = useState<string>('10');
  const [customRequirementCount, setCustomRequirementCount] = useState<number | null>(null);
  const [sameStructure, setSameStructure] = useState<boolean>(true);

  const handleSubmit = () => {
    console.log("linea 39");
  };

  const addRequirements = (count: number, push: (obj: Requirement) => void) => {
    for (let i = 0; i < count; i++) {
      push({ content: [''] });
    }
  };

  useEffect(() => {
    if (sameStructure && initialValues.requirements.length > 1) {
      for (let i = 1; i < initialValues.requirements.length; i++) {
        initialValues.requirements[i] = { ...initialValues.requirements[0] };
      }
    }
  }, [sameStructure, initialValues.requirements]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Center>
          <Box width="800px"> {/* Adjust the width as needed */}
            <Form>
              <Box p={5} borderWidth={1} borderRadius={5} marginBottom={7}>
                <VStack spacing={4}>
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
                              <FieldArray name="requirements">
                                {({ push }) => (
                                  <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => {
                                      if (customRequirementCount) {
                                        addRequirements(customRequirementCount - values.requirements.length, push);
                                      }
                                    }}
                                  >
                                    Ok
                                  </Button>
                                )}
                              </FieldArray>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      )}
                      {requirementCount !== 'personalizado' && (
                        <FieldArray name="requirements">
                          {({ push }) => (
                            <Button
                              marginTop={4}
                              width="100%"
                              onClick={() => {
                                if (requirementCount !== 'personalizado') {
                                  addRequirements(parseInt(requirementCount, 10) - values.requirements.length, push);
                                }
                              }}
                              colorScheme="teal"
                            >
                              Añadir requisitos
                            </Button>
                          )}
                        </FieldArray>
                      )}
                    </Box>
                  </HStack>
                </VStack>
              </Box>
              <FieldArray name="requirements">
                {({ push, remove }) => (
                  <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
                    <VStack spacing={4} align="stretch">
                      <FormControl isInvalid={!!errors.documentTitle && !!touched.documentTitle}>
                        <FormLabel>Nombre de la plantilla</FormLabel>
                        <Field as={Input} name="documentTitle" />
                        <FormErrorMessage>{errors.documentTitle}</FormErrorMessage>
                      </FormControl>
                      <>
                        {values.requirements.map((requirement, reqIndex) => {
                          const requirementErrors = (errors.requirements as FormikErrors<Requirement>[] | undefined)?.[reqIndex];
                          const requirementTouched = (touched.requirements as FormikTouched<Requirement>[] | undefined)?.[reqIndex];
                          return (
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
                              {values.requirements.length > 1 && (
                                <IconButton
                                  icon={<CloseIcon />}
                                  size="sm"
                                  position="absolute"
                                  top={2}
                                  right={2}
                                  onClick={() => remove(reqIndex)}
                                  aria-label={`Remove requirement ${reqIndex + 1}`}
                                  borderRadius="full"
                                />
                              )}
                              <Box mt={4} p={4}>
                                <Stack spacing={4} align="center">
                                  <FieldArray name={`requirements.${reqIndex}.content`}>
                                    {({ push: pushContent, remove: removeContent }) => (
                                      <>
                                        {requirement.content.map((content, contentIndex) => (
                                          <FormControl
                                            key={contentIndex}
                                            isInvalid={!!(requirementErrors?.content as FormikErrors<string[]> | undefined)?.[contentIndex] && !!(requirementTouched?.content as FormikTouched<string[]> | undefined)?.[contentIndex]}
                                            position="relative"
                                            width="80%"
                                            mt={4}
                                          >
                                            <FormLabel>Contenido de Requisito {contentIndex + 1}</FormLabel>
                                            <Center>
                                              <Field
                                                as={Input}
                                                name={`requirements.${reqIndex}.content.${contentIndex}`}
                                                readOnly={sameStructure && reqIndex > 0}
                                                value={sameStructure && reqIndex > 0 ? values.requirements[0].content[contentIndex] : values.requirements[reqIndex].content[contentIndex]}
                                                onChange={(e: any) => {
                                                  setFieldValue(`requirements.${reqIndex}.content.${contentIndex}`, e.target.value);
                                                  if (sameStructure) {
                                                    for (let i = 1; i < values.requirements.length; i++) {
                                                      setFieldValue(`requirements.${i}.content.${contentIndex}`, e.target.value);
                                                    }
                                                  }
                                                }}
                                              />
                                              {requirement.content.length > 1 && (
                                                <IconButton
                                                  icon={<CloseIcon />}
                                                  size="sm"
                                                  position="absolute"
                                                  top={2}
                                                  transform="translateY(-50%)"
                                                  right={-8}
                                                  onClick={() => removeContent(contentIndex)}
                                                  aria-label={`Remove content ${contentIndex + 1}`}
                                                  borderRadius="full"
                                                  isDisabled={sameStructure && reqIndex > 0}
                                                />
                                              )}
                                            </Center>
                                            <FormErrorMessage>{(requirementErrors?.content as FormikErrors<string[]> | undefined)?.[contentIndex]}</FormErrorMessage>
                                          </FormControl>
                                        ))}
                                        <Button onClick={() => pushContent('')} colorScheme="teal" size="sm" isDisabled={sameStructure && reqIndex > 0}>
                                          Añadir más contenido
                                        </Button>
                                      </>
                                    )}
                                  </FieldArray>
                                </Stack>
                              </Box>
                            </Box>
                          );
                        })}
                        {values.requirements.length > 0 &&
                          values.requirements[values.requirements.length - 1].content[0] && (
                            <Button onClick={() => push({ content: [''] })} colorScheme="teal">
                              Añadir más requisitos
                            </Button>
                          )}
                      </>
                      <Button type="submit" colorScheme="blue">
                        Finalizar
                      </Button>
                    </VStack>
                  </Box>
                )}
              </FieldArray>
            </Form>
          </Box>
        </Center>
      )}
    </Formik>
  );
};

export default CreateTemplateForm;
