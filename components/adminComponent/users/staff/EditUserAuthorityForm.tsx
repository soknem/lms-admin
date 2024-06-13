// import React from 'react';
// import { useFormik, FormikProvider, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
//
// // Define Yup validation schema
// const validationSchema = Yup.object({
//     username: Yup.string()
//         .min(2, 'Username must be at least 2 characters')
//         .max(50, 'Username must be 50 characters or less')
//         .required('Username is required'),
//     isAdmin: Yup.boolean(),
// });
//
// function EditUserAuthorityForm() {
//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             isAdmin: false,
//         },
//         validationSchema,
//         onSubmit: (values) => {
//             console.log(values);
//         },
//     });
//
//     return (
//         <FormikProvider value={formik}>
//             <form onSubmit={formik.handleSubmit} className="space-y-8">
//                 <div>
//                     <label htmlFor="username">Username</label>
//                     <Field
//                         id="username"
//                         name="username"
//                         placeholder="shadcn"
//                         as={Input}
//                     />
//                     <ErrorMessage name="username" component="div" className="error" />
//                     <div>This is your public display name.</div>
//                 </div>
//                 <Button type="submit">Submit</Button>
//             </form>
//         </FormikProvider>
//     );
// }
//
// export default EditUserAuthorityForm;
