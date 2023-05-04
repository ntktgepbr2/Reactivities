import { ErrorMessage, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../app/common/form/MyTextInput";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <MyTextInput name='email' placeholder='Email'></MyTextInput>
          <MyTextInput name='password' placeholder='Password' type='password'></MyTextInput>
          <ErrorMessage
            name='error'
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error}></Label>
            )}
          ></ErrorMessage>
          <Button loading={isSubmitting} positive content='Login' type='submit' fluid></Button>
        </Form>
      )}
    </Formik>
  );
});
