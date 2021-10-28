import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { Field } from "formik";
import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<any> = ({ onLogin }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {} as any;
        if (!values.email) {
          errors.email = "Email Is Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async (
        values: FormData,
        { setSubmitting }: FormikHelpers<FormData>
      ) => {
        await alert({
          type: "promise",
          promise: onLogin(values.email, values.password),
          msgs: {
            loading: "Logging In",
            success: "Login Successfull",
            error: (data) => `${data}`,
          },
        });

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors }) => {
        return (
          <Form className="w-full space-y-8">
            <div className="space-y-6 ">
              <Field
                name="email"
                component={PrimaryInput}
                error={errors.email}
                placeholder={"Enter Email"}
              />
              <Field
                name="password"
                type="password"
                placeholder="Enter Password"
                component={PrimaryInput}
              />
            </div>
            <Button type="loading" loading={isSubmitting}>
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
