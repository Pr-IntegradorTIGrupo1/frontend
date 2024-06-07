'use client';
import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Select, FormErrorMessage } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, FieldArray, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

interface Requirement {
  title: string;
  content: string;
}

interface Project {
  id: string;
  name: string;
}

const projects: Project[] = [
  { id: '1', name: 'Proyecto 1' },
  { id: '2', name: 'Proyecto 2' },
  { id: '3', name: 'Proyecto 3' },
  { id: '4', name: 'Proyecto 4' },
];

const validationSchema = Yup.object().shape({
  project: Yup.string().required('Debe seleccionar un proyecto.'),
  documentTitle: Yup.string().required('Debe ingresar el título del documento.'),
  requirements: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Debe ingresar el título del requisito.'),
      content: Yup.string().required('Debe ingresar el contenido del requisito.'),
    })
  ),
});

const CreateRequirementForm: React.FC = () => {
  const initialValues = {
    project: '',
    documentTitle: '',
    requirements: [{ title: '', content: '' }],
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.project && !!touched.project}>
                <FormLabel>Proyecto</FormLabel>
                <Field as={Select} name="project" placeholder="Selecciona un proyecto">
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.project}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.documentTitle && !!touched.documentTitle}>
                <FormLabel>Título del documento</FormLabel>
                <Field as={Input} name="documentTitle" />
                <FormErrorMessage>{errors.documentTitle}</FormErrorMessage>
              </FormControl>
              <FieldArray name="requirements">
                {({ push, remove }) => (
                  <>
                    {values.requirements.map((requirement, index) => {
                      const requirementErrors = (errors.requirements as FormikErrors<Requirement>[] | undefined)?.[index];
                      const requirementTouched = (touched.requirements as FormikTouched<Requirement>[] | undefined)?.[index];
                      return (
                        <Box key={index} position="relative" borderWidth={1} borderRadius={5} p={4} boxShadow="sm">
                          <Text
                            position="absolute"
                            top={2}
                            left={2}
                            fontWeight="bold"
                            backgroundColor="white"
                            px={2}
                            borderRadius="md"
                          >
                            {`${index + 1}.`}
                          </Text>
                          <IconButton
                            icon={<CloseIcon />}
                            size="sm"
                            position="absolute"
                            top={2}
                            right={2}
                            onClick={() => remove(index)}
                            aria-label={`Remove requirement ${index + 1}`}
                            borderRadius="full"
                          />
                          <VStack spacing={4} align="stretch" mt={4}>
                            <FormControl isInvalid={!!requirementErrors?.title && !!requirementTouched?.title}>
                              <FormLabel>Título de requisito</FormLabel>
                              <Field as={Input} name={`requirements.${index}.title`} />
                              <FormErrorMessage>{requirementErrors?.title}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!requirementErrors?.content && !!requirementTouched?.content}>
                              <FormLabel>Contenido de Requisito</FormLabel>
                              <Field as={Input} name={`requirements.${index}.content`} />
                              <FormErrorMessage>{requirementErrors?.content}</FormErrorMessage>
                            </FormControl>
                          </VStack>
                        </Box>
                      );
                    })}
                    {values.requirements.length > 0 &&
                      values.requirements[values.requirements.length - 1].title &&
                      values.requirements[values.requirements.length - 1].content && (
                        <Button onClick={() => push({ title: '', content: '' })} colorScheme="teal">
                          Añadir más requisitos
                        </Button>
                      )}
                  </>
                )}
              </FieldArray>
              <Button type="submit" colorScheme="blue">
                Finalizar
              </Button>
            </VStack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateRequirementForm;
