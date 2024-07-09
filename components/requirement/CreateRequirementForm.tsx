'use client';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text, Select, FormErrorMessage } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, FieldArray, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_TEMPLATES, GET_USER_BY_ID } from '../apollo/queries';
import { CREATE_DOCUMENT_MUTATION } from '../apollo/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Requirement, Fields, FormValues, Project, Template } from '@/interfaces/FormValues';

const validationSchema = Yup.object().shape({
  project: Yup.string().required('Debe seleccionar un proyecto.'),
  documentTitle: Yup.string().required('Debe ingresar el título del documento.'),
  requirements: Yup.array().of(
    Yup.object().shape({
      fields: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required('Este campo es requerido.'),
          value: Yup.string().required('Este campo es requerido.'),
        })
      ).required('Debe tener al menos un campo.'),
    })
  ).required('Debe tener al menos un requisito.'),
});

const CreateRequirementForm: React.FC = () => {
  const [createDocument] = useMutation(CREATE_DOCUMENT_MUTATION);
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(0);
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  // Call API to fetch templates
  const { data: dataTemplates, loading: loadingTemplates, error: templatesError, refetch: refetchTemplates } = useQuery(GET_ALL_TEMPLATES);
  const { refetch: refetchUserProjects } = useQuery(GET_USER_BY_ID, {
    variables: { id: 1 },
    skip: true, // Skip automatic execution, we'll refetch manually
  });

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userIdString = userData ? userData.id : null;
    const userIdInt = userIdString ? parseInt(userIdString) : null;

    if (userIdInt) {
      refetchUserProjects({ id: userIdInt }).then(response => {
        if (response.data && response.data.getUser && response.data.getUser.projects) {
          setUserProjects(response.data.getUser.projects);
        }
      });
    }
  }, [refetchUserProjects]);

  useEffect(() => {
    if (dataTemplates) {
      setTemplates(dataTemplates.getAllTemplate);
    }
  }, [dataTemplates]);

  useEffect(() => {
    refetchTemplates();
  }, [refetchTemplates]);

  const initialValues: FormValues = {
    project: '',
    template: '',
    documentTitle: '',
    requirements: [{ fields: [{ label: '', value: '' }] }],
  };

  const handleTemplateSelect = (e: React.ChangeEvent<HTMLSelectElement>, setFieldValue: any) => {
    const selectedTemplateId = parseInt(e.target.value, 10); // Convert the selected value to number
    const selectedTemplate = templates.find(template => template.id === selectedTemplateId);
    if (selectedTemplate) {
      try {
        // Parse the template format
        const parsedFormat = JSON.parse(selectedTemplate.format).format;
        const newRequirements = parsedFormat.map((req: { index: number; content: string[] }) => ({
          fields: req.content.map(content => ({ label: content, value: '' }))
        }));
        setFieldValue('template', selectedTemplate.title);
        setFieldValue('requirements', newRequirements);
        setSelectedTemplateName(selectedTemplate.title);
        setSelectedTemplateId(selectedTemplateId);
      } catch (error) {
        console.error("Error parsing template format:", error);
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const requirements = values.requirements.map((req, index) => ({
      id: index + 1,
      content: req.fields.map(field => `${field.label}: ${field.value}`)
    }));

    const formattedData = {
      requirements: requirements
    };

    const title = documentTitle;//1) title: String!
    const content = JSON.stringify(formattedData);//2) content: String!
    const userDataString = localStorage.getItem('userData');//obtiene los datos del usuario del localStorage
    const userData = userDataString ? JSON.parse(userDataString) : null;//parsea los datos del usuario
    const userIdString = userData ? userData.id : null;//obtiene el id del usuario
    const userIdInt = userIdString ? parseInt(userIdString) : null;
    const id_user = userIdInt;//3) id_user: Int!
    const projectId = selectedProjectId;//4) id_project: Int!
    const templateId = selectedTemplateId;//5) id_template: Int!

    const result = await Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Estás seguro de que deseas crear este documento de requisitos?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const { data, errors } = await createDocument({
          variables: {
            input: {
              title: title,
              content: content,
              id_user: id_user,
              id_project: projectId,
              id_template: templateId
            }
          }
        });
        if (data?.createDocument.success) {
          Swal.fire(
            'Documento de requisitos creado',
            'El Documento de requisitos se ha creado con éxito.',
            'success'
          );
        } else {
          console.error("error al crear el Documento de requisitos", errors);
          Swal.fire(
            'Error',
            'Hubo un error al crear el Documento de requisitos.',
            'error'
          );
        }
      } catch (error) {
        console.error("error al crear el Documento de requisitos", error);
        Swal.fire(
          'Error',
          'Hubo un error al crear el Documento de requisitos.',
          'error'
        );
      }
    }
  };

  if (loadingTemplates) return <p>Cargando...</p>;
  if (templatesError) return <p>Error al cargar los templates: {templatesError.message}</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.project && !!touched.project}>
                <FormLabel>Proyecto</FormLabel>
                <Field
                  as={Select}
                  name="project"
                  placeholder="Selecciona un proyecto"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('project', e.target.value);
                    const projectId = parseInt((e.target.value));
                    
                    
                    const project = userProjects.find(p => p.id === projectId);
                    
                    if (project) {
                      setSelectedProjectName(project.name);
                      setSelectedProjectId(project.id);
                    }
                  }}
                >
                  {userProjects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.project}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Template</FormLabel>
                <Select onChange={(e) => handleTemplateSelect(e, setFieldValue)} placeholder="Selecciona un template">
                  {templates.map((template) => (
                    <option key={template.id} value={template.id.toString()}>
                      {template.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.documentTitle && !!touched.documentTitle}>
                <FormLabel>Título del documento</FormLabel>
                <Field
                  as={Input}
                  name="documentTitle"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('documentTitle', e.target.value);
                    setDocumentTitle(e.target.value);
                  }}
                  minLength={2}
                  maxLength={50}
                />
                <FormErrorMessage>{errors.documentTitle}</FormErrorMessage>
              </FormControl>
              <FieldArray name="requirements">
                {({ push, remove }) => (
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
                            {`Requisito ${reqIndex + 1}`}
                          </Text>
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
                          <VStack spacing={4} align="stretch" mt={4}>
                            {requirement.fields.map((field, fieldIndex) => {
                              const fieldErrors = (requirementErrors?.fields as FormikErrors<Fields>[] | undefined)?.[fieldIndex];
                              const fieldTouched = (requirementTouched?.fields as FormikTouched<Fields>[] | undefined)?.[fieldIndex];
                              return (
                                <FormControl key={fieldIndex} isInvalid={!!fieldErrors?.value && !!fieldTouched?.value}>
                                  <FormLabel>{field.label}</FormLabel>
                                  <Field as={Input} name={`requirements.${reqIndex}.fields.${fieldIndex}.value`} minLength={2} maxLength={50}/>
                                  <FormErrorMessage>{fieldErrors?.value}</FormErrorMessage>
                                </FormControl>
                              );
                            })}
                          </VStack>
                        </Box>
                      );
                    })}
                    {values.requirements.length > 0 &&
                      values.requirements[values.requirements.length - 1].fields.every(field => field.value) && (
                        <Button onClick={() => push({ fields: [{ label: '', value: '' }] })} colorScheme="teal">
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
